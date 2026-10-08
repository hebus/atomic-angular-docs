# Provide a client (/docs/atomic-angular/integration/atomic-client)

Give an application its own Sinequa client — its own configuration, session and event subscribers — instead of the default one backing the free functions.



Every store, service and component in this library reaches the Sinequa backend through **one client**,
resolved from the `ATOMIC_CLIENT` injection token. `provideAtomicClient()` is how an application gives that
token its own client instead of the default one.

<Callout title="Concept — the default client">
  `ATOMIC_CLIENT` defaults to the client backing `@sinequa/atomic`'s free functions (`login()`, `fetchQuery()`,
  …), whose configuration **is** `globalConfig`. An application that never calls `provideAtomicClient()` behaves
  exactly as before — there is nothing to migrate.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="atomic-client-basic" title="An isolated client at the application root">
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

## How it works [#how-it-works]

`provideAtomicClient(config)` registers a factory for `ATOMIC_CLIENT` that calls
`createAtomicClient(config)` from `@sinequa/atomic` — one client, one configuration, one session, one set of
event subscribers, isolated from whatever the default client is doing. `injectAtomicClient()` is
`inject(ATOMIC_CLIENT)` under a clearer name.

<Mermaid
  chart="flowchart TD
    App[&#x22;Application root&#x22;] -- &#x22;provideAtomicClient(config)&#x22; --> Token[[&#x22;ATOMIC_CLIENT&#x22;]]
    Route[&#x22;A route/component subtree&#x22;] -- &#x22;provideAtomicClient(config2) — shadows the token&#x22; --> Token2[[&#x22;ATOMIC_CLIENT (subtree)&#x22;]]
    Token -- &#x22;injectAtomicClient()&#x22; --> Store[&#x22;Stores, services, components&#x22;]
    Token2 -- &#x22;injectAtomicClient()&#x22; --> SubtreeStore[&#x22;Same stores/services, in that subtree&#x22;]"
/>

Registering `provideAtomicClient()` again in a route or component injector shadows the token for that subtree
only — which is how a second backend is served (see [Serve a second backend](../integration/atomic-scope.mdx)).
Providing the client alone is rarely what a subtree serving a second backend wants, though: the library's
stores and services stay bound to whichever client was in scope when they were first constructed — use
`provideAtomicScope()` for a self-contained subtree.

## Recipes [#recipes]

### Configuration known only at start-up [#configuration-known-only-at-start-up]

Pass a **function** instead of an object when part of the configuration is resolved after this module is
evaluated — an SPFx web part supplying `backendUrl` at runtime, say. The object form is captured when the
providers are declared; the function form runs when the injector actually builds the client.

<CodeSample id="atomic-client-late-config" title="Configuration resolved at runtime">
  <Lang value="angular">
    ```ts title="app.config.ts" partial
    provideAtomicClient(() => ({ ...environment, ...hostOverrides() }))
    ```
  </Lang>
</CodeSample>

### Reading the client and checking the session without redirecting [#reading-the-client-and-checking-the-session-without-redirecting]

`login()` is not a question — for `oauth`/`saml` it navigates away to the identity provider. Ask
`hasSession()` instead to decide what to render.

<CodeSample id="atomic-client-read" title="Deciding what to render">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, inject } from "@angular/core";
    import { injectAtomicClient } from "@sinequa/atomic-angular";

    @Component({ selector: "sample-component", template: `` })
    export class SampleComponent {
      private readonly client = injectAtomicClient(); // or inject(ATOMIC_CLIENT)

      protected readonly isCredentialsMode = this.client.config.authMode?.kind === "credentials";

      async checkSession() {
        // Answers from the stored token when there is one, asks the server otherwise —
        // never redirects, never throws.
        return this.client.auth.hasSession();
      }
    }
    ```
  </Lang>
</CodeSample>

`client.auth.isRedirectPending()` tells a provider handshake apart from a plain missing session.
`client.storagePrefix` reads back the prefix namespacing this client's storage keys.

## Options [#options]

<TypeTable
  type="{
  &#x22;provideAtomicClient(config)&#x22;: {
    type: &#x22;AtomicClientConfig | (() => AtomicClientConfig)&#x22;,
    description: &#x22;Registers an isolated client on ATOMIC_CLIENT for the injector it is called from. Returns EnvironmentProviders.&#x22;,
  },
  &#x22;atomicClientProvider(config)&#x22;: {
    type: &#x22;AtomicClientConfig | (() => AtomicClientConfig)&#x22;,
    description: &#x22;The same client as an ordinary Provider, for a component's providers array (typed Provider[], rejects EnvironmentProviders).&#x22;,
  },
  &#x22;injectAtomicClient()&#x22;: {
    type: &#x22;() => AtomicClient&#x22;,
    description: &#x22;inject(ATOMIC_CLIENT), for readability. Must be called from an injection context.&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="An application using @sinequa/agent or @sinequa/assistant stops working after adding provideAtomicClient()">
    Those packages read `globalConfig.backendUrl`/`.app`/`.userOverride*` directly — they know nothing of
    `ATOMIC_CLIENT`. A client created by `provideAtomicClient()` keeps a *snapshot* of the configuration it was
    handed, so `initializeConfig()` resolves `backendUrl` on that client alone, and the other packages go on
    building requests against `undefined`. Nothing warns you — the rest of the application keeps working, since
    it goes through the client.

    Leave the root on the default client instead (no `provideAtomicClient()` call), and configure it from your
    entry point:

    ```ts title="main.ts" partial
    setGlobalConfig(environment);
    ```

    Do not set `uiLanguage` there — `bootstrapApp()` keeps it on the interface language instead (see
    [Bootstrap the application](./bootstrap-app.mdx)).
  </Accordion>

  <Accordion title="Requests silently use a configuration nobody maintains">
    Once an application provides a client, calling a **free function** (`fetchQuery()`, `login()`, …) still runs
    on the *default* client — configured from `globalConfig`, which the provided client never updates. The two
    share the browser session (same storage keys, unless `storagePrefix` differs), so requests still succeed; only
    the configuration silently diverges. `backendUrl` is the one that bites, since `initializeConfig()` writes it
    to the client only.

    Adopt `injectAtomicClient()` everywhere once a client is provided; do not mix free functions and a provided
    client in the same application.
  </Accordion>

  <Accordion title="A 401 recovery hook seems to hang forever">
    A recovery hook (`client.config.auth.recoverFromUnauthorized`) usually performs requests of its own. If one of
    those comes back 401, the client calls the hook again — and a hook that returns the recovery already in flight
    waits on itself, silently. Pass `noRecovery: true` on the requests your recovery makes, and have it refuse
    re-entry while a recovery is already running.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Serve a second backend" href="./atomic-scope.mdx">
    Give a route or component subtree its own client, plus the stores and services it needs.
  </Card>

  <Card title="Bootstrap the application" href="./bootstrap-app.mdx">
    Sign the user in and initialize the application's stores before the first view renders.
  </Card>
</Cards>
