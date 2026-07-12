# Scope Lock

## Product Boundary

- Provider: YouTube Music only.
- Platform: Windows desktop only.
- Entry point: one user-pasted public YouTube Music URL on Provider Management.
- Playback host: exactly one invisible host, created lazily and disposed on stop,
  replacement, failure, or app exit.
- Authentication: none. MVP never prompts user to login.
- Persistence: no account, token, cookie, profile, URL history, catalog, queue,
  or playback history persistence.

## Controls

| Control | MVP rule |
| --- | --- |
| Play/pause | Enabled only when host reports playable state. |
| Previous | Enabled only when host reports `canPrevious`. |
| Next | Enabled only when host reports `canNext`; direct-track URLs may disable it. |
| Seek | Enabled only when finite duration and seek capability exist. |
| Duration | Render host-confirmed total duration; never synthesize a value. |
| Volume | App volume slider maps to host volume from `0` to `1`. |
| Mute | Mute toggles host volume state without a fake local-only value. |

## UI Boundary

- Reuse Provider Management Open Design global playback-bar visual hierarchy.
- Add URL input near Provider Management actions.
- Keep playback bar fixed at screen bottom.
- Do not display provider webview, provider login, or hidden-host chrome.
- Music route does not change in this MVP.

## Error Boundary

| Condition | Required behavior |
| --- | --- |
| Invalid URL | Reject before host creation. |
| Authentication required | Show `authentication_required`; do not offer login. |
| Unsupported URL/playback | Show `unsupported`; stop host. |
| Host terminated | Show recovery action; no automatic infinite restart. |
| Network failure | Show safe retry action; retain no private session data. |

## Acceptance Criteria

- User can paste one supported public URL and receive explicit loading, playing,
  paused, stopped, or error state.
- Playback bar controls operate against real host state.
- Seek position and duration reconcile to host-confirmed values.
- Volume and mute update host state.
- No account prompt, OAuth flow, secret storage, cookie import, or persistence
  code exists in MVP.
- No visual provider webview exists in app UI.
- At most one YouTube Music host exists at a time.

## Exit Gate

Scope is locked. Next work is provider-policy confirmation, then invisible-host
technical spike. Scope changes require a new human correction and decision
review.
