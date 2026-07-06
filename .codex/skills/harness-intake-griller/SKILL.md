---
name: harness-intake-griller
description: Use when a repository Harness request needs feature intake, phase-goal shaping, product docs, story packet preparation, risk-lane classification, or trace-ready Harness documentation before Symphony execution.
---

# Harness Intake Griller

Use this skill when a user brings a raw feature idea, product direction,
specification, docs request, or ambiguous implementation request that should be
shaped before Symphony execution.

The goal is to challenge the request enough to produce a safe, crisp,
Harness-ready story packet or product-doc delta.

## When To Use

Use this skill for:

- New product specs.
- Phase goals.
- Feature ideas.
- Ambiguous implementation requests.
- Requests to write or update docs before implementation.
- Any task where product intent, risk lane, or validation shape is unclear.

Do not use it for:

- Tiny mechanical edits with no product meaning.
- Running already-defined validation commands.
- Applying a story packet that already has clear acceptance criteria.

## Required Context

Before shaping, read the project Harness materials listed by `AGENTS.md`.
At minimum, know:

- Source hierarchy from `docs/HARNESS.md`.
- Intake lanes and hard gates from `docs/FEATURE_INTAKE.md`.
- Architecture boundary rules from `docs/ARCHITECTURE.md`.
- Context discipline from `docs/CONTEXT_RULES.md`.
- Available tool policy from `docs/TOOL_REGISTRY.md`.

If `harness.db` does not exist, initialize it with the Harness CLI before
recording durable rows.

## Grilling Flow

1. Restate the user request as a product outcome.
2. Identify the intended user and success moment.
3. Ask what changes in user behavior if the feature succeeds.
4. Find platform, provider, data, auth, and validation risks.
5. Classify lane: tiny, normal, or high-risk.
6. Decide whether this should become:
   - product doc update,
   - story packet,
   - decision record,
   - backlog item,
   - or implementation task.
7. Record intake with `scripts/bin/harness-cli intake`.
8. Update only the smallest durable docs needed.
9. Record trace with enough detail to satisfy Harness review.

## Question Style

Be direct and skeptical, but useful.

Prefer questions like:

- Who is the first user for this?
- What action should be possible at the end of Phase 1?
- Which platform is source of truth for playback state?
- What is explicitly out of scope?
- What proof would convince you this works?

Avoid asking questions when the user has already given enough information for a
safe docs-only update. In that case, proceed and record open questions in the
product doc.

## Output Expectations

For a docs/intake task, produce:

- An intake row.
- A product doc delta or story/backlog delta.
- A trace row.
- A final summary with:
  - lane,
  - files changed,
  - open questions,
  - validation attempted or skipped.

For an implementation-ready task, produce or update a story packet before code
unless the lane is tiny.

## Trace Guidance

Trace should include concrete fields when possible:

- `--summary`
- `--outcome`
- `--agent`
- `--files-read`
- `--files-changed`
- `--actions-taken`
- `--errors` or `--harness-friction` when relevant
- `--intake` when linked to an intake row

Use `completed`, `partial`, `blocked`, or `failed` for `--outcome`.

