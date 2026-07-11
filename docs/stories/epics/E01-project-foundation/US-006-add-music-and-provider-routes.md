# US-006 Add Music and Provider Routes

## Outcome

Desktop navigation exposes Provider and Music routes inside the shared app shell.
The active navigation item derives from the current Vue Router route.

## Acceptance Criteria

- `/providers` renders provider management.
- `/music` renders the Music feature page.
- `/` and unknown routes redirect to `/providers`.
- App shell navigation comes from one local config and applies `bg-primary` only
  to the item matching the active route.
- App route files only render public feature exports.

## Scope

- Static Music placeholder only.
- No playback, provider API, persistence, or routing side effects beyond navigation.

## Validation

- Type check, Vite build, lint, and boundary lint resolve desktop, app shell,
  provider management, and music feature imports.