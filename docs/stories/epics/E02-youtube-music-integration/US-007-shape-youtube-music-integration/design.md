# Design

## Domain Model

- `YouTubeEmbedUrl`: validated public YouTube video or playlist identifier.
- `PlaybackSession`: in-memory player state, metadata when official player
  exposes it, position, duration, volume, and capabilities.
- `YouTubeIframePlaybackAdapter`: wraps official YouTube IFrame Player API.

No account, token, cookie, profile, catalog, or playback-history data belongs to
MVP.

## Application Flow

1. User pastes public YouTube URL into Provider Management.
2. Application extracts supported video or playlist identifiers.
3. Vue renders a visible YouTube iframe player in Provider Management.
4. IFrame Player API emits ready/state/error events to adapter.
5. Open Design playback bar sends commands through adapter and renders adapter
   state.
6. Unsupported, non-embeddable, or authentication-required content displays
   mapped error; no login window opens.

## Interface Contract

Adapter exposes `load`, `play`, `pause`, `previous`, `next`, `seek`,
`setVolume`, `mute`, `unmute`, `getState`, and `dispose`.

State includes `status`, `track`, `positionSeconds`, `durationSeconds`,
`volume`, `muted`, `canPrevious`, `canNext`, and typed error.

Use official IFrame API state only. Do not inspect provider DOM, cookies, or
private payloads.

## UI / Platform Impact

- Provider Management owns URL input, visible player, and fixed playback bar.
- Iframe remains visible, unobscured, and at least `200×200`; use `480×270` as
  first desktop layout target.
- Open Design source: `Sonar-Room` project,
  `provider-management.html`, `data-od-id="global-playback-bar"`.
- Preserve now playing, previous, play/pause, next, current time, seek,
  duration, mute; add volume slider.
- Native iframe controls remain available in first slice. Open Design bar is
  supplemental and must not obscure player controls or branding.
- Windows is first supported platform.

## Observability

Log safe URL-validation outcome, player readiness, normalized player state, and
safe player error class. Do not log credentials, cookies, or raw page content.

## Alternatives Considered

1. Visible official YouTube IFrame Player: selected.
2. Invisible/off-screen YouTube Music host: rejected by decision 0018.
3. Direct Tauri webview to `music.youtube.com`: rejected; not selected official
   embed contract.
4. Account connection: deferred.
