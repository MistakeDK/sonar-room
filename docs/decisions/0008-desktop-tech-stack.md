# 0008 Desktop Tech Stack

Date: 2026-07-06

## Status

Accepted

## Context

The Phase 1 product goal is a desktop music launcher that brings Spotify,
YouTube, and SoundCloud listening access into one place. The project needs a
clear baseline stack before story shaping so future work can target the right
runtime, UI layer, local persistence boundary, and build organization.

## Decision

Use this stack for the Phase 1 desktop app:

- Tauri as the desktop wrapper and native shell.
- Vue.js for the user interface.
- SQLite only for local app data needed on the user's machine.
- Nx monorepo for build orchestration, caching, and source organization.

Nx is the workspace manager for organizing apps/libs and coordinating build, cache, lint, and test tasks as they are introduced.

SQLite is not a remote product database in Phase 1. It should store local data
only, such as app preferences, locally cached launcher metadata, and connection
state that is safe to persist on-device.

## Alternatives Considered

1. Electron desktop wrapper with a web UI.
2. Native desktop UI without a web framework.
3. Browser-only web app with no desktop wrapper.
4. Remote database for user music or account state.
5. Single-package repository without Nx task orchestration.

## Consequences

Positive:

- Tauri keeps the desktop wrapper lightweight while supporting a web UI.
- Vue.js gives the UI a clear component model for the launcher surface.
- SQLite enables offline local persistence without introducing a server or
  cloud database in Phase 1.
- Nx gives future Tauri, Vue, shared libraries, and validation tasks one build
  graph with cache support.

Tradeoffs:

- Provider playback details still need separate story shaping because Tauri,
  embedded web views, SDKs, and deep links each have platform constraints.
- SQLite schema must stay local-only unless a later decision expands the data
  ownership model.
- Desktop packaging and platform smoke checks become part of the validation
  ladder once implementation starts.
- Nx workspace boundaries must be defined before creating apps and shared libs,
  otherwise source layout can drift.

## Follow-Up

- Define the first Nx workspace plus Tauri + Vue scaffold story before creating application code.
- Decide what local data is allowed in SQLite before adding schema or migrations.
- Shape provider integration stories separately for Spotify, YouTube, and
  SoundCloud.

