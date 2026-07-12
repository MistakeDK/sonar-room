# US-007 Visible YouTube Embed Playback MVP

## Current Behavior

- Provider Management renders static provider cards.
- Provider Management has no URL input, embedded player, or functional playback bar.
- Music route is a placeholder.

## Target Behavior

On Windows desktop, user pastes a public supported YouTube video or playlist URL
into Provider Management. App validates and converts it to an official YouTube
IFrame Player embed, rendered visibly in page. Provider Management shows fixed
Open Design playback bar driven by official player state.

This MVP does not connect an account and never opens login. A URL requiring
authentication, a non-embeddable video, or unsupported YouTube Music-specific
route returns a clear error.

## Affected Users

- Desktop listener opening public embeddable YouTube video or playlist URLs.

## Affected Product Docs

- `docs/product/overview.md`
- `docs/ARCHITECTURE.md`
- `docs/decisions/0018-invisible-youtube-music-playback-policy-gate.md`
- `docs/decisions/0019-visible-youtube-iframe-playback-mvp.md`

## Non-Goals

- Invisible/off-screen/background YouTube Music playback.
- Tauri `WebviewWindow` navigation to `music.youtube.com`.
- OAuth, sign-in, account persistence, library, history, or Premium state.
- Private endpoints, cookie/profile import/export, or browser automation.
- Spotify, SoundCloud, or generic provider playback.
- Music-route player implementation.
