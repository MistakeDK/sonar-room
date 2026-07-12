# 0018 Invisible YouTube Music Playback Policy Gate

Date: 2026-07-12

## Status

Rejected

## Context

US-007 MVP requires public YouTube Music URL playback through an invisible or
off-screen webview. The user must not see the provider player. No account-login
flow is part of MVP.

## Evidence

- YouTube API Developer Policies prohibit API-client features that play content
  from a background player not displayed in the page, tab, or screen viewed by
  user.
- Policy guidance explicitly says API clients must not allow background play
  when client window is closed or minimized.
- Official IFrame Player documentation requires a player viewport of at least
  200 by 200 pixels and documents YouTube video/playlist embeds, not a YouTube
  Music public-URL playback contract.
- Official policy also requires applicable YouTube branding and prohibits
  blocking or modifying player functionality.

## Decision

Do not implement invisible, hidden, or off-screen YouTube Music playback host
for this MVP. Do not automate the YouTube Music web app, access it through
private endpoints, or use browser session/profile mechanisms as a workaround.

US-007 implementation is blocked until one of these conditions is selected:

1. YouTube grants written permission for this exact playback model.
2. Product changes to a compliant visible YouTube embed and verified supported
   URL contract.
3. Product changes to external YouTube Music/browser handoff.
4. Product uses a different licensed playback source.

## Consequences

Positive:

- Avoids a policy-violating background-player architecture.
- Avoids building unstable browser automation around an unsupported contract.

Tradeoffs:

- Current invisible in-app YouTube Music MVP cannot proceed to technical spike
  or implementation.
- Existing Provider Management playback bar stays presentation-only until a
  compliant source is selected.

## Follow-Up

- Ask human to select one unblock path.
- If written permission is obtained, record its scope and revisit policy gate.
- If visible embed or external handoff is selected, shape a replacement story
  and validation plan.
