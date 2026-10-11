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

`bootstrapApp` keeps the client's `uiLanguage` on the interface language rather than a value fixed at
start-up: it follows `TranslocoService.langChanges$` for as long as the application runs, which is also what
the request body interceptor and the `syslang`/`translocoDate` pipes read on their own side (see
[Cross-cutting pipes](./pipes.mdx)).

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
