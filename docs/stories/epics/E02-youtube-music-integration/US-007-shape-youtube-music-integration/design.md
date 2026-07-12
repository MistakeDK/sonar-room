# Design

## Domain Model

- `PublicMusicUrl`: validated user input restricted to supported public YouTube
  Music URL forms.
- `PlaybackSession`: in-memory URL, current item metadata when available,
  playback status, position, duration, volume, and capabilities.
- `PlaybackAdapter`: contract for `loadUrl`, `play`, `pause`, `next`, `seek`,
  `setVolume`, state observation, and disposal.
- `YoutubeMusicPlaybackHost`: infrastructure adapter managing exactly one
  invisible YouTube Music webview host.

No account, token, provider profile, music catalog, or playback history is part
of MVP local data.

## Application Flow

1. User pastes URL into Provider Management.
2. Application validates public YouTube Music URL form.
3. Host is lazily created if no active host exists.
4. Host attempts unauthenticated load and emits normalized state.
5. Provider Management player bar renders state and sends commands through
   application layer.
6. Authentication-required, unsupported, or engine errors stop playback and
   show mapped error state. No login window opens.
7. Stop, URL replacement, host failure, or app exit disposes host.

## Interface Contract

`PlaybackAdapter` exposes:

- Commands: `loadUrl`, `play`, `pause`, `next`, `seek`, `setVolume`, `stop`,
  and `dispose`.
- State: `status`, `track`, `positionSeconds`, `durationSeconds`, `volume`,
  `canPrevious`, `canNext`, and typed error.
- Status: `idle`, `loading`, `buffering`, `playing`, `paused`, `ended`,
  `authentication_required`, `unsupported`, `engine_terminated`, and `error`.

The host remains invisible. App UI never receives raw provider DOM, cookies,
credentials, or private provider payloads.

## UI / Platform Impact

- Provider Management owns URL input and fixed player bar; Music route remains
  unchanged in MVP.
- Visual source is Open Design project `Sonar-Room`, artifact
  `provider-management.html`, `data-od-id="global-playback-bar"`.
- Preserve now playing, previous, play/pause, next, current time, seek,
  duration, and mute. Add volume slider.
- Open Design demo timer is not reused. UI uses adapter state only.
- Windows desktop is first supported platform. Other platforms require a new
  validation slice.

## Observability

Log operation name, host lifecycle result, normalized status, and safe error
class. Do not log browser session data, cookies, credentials, or raw page data.

## Alternatives Considered

1. Invisible isolated YouTube Music host: selected pending policy and technical
   spike proof.
2. Visible embedded webview: rejected by MVP UX requirement.
3. Provider account connection: deferred to separate high-risk story.
4. Private API/session automation: rejected.
