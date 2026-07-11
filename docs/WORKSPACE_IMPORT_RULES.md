# Workspace Import Rules

Nx owns project boundaries for application and shared library imports.

## Thin Apps Rule

Apps stay as thin runtime shells. App projects may compose UI, route shell events,
parse edge input, call public library APIs, and own configuration-only initialization
state such as router setup and preferences. That state may not contain feature state
or product rules. Business logic such as auth, provider management, playback
orchestration, persistence policy, and account connection state belongs in `libs/*`.

## Import Style

Use package-style imports from app code:

```ts
import { UiButton } from '@sonar-room/ui';
import '@sonar-room/ui/styles.css';
import type { JsonString } from '@sonar-room/types';
import { LauncherFeature } from '@sonar-room/features/launcher';
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
| `type:app` | Runnable app surface | `scope:shared`, `type:ui`, `type:feature`, `type:application` libs |
| `scope:desktop` | Desktop app surface | `scope:shared`, `type:ui`, `type:feature`, `type:application` libs |
| `type:feature` | Reusable feature screen composition and presentation helpers | `scope:shared`, `type:ui`, `type:feature`, `type:application`, `type:domain` libs |
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
- Reusable UI atoms, tokens, and shadcn-vue wrappers stay in `libs/ui`.
- Modular components, feature page modules, and feature-local logic/state stay in `libs/features/*`.
- Shared explicit type aliases and app-wide structural types stay in `libs/types`.
- `apps/desktop` may initialize runtime configuration such as routes and preferences,
  but must not define durable business rules, feature state, or feature logic.

## Atomic -> Modular -> Page UI Rule

Organize UI only in this order:

```text
atomic (`libs/ui`) -> modular (`libs/features/<feature>`) -> page (`libs/features/<feature>`) -> route (`apps/*`)
```

- **Atomic:** Install shadcn registry components through the shadcn CLI into
  `libs/ui`. `libs/ui` owns atomic components, tokens, and shadcn adapters;
  consumers import only public `@sonar-room/ui` exports. Modify generated
  shadcn code only when required to map project tokens or preserve its public
  API. When shadcn provides a primitive, install it through the CLI and use it;
  do not hand-create replacements such as buttons, cards, toggles, switches,
  or equivalent existing primitives. Custom atomic components require a story
  design-note exception proving shadcn cannot express the need.
- **Modular:** Keep components that combine multiple atomic components in the
  corresponding `libs/features/<feature>` library. Modular components may own
  feature-local logic and state. Do not copy shadcn/atomic implementations into
  a feature.
- **Page:** Keep feature page modules in `libs/features/<feature>`. Pages
  compose modular components. `apps/*` declares routes, initializes
  configuration-only state such as preferences, and passes platform/runtime edges
  to public feature exports, preserving thin apps.

## Open Design Import Rule

When a task needs to pull design context or apply an Open Design artifact:

- Use the Open Design MCP connection as the source of design context and artifact files.
- Check Open Design MCP availability before starting design-dependent work.
- If Open Design MCP is unavailable or disconnected, cancel the task and report the missing connection; do not substitute guessed design values or proceed from incomplete artifact context.

When pulling a screen or artifact from Open Design:

- Treat artifact files as design intent, not a local component library.
- Inspect `@sonar-room/ui` before writing UI code and map each artifact region
  to existing shared exports where possible.
- Reuse shared tokens and primitives first; promote missing reusable atomic
  tokens, visual patterns, interaction states, or responsive behavior into
  `libs/ui`.
- Keep page composition and product-specific copy/data binding in feature page
  modules.
- Record a story design-note exception for every new local visual primitive,
  including why no shared component applies.

## Open Design Icon Rule

When an Open Design artifact includes an icon:

- Replace it with the semantically corresponding icon from lucide-icons or the workspace Lucide integration before adding image, SVG, or custom icon assets.
- Match icon meaning first, then preserve size, stroke weight, color, and interaction state through shared UI/Tailwind tokens.
- Do not copy icon SVGs from Open Design when a Lucide equivalent exists.
- If no suitable Lucide icon exists, record an exception in story design notes with searched icon names and reason a custom asset is required.


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

## Tailwind Token Rule

Use values already defined by the Tailwind theme before adding arbitrary
values. For colors, spacing, sizing, radii, typography, and responsive
breakpoints, prefer the matching Tailwind utility or shared token from
`libs/ui` rather than hard-coded values such as `[#...]`, `[...px]`, or
one-off CSS declarations. For spacing, typography, sizing, layout, radii, and
breakpoints, choose the closest existing Tailwind or configured-theme token
when no exact compatible token exists; minor visual or responsive variance is
acceptable and must not create a new token solely to match an exact value.

Use an arbitrary value only when the product or platform contract requires a
value that the theme cannot express. For spacing, typography, sizing, layout,
radii, and breakpoints, use a close existing token instead of adding a
near-duplicate token or arbitrary value. For colors, recurring exceptions that
represent a design decision must be added to the shared Tailwind theme or
`libs/ui` tokens first and documented in the story design notes.

Examples:

- Prefer `p-4`, `gap-6`, and `size-10` over `p-[17px]`, `gap-[23px]`, and
  `w-[40px] h-[40px]`.
- Prefer semantic theme colors such as `bg-primary`, `text-muted-foreground`,
  and `border-border` over literal hex, RGB, or named colors.
- Prefer `rounded-md`, `text-sm`, and responsive utilities using configured
  breakpoints over custom radius, font-size, or media-query values.

Review UI changes for arbitrary Tailwind values and hard-coded CSS values.
Exceptions must state why the configured theme and shared UI tokens cannot
represent the requirement.
