# Architecture

The Phase 1 desktop stack is Tauri for the desktop wrapper, Vue.js for the UI,
SQLite for local-only app data, and Nx monorepo for build orchestration,
caching, and source organization.

No application code exists yet. This document defines generic architecture
questions and boundary rules that future implementation should adapt around the
accepted desktop stack and future provider-integration decisions.

## Discovery Before Shape

Before proposing implementation shape, identify:

- Product surfaces: browser, mobile, desktop, CLI, API, worker, or service.
- Runtime stack: language, framework, database, queues, providers, and hosting.
- Core domains: the product concepts that deserve stable names and contracts.
- Boundary inputs: user input, API requests, webhooks, jobs, files, credentials,
  provider payloads, and environment configuration.
- Validation ladder: the smallest checks that can prove the selected stack.

Record stack choices in `docs/decisions/` when they meaningfully constrain
future work.

## Default Layering

```text
domain
  <- application
      <- infrastructure
          <- interface
              <- app surfaces
```

## Candidate Structure

Use Nx workspace boundaries when implementation begins. Keep runnable apps and
shared libraries separated so build/cache rules can stay explicit.

`	ext
apps/
  desktop/
    src/
    src-tauri/

libs/
  domain/
  application/
  infrastructure/
  ui/

legacy-template/
  app/
  domain/
    entities/
    value-objects/
    repositories/
    services/

  application/
    commands/
    queries/
    handlers/

  infrastructure/
    database/
    logging/
    notifications/

  interface/
    controllers/
    dto/
    presenters/
    routes/
    middlewares/

surfaces/
  browser/
  mobile/
  desktop/
  cli/
```

This is a thinking template, not a scaffold. Create real folders only when a
story enters implementation and the selected stack needs them.

## Thin Apps Rule

Apps are runtime composition shells, not business-logic owners.

```text
apps/*
  -> compose routes, windows, providers, and UI entrypoints
  -> initialize configuration-only state for router, UI providers, and preferences
  -> parse platform/runtime input at the edge
  -> call libs through public package aliases
  -> keep no auth, provider-management, catalog, playback, or persistence rules

libs/*
  -> own product/business behavior
  -> expose narrow public entrypoints
  -> stay testable without booting Tauri/Vue
```

Business-heavy code such as authentication flows, session rules, provider
management, provider capability models, playback orchestration, local
persistence policy, and account connection state belongs in libraries. The
Tauri/Vue app should only adapt desktop shell events, render UI, initialize
configuration-only state such as router and preferences, and call these library
APIs. App configuration state must not contain feature state or product rules.

Recommended library lanes:

| Library | Owns | Must not own |
| --- | --- | --- |
| `libs/auth` | Auth/session use cases, auth state contracts, token-safe DTOs | Tauri windows, Vue components, provider SDK concrete clients |
| `libs/provider-management` | Supported provider registry, capability rules, connection lifecycle use cases | UI layout, native shell APIs, raw provider SDK payloads |
| `libs/application` | Cross-domain commands/queries and orchestration | UI state, database concrete clients, shell APIs |
| `libs/domain` | Pure product types and rules | Framework, process/env, database, provider, UI |
| `libs/infrastructure` | SQLite adapters, provider adapters, logging adapters | UI components or app shell state |
| `libs/ui` | Shared UI primitives, design tokens, presentation-only behavior | Auth rules, provider orchestration, persistence policy |
| `libs/features/*` | Reusable feature composition, feature-local presentation state, public screen modules | Tauri shell wiring, app bootstrap, duplicated shared UI atoms, cross-feature business orchestration |

Apps may import public library entrypoints, but libraries must not import apps.
Cross-library imports should follow the dependency rule below.

## Shared UI Composition Rule

Treat `libs/ui` as the sole owner of reusable atomic visual building blocks and
design system tokens. Before creating or changing a Vue component, use this order:

1. Reuse a public atom, primitive, token, or presentation helper from
   `@sonar-room/ui`.
2. Compose the needed screen-specific layout from those shared exports in a feature
   page module.
3. When no export fits, add or extend a reusable atomic component or token in
   `libs/ui` first, then consume its public `@sonar-room/ui` export.
4. Keep a component local only when it belongs to one feature page composition
   and has no reusable cross-feature contract. Local components still compose
   shared UI atoms wherever possible.

`libs/ui` owns the project's shadcn-vue integration. shadcn-vue registry
artifacts, adapters, and primitive dependencies are added or wrapped only in
`libs/ui`; apps and feature libraries import the resulting public
`@sonar-room/ui` API instead of importing shadcn-vue or copying its generated
components directly. This keeps component call sites stable when generated
shadcn-vue code, tokens, or dependencies change.

## Atomic -> Modular -> Page UI Rule

Organize product UI in this dependency direction:

```text
libs/ui atomic components
  -> libs/features/<feature> modular components
  -> libs/features/<feature> page modules
  -> apps/* route wiring and configuration initialization only
```

- **Atomic:** `libs/ui` owns atomic components, tokens, and shadcn-vue
  integration. Add registry components through the shadcn CLI into `libs/ui`;
  consume them through public `@sonar-room/ui` exports. Prefer the smallest
  necessary change to generated shadcn code. When shadcn provides a primitive,
  install and use it; never hand-create replacements such as buttons, cards,
  toggles, switches, or equivalent existing primitives. A custom atomic
  component is allowed only when shadcn cannot express the need and the story
  records an exception.
- **Modular:** `libs/features/<feature>` owns components that compose multiple
  atomic exports. It may own feature-local logic and state, but must not copy
  atomic components or absorb cross-feature business orchestration.
- **Page:** `libs/features/<feature>` owns page modules that compose modular
  components for one product surface. `apps/*` registers routes, initializes
  configuration-only state such as preferences, and passes platform/runtime edges
  to public feature exports; it must not own page UI, feature state, or feature
  logic.

## Open Design Translation Rule

Open Design artifacts are visual intent, not a second component architecture.
Before porting an Open Design screen, inspect `@sonar-room/ui` and map artifact
regions to existing shared atomic exports and tokens. Preserve page composition
in feature page modules, but promote any new reusable atomic visual primitive,
interaction pattern, token, or responsive behavior into `libs/ui` before use.

Do not copy Open Design HTML, JSX, CSS, or generated components into an app or
feature as new atomic primitives when an equivalent shared export exists or can
be added.
Record any deliberate local-component exception in the story design notes with
its single-surface reason. Open Design implementation tasks must read
`docs/WORKSPACE_IMPORT_RULES.md` and follow the project `open-design-implement`
skill in addition to artifact discovery.

## Dependency Rule

Inner layers must not depend on outer layers.

| Layer | May depend on | Must not depend on |
| --- | --- | --- |
| domain | nothing project-external except tiny pure utilities | framework, database, UI, provider, process/env |
| application | domain | framework, UI, provider, database concrete clients |
| infrastructure | domain, application | interface controllers or UI |
| interface | all backend layers | UI state or platform shell assumptions |
| app surfaces | API contracts and app-facing clients | domain internals directly |

## Parse-First Boundary Rule

Unknown data must be parsed at boundaries before it enters inner code.

Boundaries include:

- HTTP request bodies, params, and query strings.
- Session payloads and identity claims.
- Environment variables.
- Database rows returned from external clients.
- Platform shell payloads.
- Deep links, tokens, and signed URLs.
- Provider webhooks, events, and async payloads.

Target flow:

```text
unknown input
  -> parser
  -> typed DTO or command
  -> application use case
  -> domain object/value object
```

Inner layers should work with meaningful product types such as `UserId`,
`AccountId`, `WorkspaceId`, `Role`, `DateRange`, or domain-specific IDs,
rather than repeatedly validating raw strings.

## Command/Query Boundary

If the product has both reads and writes, keep command/query separation clear at
the code level even when the storage layer is simple:

- Commands mutate state and own audit side effects.
- Queries read state and format for consumers.
- Shared domain rules live in domain/application, not controllers.

## Observability Contract

The future server should emit one canonical JSON log line per request with:

- timestamp
- level
- request_id
- user_id when known
- action
- duration_ms
- status_code
- message

Audit logs are product records. Application logs are operational records. Do not
use one as a substitute for the other.


