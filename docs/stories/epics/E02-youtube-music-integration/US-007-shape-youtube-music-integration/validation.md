# Validation

## Proof Strategy

Do not start integration proof until official provider documentation confirms
each selected IFrame Player capability. No account or sandbox/test account is
needed for public supported URLs.

## Test Plan

| Layer | Cases |
| --- | --- |
| Unit | Public URL parser, error mapping, control capability, command validation. |
| Integration | Official IFrame ready/state/error events, position/duration, seek, volume, mute, playlist commands. |
| E2E | Paste video/playlist URL, visible player, global bar play/pause/seek/volume, and route-exit disposal. |
| Platform | Windows Tauri lifecycle, Router AppShell mount, and visible iframe behavior. |
| Performance | No UI freeze during IFrame state updates; polling stops when not playing. |
| Logs/Audit | Safe URL outcome, player-error classification, and no credentials/cookies/raw page content. |

## Fixtures

- Supported public video URL, playlist URL, invalid URL, unsupported
  `music.youtube.com` URL, and non-embeddable content cases.
- Deterministic IFrame event and playback-state fixtures.

## Commands

```text
TBD after architecture and provider contract approval.
```

## Acceptance Evidence

Not started. Human decision required for official provider contract and MVP playback boundary.

## Performance Gates

- One visible IFrame player maximum.
- Record desktop process CPU and memory while idle, playing, seeking, and after
  route-exit player disposal.
- Fail MVP if position polling continues after pause, end, error, or disposal;
  or if bar state drifts from reported player state.

## Unauthenticated Proof

- Public pasted URL starts without an account-login prompt.
- Unsupported or authentication-required URL returns a typed error with no
  login action.
- Playback bar matches accepted Open Design layout, is mounted by AppShell, and
  uses real adapter state instead of local timer.
- Public URL proof covers play/pause, seek, duration, volume, mute, playlist
  next/previous capability, and route-exit disposal.
