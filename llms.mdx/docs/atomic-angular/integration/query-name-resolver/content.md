# Default query name resolver (/docs/atomic-angular/integration/query-name-resolver)

An Angular route resolver that supplies the application's default query name to a route with no explicit one.



<CodeSample id="query-name-resolver-basic" title="Registered on a route">
  <Lang value="angular">
    ```ts title="app.routes.ts" partial
    import { Routes } from "@angular/router";
    import { queryNameResolver } from "@sinequa/atomic-angular";

    export const routes: Routes = [
      { path: "results", resolve: { queryName: queryNameResolver }, loadComponent: () => import("./results/page") },
    ];
    ```
  </Lang>
</CodeSample>

`queryNameResolver` reads `AppStore.getDefaultQuery()` and resolves to its `name`, or an empty string if the
application has no default query configured yet — it never throws, so a route that resolves it does not need
to guard against a missing application configuration on its own.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The resolved queryName is an empty string on the first navigation">
    `AppStore` must already be initialized (`AppStore.initialize()`, which `bootstrapApp`/`ApplicationService`
    call) before this resolver runs, or `getDefaultQuery()` has nothing to read yet. A route protected by
    [`AuthGuard`](../auth/auth-guard.mdx) and reached only after bootstrap completes does not hit this; a resolver
    registered on a route that can be reached before bootstrap finishes can.
  </Accordion>
</Accordions>
