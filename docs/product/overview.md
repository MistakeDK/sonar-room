# Product Overview

## Goal

Build a desktop application that works as a music launcher, connecting multiple
music platforms in one place so users can listen without switching apps.

## Phase 1 Scope

Phase 1 focuses on one unified listening surface for external music platforms:

- Spotify.
- YouTube.
- SoundCloud.

Users should be able to connect or open supported platforms from the desktop
app and listen to music from those platforms in a single place.

## Out of Scope for Phase 1

- Replacing the source music platforms.
- Building a standalone music catalog.
- Implementing social, playlist migration, or recommendation features unless a
  later story explicitly selects them.
- Implementing provider-specific playback behavior before each integration story is shaped.

## Accepted Tech Stack

- Tauri is the desktop wrapper and native shell.
- Vue.js is the UI framework.
- SQLite is used only for local app data on the user's machine.
- Nx monorepo manages build orchestration, caching, and source organization.

## Application Foundation

- Vue Router uses hash-based client-side navigation for desktop static assets. The launcher route is /; unknown client routes return to it.
- Presentation preference supports light, dark, and system modes. Preference uses browser-safe local storage, not SQLite product-data persistence.
- Pinia owns app-wide presentation preferences only. Provider, authentication, playback, and persistence business rules remain outside app shell state.
- Reusable provider-management screen composition and theme helpers live in `libs/features/*`; `apps/desktop` keeps only bootstrap, route control, and Tauri platform edges.
- Provider Management currently renders static connection fixtures from accepted Open Design visual intent, including a dashed add-provider slot after the provider cards; provider API, account, playback, and connection actions remain out of scope.

## Product Questions

- Should playback happen through embedded web views, provider SDKs, or deep
  links?
- What account connection model is required for each platform?
- What local data is safe and useful to persist in SQLite?
- What minimum playback controls belong in Phase 1?
