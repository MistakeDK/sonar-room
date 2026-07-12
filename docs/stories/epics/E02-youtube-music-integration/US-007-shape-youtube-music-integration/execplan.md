# Exec Plan

## Goal

Produce approved architecture and bounded MVP for YouTube Music account connection, collection access, and playback controls.

## Scope

In scope:

- Verify official provider capability for sign-in, user collections, playback, and remote controls.
- Define secure OAuth/token boundary and local persistence policy.
- Select one MVP collection and one playback ownership model.
- Define user-visible connected, expired, disconnected, and unsupported states.

Out of scope:

- Production API integration.
- Private or unofficial provider interfaces.
- Syncing all YouTube Music data.

## Risk Classification

Risk flags:

- Auth.
- External systems.
- Data model.
- Audit/security.
- Public contracts.
- Cross-platform.
- Weak proof.
- Multi-domain.

Hard gates:

- Auth.
- External provider behavior.
- Audit/security.

## Work Phases

1. Verify provider documentation and developer-policy eligibility.
2. Define product MVP and playback source of truth.
3. Record architecture and security decision.
4. Create integration story packets.
5. Implement vertical slices after approval.
6. Verify provider, desktop, and security behavior.

## Stop Conditions

Pause for human confirmation if:

- Official supported API cannot provide requested catalog or playback behavior.
- User expects in-window audio but supported contract only allows delegation.
- OAuth scope, token storage, or local data retention changes.
- Provider terms or policy prevent selected behavior.

## Confirmed MVP Shape

- URL input is the only content-entry path.
- Catalog/account-tier behavior remains out of scope.
- `seek`, `setVolume`, position, and duration are first-slice playback
  requirements.
- At most one provider webview may play media at a time. Create it lazily only
  after URL submission; close it on provider switch, explicit stop, or app exit.
- Do not poll page state faster than four times per second when no approved
  provider event bridge exists.

## Provider Scope

The hidden-webview candidate is restricted to YouTube Music. Do not introduce a
generic provider webview host or apply this lifecycle to other providers.

## Revised MVP Work Order

1. Validate public YouTube Music URL submitted on Provider Management.
2. Load it into one invisible YouTube Music playback host without login flow.
3. Drive state into Provider Management playback bar.
4. Return clear non-authentication errors for restricted or unsupported URLs.
5. Defer account connection, persistent session, OAuth, and private-library
   playback to a later approved story.
