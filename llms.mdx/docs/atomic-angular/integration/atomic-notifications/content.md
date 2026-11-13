# Notify failed requests as toasts (/docs/atomic-angular/integration/atomic-notifications)

Surface a failed request of the Sinequa client as a toast notification, with the failures it stays silent about.



`provideAtomicNotifications()` subscribes to the client's own `requestFailed` event and raises a toast for the
statuses worth telling the user about. It does not replace `toastInterceptorFn`: the two serve disjoint channels
(see the first pitfall below).

<Callout title="The library renders no toast">
  A toast here is a `notify.error(…)` call from `@sinequa/atomic`, which only dispatches a `notification`
  `CustomEvent` on `window`. Nothing in `@sinequa/atomic-angular` or `@sinequa/galactik` listens to that event: your
  application must provide a toaster (a bridge from the event to your toast component). Without one, no toast is
  ever visible.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="atomic-notifications-basic" title="Registered alongside the client">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig } from "@angular/core";
    import { provideAtomicClient, provideAtomicNotifications } from "@sinequa/atomic-angular";

    export const appConfig: ApplicationConfig = {
      providers: [provideAtomicClient({ app: "my-app" }), provideAtomicNotifications()],
    };
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

Only HTTP statuses `400`, `403`, `500` and `503` raise a `notify.error(…)` toast; an impersonation rejected by the
server (`401` with `errorCode: 6`) gets its own explicit message. Every other failure is silent: `404`, `429`, `502`,
`504`, and any failure without an HTTP response (network error, timeout), which the client does not report as a
`requestFailed` event. A plain `401` raises nothing either — it is handled by the authentication path, not shown to
the user; [`provideSessionExpiry()`](./session-expiry.mdx) is the opt-in that tells the user their session ended.
Two more sources of noise are silenced on top of that: a `400` on `api/v2/user-profile` (the expected "not created
yet" answer) and any failure on `api/v1/preview`, which the preview panel surfaces itself. A page that needs to react
to a `404` or a `429` has to handle the rejected promise itself.

Because it listens to the **client's** event rather than wrapping `HttpClient`, it covers every request the
client makes — including the ones that never go through Angular's `HttpClient` at all. The reverse also holds: it
never sees a request that goes through `HttpClient` only, which is the channel of `toastInterceptorFn`.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="provideAtomicNotifications() does not replace toastInterceptorFn">
    The two channels are disjoint. `toastInterceptorFn` only sees requests going through Angular's `HttpClient`
    (`@sinequa/agent`, `@sinequa/assistant`, your own `HttpClient` calls); `provideAtomicNotifications()` only sees the
    atomic client's own requests, which the library issues without `HttpClient`. Registering both raises one toast per
    failure, never two — and dropping the interceptor silences the `HttpClient` failures. Keep it if **your own** code
    calls the Sinequa backend through `HttpClient`.
  </Accordion>

  <Accordion title="No toast ever shows, though failures are reported">
    The provider only emits `notify` events (a `notification` `CustomEvent` on `window`). If the application renders
    none of them, nothing appears. Register a toaster that listens to the event, or check that yours is mounted before
    the first request fails.
  </Accordion>

  <Accordion title="A 404, a 429 or a network error shows no toast">
    Deliberate: only `400`, `403`, `500` and `503` are worth interrupting the user. Handle the rejected promise in the
    calling code (a "not found" state, a retry) for any other failure.
  </Accordion>

  <Accordion title="A second backend's failures are never notified">
    `provideAtomicNotifications()` registered at the root only covers the root client's events. A
    [scope](./atomic-scope.mdx) serving a second backend has its own event subscribers — register
    `provideAtomicNotifications()` in the scope's own providers too if you want its failures notified.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Provide a client" href="./atomic-client.mdx">
    The client whose events this listens to.
  </Card>
</Cards>
