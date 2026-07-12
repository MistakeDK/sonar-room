import type { PlaybackError, YouTubeEmbedUrl } from "./contracts";

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const PLAYLIST_ID = /^[A-Za-z0-9_-]{10,}$/;

export type YouTubeUrlParseResult =
  | { ok: true; value: YouTubeEmbedUrl }
  | { ok: false; error: PlaybackError };

export function parseYouTubeEmbedUrl(input: string): YouTubeUrlParseResult {
  const trimmedInput = input.trim();
  if (!trimmedInput) return invalidUrl("Paste a public YouTube video or playlist URL.");

  let url: URL;
  try {
    url = new URL(trimmedInput);
  } catch {
    return invalidUrl("Enter a valid public YouTube URL.");
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (host === "music.youtube.com") {
    return unsupported("YouTube Music URLs are not supported in this MVP.");
  }

  let videoId: string | null = null;
  let playlistId: string | null = null;
  if (host === "youtu.be") {
    videoId = url.pathname.split("/").filter(Boolean)[0] ?? null;
    playlistId = url.searchParams.get("list");
  } else if (host === "youtube.com" || host === "m.youtube.com") {
    playlistId = url.searchParams.get("list");
    if (url.pathname === "/watch") {
      videoId = url.searchParams.get("v");
    } else if (url.pathname.startsWith("/embed/")) {
      videoId = url.pathname.split("/").filter(Boolean)[1] ?? null;
    } else if (url.pathname !== "/playlist") {
      return unsupported("Only public YouTube video and playlist URLs are supported.");
    }
  } else {
    return unsupported("Only public YouTube video and playlist URLs are supported.");
  }

  if (videoId && VIDEO_ID.test(videoId)) {
    return { ok: true, value: { kind: "video", videoId, canonicalUrl: `https://www.youtube.com/watch?v=${videoId}` } };
  }
  if (playlistId && PLAYLIST_ID.test(playlistId)) {
    return { ok: true, value: { kind: "playlist", playlistId, canonicalUrl: `https://www.youtube.com/playlist?list=${playlistId}` } };
  }
  return invalidUrl("URL is missing a supported public video or playlist ID.");
}

function invalidUrl(message: string): YouTubeUrlParseResult {
  return { ok: false, error: { code: "invalid_url", message } };
}

function unsupported(message: string): YouTubeUrlParseResult {
  return { ok: false, error: { code: "unsupported", message } };
}
