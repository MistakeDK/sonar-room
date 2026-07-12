# Design

## Domain Model

- `YouTubeEmbedUrl`: validated public YouTube video or playlist identifier.
- `PlaybackSession`: in-memory player state, metadata when official player
  exposes it, position, duration, volume, and capabilities.
- `YouTubeIframePlaybackAdapter`: wraps official YouTube IFrame Player API.
- `PlaybackFeature`: feature-library composition containing session, visible
  source panel, and global playback-bar UI.

No account, token, cookie, profile, catalog, or playback-history data belongs to
MVP.

## Application Flow

1. Vue Router mounts AppShell parent route and `PlaybackFeature` once outside
   child `RouterView`.
2. Provider Management renders public `YouTubeSourcePanel` from playback lib.
3. User pastes public YouTube URL; feature validates video or playlist ID.
4. Source panel renders visible YouTube iframe in Provider Management.
5. IFrame Player API emits ready/state/error events to session adapter.
6. Global Open Design playback bar renders same session and sends commands.
7. Unsupported, non-embeddable, or authentication-required content displays
   mapped error; no login window opens.

## Interface Contract

Adapter exposes `load`, `play`, `pause`, `previous`, `next`, `seek`,
`setVolume`, `mute`, `unmute`, `getState`, and `dispose`.

State includes `status`, `track`, `positionSeconds`, `durationSeconds`,
`volume`, `muted`, `canPrevious`, `canNext`, and typed error.

Use official IFrame API state only. Do not inspect provider DOM, cookies, or
private payloads.

## Feature and Router Boundary

- `libs/features/playback` owns playback session, URL parser, IFrame adapter,
  source-panel UI, global playback bar, and public playback exports.
- AppShell is Router parent layout. It mounts `PlaybackFeature` outside child
  `RouterView`, keeping playback-bar UI stable across routes.
- Provider Management owns no playback logic. It composes `YouTubeSourcePanel`.
- Visible IFrame host exists only in Provider Management. Route exit disposes
  player and resets session; global bar stays mounted but idle.
- No hidden player exists when Provider Management is not visible.

## UI / Platform Impact
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

## State Synchronization

- IFrame Player API is sole playback authority.
- Session polls `getCurrentTime()` only while playing or buffering and stops on
  pause, end, error, or dispose.
- Duration, volume, mute, and playlist previous/next capability come from
  official methods/events; bar never increments local timer.
- Seek emits one `seekTo()` command after slider release.

## Alternatives Considered

1. Visible official YouTube IFrame Player: selected.
2. Invisible/off-screen YouTube Music host: rejected by decision 0018.
3. Direct Tauri webview to `music.youtube.com`: rejected; not selected official
   embed contract.
4. Account connection: deferred.
