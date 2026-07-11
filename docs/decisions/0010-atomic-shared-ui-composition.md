# 0010 Atomic Shared UI Composition

Date: 2026-07-11

## Status

Accepted

## Context

The workspace already separates reusable UI primitives into `libs/ui`, but its
policy only described shadcn-style components. It did not require component
authors to prefer shared atoms, define where shadcn-vue generated artifacts
belong, or explain how Open Design artifacts map into the local UI system.
That gap allows duplicate app-local primitives and copied design output to
fragment the desktop UI.

## Decision

`libs/ui` is the owner of reusable UI atoms, molecules, organisms, presentation
helpers, design tokens, and the shadcn-vue integration.

Before creating or changing a visual component, authors must reuse a public
`@sonar-room/ui` export where it fits. If no export fits and the visual or
interaction contract can recur, add or extend it in `libs/ui` and expose it
through the public package API. App and feature code retain page-specific
composition, copy, route wiring, and product-data binding only.

shadcn-vue registry artifacts and their adapters are installed, generated, or
wrapped only under `libs/ui`. Apps and feature libraries must not directly
import shadcn-vue or copy generated shadcn-vue primitives.

Open Design remains visual source of truth. Its artifacts must map to existing
shared UI exports before porting. New reusable tokens, primitives, responsive
rules, and interaction patterns discovered during a port are promoted to
`libs/ui`. A local component exception needs a story design-note explanation
that it is one screen's product-specific composition.

## Alternatives Considered

1. Let each app or Open Design import own its generated components.
2. Require every component, including page composition, to live in `libs/ui`.
3. Keep the existing shadcn-style guidance without a reuse requirement.

## Consequences

Positive:

- Shared UI stays visually and behaviorally consistent across app surfaces.
- shadcn-vue upgrades or generated-code changes stay behind `@sonar-room/ui`.
- Open Design imports improve shared tokens and primitives instead of creating
  parallel component systems.
- Story review has a clear, documented exception path for truly local layout.

Tradeoffs:

- Small screen changes may require checking or extending `libs/ui` first.
- Shared components need API discipline to avoid premature generalization.
- Component reuse remains a review and story-design gate; Nx dependency rules
  cannot infer visual duplication automatically.

## Follow-Up

- Update `libs/ui` to use shadcn-vue registry artifacts when a component story
  needs primitives beyond current wrappers.
- Require future Open Design implementation stories to include component-mapping
  notes and any local-component exceptions.
- Keep `docs/ARCHITECTURE.md` and `docs/WORKSPACE_IMPORT_RULES.md` aligned with
  UI package exports and Nx boundary rules.