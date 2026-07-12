# 0016 Provider Webview Playback Policy

Date: 2026-07-12

## Status

Rejected

## Context

MVP accepts a provider media URL pasted by user. It does not fetch music
collections or account tier. Product needs play, pause, next, seek, volume,
accurate duration, and synchronized position.

User proposes one hidden webview per provider as playback host when no official
provider API exists.

## Decision

Keep provider-isolated hidden webview as a candidate architecture only. It may
be implemented after provider terms/policy verification confirms permitted use.

MVP creates one webview lazily for active provider URL. It allows one active
media session, never imports browser profiles/cookies, and destroys host at
session end. Browser state becomes playback authority; app UI renders normalized
adapter state.

## Alternatives Considered

1. Official provider API or SDK.
2. Visible embedded provider webview.
3. External browser/app handoff.
4. Private endpoint, cookie, or profile automation: rejected.

## Consequences

Positive:

- Avoids catalog sync in MVP.
- Bounds CPU and memory cost to one active browser engine.
- Defines one source of truth for duration, seek, and playback state.

Tradeoffs:

- Hidden/minimized webview may throttle or reject autoplay by OS or provider.
- Provider policy may block this option.
- Each supported provider needs lifecycle and state-protocol validation.

## Follow-Up

- Verify official provider policy before implementation.
- Benchmark hidden webview lifecycle on supported desktop OSes.
- Record accepted/rejected final architecture decision.

## Scope Boundary

This policy applies to YouTube Music only. Spotify, SoundCloud, and future
providers must select and validate their own playback architecture; they do not
reuse the YouTube Music hidden-webview host by default.

## Visibility Requirement

YouTube Music playback host must never be visible in product UI. Hidden and
off-screen implementations are interchangeable internal choices. Select one only
after provider-policy, playback-lifecycle, and resource validation; this
requirement does not authorize session scraping or private provider automation.

## Unauthenticated MVP Boundary

Initial MVP must not open an account connection or authorization flow. Public
URL playback only. Authentication-required content produces a clear error and
remains deferred to a later story.
