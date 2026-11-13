# Bootstrap the application (/docs/atomic-angular/integration/bootstrap-app)

Sign the user in and initialize the application's stores — and, optionally, its dynamic routes — before the first view renders.



`bootstrapApp()` is the one call most applications register as an `provideAppInitializer`: it resolves the
authentication mode, signs the user in, and initializes the application's stores in the right order, so no
component has to guard against a half-initialized application.

## Minimal example [#minimal-example]

<CodeSample id="bootstrap-app-basic" title="Registered as an application initializer">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig, provideAppInitializer } from "@angular/core";
    import { bootstrapApp, provideAtomicClient } from "@sinequa/atomic-angular";

    export const appConfig: ApplicationConfig = {
      providers: [
        provideAtomicClient({ app: "my-app" }),
        provideAppInitializer(() => bootstrapApp({ createRoutes: true })),
      ],
    };
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Init[&#x22;provideAppInitializer&#x22;] --> Config[&#x22;client.initializeConfig() — resolves backendUrl + authMode&#x22;]
    Config -- &#x22;failed&#x22; --> ErrorPage[&#x22;navigate to /error&#x22;]
    Config -- &#x22;ok&#x22; --> Recovery[&#x22;wire client.config.auth.recoverFromUnauthorized to signIn()&#x22;]
    Recovery --> SignIn[&#x22;signIn()&#x22;]
    SignIn -- &#x22;not authenticated&#x22; --> Done1[&#x22;resolve(false)&#x22;]
    SignIn -- &#x22;authenticated&#x22; --> AppInit[&#x22;ApplicationService.initialize(createRoutes)&#x22;]
    AppInit -- &#x22;failed&#x22; --> ErrorPage
    AppInit -- &#x22;ok&#x22; --> Done2[&#x22;resolve(true)&#x22;]"
/>

Resolving `backendUrl` and the authentication mode **before** signing in is what removes a long-standing
bootstrap race: every store or service that derives its API URL from the client's configuration is only
constructed *after* that resolution, so none of them can capture an unresolved backend URL. `bootstrapApp` also
wires the client's `recoverFromUnauthorized` hook to `signIn()`, so a `401` on any of the client's own requests
re-authenticates and replays the request once — the same recovery the HTTP interceptors provide for requests
the client never sees (see [Cross-cutting interceptors](./interceptors.mdx)).

Once signed in, `ApplicationService` reads what every view needs — the app configuration, the principal and
the user settings — **in parallel**: none depends on another's answer, only on the session, so they take one
round trip rather than three. It then applies them to `AppStore`, `PrincipalStore` and `UserSettingsStore` in
that order, resetting `QueryParamsStore` between the principal and the settings. A failed read is handled
exactly as before: the configuration and the principal stop the start-up, the settings fall back to their
defaults.

`bootstrapApp` keeps the client's `uiLanguage` on the interface language rather than a value fixed at
start-up: it follows `TranslocoService.langChanges$` for as long as the application runs, which is also what
the request body interceptor and the `syslang`/`translocoDate` pipes read on their own side (see
[Cross-cutting pipes](./pipes.mdx)).

## Recipes [#recipes]

### Read the start-up data in one request [#read-the-start-up-data-in-one-request]

Without it, a signed-in start-up costs three requests sent together — `GET api/v1/app`,
`GET api/v1/principal`, `GET api/v1/user-settings`. Behind a backend-for-frontend (BFF) that makes those calls
itself, server-side, and answers them all at once — mint-dev-server's BFF answers `GET /bff/bootstrap` —
`provideStartupAggregation()` replaces all three with a single request. Nothing else changes in the
application: the stores are filled exactly as before.

Add it only when the application is actually served behind such an endpoint. Against a Sinequa server reached
directly, it brings nothing and costs a round trip on every start-up: the request answers `404`, a warning is
logged, and only then do the parallel reads start. Those parallel reads are the default — they need no
provider.

<CodeSample id="bootstrap-app-aggregation" title="One request for configuration, principal and settings">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig, provideAppInitializer } from "@angular/core";
    import { bootstrapApp, provideAtomicClient, provideStartupAggregation } from "@sinequa/atomic-angular";

    export const appConfig: ApplicationConfig = {
      providers: [
        provideAtomicClient({ app: "my-app" }),
        // Defaults to "bff/bootstrap" on the backend.
        provideStartupAggregation(),
        provideAppInitializer(() => bootstrapApp({ createRoutes: true })),
      ],
    };
    ```
  </Lang>
</CodeSample>

The endpoint answers with a `StartupData`: `app`, `principal` and `userSettings`, each one a `StartupPart` — `{ "ok": true, "value": … }` when the BFF read it, `{ "ok": false, "status": … }`
when it could not. Any other key — mint-dev-server's BFF also sends `userProfile` — is ignored: the profile is
read when the account settings panel opens, as without the provider. Here the settings call failed on the
server:

```json title="GET bff/bootstrap → 200"
{
  "app": { "ok": true, "value": { "name": "my-app", "queries": { "…": "…" } } },
  "principal": { "ok": true, "value": { "userId": "jdoe", "name": "Jane Doe", "…": "…" } },
  "userSettings": { "ok": false, "status": 503 }
}
```

With that answer, `AppStore` and `PrincipalStore` take their value without a request, and `GET
api/v1/user-settings` is sent from the browser: every part the BFF could not read — or that its answer lacks —
is fetched the usual way, all of them in parallel, and a failure of that read is handled as before. Only the
browser's own reads can fail the start-up: the `status` or `error` a part reports is never treated as a
failure.

If the request itself fails, or answers no data at all (an empty `204`), the start-up does not stop: a warning
is logged and it falls back to the three parallel reads — one round trip later. A failed request is also a
failed request of the client: with [`provideAtomicNotifications()`](./atomic-notifications.mdx), a `400`, `403`, `500`
or `503` shows an error toast, so a BFF that is down is visible to the user.

<Mermaid
  chart="flowchart TD
    Source[&#x22;GET bff/bootstrap&#x22;] -- &#x22;failed, or no data&#x22; --> Parallel[&#x22;the three reads, in parallel&#x22;]
    Source -- &#x22;answered&#x22; --> Parts{&#x22;each part&#x22;}
    Parts -- &#x22;ok&#x22; --> Hydrate[&#x22;store.hydrate(value)&#x22;]
    Parts -- &#x22;not read, or missing&#x22; --> Fetch[&#x22;read from the browser, in parallel with the others&#x22;]"
/>

### Use another endpoint path, or opt in per environment [#use-another-endpoint-path-or-opt-in-per-environment]

The argument is the endpoint's path on the backend, resolved like every request of the client — relative to
its `backendUrl`. Since the provider is an ordinary `EnvironmentProviders`, an application that runs both with
and without a BFF can add it conditionally.

<CodeSample id="bootstrap-app-aggregation-path" title="A custom path, only where a BFF is deployed">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig, provideAppInitializer } from "@angular/core";
    import { bootstrapApp, provideAtomicClient, provideStartupAggregation } from "@sinequa/atomic-angular";

    import { environment } from "./environment";

    export const appConfig: ApplicationConfig = {
      providers: [
        provideAtomicClient({ app: "my-app" }),
        // GET <backendUrl>/gateway/startup — and nothing at all where there is no BFF.
        ...(environment.hasBff ? [provideStartupAggregation("gateway/startup")] : []),
        provideAppInitializer(() => bootstrapApp({ createRoutes: true })),
      ],
    };
    ```

    ```ts title="environment.ts"
    export const environment = { hasBff: true };
    ```
  </Lang>
</CodeSample>

A failing endpoint never breaks the start-up, but it delays it: the condition is what spares the backends
without BFF a failed request and an extra round trip on every start-up.

### Read the start-up data from somewhere else [#read-the-start-up-data-from-somewhere-else]

`provideStartupAggregation()` is a shortcut for one `STARTUP_DATA_SOURCE` — a function returning a
`Promise<StartupData>` that `ApplicationService` calls on every initialization: at start-up, and again after
the sign-in form or a password change. Provide the token yourself to read the data some other way: here, from
a JSON block the server inlined into `index.html`, which costs no request at all. The same rules apply: a part
marked `{ ok: false }`, or missing, is read the usual way, and a source that throws makes the start-up fall back
to the parallel reads.

The inlined data describes the session the page was rendered for, so the source reads it once and removes it:
after a sign-out and a sign-in — possibly as someone else — it throws, and the three parts are read again.

<CodeSample id="bootstrap-app-startup-source" title="Start-up data inlined in the page by the server">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig, provideAppInitializer } from "@angular/core";
    import { bootstrapApp, provideAtomicClient, STARTUP_DATA_SOURCE, StartupData } from "@sinequa/atomic-angular";

    // index.html, rendered by the server:
    // <script id="startup-data" type="application/json">{ "app": { "ok": true, "value": … }, … }</script>
    async function readInlinedStartupData(): Promise<StartupData> {
      const script = document.getElementById("startup-data");
      const json = script?.textContent;
      // Only valid for the first initialization: a later one may be another user's.
      script?.remove();
      // Throwing falls back to the three parallel reads.
      if (!json) throw new Error("No inlined start-up data");
      return JSON.parse(json) as StartupData;
    }

    export const appConfig: ApplicationConfig = {
      providers: [
        provideAtomicClient({ app: "my-app" }),
        { provide: STARTUP_DATA_SOURCE, useValue: readInlinedStartupData },
        provideAppInitializer(() => bootstrapApp({ createRoutes: true })),
      ],
    };
    ```
  </Lang>
</CodeSample>

A source does not have to provide every part. One that only knows the application configuration — cached from
a previous visit, say — answers the others with `{ ok: false }` (or leaves them out), and they are read the
usual way, in parallel:

<CodeSample id="bootstrap-app-startup-source-partial" title="A source that only provides the configuration">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig, provideAppInitializer } from "@angular/core";
    import type { CCApp } from "@sinequa/atomic";
    import { bootstrapApp, provideAtomicClient, STARTUP_DATA_SOURCE, StartupData } from "@sinequa/atomic-angular";

    async function cachedAppOnly(): Promise<StartupData> {
      const cached = sessionStorage.getItem("my-app:config");
      return {
        app: cached ? { ok: true, value: JSON.parse(cached) as CCApp } : { ok: false },
        // Not read here: both are read the usual way, together.
        principal: { ok: false },
        userSettings: { ok: false },
      };
    }

    export const appConfig: ApplicationConfig = {
      providers: [
        provideAtomicClient({ app: "my-app" }),
        { provide: STARTUP_DATA_SOURCE, useValue: cachedAppOnly },
        provideAppInitializer(() => bootstrapApp({ createRoutes: true })),
      ],
    };
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  createRoutes: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;Whether ApplicationService builds dynamic routes for the query's tabs after initialization.&#x22;,
  },
}"
/>

`provideStartupAggregation(endpoint?)` takes the endpoint's path on the backend, `"bff/bootstrap"` by default.
To read the start-up data some other way, provide `STARTUP_DATA_SOURCE` with a function returning a
`Promise<StartupData>`.

The promise `bootstrapApp` returns never rejects — it resolves `true` once fully initialized, `false` when the
user is not authenticated or an error occurred (already logged and, for a fatal error, already routed to
`/error`).

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A service reads globalConfig.backendUrl as undefined during bootstrap">
    Something was injected **before** `bootstrapApp` resolved the configuration — most often
    `inject(ApplicationService)` called eagerly in a factory, rather than left for `bootstrapApp` to inject
    internally. `client.initializeConfig()` must run, and set `backendUrl`, before any service or store that reads
    it is constructed. The deprecated `withBootstrapApp(applicationService, options)` signature existed for exactly
    the pattern that broke this — migrate to `bootstrapApp(options)` alone and let it inject `ApplicationService`
    itself.
  </Accordion>

  <Accordion title="A recovery hook seems to hang forever right after logout">
    An audit event fired in the moments after a logout can land on the deleted session cookie, answer 401, and
    re-trigger `signIn()` — signing the user back in to a login form they deliberately left. `bootstrapApp` refuses
    recovery for `api/v1/audit.notify` specifically, and for any request while a sign-in is already in flight (a
    recovery that waited on its own in-flight sign-in would never settle). Both guards are already built in; if you
    see this with a different endpoint, mark that request `noRecovery: true` rather than trying to special-case it
    here.
  </Accordion>

  <Accordion title="bff/bootstrap and the three usual requests all appear in the network tab">
    The aggregating request failed or answered no data — look for the warning `Start-up aggregation failed,
    reading each part instead` (or `answered no data`) in the console — and the start-up fell back to the parallel
    reads. Most often the backend does not serve the endpoint (`404`) or the path given to
    `provideStartupAggregation()` does not match it. The application works either way, only the saved round trip
    is lost — remove the provider, or add it only where a BFF is deployed.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Provide a client" href="./atomic-client.mdx">
    The client bootstrapApp resolves the configuration and session on.
  </Card>

  <Card title="Cross-cutting interceptors" href="./interceptors.mdx">
    The same recovery, for requests the client never sees.
  </Card>
</Cards>
