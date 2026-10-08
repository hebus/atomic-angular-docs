# Authentication (/docs/atomic-angular/auth)

Sign-in, password reset and change, session guards and interceptors, and the principal store.



Every mode a Sinequa application signs a user in with — credentials, SSO, OAuth, SAML, bearer — funnels
through the same handful of pieces: a guard that protects routes, an interceptor that carries the session on
the `HttpClient` channel, and four views `AuthPageComponent` switches between.

## What's next [#whats-next]

<Cards>
  <Card title="Sign In" href="./sign-in.mdx">
    The credentials form, and the entry point of the whole authentication sequence.
  </Card>

  <Card title="Authentication flows" href="./authentication-flows.mdx">
    How the guard, the interceptor, sign-in and logout fit together end to end.
  </Card>

  <Card title="AuthGuard" href="./auth-guard.mdx">
    Protects routes, and redirects to change-password when the session's password has expired.
  </Card>

  <Card title="Principal store" href="./principal-store.mdx">
    The signed-in user's data, loaded once and shared through a signal store.
  </Card>

  <Card title="Auth interceptor" href="./auth-interceptor.mdx">
    Carries the session on the Angular HttpClient channel, which the atomic client never sees.
  </Card>

  <Card title="Change Password" href="./change-password.mdx">
    Current/new/confirm, then signs the user back in — standalone or embedded.
  </Card>

  <Card title="Forgot Password" href="./forgot-password.mdx">
    A one-field reset-email request, safe to embed anywhere.
  </Card>

  <Card title="Signed Out" href="./signed-out.mdx">
    The post-logout confirmation that breaks the external-mode re-authentication loop.
  </Card>
</Cards>
