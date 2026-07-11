# US-005 Implement Provider Management Feature UI

## Status

implemented

## Lane

normal

## Product Contract

The desktop root route renders a static Provider Management interface based on
Open Design artifact `provider-management.html`. The app shell composes the
shared sidebar and the provider feature composes the filter panel, provider
cards, and add-provider slot from public `@sonar-room/ui` atoms. No provider
connection, playback, account, search, filter, toggle, reconnect, disconnect,
or persistence behavior is introduced.

## Relevant Product Docs

- `docs/product/overview.md`
- `docs/ARCHITECTURE.md`
- `docs/WORKSPACE_IMPORT_RULES.md`
- `docs/decisions/0010-atomic-shared-ui-composition.md`
- `docs/decisions/0011-feature-library-boundary.md`

## Acceptance Criteria

- Root route `/` renders `ProviderManagementRoute` and redirects unknown routes to it.
- `libs/features/provider-management` exports static Provider Management composition through `@sonar-room/features/provider-management`.
- `libs/features/app-shell` exports shared sidebar layout and uses Open Design `app-logo.svg` as a local asset.
- Shared UI exports shadcn CLI atoms for input, button, card, badge, and switch. Provider filter chip, status badge, and dashed add-provider composition remain modular provider-management UI.
- Provider screen must render Open Design hierarchy: sidebar, filter panel, three provider cards, then a dashed add-provider slot.
- Spotify and YouTube Music render connected/enabled; SoundCloud renders needs-reconnect/disabled; provider logos are local monograms. A shared shadcn atom cannot express provider-specific dynamic identity, and these static fixture monograms have no cross-feature contract.
- Controls render artifact states but have no state mutations, API calls, provider SDK calls, persistence, or route-navigation behavior.
- Layout changes from sidebar-plus-main to single-column at 980px and preserves existing dark theme tokens.
- App route code composes public feature exports only; no provider visual primitives live under `apps/desktop`.

## Design Notes

- Commands: none.
- Queries: none.
- API: none.
- Tables: none.
- Domain rules: fixture types are presentation-only and must not become provider contracts.
- UI surfaces: `AppShellLayout`, `ProviderManagementFeature`, filter panel, provider card, and add-provider slot.
- Tailwind tokens: `provider` breakpoint is `981px` so widths at or below `980px` remain single-column; sidebar and filter layout widths are shared semantic tokens.
- Open Design source: project `Sonar-Room`, file `provider-management.html`, local asset `app-logo.svg`.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-005 --unit 0 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | No test runner exists; fixture and UI component behavior is static. |
| Integration | Type check, build, lint, and boundary lint resolve provider feature, app shell, and shared UI exports. |
| E2E | Not required while controls are visual-only. |
| Platform | Tauri manual smoke remains pending. |
| Release | Not required until packaging story. |

## Harness Delta

- Intake records Open Design implementation as normal-lane work.
- Story documents atomic UI mapping from artifact regions to shared atoms and feature composition.

## Evidence

- `pnpm.cmd test`, `pnpm.cmd build`, `pnpm.cmd lint`, `pnpm.cmd lint:boundaries`, and feature lint targets passed on July 11, 2026.
- Browser screenshot comparison and Tauri manual smoke remain pending.