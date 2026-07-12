# 0019 Visible YouTube IFrame Playback MVP

Date: 2026-07-12

## Status

Accepted

## Context

Decision 0018 rejected invisible/off-screen YouTube Music playback. Product now
accepts a player visible to user and keeps Open Design Provider Management bar
as player controls.

## Decision

Use official YouTube IFrame Player API embedded visibly in Provider Management.
Accept public supported YouTube video and playlist URLs only. Do not create a
Tauri `WebviewWindow` for `music.youtube.com` and do not use a hidden host.

The iframe stays visible and unobscured. Native controls and branding remain
available. Open Design playback bar provides supplemental commands through
official IFrame Player API.

## Alternatives Considered

1. Visible YouTube IFrame Player: accepted.
2. Invisible YouTube Music host: rejected by decision 0018.
3. Direct visible Tauri webview to `music.youtube.com`: rejected; no verified
   official playback contract selected.
4. External handoff: deferred.

## Consequences

Positive:

- Uses documented player controls and event/state APIs.
- Preserves no-login public URL MVP boundary.
- Unblocks visible player technical spike.

Tradeoffs:

- Product is public YouTube embed playback, not a verified YouTube Music
  playback API.
- User sees provider player and branding.
- Unsupported/music-specific URLs remain errors unless they map to documented
  video or playlist embed identifiers.

## Follow-Up

- Implement visible IFrame Player technical spike.
- Verify public video/playlist URL parsing and embed errors on Windows.
- Wire Provider Management Open Design playback bar after spike passes.
