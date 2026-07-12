# 0017 Unauthenticated YouTube Music URL MVP

Date: 2026-07-12

## Status

Accepted

## Context

Initial MVP must let user paste a YouTube Music URL and control playback without
connecting a user account. Existing Open Design Provider Management artifact
already defines fixed global playback-bar visual intent.

## Decision

Limit MVP to unauthenticated public YouTube Music URLs. Do not implement OAuth,
Google/YouTube login, account persistence, user library access, or restricted
content playback.

Place URL input and playback state in Provider Management. Recreate Open Design
`global-playback-bar` in local Vue feature code. Preserve visual controls for
now playing, previous, play/pause, next, time, seek, duration, and mute. Add
volume slider because product contract requires direct volume adjustment.

## Alternatives Considered

1. Prompt user to login on first restricted URL: deferred.
2. Open account connection during app startup: rejected for initial MVP.
3. Build a separate Music-page player: deferred; Provider Management owns first
   playback bar.

## Consequences

Positive:

- Removes OAuth, secret storage, and account-data work from first slice.
- Enables public URL smoke proof before account integration.
- Reuses accepted Open Design player intent.

Tradeoffs:

- Some URLs cannot play without provider authentication.
- User library and personalized playback stay out of scope.
- `next` only works when public URL exposes provider queue capability.

## Follow-Up

- Verify provider policy for public URL webview playback.
- Build PlaybackAdapter and Provider Management player component.
- Shape account connection as separate high-risk story if selected.

## Execution Status

Execution is blocked by decision 0018. This decision remains product scope only;
it does not authorize an invisible provider host contrary to provider policy.
