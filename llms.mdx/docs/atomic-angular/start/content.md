# Getting started (/docs/atomic-angular/start)

Install @sinequa/atomic-angular, connect a client, sign a user in, and render a first authenticated search screen with a facet.



This walks through the whole path from an empty Angular application to a first authenticated screen showing
search results and a facet. Each step links to the page that covers it in full — this tutorial only shows the
minimum needed to reach the next step.

<Callout title="Prerequisite — a Sinequa server">
  You need a Sinequa server reachable from the browser, with at least one query web service configured. Nothing
  here works against a mock — the client, the guard and the query service all make real HTTP requests.
</Callout>

<Steps>
  <Step>
    ### Install [#install]

    `@sinequa/atomic-angular` composes two lower-level libraries — `@sinequa/galactik` (presentation) and
    `@sinequa/atomic` (the framework-agnostic client). Both are peer dependencies, alongside `@angular/aria`.

    <CodeSample id="start-install" title="Install the library and its peer dependencies">
      <Lang value="angular">
        ```bash title="terminal" partial
        npm install @sinequa/atomic-angular @sinequa/atomic @sinequa/galactik @angular/aria
        ```
      </Lang>
    </CodeSample>

    `chart.js`/`chartjs-chart-matrix` and `markdown-it` are also peer dependencies, but only needed if you use the
    Chart.js-based [data visualization components](./dataviz/index.mdx) or the preview's Markdown fallback —
    skip them otherwise.
  </Step>

  <Step>
    ### Provide a client and bootstrap the application [#provide-a-client-and-bootstrap-the-application]

    Every store, service and component reaches the backend through one client. Registering it and bootstrapping
    the application are two providers in `app.config.ts`.

    <CodeSample id="start-bootstrap" title="app.config.ts">
      <Lang value="angular">
        ```ts title="app.config.ts"
        import { ApplicationConfig, provideAppInitializer } from "@angular/core";
        import { bootstrapApp, provideAtomicClient } from "@sinequa/atomic-angular";

        export const appConfig: ApplicationConfig = {
          providers: [
            // backendUrl may be omitted — bootstrapApp derives it from the browser URL.
            provideAtomicClient({ app: "my-app" }),
            provideAppInitializer(() => bootstrapApp({ createRoutes: true })),
          ],
        };
        ```
      </Lang>
    </CodeSample>

    `bootstrapApp()` resolves the authentication mode, signs the user in if a session already exists, and
    initializes the application's stores before the first view renders — see [Provide a
    client](./integration/atomic-client.mdx) and [Bootstrap the application](./integration/bootstrap-app.mdx)
    for the full contract, including what to do when part of the configuration is only known at runtime.
  </Step>

  <Step>
    ### Authenticate the user [#authenticate-the-user]

    Route `/login` and `/logout` to `AuthPageComponent` — it switches between the credentials form,
    change-password and forgot-password based on the route and the `mode` query param — and guard every protected
    route with `AuthGuard()`.

    <CodeSample id="start-routes" title="app.routes.ts">
      <Lang value="angular">
        ```ts title="app.routes.ts"
        import { AuthGuard, AuthPageComponent, ErrorComponent } from "@sinequa/atomic-angular";
        import type { Routes } from "@angular/router";
        import { SearchComponent } from "./search.component";

        export const routes: Routes = [
          { path: "login", component: AuthPageComponent },
          { path: "logout", component: AuthPageComponent },
          { path: "error", component: ErrorComponent },
          { path: "search", component: SearchComponent, canActivate: [AuthGuard()] },
          { path: "", redirectTo: "search", pathMatch: "full" },
        ];
        ```
      </Lang>
    </CodeSample>

    `AuthGuard()` checks the session, loads the signed-in user, and — in `credentials` mode — redirects to
    change-password when the session's password has expired; it never guards `/login`/`/logout` themselves. See
    [Sign In](./auth/sign-in.mdx) for embedding the form outside a full page, and [Authentication
    flows](./auth/authentication-flows.mdx) for how the guard, the interceptor, sign-in and logout fit together
    end to end.
  </Step>

  <Step>
    ### Render a first search screen [#render-a-first-search-screen]

    `QueryService` runs the search and exposes the result as a signal; `<Aggregation>` renders one facet from that
    same result and turns a click into an applied filter.

    <CodeSample id="start-search" title="search.component.ts">
      <Lang value="angular">
        ```ts title="search.component.ts"
        import { Component, inject } from "@angular/core";
        import { AggregationComponent, QueryService } from "@sinequa/atomic-angular";

        @Component({
          selector: "search-page",
          imports: [AggregationComponent],
          template: `
            <input type="search" (change)="search($any($event.target).value)" placeholder="Search…" />

            <Aggregation name="Sources" column="sourcestr4" [showFiltersCount]="true" />

            @if (queryService.failure(); as error) {
              <p>Search failed: {{ error.message }}</p>
            } @else if (queryService.result().rowCount === 0) {
              <p>No results</p>
            } @else {
              <ul>
                @for (record of queryService.result().records; track record.id) {
                  <li>{{ record.title }}</li>
                }
              </ul>
            }
          `,
        })
        export class SearchComponent {
          protected readonly queryService = inject(QueryService);

          constructor() {
            this.queryService.search({ text: "" }).subscribe();
          }

          protected search(text: string) {
            this.queryService.search({ text }).subscribe();
          }
        }
        ```
      </Lang>
    </CodeSample>

    Clicking a value in the "Sources" facet applies a filter to the shared query state and re-runs the search on
    its own — nothing in `SearchComponent` has to react to that click by hand. See [Filtering
    results](./filters/aggregation.mdx) for facet types, controlled mode and custom item templates, and
    [Query](./results/query.mdx) for paging, running several queries in parallel, and telling a failed request
    apart from a genuine zero-match.
  </Step>
</Steps>

## What's next [#whats-next]

<Cards>
  <Card title="Authentication flows" href="./auth/authentication-flows.mdx">
    How the guard, the interceptor, sign-in and logout fit together end to end.
  </Card>

  <Card title="Filtering results" href="./filters/aggregation.mdx">
    Facet types, controlled mode, custom item templates, and every input and pitfall in depth.
  </Card>

  <Card title="Provide a client" href="./integration/atomic-client.mdx">
    Configuration resolved at runtime, reading the client without redirecting, and serving a second backend.
  </Card>

  <Card title="Query" href="./results/query.mdx">
    Paging, running several queries in parallel, and the result/failure contract in full.
  </Card>
</Cards>
