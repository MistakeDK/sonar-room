# 0012 Tailwind Design Token Usage

Date: 2026-07-11

## Status

Accepted

## Context

Shared UI rules require reusable components and tokens, but they do not define
how component authors choose Tailwind values. Arbitrary colors, spacing, sizes,
and other one-off values can create visual drift and duplicate values already
provided by the configured theme.

## Decision

UI code must prefer configured Tailwind theme values and shared `libs/ui`
tokens for colors, spacing, sizing, radii, typography, and breakpoints. Avoid
arbitrary utilities and hard-coded CSS when an existing semantic token or
utility expresses the requirement.

When no exact existing token matches spacing, typography, sizing, layout,
radii, or breakpoints, UI code must use the closest compatible Tailwind or
configured-theme token. Minor visual or responsive variance is acceptable; do
not add a token or arbitrary value only to achieve an exact measurement.

An arbitrary or hard-coded value is allowed only for a product or platform
constraint that the current theme cannot express. Recurring exceptions must be
promoted into the shared Tailwind theme or `libs/ui` tokens, with the reason
recorded in story design notes. This promotion rule remains strict for colors.

## Alternatives Considered

1. Allow arbitrary Tailwind values without review.
2. Ban all arbitrary values, including values required by platform contracts.
3. Keep the rule limited to shared components and allow app-local values.

## Consequences

Positive:

- UI surfaces use consistent visual scales and semantic colors.
- Theme changes require fewer scattered edits.
- Repeated design decisions become discoverable shared tokens.

Tradeoffs:

- Authors must inspect the configured theme before choosing a value.
- Rare platform-specific values need an explicit exception note.
- Automated linting may catch syntax, but review remains necessary for token choice.

## Follow-Up

- Keep Tailwind theme values and `libs/ui` tokens aligned.
- Add automated arbitrary-value checks when lint infrastructure supports the
  project�s Tailwind setup.
