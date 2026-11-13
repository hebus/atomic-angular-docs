# Cross-cutting utilities (/docs/atomic-angular/integration/utils)

Loose functions with no search-specific meaning — building a query from the current route, reading route metadata, running code in a Web Worker, and a fetch wrapper with baseline error handling.



## `buildQuery` / `getQueryNameFromRoute` — a query from the current route [#buildquery--getquerynamefromroute--a-query-from-the-current-route]

<CodeSample id="utils-build-query" title="A query seeded from the URL and the active route">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, inject } from "@angular/core";
    import { buildQuery } from "@sinequa/atomic-angular";
    import { fetchQuery } from "@sinequa/atomic";

    @Component({ selector: "sample-component", template: `` })
    export class SampleComponent {
      async search() {
        // Merges (in order): URL params → the route's queryName data → your overrides.
        const query = buildQuery({ text: "quarterly report" });
        return fetchQuery(query);
      }
    }
    ```
  </Lang>
</CodeSample>

`buildQuery(partial)` resolves the query's `name` by checking, in order: `partial.name`,
`getQueryNameFromRoute()` (the active route's `queryName` route data, or the current tab's `t` query
parameter matched against the app's `search` route children), then the URL's own stored parameters — and
merges everything else from the URL underneath your `partial`. Both must run inside an injection context.

## `getCurrentPath` / `getCurrentQueryName` — reading route metadata [#getcurrentpath--getcurrentqueryname--reading-route-metadata]

<CodeSample id="utils-current-route" title="The active route's query name">
  <Lang value="angular">
    ```ts title="sample.component.ts" partial
    import { getCurrentQueryName } from "@sinequa/atomic-angular";

    // Inside an injection context:
    const queryName = getCurrentQueryName(); // reads Router.config, matched against the current path
    ```
  </Lang>
</CodeSample>

Distinct from `getQueryNameFromRoute()` above: this one matches the current URL **path** against the static
`Router.config`, rather than walking the live `ActivatedRoute` tree — useful outside a component that has an
injected `ActivatedRoute` of its own.

## `InlineWorker` — running a function in a Web Worker [#inlineworker--running-a-function-in-a-web-worker]

<CodeSample id="utils-inline-worker" title="Offloading a computation">
  <Lang value="angular">
    ```ts title="sample.component.ts" partial
    import { InlineWorker } from "@sinequa/atomic-angular";

    const worker = new InlineWorker(() => {
      // This function's body is stringified and run as the worker's whole script —
      // it cannot close over anything from the surrounding scope.
      self.onmessage = (e) => self.postMessage(e.data * 2);
    });

    worker.onmessage().subscribe((event) => console.log(event.data));
    worker.postMessage(21);
    worker.terminate();
    ```
  </Lang>
</CodeSample>

`onmessage()`/`onerror()` return RxJS `Observable`s rather than plain callbacks. Throws synchronously if
`Worker` is unavailable in the current environment (a non-browser SSR context, most often).

## `withFetch` — a fetch wrapper with baseline error handling [#withfetch--a-fetch-wrapper-with-baseline-error-handling]

<CodeSample id="utils-with-fetch" title="A raw fetch call with 401/404 handling">
  <Lang value="angular">
    ```ts title="sample.component.ts" partial
    import { withFetch } from "@sinequa/atomic-angular";

    const data = await withFetch(() => fetch("/api/data").then((res) => res.json()), injector);
    ```
  </Lang>
</CodeSample>

Catches the callback's rejection and logs it; on a `401` it also shows a warning toast and, if an `injector`
was passed, re-triggers the sign-in flow. Returns `undefined` on any error rather than rethrowing — check for
`undefined` at the call site instead of wrapping the call in `try`/`catch`.

## Options [#options]

<TypeTable
  type="{
  &#x22;buildQuery(partial?)&#x22;: { type: &#x22;Partial<Query>&#x22;, description: &#x22;Merges URL params, route queryName, and partial into a complete Query.&#x22; },
  &#x22;getQueryNameFromRoute()&#x22;: { type: &#x22;() => string | undefined&#x22;, description: &#x22;Walks the live ActivatedRoute tree for a queryName.&#x22; },
  &#x22;getCurrentPath()&#x22;: { type: &#x22;() => string | undefined&#x22;, description: &#x22;The current ActivatedRoute snapshot's URL segments, joined.&#x22; },
  &#x22;getCurrentQueryName()&#x22;: { type: &#x22;() => string | undefined&#x22;, description: &#x22;Matches the current path against the static Router.config.&#x22; },
  &#x22;new InlineWorker(fn)&#x22;: { type: &#x22;(fn: () => void) => InlineWorker&#x22;, description: &#x22;fn's body becomes the whole worker script — no closures.&#x22; },
  &#x22;withFetch(callback, injector?)&#x22;: { type: &#x22;(() => Promise<T>, injector?) => Promise<T | undefined>&#x22;, description: &#x22;undefined on any error; injector enables 401 → sign-in.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="InlineWorker throws '(intermediate value) is not a function' at runtime">
    The worker function's body is extracted by calling `.toString()` on it and stripping the outer `function(){ }`
    wrapper — it never actually closes over the surrounding scope, so any reference to a variable, import, or
    `this` from outside the function is simply undefined inside the worker. Write the worker function as fully
    self-contained, using only what a Web Worker's global scope (`self`, `postMessage`) provides.
  </Accordion>

  <Accordion title="withFetch swallows an error I needed to react to">
    By design — it returns `undefined` on every error path rather than rethrowing, logging the error instead (plus
    a toast on `401`). If the caller needs to distinguish failure from a legitimately empty result, call the
    underlying `fetch`/API function directly and handle the rejection yourself instead of wrapping it in
    `withFetch`.
  </Accordion>

  <Accordion title="debouncedSignal is still imported somewhere">
    `debouncedSignal` is `@deprecated` — Angular's own `debounced()` (`@angular/core`, experimental since v22)
    covers the same need natively. It returns a `Resource<T>`, not a plain `Signal<T>`: read the debounced value
    through `.value()` rather than calling it directly.

    ```ts title="migration" partial
    // Before
    import { debouncedSignal } from "@sinequa/atomic-angular";
    const debouncedInput = debouncedSignal(input, 300);
    effect(() => console.log(debouncedInput()));

    // After
    import { debounced } from "@angular/core";
    const debouncedInput = debounced(() => input(), 300);
    effect(() => console.log(debouncedInput.value()));
    ```
  </Accordion>
</Accordions>
