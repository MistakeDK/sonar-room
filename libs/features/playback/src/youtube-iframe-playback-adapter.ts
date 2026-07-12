import type { PlaybackError, PlaybackStatus, YouTubeEmbedUrl } from "./contracts";

interface YouTubePlayer {
  destroy(): void;
  playVideo(): void;
  pauseVideo(): void;
  previousVideo(): void;
  nextVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  setVolume(volume: number): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  getCurrentTime(): number;
  getDuration(): number;
  getVolume(): number;
  getVideoData(): { title?: string; video_id?: string };
}

interface YouTubeNamespace {
  Player: new (element: HTMLElement, options: {
    height: string;
    width: string;
    playerVars: Record<string, number | string>;
    videoId?: string;
    events: {
      onReady: () => void;
      onStateChange: (event: { data: number }) => void;
      onError: (event: { data: number }) => void;
    };
  }) => YouTubePlayer;
}

declare global {
  interface Window {
    YT?: YouTubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const PLAYER_STATE: Record<number, PlaybackStatus> = {
  [-1]: "loading",
  0: "ended",
  1: "playing",
  2: "paused",
  3: "buffering",
  5: "ready",
};

let apiReadyPromise: Promise<YouTubeNamespace> | null = null;

export interface YouTubePlayerSnapshot {
  status: PlaybackStatus;
  positionSeconds: number;
  durationSeconds: number;
  volume: number;
  muted: boolean;
  title: string | null;
  videoId: string | null;
}

export class YouTubeIframePlaybackAdapter {
  private player: YouTubePlayer | null = null;
  private pollTimer: number | null = null;

  constructor(
    private readonly onState: (snapshot: YouTubePlayerSnapshot) => void,
    private readonly onError: (error: PlaybackError) => void,
  ) {}

  async load(host: HTMLElement, source: YouTubeEmbedUrl): Promise<void> {
    this.dispose();
    const yt = await loadYouTubeIframeApi();
    this.player = new yt.Player(host, {
      height: "200",
      width: "100%",
      ...(source.kind === "video" ? { videoId: source.videoId } : {}),
      playerVars: {
        autoplay: 0,
        controls: 1,
        playsinline: 1,
        ...(source.kind === "playlist" ? { listType: "playlist", list: source.playlistId } : {}),
      },
      events: {
        onReady: () => this.emitState("ready"),
        onStateChange: (event) => this.handlePlayerState(event.data),
        onError: (event) => this.onError(mapPlayerError(event.data)),
      },
    });
  }

  play(): void { this.player?.playVideo(); }
  pause(): void { this.player?.pauseVideo(); }
  previous(): void { this.player?.previousVideo(); }
  next(): void { this.player?.nextVideo(); }
  seek(seconds: number): void { this.player?.seekTo(seconds, true); }
  setVolume(volume: number): void { this.player?.setVolume(volume); }
  mute(): void { this.player?.mute(); }
  unmute(): void { this.player?.unMute(); }

  dispose(): void {
    this.stopPolling();
    this.player?.destroy();
    this.player = null;
  }

  private handlePlayerState(playerState: number): void {
    const status = PLAYER_STATE[playerState] ?? "ready";
    this.emitState(status);
    if (status === "playing" || status === "buffering") this.startPolling();
    else this.stopPolling();
  }

  private emitState(status: PlaybackStatus): void {
    if (!this.player) return;
    const durationSeconds = this.player.getDuration();
    const videoData = this.player.getVideoData();
    this.onState({
      status,
      positionSeconds: this.player.getCurrentTime(),
      durationSeconds,
      volume: this.player.getVolume(),
      muted: this.player.isMuted(),
      title: videoData.title ?? null,
      videoId: videoData.video_id ?? null,
    });
  }

  private startPolling(): void {
    if (this.pollTimer !== null) return;
    this.pollTimer = window.setInterval(() => this.emitState("playing"), 500);
  }

  private stopPolling(): void {
    if (this.pollTimer === null) return;
    window.clearInterval(this.pollTimer);
    this.pollTimer = null;
  }
}

function loadYouTubeIframeApi(): Promise<YouTubeNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiReadyPromise) return apiReadyPromise;

  apiReadyPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      apiReadyPromise = null;
      reject(new Error("YouTube IFrame API could not load."));
    };
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      if (window.YT?.Player) resolve(window.YT);
      else {
        apiReadyPromise = null;
        reject(new Error("YouTube IFrame API loaded without player support."));
      }
    };
    document.head.append(script);
  });

  return apiReadyPromise;
}

function mapPlayerError(code: number): PlaybackError {
  if (code === 101 || code === 150) {
    return { code: "embed_disabled", message: "Video owner does not allow embedding." };
  }
  if (code === 100) return { code: "player_error", message: "Video is unavailable." };
  return { code: "player_error", message: "YouTube player could not load this content." };
}
