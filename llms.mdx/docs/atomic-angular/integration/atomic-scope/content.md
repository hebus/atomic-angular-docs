# Serve a second backend (/docs/atomic-angular/integration/atomic-scope)

Give a route or component subtree its own Sinequa client plus a self-contained copy of the library's stores and services, so two backends never leak into each other.



`provideAtomicClient()` alone is enough at the application root, where the root singletons already resolve to
the right client. A **route or component subtree that targets another backend** needs more: its own client
*and* its own copy of everything that holds per-backend state. `provideAtomicScope()` provides both.

## Minimal example [#minimal-example]

<CodeSample id="atomic-scope-basic" title="A route branch served by a second backend">
  <Lang value="angular">
    ```ts title="app.routes.ts" partial
    import { Routes } from "@angular/router";
    import { provideAtomicScope } from "@sinequa/atomic-angular";

    export const routes: Routes = [
      // The application root — first backend, provided at the application config level.
      { path: "research", loadComponent: () => import("./research/page") },

      // A branch served by a second backend, fully isolated.
      {
        path: "support",
        providers: [
          provideAtomicScope({
            app: "support",
            backendUrl: "https://support.example.com",
            storagePrefix: "support:",
          }),
        ],
        loadComponent: () => import("./support/page"),
      },
    ];
    ```
  </Lang>
</CodeSample>

Inside the `support` branch, `inject(AppStore)`, `inject(QueryService)`, `injectAtomicClient()` — everything
resolves to that scope's own instances, talking to the second backend with its own session. Outside it,
nothing changes.

## How it works [#how-it-works]

`ATOMIC_SCOPED_PROVIDERS` re-creates seven stores and thirteen services alongside the client — every one of
them is `providedIn: "root"`, so a store left at the root would keep the **root** client and silently read and
write the *first* backend from inside the second backend's subtree.

<Mermaid
  chart="flowchart TD
    Scope[&#x22;provideAtomicScope(config)&#x22;] --> Client[&#x22;atomicClientProvider(config) — the client&#x22;]
    Scope --> Stores[&#x22;AppStore, PrincipalStore, UserSettingsStore, ApplicationStore, AggregationsStore, QueryParamsStore, SelectionStore&#x22;]
    Scope --> Services[&#x22;ApplicationService, QueryService, AggregationsService, PreviewService, TextChunkService, AuditService, JsonMethodPluginService, ExportService, UserOverrideService, LabelService, AutocompleteService, QueryIntentService, UserProfileService&#x22;]
    Stores -- &#x22;constructed against&#x22; --> Client
    Services -- &#x22;constructed against&#x22; --> Client"
/>

`ThemeStore` is deliberately absent from that list: the theme is a user-interface preference, not backend
state, and both scopes should keep sharing it.

## Recipes [#recipes]

### Two backends side by side [#two-backends-side-by-side]

Two backends on the same screen is a component-tree question, not a routing one — `provideAtomicScope()` also
works in a component's `providers`.

<CodeSample id="atomic-scope-side-by-side" title="One panel, one backend">
  <Lang value="angular">
    ```ts title="support-panel.component.ts"
    import { Component } from "@angular/core";
    import { provideAtomicScope } from "@sinequa/atomic-angular";

    @Component({
      selector: "support-panel",
      providers: [provideAtomicScope({ app: "support", backendUrl: "https://support.example.com", storagePrefix: "support:" })],
      template: `<results />`,
    })
    export class SupportPanelComponent {}
    ```
  </Lang>
</CodeSample>

Each panel then runs its own search, with its own stores, against its own backend. Two instances of the
*same* component cannot be configured differently, though — Angular resolves `providers` per component
**type**, before any `input()` exists. Write one thin wrapper per backend, each with its own literal
configuration, both delegating to a shared presentational component.

### Composing the provider list yourself [#composing-the-provider-list-yourself]

`ATOMIC_SCOPED_PROVIDERS` is exported, for an application that wants to add its own scoped service alongside
the library's.

<CodeSample id="atomic-scope-compose" title="Adding an application-owned scoped service">
  <Lang value="angular">
    ```ts title="app.routes.ts" partial
    providers: [provideAtomicClient(config), ...ATOMIC_SCOPED_PROVIDERS, MyOwnScopedService]
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  &#x22;provideAtomicScope(config)&#x22;: {
    type: &#x22;AtomicClientConfig | (() => AtomicClientConfig)&#x22;,
    description: &#x22;An isolated client and the library's stores/services alongside it, as a plain Provider[] (not EnvironmentProviders).&#x22;,
  },
  ATOMIC_SCOPED_PROVIDERS: {
    type: &#x22;Provider[]&#x22;,
    description: &#x22;The provider list alone, for an application composing its own — see Recipes.&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A free function inside a scoped subtree hits the wrong backend">
    Anything calling a **free function** (`fetchQuery()`, `login()`, `globalConfig.…`) runs on the default client,
    whatever subtree it sits in — inside a scope, that means querying the *first* backend, silently, since the
    request still succeeds. Audit your own components for those calls; the library's own code never makes them.
  </Accordion>

  <Accordion title="provideAtomicScope() does not compile in a component's providers">
    `provideAtomicScope()` deliberately returns a plain `Provider[]`, not `EnvironmentProviders` — a component's
    `providers` is typed `Provider[]` and rejects `EnvironmentProviders`. `Route.providers`,
    `ApplicationConfig.providers` and `createEnvironmentInjector` all accept
    `Array<Provider | EnvironmentProviders>` and flatten nested arrays, so the routing form works either way; only
    the component form depends on this.
  </Accordion>

  <Accordion title="Two clients overwrite each other's session">
    Without distinct `storagePrefix` values, two clients read and write the same session storage keys and
    overwrite each other's token. Set `storagePrefix` as soon as two clients target different backends — including
    the default client if the application still uses it alongside a scoped one.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Provide a client" href="./atomic-client.mdx">
    The single-backend case, and the client every scope wraps.
  </Card>

  <Card title="Bootstrap the application" href="./bootstrap-app.mdx">
    Sign the user in and initialize the application's stores before the first view renders.
  </Card>
</Cards>
