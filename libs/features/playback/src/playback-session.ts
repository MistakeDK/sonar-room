import { reactive, readonly } from "vue";
import { INITIAL_PLAYBACK_CAPABILITIES, type PlaybackError, type PlaybackSessionState, type YouTubeEmbedUrl } from "./contracts";
import { YouTubeIframePlaybackAdapter, type YouTubePlayerSnapshot } from "./youtube-iframe-playback-adapter";

const state = reactive<PlaybackSessionState>({
  status: "idle",
  source: null,
  title: null,
  coverUrl: null,
  positionSeconds: 0,
  durationSeconds: 0,
  volume: 100,
  muted: false,
  capabilities: { ...INITIAL_PLAYBACK_CAPABILITIES },
  error: null,
});

let adapter: YouTubeIframePlaybackAdapter | null = null;

export function usePlaybackSession() {
  return {
    state: readonly(state),
    async load(host: HTMLElement, source: YouTubeEmbedUrl): Promise<void> {
      adapter?.dispose();
      reset(source, "loading");
      adapter = new YouTubeIframePlaybackAdapter(applySnapshot, applyError);
      try {
        await adapter.load(host, source);
      } catch {
        applyError({ code: "player_error", message: "YouTube IFrame API could not load. Retry later." });
      }
    },
    play: () => adapter?.play(),
    pause: () => adapter?.pause(),
    previous: () => adapter?.previous(),
    next: () => adapter?.next(),
    seek: (seconds: number) => adapter?.seek(seconds),
    setVolume: (volume: number) => adapter?.setVolume(volume),
    mute: () => adapter?.mute(),
    unmute: () => adapter?.unmute(),
    dispose: () => {
      adapter?.dispose();
      adapter = null;
      reset(null, "idle");
    },
  };
}

function reset(source: YouTubeEmbedUrl | null, status: PlaybackSessionState["status"]): void {
  state.status = status;
  state.source = source;
  state.title = null;
  state.coverUrl = source?.kind === "video" ? getYouTubeThumbnailUrl(source.videoId) : null;
  state.positionSeconds = 0;
  state.durationSeconds = 0;
  state.volume = 100;
  state.muted = false;
  state.capabilities = {
    canSeek: false,
    canGoPrevious: source?.kind === "playlist",
    canGoNext: source?.kind === "playlist",
  };
  state.error = null;
}

function applySnapshot(snapshot: YouTubePlayerSnapshot): void {
  state.status = snapshot.status;
  state.title = snapshot.title;
  state.coverUrl = snapshot.videoId ? getYouTubeThumbnailUrl(snapshot.videoId) : state.coverUrl;
  state.positionSeconds = snapshot.positionSeconds;
  state.durationSeconds = snapshot.durationSeconds;
  state.volume = snapshot.volume;
  state.muted = snapshot.muted;
  state.capabilities.canSeek = Number.isFinite(snapshot.durationSeconds) && snapshot.durationSeconds > 0;
}

function applyError(error: PlaybackError): void {
  state.status = "error";
  state.error = error;
}

function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
