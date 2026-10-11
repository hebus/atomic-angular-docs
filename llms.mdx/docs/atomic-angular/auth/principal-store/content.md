# Principal store (/docs/atomic-angular/auth/principal-store)

The signed-in user's data, loaded once and shared through a signal store — initials, admin status, and user-override state.



`PrincipalStore` holds the authenticated user's data — name, email, administrator status, password expiry —
loaded once via `initialize()` and shared by every consumer through NgRx Signals.

## Minimal example [#minimal-example]

<CodeSample id="principal-store-basic" title="Reading the signed-in user's name and initials">
  <Lang value="angular">
    ```ts title="user-badge.component.ts"
    import { Component, inject } from "@angular/core";
    import { PrincipalStore } from "@sinequa/atomic-angular";

    @Component({
      selector: "user-badge",
      template: `<span>{{ principal.fullName() }} ({{ principal.initials() }})</span>`,
    })
    export class UserBadgeComponent {
      protected readonly principal = inject(PrincipalStore);
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`initialize()` fetches the principal through the shared client (so it goes through the same auth handling as
the rest of `@sinequa/atomic` — cookies included, and the SSO-aware auto-authentication flag) and patches the
store. Concurrent calls — a guard awaiting the fetch while another initialization is already in flight — share
the same promise rather than issuing two requests.

<Mermaid
  chart="flowchart TD
    Call[&#x22;initialize()&#x22;] --> Pending{&#x22;a fetch already in flight?&#x22;}
    Pending -->|yes| Await[&#x22;return the same promise&#x22;]
    Pending -->|no| State[&#x22;patchState: loading&#x22;]
    State --> Fetch[&#x22;client.api.principal.get()&#x22;]
    Fetch -->|ok| Loaded[&#x22;patchState: loaded, principal fields set&#x22;]
    Fetch -->|error| Err[&#x22;patchState: error, rethrow&#x22;]"
/>

## Options [#options]

<TypeTable
  type="{
  allowUserOverride: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;isAdministrator() and not userOverrideActive() — whether impersonation can be started.&#x22; },
  isOverridingUser: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;Whether an admin impersonation is currently active.&#x22; },
  initials: { type: &#x22;Signal<string>&#x22;, description: &#x22;Uppercase initials derived from fullName — empty string with no name loaded.&#x22; },
  state: { type: '&#x22;initial&#x22; | &#x22;loading&#x22; | &#x22;loaded&#x22; | &#x22;error&#x22;', description: &#x22;Load state, read by AuthGuard to decide whether to (re)initialize.&#x22; },
  &#x22;initialize()&#x22;: { type: &#x22;() => Promise<void>&#x22;, description: &#x22;Fetches and patches the principal. De-duplicates concurrent calls.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A component reads stale principal fields right after sign-in">
    Read `state()` before trusting the other fields, or await `initialize()` yourself — a freshly-mounted
    component may render before the store's own `initialize()` call (typically from `AuthGuard`) has resolved.
  </Accordion>

  <Accordion title="PrincipalService.getPrincipal() is still imported somewhere">
    `PrincipalService` is deprecated in favor of this store and will be removed in a future version — read
    `inject(PrincipalStore)` and the fields directly, or `getState(PrincipalStore)` for a plain snapshot, instead
    of subscribing to an `Observable`.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="AuthGuard" href="./auth-guard.mdx">
    The guard that loads this store before letting a protected route through.
  </Card>
</Cards>
