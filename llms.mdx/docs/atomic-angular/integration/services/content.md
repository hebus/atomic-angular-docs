# Cross-cutting services (/docs/atomic-angular/integration/services)

Registering your own route components, sending custom audit events, calling a JsonMethod plugin, and reading the route the user navigated away from.



## `ROUTE_COMPONENTS` — registering components for dynamic routes [#route_components--registering-components-for-dynamic-routes]

<CodeSample id="services-route-components" title="Registering the components bootstrapApp's route creation needs">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig } from "@angular/core";
    import { ROUTE_COMPONENTS } from "@sinequa/atomic-angular";
    import { AllResultsComponent } from "./all-results.component";
    import { SearchLayoutComponent } from "./search-layout.component";

    export const appConfig: ApplicationConfig = {
      providers: [
        {
          provide: ROUTE_COMPONENTS,
          useValue: [
            { path: "search", component: SearchLayoutComponent, isRoot: true },
            { path: "all", component: AllResultsComponent },
          ],
        },
      ],
    };
    ```
  </Lang>
</CodeSample>

`ApplicationService` (injected internally by [`bootstrapApp`](./bootstrap-app.mdx) when `createRoutes: true`)
reads this token to know which component renders each tab of the query's `tabSearch` configuration, and which
one is the root layout (`isRoot: true`) wrapping the whole `search` route.

## `AuditService` — sending audit events by hand [#auditservice--sending-audit-events-by-hand]

<CodeSample id="services-audit" title="A custom audit event on a user action">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, inject } from "@angular/core";
    import { AuditService } from "@sinequa/atomic-angular";

    @Component({ selector: "sample-component", template: `` })
    export class SampleComponent {
      private readonly audit = inject(AuditService);

      protected onExport() {
        this.audit.notify({ type: "Search_Export_Results" });
      }
    }
    ```
  </Lang>
</CodeSample>

`notifyDocument(type, doc, resultOrId, parameters?, rfmParameters?)` is the one most applications reach for
directly — it also listens for the tab losing and regaining visibility right after the call, to notify a
`Navigation_Return` event if the user opened the document and came back within a second. `notify()` is a no-op
while the client reports no session (`client.auth.isAuthenticated()` is false).

## `JsonMethodPluginService` — calling a JsonMethod plugin [#jsonmethodpluginservice--calling-a-jsonmethod-plugin]

<CodeSample id="services-json-method-plugin" title="Posting to a custom plugin">
  <Lang value="angular">
    ```ts title="sample.component.ts" partial
    import { JsonMethodPluginService } from "@sinequa/atomic-angular";

    private readonly plugin = inject(JsonMethodPluginService);

    this.plugin.post("myPlugin", { someParam: "value" }).subscribe((result) => { /* ... */ });
    ```
  </Lang>
</CodeSample>

`post`/`get` both call the client's own `http` transport (`plugin/<method>`) rather than Angular's
`HttpClient` — a plugin call issued this way is already covered by the client's own request/response handling
(interface language, audit metadata, 401 recovery), with nothing further to register.

## `NavigationService` — the URL to return to after sign-in [#navigationservice--the-url-to-return-to-after-sign-in]

<CodeSample id="services-navigation" title="Redirecting back where the user came from">
  <Lang value="angular">
    ```ts title="sample.component.ts" partial
    import { NavigationService } from "@sinequa/atomic-angular";

    private readonly navigation = inject(NavigationService);

    // null while the current URL IS an authentication screen (login, logout, change-password) — never
    // redirect a signed-in user back onto one of those.
    const returnUrl = this.navigation.urlAfterNavigation;
    ```
  </Lang>
</CodeSample>

`navigationEnd$` is the lower-level piece underneath it — an `Observable<NavigationEnd>` that also notifies
`AuditService.notifyRouteChange()` once per distinct route (query-parameter-only changes on the same route,
which make up most of a search session, do not re-notify).

## Options [#options]

<TypeTable
  type="{
  ROUTE_COMPONENTS: {
    type: &#x22;InjectionToken<ComponentMapping[]>&#x22;,
    description: 'ComponentMapping = { path: string; component: Type<unknown>; isRoot?: boolean }. Defaults to [].',
  },
  &#x22;AuditService.notify(event)&#x22;: { type: &#x22;(event: AuditEvents) => void&#x22;, description: &#x22;The low-level call every other method funnels through.&#x22; },
  &#x22;AuditService.notifyDocument(...)&#x22;: { type: &#x22;(type, doc, resultOrId, parameters?, rfmParameters?) => void&#x22;, description: &#x22;The one most applications call directly.&#x22; },
  &#x22;JsonMethodPluginService.post/get&#x22;: { type: &#x22;(method: string, query, options?) => Observable<any>&#x22;, description: &#x22;options is @sinequa/atomic's RequestOptions, not HttpClient's.&#x22; },
  &#x22;NavigationService.urlAfterNavigation&#x22;: { type: &#x22;string | null&#x22;, description: &#x22;null while the current route is an authentication screen.&#x22; },
  &#x22;NavigationService.navigationEnd$&#x22;: { type: &#x22;Observable<RouterEvent>&#x22;, description: &#x22;Deduped per distinct route, shareReplay(1).&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A route component never renders after createRoutes runs">
    Check its `path` was actually registered on `ROUTE_COMPONENTS` — `ApplicationService.createRoutes()` falls back
    silently to the layout component (`isRoot: true`) for any tab whose path has no matching entry, which reads as
    the wrong content rather than an error.
  </Accordion>

  <Accordion title="AppService or PrincipalService can't be found, or are marked deprecated">
    Both live under `services/deprecated/` now — `AppService` and `PrincipalService` are superseded by
    `AppStore`/`PrincipalStore` (the `@ngrx/signals` stores, exported from the same barrel). New code should inject
    the store directly; the deprecated services are kept only for applications not yet migrated.
  </Accordion>
</Accordions>
