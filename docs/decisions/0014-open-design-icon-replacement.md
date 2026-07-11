# 0014 Open Design Icon Replacement

Date: 2026-07-11

## Status

Accepted

## Context

Open Design artifacts can include icon assets or inline SVGs. Copying those
assets creates duplicate icon systems and makes sizing, stroke, and theme
behavior harder to maintain.

## Decision

Icons pulled from Open Design must map to the closest semantically equivalent
icon from `lucide-icons` or the workspace Lucide integration. Preserve visual
properties through shared UI and Tailwind tokens. Do not copy Open Design icon
SVGs when a Lucide equivalent exists.

If no suitable Lucide icon exists, a custom asset requires a story design-note
exception listing searched icon names and explaining why Lucide cannot express
the requirement.

## Consequences

Positive:

- UI uses one consistent icon family.
- Icons inherit shared sizing, stroke, color, and theme rules.
- Open Design imports avoid duplicated SVG assets.

Tradeoffs:

- Some source icons need visual approximation.
- Rare unmatched icons require documented exceptions.
