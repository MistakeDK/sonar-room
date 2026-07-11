# 0015 Atomic Modular Page UI Structure

Date: 2026-07-11

## Status

Accepted

## Context

Existing shared UI guidance required reuse through `libs/ui`, but did not set a
clear location for components that combine atomic UI or for page modules. That
ambiguity risks duplicate atoms in feature libraries and page UI/state leaking
into thin apps.

## Decision

Organize UI in one dependency direction:

```text
atomic (`libs/ui`) -> modular (`libs/features/<feature>`) -> page (`libs/features/<feature>`) -> route (`apps/*`)
```

- Atomic components are shadcn registry components installed through the shadcn
  CLI into `libs/ui`, plus project tokens and allowed custom atom exceptions.
  When shadcn provides a primitive, install and use that registry component;
  never hand-create a replacement for it. This includes buttons, cards,
  toggles, switches, and equivalent existing shadcn primitives.
  Generated shadcn code receives only minimal changes required for project
  tokens or a stable public API.
- Modular components combine multiple atomic exports and live in their matching
  `libs/features/<feature>` library. They may own feature-local logic and
  state.
- Feature page modules also live in `libs/features/<feature>` and compose
  modular components.
- Apps remain thin: they register routes, initialize configuration-only state
  such as preferences, and adapt platform/runtime edges. They must not own page
  UI, feature state, or feature logic.
- A custom atomic component is allowed only when shadcn cannot express the
  requirement; record that exception in story design notes.

## Alternatives Considered

1. Keep page components inside apps. Rejected because page UI and state would
   weaken the thin-app boundary.
2. Keep modular components in `libs/ui`. Rejected because they are feature
   specific and would blur atomic shared UI ownership.
3. Allow broad edits to generated shadcn components. Rejected because upgrades
   and public API stability become harder to maintain.

## Consequences

Positive:

- UI ownership and dependencies are predictable.
- Apps retain route-only composition.
- shadcn remains the default atomic source without blocking documented gaps.

Tradeoffs:

- Feature libraries contain both modular components and page modules.
- Developers must promote only reusable atom-level patterns to `libs/ui`.

## Follow-Up

- Keep `docs/ARCHITECTURE.md` and `docs/WORKSPACE_IMPORT_RULES.md` aligned.
- Add or update lint boundaries if future tooling can enforce this hierarchy.
