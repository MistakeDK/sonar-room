# 0009 Thin Apps And Business Libraries

Date: 2026-07-07

## Status

Accepted

## Context

The Phase 1 desktop app uses Tauri and Vue, but future features such as auth,
provider management, playback orchestration, and local persistence rules can
quickly make `apps/desktop` too large. The workspace needs a clear boundary so
runnable apps remain thin and business behavior stays testable outside the app
shell.

## Decision

Keep `apps/*` as thin runtime composition shells. Put durable business logic in
`libs/*` and expose it through public package aliases.

Initial business placement rules:

- Auth/session logic belongs in `libs/auth` or another domain/application lib.
- Provider registry, capability rules, connection lifecycle, and playback
  orchestration belong in `libs/provider-management` or another business lib.
- SQLite adapters and provider SDK adapters belong in infrastructure libs.
- Vue components, Tailwind tokens, and shadcn-style primitives stay in `libs/ui`.
- `apps/desktop` wires Tauri shell events, Vue UI, and public library APIs only.

Nx/ESLint module-boundary rules should enforce allowed dependencies by project
tags as business libs are added.

## Alternatives Considered

1. Put auth and provider management directly inside `apps/desktop` for speed.
2. Split into a separate `apps/web` and share code later.
3. Create all possible domain/application/infrastructure libs immediately.

## Consequences

Positive:

- Desktop app stays small and easier to replace or supplement with future app
  surfaces.
- Business code can be tested without booting Tauri or Vue.
- Provider/auth behavior has a stable home before integration stories begin.
- Nx boundaries can catch accidental app-to-internal coupling.

Tradeoffs:

- More project-boundary decisions are needed before each business slice.
- Early stories must define public library entrypoints instead of writing logic
  directly in the app.
- Too many empty libs would add noise, so new libs should still be created only
  when a story needs them.

## Follow-Up

- Create `libs/auth` only when an auth/session story defines accepted behavior.
- Create `libs/provider-management` when the first provider-management story
  defines registry and capability contracts.
- Keep `docs/WORKSPACE_IMPORT_RULES.md` and `eslint.config.mjs` in sync with any
  new boundary tags.
