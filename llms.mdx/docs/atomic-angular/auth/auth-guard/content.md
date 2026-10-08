# AuthGuard (/docs/atomic-angular/auth/auth-guard)

A functional route guard that checks authentication, loads the principal, and redirects to change-password when a credentials session's password has expired.



`AuthGuard()` returns a `CanActivateFn` that protects a route: it checks the user is authenticated, ensures
`PrincipalStore` is loaded, and — in `credentials` mode — redirects to the change-password view when the
session's password has expired.

## Minimal example [#minimal-example]

<CodeSample id="auth-guard-basic" title="Guarding a protected route">
  <Lang value="angular">
    ```ts title="app.routes.ts"
    import { AuthGuard, AuthPageComponent, ErrorComponent } from "@sinequa/atomic-angular";
    import type { Routes } from "@angular/router";

    export const routes: Routes = [
      { path: "login", component: AuthPageComponent }, // credentials / changepassword / forgotpassword
      { path: "logout", component: AuthPageComponent },
      { path: "error", component: ErrorComponent },
      { path: "search", component: null as never, canActivate: [AuthGuard()] },
    ];
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    A[&#x22;canActivate&#x22;] --> Login{&#x22;URL is /login or /logout?&#x22;}
    Login -->|yes| Allow[&#x22;allow&#x22;]
    Login -->|no| Auth{&#x22;isAuthenticated() OR authMode is sso?&#x22;}
    Auth -->|no| ToLogin[&#x22;navigate to loginPath, returnUrl set&#x22;]
    Auth -->|yes| Princ{&#x22;PrincipalStore state === loaded?&#x22;}
    Princ -->|no| Init[&#x22;await initialize()&#x22;]
    Init -->|failed| ToLogin
    Init -->|loaded| Pwd{&#x22;credentials mode, password expired, partition editable?&#x22;}
    Princ -->|yes| Pwd
    Pwd -->|yes| ChangePwd[&#x22;navigate to /login?mode=changepassword&#x22;]
    Pwd -->|no| Allow"
/>

Two details worth knowing:

* The guard lets `/login` and `/logout` through unconditionally — guarding the login form against "not
  logged in" would redirect it to itself, and guarding `/logout` would send a user who just signed out back
  to the form they just left.

* `initialize()` runs whenever the store's state is not `"loaded"` — not only when it is `"initial"`. That
  covers an initialization already in flight elsewhere (`"loading"`, awaited rather than assumed absent —
  `initialize()` itself de-duplicates concurrent calls into the same fetch) and a previous failed attempt
  (`"error"`, retried instead of permanently redirecting to login).

* **SSO mode** (`authMode.kind === "sso"`): the browser/proxy carries the auth, so an unauthenticated state is
  let through — the session is established out of band.

* **Not authenticated** (non-SSO): redirect to `loginPath` with the original URL as `returnUrl`.

* **Credentials mode, expired password**: when the partition is editable and the password is expired, the
  guard redirects to `/login?mode=changepassword&alert=passwordExpired&username=…`.

## Options [#options]

<TypeTable
  type="{
  &#x22;client.config.loginPath&#x22;: { type: &#x22;string&#x22;, default: '&#x22;/login&#x22;', description: &#x22;Where to redirect when authentication is needed.&#x22; },
  &#x22;client.config.authMode&#x22;: {
    type: &#x22;AuthMode&#x22;,
    description: &#x22;The source of truth for the authentication method — branch on authMode.kind, not the legacy useCredentials/useSSO booleans.&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Navigating to a protected route redirects back to itself in a loop">
    Confirm your routes actually declare `loginPath` (default `/login`) **and** `/error` — and that `/login`
    routes to `AuthPageComponent`, not `SignInComponent` directly, so the guard's own redirect target renders
    correctly. See [Authentication flows](./authentication-flows.mdx).
  </Accordion>

  <Accordion title="A user with an expired password reaches the app instead of the change-password screen">
    This only applies in `credentials` mode, and only when `editablePartition` is set on the principal — an
    account on a partition that does not manage passwords locally (SSO, an external identity provider) has
    nothing to expire from this guard's point of view.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Authentication flows" href="./authentication-flows.mdx">
    Where this guard fits among the interceptor, sign-in and logout.
  </Card>

  <Card title="Principal store" href="./principal-store.mdx">
    The store this guard loads before letting a protected route through.
  </Card>
</Cards>
