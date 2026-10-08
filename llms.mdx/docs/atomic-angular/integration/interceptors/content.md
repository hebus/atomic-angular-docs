# Cross-cutting interceptors (/docs/atomic-angular/integration/interceptors)

Three Angular HttpInterceptorFn covering requests the atomic client never sees — the ui-language body field, audit metadata, and 401 recovery on the HttpClient channel.



The `@sinequa/atomic` client covers its own requests directly — the interface language, audit metadata and
401 recovery are all built into it. These three interceptors give the same coverage to requests that never go
through the client at all: `@sinequa/agent`, `@sinequa/assistant`, or your own code built on Angular's
`HttpClient`.

<Callout title="Two channels, never the same request">
  A request either goes through the atomic client (which handles it directly) or through `HttpClient` (which
  these interceptors cover) — never both. Registering the client's own handling *and* these interceptors is
  therefore correct, not a duplicate.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="interceptors-basic" title="All three, registered together">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig } from "@angular/core";
    import { provideHttpClient, withInterceptors } from "@angular/common/http";
    import { auditInterceptorFn, bodyInterceptorFn, errorInterceptorFn } from "@sinequa/atomic-angular";

    export const appConfig: ApplicationConfig = {
      providers: [
        provideHttpClient(withInterceptors([bodyInterceptorFn, errorInterceptorFn, auditInterceptorFn])),
      ],
    };
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

### `bodyInterceptorFn` — the interface language [#bodyinterceptorfn--the-interface-language]

Adds the current interface language to the request body as `ui-language`, read fresh from `TranslocoService`
on **every** request rather than captured once — the language changes while the application runs (the user
menus and the user-profile form call `setActiveLang`), and a request must carry the one in force when it is
sent. `FormData` bodies get the field appended directly; a plain object body is cloned with the field added.
`GET`/`HEAD` requests pass through untouched — they carry no body with the `fetch` backend.

### `errorInterceptorFn` — 401 recovery [#errorinterceptorfn--401-recovery]

<Mermaid
  chart="flowchart TD
    R([&#x22;request answers 401&#x22;]) --> Retried{&#x22;already retried once?&#x22;}
    Retried -- &#x22;yes&#x22; --> Give[&#x22;propagate the 401&#x22;]
    Retried -- &#x22;no&#x22; --> Sign[&#x22;signIn()&#x22;]
    Sign --> Authed{&#x22;authenticated?&#x22;}
    Authed -- &#x22;no&#x22; --> Give
    Authed -- &#x22;yes&#x22; --> Retry[&#x22;retry once, fresh headers, marked AUTH_RETRIED&#x22;]"
/>

Same recovery as the client's own `recoverFromUnauthorized` hook (see [Bootstrap the
application](./bootstrap-app.mdx)), on the `HttpClient` channel: on a `401`, call `signIn()`, and retry the
original request **once** — only if `signIn()` reports the user is authenticated. A `403` is propagated as a
permanent auth failure, never retried.

### `auditInterceptorFn` — audit metadata [#auditinterceptorfn--audit-metadata]

Adds Sinequa's audit metadata to a request body, for any request whose URL contains `api/v1` and whose body is
JSON-serializable (skipped for `HttpParams` bodies). The `@sinequa/atomic` API functions already add this to
their own requests; this covers the ones built directly on `HttpClient`.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A persistently-failing endpoint used to loop forever on 401">
    `errorInterceptorFn` retries **at most once per request**, tracked through an `HttpContextToken`
    (`AUTH_RETRIED`) carried on the request itself (never sent to the server). A second `401` on the retried
    request propagates instead of triggering another `signIn()`. Without this guard, an endpoint that keeps
    rejecting even after a successful re-authentication would re-trigger sign-in on every response, forever.
  </Accordion>

  <Accordion title="Every language change should update in-flight requests, but the interceptor reads a stale value">
    It cannot, and does not try to — `bodyInterceptorFn` reads `TranslocoService.getActiveLang()` at the moment
    each request is dispatched, not when the interceptor is registered. A request already in flight when the
    language changes keeps the language it was sent with; the next request picks up the new one.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Bootstrap the application" href="./bootstrap-app.mdx">
    The same 401 recovery, wired to the atomic client's own requests.
  </Card>

  <Card title="Cross-cutting pipes" href="./pipes.mdx">
    Pipes that follow the same interface-language changes on the display side.
  </Card>
</Cards>
