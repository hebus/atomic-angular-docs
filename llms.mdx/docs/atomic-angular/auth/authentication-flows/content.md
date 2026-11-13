# Authentication flows (/docs/atomic-angular/auth/authentication-flows)

How AuthGuard, the auth interceptor, SignIn and logout fit together end to end — the Angular-side orchestration on top of @sinequa/atomic's core authentication state machine.



This page describes how `@sinequa/atomic-angular` **orchestrates** authentication — how the pieces fit
together and how every flow is handled. It is the Angular-side companion to the core state machine
documented by `@sinequa/atomic` (detection, `login()` resolution, the OAuth/SAML redirect loop guard, error
envelopes) — this page never repeats that part, only what Angular adds on top of it.

## The pieces [#the-pieces]

<TypeTable
  type="{
  bootstrapApp: { type: &#x22;APP_INITIALIZER&#x22;, description: &#x22;Resolves config, signs in, initializes the app.&#x22; },
  &#x22;signIn()&#x22;: { type: &#x22;function&#x22;, description: &#x22;Acts on globalConfig.authMode to start the right flow.&#x22; },
  AuthGuard: { type: &#x22;CanActivateFn factory&#x22;, description: &#x22;Protects routes; handles unauthenticated + expired-password.&#x22; },
  AuthPageComponent: { type: &#x22;component&#x22;, description: 'Hosts the signin / changepassword / forgotpassword / signedout views.' },
  SignInComponent: { type: &#x22;component&#x22;, description: &#x22;Credentials form or loader (external auth).&#x22; },
  SignedOutComponent: { type: &#x22;component&#x22;, description: &#x22;Post-logout confirmation shown on /logout (no auto re-auth).&#x22; },
  authInterceptorFn: { type: &#x22;HttpInterceptorFn&#x22;, description: &#x22;Retries a 401 once after re-auth, on the HttpClient channel.&#x22; },
  &#x22;auth.recoverFromUnauthorized&#x22;: { type: &#x22;@sinequa/atomic&#x22;, description: &#x22;Same recovery for the requests atomic issues itself, wired by bootstrapApp.&#x22; },
}"
/>

## Required routes [#required-routes]

```ts title="app.routes.ts"
import { AuthGuard, AuthPageComponent, ErrorComponent } from "@sinequa/atomic-angular";
import type { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "login", component: AuthPageComponent }, // not SignInComponent directly
  { path: "logout", component: AuthPageComponent },
  { path: "error", component: ErrorComponent },
  // ...protected routes use canActivate: [AuthGuard()]
];
```

<Callout title="Route /login and /logout to AuthPageComponent">
  `AuthPageComponent` switches between the sign-in, change-password, forgot-password and signed-out views (from
  the route path and the `mode` query param) — in particular `/logout` renders the signed-out confirmation, not
  the sign-in form. `SignInComponent` alone only renders the credentials form and ignores the route.
</Callout>

## Bootstrap sequence [#bootstrap-sequence]

<Mermaid
  chart="sequenceDiagram
    participant Main as APP_INITIALIZER
    participant Boot as bootstrapApp
    participant Init as initializeAppConfig
    participant Sign as signIn
    participant Login as login
    participant App as ApplicationService

    Main->>Boot: provideAppInitializer(bootstrapApp)
    Boot->>Init: await initializeAppConfig()
    Init-->>Boot: authMode + backendUrl, or throws to /error
    Boot->>Sign: signIn()
    Sign->>Login: login(), per authMode
    Login-->>Sign: authenticated?
    Sign-->>Boot: authenticated true or false"
/>

When authenticated, `bootstrapApp` awaits `initialize(createRoutes)` (routing to `/error` on failure); when
not, `signIn()` has already navigated to `/login` (credentials) or reloaded the page (`sso`).

## `signIn()` per mode [#signin-per-mode]

<TypeTable
  type="{
  credentials: { type: '&#x22;credentials&#x22;', description: 'Navigate to loginPath (show the form) — resolves false.' },
  sso: { type: '&#x22;sso&#x22;', description: &#x22;window.location.reload() so the proxy/browser performs the handshake — resolves false.&#x22; },
  &#x22;oauth · saml&#x22;: { type: '&#x22;oauth&#x22; | &#x22;saml&#x22;', description: &#x22;Delegate to login(), which redirects to the provider.&#x22; },
  bearer: {
    type: '&#x22;bearer&#x22;',
    description:
      &#x22;Delegate to login(). No session is looked for — the token authenticates every request through its Authorization header — but a session cookie is still requested so the browser can load previews and thumbnails on its own.&#x22;,
  },
  unknown: {
    type: '&#x22;unknown&#x22;',
    description:
      &#x22;Delegate to login() (session-first; it probes server-side auto-authentication — e.g. OIDC, recorded as sso on success — then resolves to credentials on failure).&#x22;,
  },
}"
/>

On a recoverable **401** it routes to `loginPath`; on a &#x2A;*fatal (non-401)** error it routes to `/error` with
the reason and resolves `false`, so the app never fires further doomed authenticated calls.

## Token expiry and 401 re-authentication [#token-expiry-and-401-re-authentication]

Sessions use a **sliding refresh** (handled in `@sinequa/atomic`): every response carrying a
`sinequa-jwt-refresh` header re-stores the token, so an active user never expires mid-use. Expiry only
happens after idle time, or server-side revocation.

When a token has expired, the next API call answers **401**, and the recovery runs on two channels that never
handle the same request — registering both is correct, not duplicated:

<TypeTable
  type="{
  &#x22;auth.recoverFromUnauthorized&#x22;: { type: &#x22;wired by bootstrapApp&#x22;, description: &#x22;Every request @sinequa/atomic issues on its own transport.&#x22; },
  authInterceptorFn: { type: &#x22;HttpInterceptorFn&#x22;, description: &#x22;Every request built with Angular's HttpClient — @sinequa/agent, @sinequa/assistant, your own code.&#x22; },
}"
/>

Each calls `signIn()` and replays the original request at most once — an `AUTH_RETRIED` context guard
prevents an infinite loop on the interceptor side. Some requests never trigger a recovery at all: audit
events (fire-and-forget telemetry), the sign-in's own probes (their 401 is the answer being asked for), and
anything trailing behind a deliberate `logout()` (see below). `signIn()` also never redirects when the user
is already on an authentication screen — they are already where they belong.

## Logout [#logout]

The user menu's logout action clears the local token. The challenge response may carry a `logoutUrl` — the
provider end-session endpoint for OAuth/SAML:

<Mermaid
  chart="flowchart TD
    LO[&#x22;handleLogout calls logout()&#x22;] --> Q{&#x22;logoutUrl present?&#x22;}
    Q -->|&#x22;yes, oauth/saml&#x22;| Prov[&#x22;location.href = logoutUrl -> IdP end-session&#x22;]
    Q -->|no| Nav[&#x22;navigate to /logout&#x22;]
    Nav --> SO[&#x22;AuthPageComponent: routeConfig.path = logout -> signedout view&#x22;]
    SO --> Btn[&#x22;Sign in -> loginPath -> normal handshake&#x22;]"
/>

`/logout` renders the **signed-out** view, not the sign-in form — this matters for the external modes, where
`SignInComponent` auto-initiates its handshake on mount: rendering it on `/logout` would immediately
re-authenticate the user, a spinner that loops back in. See [Signed Out](./signed-out.mdx).

### Requests that trail behind the logout [#requests-that-trail-behind-the-logout]

A view being torn down as the router leaves the page, a save already in flight, a telemetry event — all of
them can reach the server moments later, on a cookie that has just been deleted, and answer 401. Nothing
recovers from those: `@sinequa/atomic` (2.3.2+) closes the recovery from a deliberate `logout()` until the
next successful authentication, and `signIn()` refuses to redirect away from an authentication screen. Without
either, the audit event's 401 re-probed the session, found it gone, and replaced the "signed out" confirmation
with `/login?returnUrl=/logout` — signing back in then returned the user to the logout page.

## What's next [#whats-next]

<Cards>
  <Card title="Sign In" href="./sign-in.mdx">
    The credentials form and the entry point of the whole sequence above.
  </Card>

  <Card title="AuthGuard" href="./auth-guard.mdx">
    The route guard that starts this sequence for a protected route.
  </Card>
</Cards>
