# 0019 Visible YouTube IFrame Playback MVP

Date: 2026-07-12

## Status

Accepted

## Context

Decision 0018 rejected invisible/off-screen YouTube Music playback. Product now
accepts a player visible to user. Playback UI and logic become one reusable
feature library; Open Design bar becomes global AppShell UI.

## Decision

Use official YouTube IFrame Player API embedded visibly in Provider Management.
Accept public supported YouTube video and playlist URLs only. Do not create a
Tauri `WebviewWindow` for `music.youtube.com` and do not use a hidden host.

The iframe stays visible and unobscured. Native controls and branding remain
available. `libs/features/playback` owns parser, IFrame adapter, session,
source-panel UI, and Open Design playback bar. Vue Router mounts the playback
feature in AppShell outside child `RouterView`; Provider Management composes its
public visible source panel. Bar commands use official IFrame Player API.

The visible IFrame host is scoped to Provider Management. Leaving that route
disposes player/session state rather than keeping an invisible background host.

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
- Global bar remains visible between routes, but becomes idle when visible
  Provider Management player host is disposed.

## Follow-Up

- Implement `libs/features/playback` technical spike.
- Verify public video/playlist URL parsing and embed errors on Windows.
- Mount global bar through Router AppShell and compose visible source panel in
  Provider Management.
