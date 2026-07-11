# US-004 Extract Shared Launcher Feature Library

## Status

implemented

## Lane

normal

## Product Contract

`apps/desktop` remains a thin desktop composition shell. It owns Vue/Tauri
bootstrap, router registration, root styles, and platform wiring only. The
shared app-shell feature owns global theme-resolution and persistence helpers,
and the shared launcher feature owns the launcher configuration and screen
composition. Both feature libraries consume shared atoms and tokens through
`@sonar-room/ui`.

## Relevant Product Docs

- `docs/product/overview.md`
- `docs/ARCHITECTURE.md`
- `docs/WORKSPACE_IMPORT_RULES.md`
- `docs/decisions/0009-thin-apps-and-business-libraries.md`
- `docs/decisions/0010-atomic-shared-ui-composition.md`
- `docs/decisions/0011-feature-library-boundary.md`

## Acceptance Criteria

- Non-empty `libs/features/app-shell` library owns global theme resolution and persistence helpers.
- App bootstrap retains the Pinia adapter and a route-controller bridge; both contain no feature screen markup or reusable UI primitives.
- Non-empty `libs/features/launcher` library owns launcher configuration and launcher screen composition.
- Feature libraries expose public package aliases under `@sonar-room/features/*`; app code does not import feature internals by relative path.
- `apps/desktop/src/main.ts` creates Vue/Pinia, initializes public app-shell theme helpers, and composes router APIs only.
- `apps/desktop/src/router` uses a thin route controller that renders the public launcher feature and does not own launcher UI implementation.
- `apps/desktop` has no feature-local launcher config, preferences store, theme service, or launcher view source after extraction.
- `libs/features/*` uses `type:feature` and `scope:shared` tags. Apps may depend on feature libraries; feature libraries may depend on shared UI, other feature libraries, application/domain libraries, and shared libraries, but never apps.
- Feature screen composition reuses public `@sonar-room/ui` exports; reusable visual primitives remain in `libs/ui`.
- Existing launcher route, theme selection, persistence, and system-theme behavior remain unchanged.

## Design Notes

- Commands: app bootstrap initializes theme helpers before mounting; the route controller resolves `LauncherFeature` through its public alias.
- Queries: no backend or persisted product-data queries.
- API: public `@sonar-room/features/app-shell` and `@sonar-room/features/launcher` exports only.
- Tables: none; browser-safe theme preference remains outside SQLite product-data storage.
- Domain rules: feature libraries own presentation composition/state, not provider, auth, playback, or persistence business rules.
- UI surfaces: launcher feature composes `UiBadge`, `UiButton`, and `UiCard` from `@sonar-room/ui`.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-004 --unit 0 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | No test runner exists; add focused feature tests when test infrastructure arrives. |
| Integration | Desktop type check, build, lint, and boundary lint resolve both feature aliases and app-to-feature dependencies. |
| E2E | Not required until launcher actions become interactive. |
| Platform | Tauri manual smoke remains pending. |
| Release | Not required until packaging story. |

## Harness Delta

- Durable intake records feature-library extraction as normal architecture work.
- Decision `0011-feature-library-boundary` defines non-empty feature-library ownership and dependency direction.
- Story sets a repeatable extraction pattern for later feature libraries without authorizing empty speculative libraries.

## Evidence

- Desktop TypeScript and Vue TypeScript checks passed.
- `feature-app-shell:lint`, `feature-launcher:lint`, desktop build, direct app/feature ESLint, and Nx project discovery passed with `NX_DAEMON=false`.
- App keeps a thin Pinia adapter and route bridge because `pinia` remains app-scoped; shared libraries own theme helpers and launcher UI composition.
- Manual Tauri smoke and a dedicated unit-test runner remain pending.