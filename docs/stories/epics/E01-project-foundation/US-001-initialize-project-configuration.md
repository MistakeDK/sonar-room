# US-001 Initialize Project Configuration

## Status

planned

## Lane

normal

## Product Contract

The project has a runnable Phase 1 desktop app foundation that follows the accepted architecture: Nx monorepo orchestration, Vue UI app, Tauri desktop shell, and SQLite reserved as the local-only data store boundary. The scaffold must expose only a launcher shell and configuration surface; provider playback, provider authentication, and SQLite schema are out of scope until separate stories define them.

## Relevant Product Docs

- `docs/product/overview.md`
- `docs/ARCHITECTURE.md`
- `docs/decisions/0008-desktop-tech-stack.md`

## Acceptance Criteria

- Repository has root workspace configuration for package scripts, Nx target defaults, TypeScript settings, and pnpm workspace membership.
- Desktop app exists under `apps/desktop` with Vue entrypoint, Vite config, and Nx targets for dev, build, Tauri, lint, and test.
- Tauri shell exists under `apps/desktop/src-tauri` with app metadata, window defaults, dev URL, and frontend dist configuration.
- App configuration declares `Sonar Room`, supported Phase 1 platforms, and SQLite as local-only data store intent without creating domain schema.
- Initial UI renders a desktop launcher landing surface for Spotify, YouTube, and SoundCloud as pending integration stories.
- No provider SDK, account flow, playback control, remote API contract, or data migration is introduced by this story.

## Design Notes

- Commands: Nx `desktop:dev`, `desktop:build`, `desktop:tauri`, `desktop:lint`, and `desktop:test` targets wrap stack commands.
- Queries: none.
- API: none.
- Tables: none; SQLite is declared as local data store intent only.
- Domain rules: supported platform IDs are limited to `spotify`, `youtube`, and `soundcloud` until integration stories expand behavior.
- UI surfaces: `apps/desktop/src/App.vue` provides the launcher shell and platform status cards.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-001 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | TypeScript check for app config and Vue source compiles without type errors. |
| Integration | Nx can resolve `desktop` targets and run `desktop:build` once dependencies are installed. |
| E2E | Not required for scaffold; add after launcher behavior becomes interactive. |
| Platform | Tauri dev shell launches against Vite dev URL on the developer machine. |
| Release | Not required until packaging story defines icons, signing, and installer targets. |

## Harness Delta

- Durable intake row records the need for a normal story packet before treating scaffold work as complete.
- Durable story row should track implementation and proof status for the initial project configuration.

## Evidence

- Pending dependency install and full build verification.
