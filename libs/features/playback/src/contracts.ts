export type YouTubeEmbedUrl =
  | { kind: "video"; videoId: string; canonicalUrl: string }
  | { kind: "playlist"; playlistId: string; canonicalUrl: string };

export type PlaybackStatus = "idle" | "loading" | "ready" | "playing" | "paused" | "buffering" | "ended" | "error";
export type PlaybackErrorCode = "invalid_url" | "unsupported" | "authentication_required" | "embed_disabled" | "player_error";

export interface PlaybackError { code: PlaybackErrorCode; message: string; }
export interface PlaybackCapabilities { canSeek: boolean; canGoPrevious: boolean; canGoNext: boolean; }
export interface PlaybackSessionState {
  status: PlaybackStatus;
  source: YouTubeEmbedUrl | null;
  title: string | null;
  coverUrl: string | null;
  positionSeconds: number;
  durationSeconds: number;
  volume: number;
  muted: boolean;
  capabilities: PlaybackCapabilities;
  error: PlaybackError | null;
}

export const INITIAL_PLAYBACK_CAPABILITIES: PlaybackCapabilities = { canSeek: false, canGoPrevious: false, canGoNext: false };
