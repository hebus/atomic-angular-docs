# Signed Out (/docs/atomic-angular/auth/signed-out)

The post-logout confirmation shown on /logout — breaks the re-authentication loop that rendering the sign-in form there would cause in external auth modes.



`SignedOut` is the post-logout confirmation shown on the `/logout` route by
[`AuthPageComponent`](./authentication-flows.mdx). It states that the session has ended and offers a single
explicit action to sign in again.

<Callout title="Why this view exists">
  In the external authentication modes (`sso`, `oauth`, `saml`, `bearer`), [Sign In](./sign-in.mdx) starts the
  handshake as soon as it mounts. Rendering the sign-in form on `/logout` would therefore re-authenticate the
  user immediately — a spinner that loops straight back in, defeating the logout. This view breaks that loop.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="signed-out-basic" title="Routed automatically by AuthPageComponent">
  <Lang value="angular">
    ```ts title="app.routes.ts"
    import { AuthPageComponent } from "@sinequa/atomic-angular";
    import type { Routes } from "@angular/router";

    export const routes: Routes = [{ path: "logout", component: AuthPageComponent }];
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Logout[&#x22;/logout route&#x22;] --> AuthPage[&#x22;AuthPageComponent&#x22;]
    AuthPage --> View{&#x22;routeConfig.path === logout?&#x22;}
    View -->|yes| SignedOut[&#x22;SignedOutComponent&#x22;]
    View -->|no| SignIn[&#x22;SignInComponent&#x22;]
    SignedOut --> Action[&#x22;signInAgain()&#x22;]
    Action --> Navigate[&#x22;navigate to loginPath, returnUrl: /&#x22;]"
/>

The `returnUrl` is not decorative: in the external modes, the sign-in screen only navigates away once the
handshake completes **if** a `returnUrl` is present — without one it sits on the loader forever.

## Options [#options]

This component has no inputs or outputs of its own — its only public surface is `signInAgain(): void`,
navigating to `loginPath` (default `/login`) with `returnUrl: "/"`.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Clicking &#x22;Sign in&#x22; leaves the user on a permanent loader in SSO/OAuth/SAML mode">
    Check that navigation actually attached a `returnUrl` — `signInAgain()` always sets one, so this usually means
    a custom router configuration stripped or overrode the query params on the way to `/login`.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Authentication flows" href="./authentication-flows.mdx">
    Why /logout renders this view instead of the sign-in form, end to end.
  </Card>
</Cards>
