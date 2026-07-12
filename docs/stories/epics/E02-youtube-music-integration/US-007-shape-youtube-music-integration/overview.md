# US-007 Unauthenticated YouTube Music URL Playback MVP

## Current Behavior

- Provider Management renders static provider cards.
- Provider Management has no URL input or functional playback bar.
- Music route is a placeholder.
- No account connection, playback engine, catalog sync, or local music data exists.

## Target Behavior

On Windows desktop, a user pastes a public YouTube Music URL into Provider
Management. App attempts unauthenticated playback through one invisible,
YouTube-Music-only host. Provider Management shows real playback state in fixed
player bar derived from accepted Open Design artifact.

This MVP does not connect an account. It must not prompt for login. A URL that
requires authentication returns `authentication_required` and leaves player
stopped.

## Affected Users

- Desktop listener opening public YouTube Music URLs without account connection.

## Affected Product Docs

- `docs/product/overview.md`
- `docs/ARCHITECTURE.md`
- `docs/decisions/0016-provider-webview-playback-policy.md`
- `docs/decisions/0017-unauthenticated-youtube-music-url-mvp.md`

## Non-Goals

- OAuth, Google/YouTube sign-in, account persistence, or token storage.
- Fetching library, playlists, liked music, uploads, history, or Premium state.
- Restricted/private/account-only URL playback.
- Browser-profile or cookie import/export, session scraping, private endpoint
  use, or provider-control bypass.
- Spotify, SoundCloud, or generic multi-provider playback host.
- Music-route player implementation.
