# Test Matrix

This file maps product behavior to proof.

## Status Values

| Status | Meaning |
| --- | --- |
| planned | Accepted as intended behavior, not implemented |
| in_progress | Actively being built |
| implemented | Implemented and proof exists |
| changed | Contract changed after earlier implementation |
| retired | No longer part of the product contract |

## Matrix

| Story | Contract | Unit | Integration | E2E | Platform | Status | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| US-003 | Vue Router launcher and fallback routes, Pinia presentation preferences, persisted dark/light/system shared UI theme | no | yes | no | no | implemented | `pnpm.cmd test`, `pnpm.cmd build`, `pnpm.cmd lint`, and `pnpm.cmd lint:boundaries` passed on July 11, 2026; manual Tauri proof pending. |
| US-004 | Shared launcher feature and theme-helper libraries keep desktop app shell thin | no | yes | no | no | implemented | Desktop type checks, Vite build, feature lint targets, boundary lint, and Nx project discovery passed on July 11, 2026; manual Tauri proof pending. |
| US-005 | Static Provider Management UI composed from shared UI atoms and Open Design visual intent | no | yes | no | no | implemented | `pnpm.cmd test`, `pnpm.cmd build`, `pnpm.cmd lint`, `pnpm.cmd lint:boundaries`, and feature lint targets passed on July 11, 2026; browser visual comparison and Tauri smoke pending. |

## Evidence Rules

- Unit proof covers pure domain and application rules.
- Integration proof covers backend enforcement, data integrity, provider
  behavior, jobs, or service contracts.
- E2E proof covers user-visible browser flows.
- Platform proof covers only shell, deployment, mobile, desktop, or runtime
  behavior that cannot be proven in lower layers.
- A story can be implemented without every proof column if the story packet
  explains why.