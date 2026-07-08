# Workspace Import Rules

Nx owns project boundaries for application and shared library imports.

## Thin Apps Rule

Apps stay as thin runtime shells. App projects may compose UI, route shell events,
parse edge input, and call public library APIs. Business logic such as auth,
provider management, playback orchestration, persistence policy, and account
connection state belongs in `libs/*`.

## Import Style

Use package-style imports from app code:

```ts
import { UiButton } from '@sonar-room/ui';
import '@sonar-room/ui/styles.css';
import type { JsonString } from '@sonar-room/types';
```

Future business libs should follow the same pattern:

```ts
import { listSupportedProviders } from '@sonar-room/provider-management';
import { getSessionState } from '@sonar-room/auth';
```

Avoid deep relative imports across project roots:

```ts
import { UiButton } from '../../libs/ui/src';
```

## Boundary Tags

| Tag | Meaning | May Depend On |
| --- | --- | --- |
| `type:app` | Runnable app surface | `scope:shared`, `type:ui`, `type:application` libs |
| `scope:desktop` | Desktop app surface | `scope:shared`, `type:ui`, `type:application` libs |
| `type:application` | App use cases and orchestration | `type:domain`, `scope:shared` libs |
| `type:domain` | Pure business rules and product types | Other `type:domain` or `scope:shared` libs |
| `type:infrastructure` | SQLite/provider/logging adapters | `type:domain`, `type:application`, `scope:shared` libs |
| `type:ui` | UI primitives/tokens | Other `type:ui` or `scope:shared` libs |
| `scope:shared` | Shared cross-cutting code | Other `scope:shared` libs |

## Business Library Placement

- Auth/session logic goes in `libs/auth` or another `type:application`/`type:domain` lib.
- Provider registry, connection lifecycle, provider capability rules, and playback
  orchestration go in `libs/provider-management` or another business lib.
- SQLite adapters and provider SDK adapters go in `type:infrastructure` libs.
- Vue components and design tokens stay in `libs/ui`.
- Shared explicit type aliases and app-wide structural types stay in `libs/types`.
- `apps/desktop` must not define durable business rules; it wires shell + UI + lib APIs.

## Shared Types Library

Use `@sonar-room/types` for app-wide type vocabulary that makes intent explicit
without adding runtime behavior. Examples include `JsonString`, ISO date strings,
entity IDs, `JsonValue`, `Result`, and nullable helper types.

Keep `libs/types` free of Vue, Tauri, provider SDK, or persistence dependencies.
Domain-specific types can move into their owning domain/application lib once a
story needs behavior around them.

## Enforcement

Run:

```powershell
pnpm lint:boundaries
```

The rule is configured in `eslint.config.mjs` with `@nx/enforce-module-boundaries`.
