# Exec Plan

## Goal

Build and validate `libs/features/playback`: a visible, official YouTube IFrame
Player path plus global Open Design playback bar mounted by Vue Router AppShell.

## Scope

In scope:

- Public supported YouTube video and playlist URLs.
- Visible iframe player at compliant size.
- Playback feature library owning UI, session, parser, and IFrame adapter.
- Open Design global playback bar bound to official IFrame Player API state.
- Play/pause, previous/next when playlist capability exists, seek, duration,
  mute, and volume.
- Windows desktop proof.

Out of scope:

- Direct `music.youtube.com` webview playback.
- Hidden/background player.
- Any login, account, catalog, persistent data, or background player.

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

1. Create `libs/features/playback` public entrypoint, state contracts, and URL
   parser.
2. Build IFrame adapter and normalized session state in playback feature.
3. Build playback source panel and Open Design global bar in playback feature.
4. Mount playback feature in Router AppShell outside child `RouterView`.
5. Compose source panel into Provider Management; keep iframe visible there.
6. Verify errors, accessibility, provider branding, route-exit disposal, and
   Windows lifecycle.
7. Record proof and update harness.

## Stop Conditions

Pause if:

- IFrame API cannot load or control selected URL contract.
- User request requires hidden/background playback again.
- Player branding, visibility, or native functionality would be obscured.
- Provider policy or embed response blocks selected content.
