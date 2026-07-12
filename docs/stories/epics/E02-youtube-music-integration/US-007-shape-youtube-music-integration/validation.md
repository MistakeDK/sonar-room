# Validation

## Proof Strategy

Do not start integration proof until official provider documentation confirms each selected capability. Use sandbox/test account where provider supports it.

## Test Plan

| Layer | Cases |
| --- | --- |
| Unit | Capability rules, connection state transitions, token-safe DTO mapping, playback command validation. |
| Integration | OAuth callback exchange, secure secret reference persistence, collection mapping, expired token refresh/failure. |
| E2E | Connect, display selected collection, play, pause, next, disconnect, and unsupported capability states. |
| Platform | Tauri authorization callback, secure storage, window lifecycle, and audio handoff/in-window playback behavior. |
| Performance | Bounded collection loading and no UI freeze during auth or playback state updates. |
| Logs/Audit | Sensitive-value redaction and actionable provider error classification. |

## Fixtures

- Provider contract fixture matching verified official responses.
- Connected, expired, disconnected, denied-consent, and unsupported-capability account states.
- Deterministic collection and playback-state fixtures.

## Commands

```text
TBD after architecture and provider contract approval.
```

## Acceptance Evidence

Not started. Human decision required for official provider contract and MVP playback boundary.

## Performance Gates

- One active provider webview maximum.
- Record desktop process CPU and memory while idle, playing, seeking, provider
  switching, and after webview disposal.
- Verify playback continues correctly when webview is hidden or minimized on
  each supported desktop OS.
- Fail MVP if hidden/background lifecycle causes playback throttling, autoplay
  denial, stale duration, or position drift beyond defined tolerance.

## Unauthenticated Proof

- Public pasted URL starts without an account-login prompt.
- Restricted URL renders `authentication_required` with no login action.
- Playback bar matches accepted Open Design layout and uses real adapter state,
  not a local timer.
- Public URL test covers play/pause, seek, duration, volume, mute, and next
  capability state.
