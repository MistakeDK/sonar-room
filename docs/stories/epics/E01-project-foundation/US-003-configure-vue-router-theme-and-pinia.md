# US-003 Configure Vue Router, Theme, and Pinia

## Status

implemented

## Lane

normal

## Product Contract

The desktop Vue application has a small, extensible application foundation: Vue Router owns client-side navigation, a persisted dark/light/system theme preference controls shared UI tokens, and Pinia owns app-wide presentation state. The launcher remains the only initial route. This story establishes configuration and boundaries only; it does not add provider accounts, playback behavior, or persisted product data.

## Relevant Product Docs

- `docs/product/overview.md`
- `docs/ARCHITECTURE.md`
- `docs/decisions/0008-desktop-tech-stack.md`
- `docs/decisions/0009-thin-apps-and-business-libraries.md`

## Acceptance Criteria

- `apps/desktop` registers Vue Router and renders route content through `RouterView`.
- Router declares a named launcher route at `/` and a named fallback route that redirects unknown paths to `/`.
- Shared UI navigation uses router links or router navigation APIs; it does not mutate `window.location` for in-app routes.
- App registers Pinia once at bootstrap and exposes a presentation-only app preferences store through a narrow public module.
- Preferences store owns `themePreference` with `light`, `dark`, and `system` values; default is `system`.
- Theme resolution applies one effective light or dark mode to document root before first route content renders, preventing visible theme flash during startup.
- Persisted preference survives desktop app restart through a browser-safe storage adapter; invalid or unavailable storage falls back to `system` without preventing app startup.
- System preference reacts to operating-system color-scheme changes while selected preference remains `system`.
- Shared UI tokens support both resolved modes. Provider, authentication, playback, SQLite schema, and business-domain state remain out of scope.

## Design Notes

- Commands: none.
- Queries: route state and presentation preferences only; no product data queries.
- API: none.
- Tables: none. Browser-safe preference storage is not a SQLite schema or product-data persistence contract.
- Domain rules: Pinia stores in this story contain presentation state only. Auth, provider-management, playback, and persistence business rules remain in libraries defined by later stories.
- UI surfaces: initial launcher route; shared theme control can live in launcher header or settings affordance when design permits.
- Router shape: lazy-load future route modules where practical, keep router definitions under app composition layer, and use explicit route names for navigation.
- Theme shape: store selected preference separately from resolved mode. Resolved mode derives from `matchMedia('(prefers-color-scheme: dark)')` when preference is `system`.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-003 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | Test theme preference validation, effective-mode resolution, storage fallback, and system-color-scheme change handling. |
| Integration | Vue bootstrap registers router and Pinia; `/` renders launcher and unknown route redirects to launcher. |
| E2E | Not required until launcher includes user-facing navigation or settings interactions. |
| Platform | Tauri dev shell starts, then retained theme preference applies after restart. |
| Release | Not required until packaging story defines signed desktop artifacts. |

## Harness Delta

- Durable intake records Vue application-foundation configuration as normal-lane work.
- Durable story `US-003` tracks implementation and proof separately from project scaffolding and shared UI-library work.
- Assumption recorded: user term `piana` means Pinia, Vue state-management library.

## Evidence

- pnpm.cmd test passed: desktop TypeScript check.
- pnpm.cmd build passed: Vue type check and Vite production build.
- pnpm.cmd lint and pnpm.cmd lint:boundaries passed.
- Unit test runner is not configured in this repository; no dedicated unit proof added.
- Tauri restart and operating-system theme-change behavior need manual desktop-shell proof.
