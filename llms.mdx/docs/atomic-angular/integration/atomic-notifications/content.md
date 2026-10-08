# Notify failed requests as toasts (/docs/atomic-angular/integration/atomic-notifications)

Surface a failed backend request as a toast notification, without wrapping Angular's HttpClient.



`provideAtomicNotifications()` subscribes to the client's own `requestFailed` event and raises a toast for the
statuses worth telling the user about, replacing the retired `toastInterceptorFn`.

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

`400`, `403`, `500` and `503` raise a `notify.error(…)` toast; an impersonation rejected by the server
(`401` with `errorCode: 6`) gets its own explicit message. A plain `401` raises nothing — it is handled by the
authentication path, not shown to the user. Two sources of noise are silenced on top of that: a `400` on
`api/v2/user-profile` (the expected "not created yet" answer) and any failure on `api/v1/preview`, which the
preview panel surfaces itself.

Because it listens to the **client's** event rather than wrapping `HttpClient`, it covers every request the
client makes — including the ones that never go through Angular's `HttpClient` at all.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Registering both provideAtomicNotifications() and toastInterceptorFn produces duplicate toasts">
    `toastInterceptorFn` only ever saw requests going through Angular's `HttpClient`. Since the library issues every
    backend request through the atomic client now, the interceptor has nothing left to intercept for the library's
    own requests — keep it only if **your own** code still calls the Sinequa backend through `HttpClient` directly.
    It stays exported and functional, and will be removed in a future major version.
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
