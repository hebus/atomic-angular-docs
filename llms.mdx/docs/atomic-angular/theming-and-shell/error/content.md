# Error (/docs/atomic-angular/theming-and-shell/error)

A full-page error state with an optional detail message read from the "message" query param, and a way back to a fresh sign-in attempt.



`<ErrorComponent>` is a route target — mount it on an `"error"` path and navigate to it (optionally with a
`message` query param) whenever the application cannot continue.

## Minimal example [#minimal-example]

<CodeSample id="error-basic" title="Registering the error route">
  <Lang value="angular">
    ```ts title="app.routes.ts"
    import { Routes } from "@angular/router";
    import { ErrorComponent } from "@sinequa/atomic-angular";

    export const routes: Routes = [{ path: "error", component: ErrorComponent }];
    ```

    ```ts title="somewhere-else.ts" partial
    // Navigating there with a detail message:
    router.navigate(["error"], { queryParams: { message: err.message } });
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

The page reads `message` from the current route's query params once, at construction — it is not reactive to
further navigation while the component stays mounted. The single action button, "Go to homepage", navigates to
`/` and then calls `window.location.reload()`: a full reload, not an in-place retry, so a fresh application
bootstrap (and a fresh sign-in attempt) starts from scratch.

## Options [#options]

<TypeTable
  type="{
  &#x22;goHome()&#x22;: { type: &#x22;() => void&#x22;, description: 'Navigates to &#x22;/&#x22;, then reloads the page.' },
  message: { type: &#x22;string | undefined&#x22;, description: 'Read once from the &#x22;message&#x22; query param at construction; undefined shows no detail box.' },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Calling a reload() method on ErrorComponent — it doesn't exist">
    The action is `goHome()`, not `reload()` — and it does more than reload: it navigates to `/` first, then calls
    `window.location.reload()`, which is a full application re-bootstrap rather than reloading the current route in
    place.
  </Accordion>
</Accordions>
