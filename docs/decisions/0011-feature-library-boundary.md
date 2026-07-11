# 0011 Feature Library Boundary

Date: 2026-07-11

## Status

Accepted

## Context

The desktop app already has a thin-app policy, but its first launcher screen,
presentation preferences store, theme service, and launcher configuration lived
under `apps/desktop`. Reusable feature composition needs a concrete home that
keeps the app shell small without moving shared visual atoms out of `libs/ui`
or creating empty speculative libraries.

## Decision

Use `libs/features/*` for non-empty, reusable feature screen composition and
feature-local presentation helpers. Global runtime adapters that require an
app-scoped dependency, such as the existing Pinia store registration, remain
as thin app bootstrap code until their dependency is promoted to workspace scope. Each feature library has `scope:shared` and
`type:feature` tags, a public `@sonar-room/features/*` entrypoint, and no
imports from `apps/*`.

Apps may import feature public APIs. Feature libraries may depend on shared UI,
other feature libraries, application/domain libraries, and shared libraries.
They must not own Tauri shell integration, app bootstrap, duplicated UI atoms,
or cross-feature business orchestration. `libs/ui` remains the source of shared
atoms, tokens, and shadcn-vue wrappers.

Create a feature library only when an accepted story moves or adds real feature
behavior. Do not create empty placeholders for hypothetical future features.

## Alternatives Considered

1. Keep feature screens and presentation state under each app.
2. Move every feature component into `libs/ui`.
3. Pre-create empty feature libraries for each projected product area.

## Consequences

Positive:

- App projects retain only runtime composition and platform edges.
- Feature code becomes reusable across desktop and future app surfaces.
- Feature-level presentation helpers have an explicit home without becoming
  business-domain state.
- Nx tags prevent feature libraries from importing apps.

Tradeoffs:

- Public feature APIs and dependency tags require maintenance.
- Small one-screen features need an explicit decision before extraction.
- Feature composition can accidentally duplicate shared UI unless it follows
  decision 0010.

## Follow-Up

- Extract future non-empty feature slices only through accepted stories.
- Add test infrastructure before feature behavior becomes interactive.
- Keep `docs/ARCHITECTURE.md`, `docs/WORKSPACE_IMPORT_RULES.md`, and
  `eslint.config.mjs` aligned when feature dependency rules change.