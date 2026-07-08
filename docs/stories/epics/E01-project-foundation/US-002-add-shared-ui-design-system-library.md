# US-002 Add Shared UI Design System Library

## Status

planned

## Lane

normal

## Product Contract

The project has a reusable shared UI library that provides shadcn-style Vue primitives and design tokens for app surfaces. The desktop app consumes this shared library instead of owning all UI primitives locally. Open Design remains the visual design-system source of truth; until the daemon/artifact is available, the library uses a compatible token layer that can be replaced or synced from Open Design without changing app call sites.

## Relevant Product Docs

- `docs/product/overview.md`
- `docs/ARCHITECTURE.md`
- `docs/decisions/0008-desktop-tech-stack.md`
- `docs/decisions/0009-thin-apps-and-business-libraries.md`

## Acceptance Criteria

- Shared UI library exists under `libs/ui` and is discoverable by Nx.
- Root TypeScript config exposes `@sonar-room/ui`, `@sonar-room/ui/*`, and `@sonar-room/ui/styles.css` aliases.
- Shared UI exports shadcn-style Vue primitives for button, card, and badge usage using Tailwind utility classes.
- Shared UI owns Tailwind CSS entrypoint and shadcn-compatible CSS variables for color, radius, border, ring, and shadow.
- Desktop app imports UI tokens/components from `@sonar-room/ui` and keeps product-specific layout in `apps/desktop` while Nx/ESLint boundaries prevent cross-project relative imports.
- Open Design design-system sync is blocked only by unavailable Open Design daemon/artifact, not by app structure.

## Design Notes

- Commands: `desktop:build` should validate cross-project import once dependencies are installed.
- Queries: none.
- API: none.
- Tables: none.
- Domain rules: UI library must not encode provider playback/auth behavior.
- UI surfaces: desktop launcher uses `UiBadge`, `UiButton`, and `UiCard` primitives.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-002 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | TypeScript check for shared UI source compiles. |
| Integration | Desktop build resolves `@sonar-room/ui` aliases and Vue components. |
| E2E | Not required until UI behavior becomes interactive. |
| Platform | Visual smoke through Tauri shell after dependencies install. |
| Release | Not required until packaging story. |

## Workspace Import Rules

- `docs/WORKSPACE_IMPORT_RULES.md` documents package-style imports, thin-app placement, and dependency tag constraints.
- `eslint.config.mjs` enforces Nx module boundaries for apps and libs.
- `nx.json` makes lint targets follow project dependency order with `dependsOn: ['^lint']`.
- Business logic such as auth and provider management belongs in libs, while `apps/desktop` stays a thin shell.

## Harness Delta

- Durable intake row records shared UI addition as normal scope because it changes app architecture boundaries.
- Story row tracks proof for design-system shared library adoption.

## Evidence

- Open Design MCP unavailable: daemon at `http://127.0.0.1:7456` was not reachable.
- Pending dependency install and full build verification.


