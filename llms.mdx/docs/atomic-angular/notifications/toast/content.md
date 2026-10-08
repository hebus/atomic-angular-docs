# Toast interceptor (/docs/atomic-angular/notifications/toast)

An HttpInterceptorFn that turns a failed HttpClient request into a toast for the status codes worth telling the user about, without wrapping HttpClient itself.



`toastInterceptorFn` watches the Angular `HttpClient` channel and raises a toast (through `@sinequa/atomic`'s
notification system) for the handful of error statuses a user should actually hear about — leaving every other
failure to whatever already handles it.

<Callout title="Two interceptors, disjoint requests">
  [`provideAtomicNotifications()`](../integration/atomic-notifications.mdx) does the same job for the Sinequa
  client's **own** requests, by listening to its `requestFailed` event — a different channel entirely. The two
  cover disjoint request sets (the client's, versus `HttpClient` requests from `@sinequa/agent`,
  `@sinequa/assistant` or your own code), so registering both raises exactly one toast per failure, never two.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="toast-interceptor-basic" title="Registering it alongside the HttpClient provider">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig } from "@angular/core";
    import { provideHttpClient, withInterceptors } from "@angular/common/http";
    import { toastInterceptorFn } from "@sinequa/atomic-angular";

    export const appConfig: ApplicationConfig = {
      providers: [provideHttpClient(withInterceptors([toastInterceptorFn]))],
    };
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

Requests to `api/v1/audit.notify` pass through untouched — auditing itself must never trigger a notification
about a failed audit call. Every other request is watched for:

* **`401` during an active user-override**, with a specific server error code — shown once as "Cannot override
  user: Unauthorized access", then a request-scoped flag suppresses a repeat toast for the same request context.
* **`400`, `403`, `500`, `503`** — shown as `${statusText}: ${errorCodeText} — ${errorMessage}`, with two
  exceptions: a `400` from `api/v2/user-profile` (handled by the caller instead) and any status from
  `api/v1/preview` (preview failures are shown in the preview surface itself, not as a toast).

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A preview request failure never shows a toast">
    Deliberate — every status code from a URL containing `api/v1/preview` is excluded, on the assumption that the
    preview surface already reports its own failure state. If you need a toast for a preview-related request of
    your own, route it through a different endpoint or handle the error yourself.
  </Accordion>

  <Accordion title="A 400 from the user-profile endpoint never shows a toast">
    Also deliberate — `api/v2/user-profile` requests are excluded so the caller (typically a form) can show the
    error inline instead of as a transient toast.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Notify failed requests as toasts (client channel)" href="../integration/atomic-notifications.mdx">
    The equivalent for the Sinequa client's own requests, on a different channel.
  </Card>
</Cards>
