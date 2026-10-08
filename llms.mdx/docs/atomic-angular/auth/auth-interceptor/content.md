# Auth interceptor (/docs/atomic-angular/auth/auth-interceptor)

Attaches the CSRF token, bearer authorization and impersonation headers to every request built with Angular's HttpClient — the one channel the atomic client itself never sees.



`authInterceptorFn` serves the **Angular `HttpClient` channel**, which `@sinequa/atomic`'s own client does not
see. The library's stores and services no longer use `HttpClient` — they go through the client, which sets
these headers itself, per client — but `@sinequa/agent` and `@sinequa/assistant` build their requests with
`HttpClient`, as may your own code. Without this interceptor, those requests leave with no CSRF token and the
server answers 401.

## Minimal example [#minimal-example]

<CodeSample id="auth-interceptor-basic" title="Registering the interceptor">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { provideHttpClient, withInterceptors } from "@angular/common/http";
    import { authInterceptorFn } from "@sinequa/atomic-angular";
    import type { ApplicationConfig } from "@angular/core";

    export const appConfig: ApplicationConfig = {
      providers: [provideHttpClient(withInterceptors([authInterceptorFn]))],
    };
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

On every request it adds `Sinequa-csrf-token` (read from the stored session token),
`Authorization: Bearer <token>` when a bearer token is configured, `sinequa-override-user`/
`sinequa-override-domain` when an impersonation is active, and `withCredentials: true` — aligning the
`HttpClient` path with the client's own `fetch`, which uses `credentials: "include"`. It also refreshes the
stored CSRF token from the `sinequa-csrf-token` response header whenever the server sends a new one.

The bearer token is resolved from `authMode: AuthMode.bearer(token)` first, then from the legacy `bearerToken`
configuration key.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Requests through HttpClient answer 401 with no CSRF token, even though the app is signed in">
    Confirm this interceptor is actually registered on the `provideHttpClient` used by the request — an
    application that only calls `@sinequa/atomic`'s client never needs it, but the moment `@sinequa/agent`,
    `@sinequa/assistant`, or your own code issues an `HttpClient` request, this interceptor is what carries the
    session across.
  </Accordion>

  <Accordion title="Every HttpClient request is unauthenticated in bearer mode">
    Only reading the legacy `bearerToken` key would leave every `HttpClient` request unauthenticated once an
    application sets `authMode: AuthMode.bearer(token)` explicitly — there is no reason to also repeat the token
    under the legacy key. Prefer `authMode.bearer(token)` going forward; the legacy key stays as a fallback for
    older configuration.
  </Accordion>

  <Accordion title="A client provided at the application root never gets impersonation headers">
    This interceptor reads the configuration and session of the **default** client. A client provided at the root
    holds its own snapshot of the configuration, so the `backendUrl` it resolves and the impersonation state it
    records never reach this code — keep the application root on the default client if you need this interceptor
    to see it.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Authentication flows" href="./authentication-flows.mdx">
    The two channels — this interceptor and atomic's own recovery — never handle the same request.
  </Card>
</Cards>
