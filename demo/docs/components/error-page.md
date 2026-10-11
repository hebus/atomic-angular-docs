# Error Page

Full-page error screen shown when the application cannot continue (for instance when authentication fails at bootstrap). It displays a generic "Something went wrong" message, an optional details block, and a "Go to homepage" button that navigates to `/` and then reloads the application to start a fresh authentication attempt.

The details come from the `message` **query param** of the current route, so a caller can route to the page with the reason:

```ts
router.navigate(["error"], { queryParams: { message: err.message } });
```

## Imports

```ts
import { ErrorComponent } from "@sinequa/atomic-angular";
```

## Basic

Without a `message` query param, only the generic text is shown.

The component is a full page: its host is `min-h-dvh grid w-full place-content-center`. To embed it in a frame — as the demos on this page do — neutralise the viewport height with the Tailwind important modifier, `class="min-h-0!"`.

<demo-error-page-basic></demo-error-page-basic>

```html
<div class="rounded-md border">
  <error-component class="min-h-0!" />
</div>
```

## With a message

When the `message` query param is a non-blank string, a "Details" block is rendered below the text (with `role="alert"`).

<demo-error-page-message></demo-error-page-message>

```html
<!-- route: /error?message=Authentication%20failed -->
<error-component />
```

## Notes

- The demos provide a stub `ActivatedRoute` (a snapshot carrying the query params) on the demo component, so nothing is navigated or fetched.
- The "Go to homepage" button really calls `router.navigate(["/"])` then `window.location.reload()`: clicking it in this demo reloads the demo app.
- The message is read once, when the component is created, not tracked afterwards.
