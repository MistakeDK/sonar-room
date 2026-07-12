# Exec Plan

## Goal

Build and validate a visible, official YouTube IFrame Player path inside
Provider Management. Reuse Open Design playback-bar visual intent for
supplemental controls.

## Scope

In scope:

- Public supported YouTube video and playlist URLs.
- Visible iframe player at compliant size.
- Open Design fixed playback bar bound to official IFrame Player API state.
- Play/pause, previous/next when playlist capability exists, seek, duration,
  mute, and volume.
- Windows desktop proof.

Out of scope:

- Direct `music.youtube.com` webview playback.
- Hidden/background player.
- Any login, account, catalog, or persistent data.

## Risk Classification

Risk flags:

- External systems.
- Public contracts.
- Cross-platform.
- Weak proof.
- Multi-domain.

Hard gates:

- External provider behavior.

## Work Phases

1. Parse and validate supported public URLs to video/playlist identifiers.
2. Create visible IFrame Player technical spike in Provider Management.
3. Define player adapter and normalized state.
4. Bind Open Design playback bar controls to IFrame Player API.
5. Verify errors, accessibility, provider branding, and Windows lifecycle.
6. Record proof and update harness.

## Stop Conditions

Pause if:

- IFrame API cannot load or control selected URL contract.
- User request requires hidden/background playback again.
- Player branding, visibility, or native functionality would be obscured.
- Provider policy or embed response blocks selected content.
