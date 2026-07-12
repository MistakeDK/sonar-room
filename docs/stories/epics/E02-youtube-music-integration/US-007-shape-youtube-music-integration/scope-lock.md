# Scope Lock

## Product Boundary

- Provider: YouTube embed only.
- Platform: Windows desktop only.
- Entry: user-pasted public supported YouTube video or playlist URL.
- Player: visible official iframe in Provider Management, never hidden,
  off-screen, or backgrounded.
- Authentication: none. No login prompt, OAuth, account, or persistent session.
- Persistence: no URL history, playlist data, account data, token, cookie, or
  profile persistence.

## Controls

| Control | MVP rule |
| --- | --- |
| Play/pause | Calls official IFrame API after ready event. |
| Previous | Enabled only for playlist-capable player state. |
| Next | Enabled only for playlist-capable player state. |
| Seek | Enabled only when IFrame reports finite duration. |
| Duration | Uses IFrame-reported duration only. |
| Volume | Slider maps to IFrame volume. |
| Mute | Calls IFrame mute/unmute methods. |

## UI Boundary

- Add URL input and visible iframe to Provider Management.
- Keep accepted Open Design global playback bar fixed at bottom.
- Keep player visible, at least `200×200`, unobscured, with native controls and
  branding available.
- Music route does not change.

## Error Boundary

| Condition | Required behavior |
| --- | --- |
| Invalid URL | Reject before iframe creation. |
| Unsupported YouTube Music route | Show `unsupported`; do not fall back to direct webview. |
| Authentication required | Show `authentication_required`; do not offer login. |
| Embed disabled/player error | Show mapped error and safe retry. |
| Playlist unavailable | Disable previous/next. |

## Acceptance Criteria

- User can paste a supported public YouTube URL and view iframe player.
- Iframe state drives Open Design playback bar, with no simulated timer.
- Play/pause, seek, duration, volume, mute, and playlist next/previous obey
  official IFrame state and capabilities.
- Native iframe player remains visible and functional.
- No invisible player, login, OAuth, cookies, profile, or browser automation.

## Exit Gate

Scope changes from rejected invisible YouTube Music host to visible official
YouTube IFrame Player. Next work is visible-player technical spike.
