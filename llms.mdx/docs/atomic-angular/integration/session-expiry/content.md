# Warn before the session expires (/docs/atomic-angular/integration/session-expiry)

Tell the user shortly before their session expires, and when it already has, whatever way they signed in.



`provideSessionExpiry()` raises a warning toast — with an "Extend session" action — shortly before the session ends, and an error toast — with a
"Sign in again" action — when the backend says it has. Both are `notify` events, rendered by your application's
toast bridge.

<Callout type="info" title="Session">
  The server-side state that says the user is signed in. Its lifetime is the **backend's** setting, not the
  library's: some backends end it a fixed time after sign-in, others push it forward as the user works.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="session-expiry-basic" title="Registered next to the client and the failed-request toasts">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig } from "@angular/core";
    import { provideAtomicClient, provideAtomicNotifications, provideSessionExpiry } from "@sinequa/atomic-angular";

    export const appConfig: ApplicationConfig = {
      providers: [provideAtomicClient({ app: "my-app" }), provideAtomicNotifications(), provideSessionExpiry()],
    };
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

Two independent signals, because no single one works for every way of signing in.

**Proactive.** The token `@sinequa/atomic` stores — the `csrfToken` of the sign-in and challenge responses, and the
`sinequa-jwt-refresh` header — looks like `<opaque token>|<epoch in seconds>`, and the suffix is the expiry of the
session. It is the only expiry date a browser can read, since the session cookie is `HttpOnly`. The provider reads it
at start-up and on every `tokenRefreshed`, and schedules the warning `warnBeforeMs` before it. The warning is raised
once: it is armed again only when a renewal takes the expiry back out of that window.

**Reactive.** A `401` that reaches its caller on a session that had been established means it is gone, whatever the
sign-in, and raises the error toast once. The provider follows the client's `sessionLost` event (`@sinequa/atomic`
2.8 or later), not `unauthorized`: `unauthorized` fires as soon as the `401` is read, before the recovery that
`bootstrapApp` installs gets its chance, so a session it re-establishes silently (single sign-on) would be announced
lost. The client already leaves out the `401`s that are answers rather than expiries — the sign-in, the start-up
probe, audit events — and the requests trailing behind a logout. Requests sent with `HttpClient`, which the client
never sees, are covered by [`errorInterceptorFn`](./interceptors.mdx) when its own recovery gives up. A `401`
while a user is impersonated is left to its own message in [`provideAtomicNotifications()`](./atomic-notifications.mdx).

<Mermaid
  chart="sequenceDiagram
    participant S as Backend
    participant C as Atomic client
    participant P as provideSessionExpiry
    participant T as Toast bridge
    S->>C: response carrying the token and its expiry
    C->>P: tokenRefreshed
    P->>P: schedule the warning at expiry minus warnBeforeMs
    P->>T: notify.warning
    S->>C: 401 on an established session
    C->>C: recoverFromUnauthorized, the request replayed once
    C->>P: sessionLost, only if the session could not be re-established
    P->>T: notify.error with a Sign in again action"
/>

The texts live in the `session-expiry` Transloco scope, extracted into your application like the library's other
scopes (`transloco-scoped-libs`). Without Transloco, or when the scope was not extracted, the English texts built into the
provider are used instead of a raw key.

<Callout type="warn" title="The token format is not a documented contract">
  The `|<epoch>` suffix is what the backends observed so far send, not something Sinequa promises. When a token has no
  readable suffix — a backend that sends bare tokens, or an ambient single sign-on that leaves no token at all — the
  proactive warning simply never arms, and the reactive toast still works. Nothing is shown that the provider is not
  sure of.
</Callout>

## Recipes [#recipes]

<CodeSample id="session-expiry-custom" title="Warn two minutes ahead and send the user to your own sign-in page">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig } from "@angular/core";
    import { provideAtomicClient, provideAtomicNotifications, provideSessionExpiry } from "@sinequa/atomic-angular";

    export const appConfig: ApplicationConfig = {
      providers: [
        provideAtomicClient({ app: "my-app" }),
        provideAtomicNotifications(),
        provideSessionExpiry({
          warnBeforeMs: 2 * 60_000,
          // 30 s instead of "never closes": see the pitfall about the toast duration
          expiredDuration: 30_000,
          onReconnect: () => window.location.assign("/login"),
        }),
      ],
    };
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  warnBeforeMs: { type: &#x22;number&#x22;, default: &#x22;300000&#x22;, description: &#x22;How long before the expiry the user is warned, in milliseconds.&#x22; },
  startupGraceMs: {
    type: &#x22;number&#x22;,
    default: &#x22;5000&#x22;,
    description:
      &#x22;How long after start-up the interface language is considered settled. A warning already due at start-up waits for it, so it is worded in the user's language. 0 disables the delay.&#x22;,
  },
  expiredDuration: {
    type: &#x22;number&#x22;,
    default: &#x22;0&#x22;,
    description:
      'The `duration` of the &#x22;session expired&#x22; toast. 0 keeps it until the user dismisses it or signs in again — for a bridge where 0 means &#x22;never closes&#x22;.',
  },
  onReconnect: {
    type: &#x22;() => void&#x22;,
    default: &#x22;() => location.reload()&#x22;,
    description: 'The action of the &#x22;session expired&#x22; toast. Reloading the page starts a new sign-in.',
  },
  onExtend: {
    type: &#x22;() => Promise<void> | void&#x22;,
    default: &#x22;renews the session through `security.webtoken`, else one `principal` request, then `onReconnect` if the expiry did not move&#x22;,
    description:
      'The action of the &#x22;about to expire&#x22; toast. `security.webtoken` renews the session without credentials while the JSON Web Token cookie is valid, whatever the way the user signed in; it cannot revive a session that already expired, and a bearer access token whose JSON method rules exclude `webtoken` is refused. In those cases a `principal` request is tried: the token is then only renewed as a side effect, when the JSON Web Token auto-refresh of the server is enabled and the maximum lifetime of the token is not reached. A custom handler replaces the default, fallback included.',
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The expired toast disappears after a few seconds">
    The library has no toast layer of its own: it only emits `notify` events, so what a `duration` means belongs to
    your toast bridge. `0` is "never closes on its own" for `sonner-a11y`; `Infinity` is not, because a non-finite delay
    reaches a timer that fires straight away. If your bridge reads `0` differently, set `expiredDuration` to what it
    needs.
  </Accordion>

  <Accordion title="No warning ever appears, but the session does expire">
    The token the client holds has no readable expiry: a backend that sends bare tokens, an ambient single sign-on
    (Windows authentication, a proxy) that leaves no token at all, or a session held by a reverse proxy that the
    client cannot see. The reactive toast is still raised on the `401`. There is no way to warn ahead without a date.
  </Accordion>

  <Accordion title="An active user is warned although their session is not about to end">
    The warning follows the date the client was last told. A server that **extends** active sessions without sending the
    renewed token (no `sinequa-jwt-refresh`) lets that date run out while the session carries on, and the user is warned
    for nothing. The client cannot tell the two apart. The backends observed so far do not behave this way: one ends the
    session a fixed time after sign-in whatever the user does, the other sends the renewed token on every response.
  </Accordion>

  <Accordion title="The expired toast never shows with OAuth, SAML or an ambient sign-in">
    Expected. When the session lapses, the client signs in again by itself — a redirect to the identity provider, which
    reloads the page — so there is nothing to ask the user to do. The toast appears when signing in again is not
    possible without them: a credentials form, an OIDC session whose identity provider session has also ended.
  </Accordion>

  <Accordion title="The warning is worded in the wrong language right after start-up">
    Transloco answers in its default language until the application applies the user's one, typically once their
    settings are loaded, and nothing signals that moment. `startupGraceMs` holds a warning that is already due at start-up
    back until then. Raise it if your settings take longer to load; later warnings are not affected.
  </Accordion>

  <Accordion title="A second backend's session is never watched">
    Registered at the root, the provider listens to the root client's events only. A [scope](./atomic-scope.mdx) serving a
    second backend has its own — register `provideSessionExpiry()` in the scope's providers too.
  </Accordion>

  <Accordion title="Nothing happens when a reverse proxy's own session lapses">
    A proxy that authenticates in front of the backend (OIDC) answers an expired session with a cross-origin redirect to the
    identity provider. `fetch` rejects with a `TypeError` before the client sees a response, so no event is raised and
    neither signal fires. Signing in again is then up to the proxy.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Notify failed requests" href="./atomic-notifications.mdx">
    The toasts for failed backend requests, which this complements.
  </Card>

  <Card title="Provide a client" href="./atomic-client.mdx">
    The client whose authentication events this listens to.
  </Card>

  <Card title="Scope a second backend" href="./atomic-scope.mdx">
    Where to register it again when a second backend has its own client.
  </Card>
</Cards>
