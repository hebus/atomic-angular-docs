# Sign In (/docs/atomic-angular/auth/sign-in)

Render the credentials form or drive the SSO/OAuth/SAML/bearer handshake automatically, with declarative Signal Forms validation and safe post-login navigation.



`SignIn` is the credentials form and the entry point of the whole authentication sequence. In the external
modes (`sso`, `oauth`, `saml`, `bearer`) it shows a loader and starts the handshake itself instead of rendering
a form; in `credentials` mode it renders a real `<form>` built on
[Signal Forms](https://angular.dev/guide/forms/signals).

<Callout title="Route /login to AuthPageComponent, not SignInComponent">
  `SignInComponent` only ever renders the credentials form. Route `/login` (and `/logout`) to
  `AuthPageComponent` instead — it switches between sign-in, change-password, forgot-password and signed-out
  based on the route and the `mode` query param. See [Authentication flows](./authentication-flows.mdx).
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="sign-in-basic" title="The credentials form on its own route">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { SignInComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [SignInComponent],
      template: `<sign-in (forgotPassword)="onForgotPassword()" />`,
    })
    export class SampleComponent {
      onForgotPassword() {
        /* show your own reset screen */
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Mount[&#x22;ngOnInit&#x22;] --> Auth{&#x22;already authenticated?&#x22;}
    Auth -->|yes| Return[&#x22;navigate to returnUrl&#x22;]
    Auth -->|no| Mode{&#x22;externalAuth and autoStart?&#x22;}
    Mode -->|yes| Handshake[&#x22;client.auth.login()&#x22;]
    Mode -->|no| Form[&#x22;render the credentials form&#x22;]
    Handshake -->|resolved true| Init[&#x22;initialize&#x22;]
    Handshake -->|no provider| Form
    Handshake -->|rejected| ErrorPage[&#x22;navigate to /error&#x22;]
    Form --> Submit[&#x22;submit(signInForm)&#x22;]
    Submit -->|invalid| Touched[&#x22;mark touched, show messages&#x22;]
    Submit -->|valid| Login[&#x22;client.auth.login(credentials)&#x22;]
    Login -->|401 password expired| Emit[&#x22;emit changePassword&#x22;]
    Login -->|ok| Init
    Init --> Success[&#x22;emit success&#x22;]
    Success --> Return"
/>

`initialize()` runs with `syncUrl: false` — deliberately: this component navigates to the `returnUrl` itself,
and letting the query-params store sync to the URL first would navigate to the bare route, dropping the
`returnUrl`'s search parameters (and running the search twice, once on empty text).

The `authenticated` DOM event only drives navigation for the **external** handshake — a credentials login owns
its own sequence, and navigating from that event too would race the application initialization.

## Recipes [#recipes]

### Embedded in a dialog or a wizard step [#embedded-in-a-dialog-or-a-wizard-step]

Opt out of the behaviours that assume the component owns the whole page. `autoStart` matters most: without it,
mounting the form in an external auth mode would redirect the entire page to the identity provider.

<CodeSample id="sign-in-embedded" title="A sign-in step with no full-page side effects">
  <Lang value="angular">
    ```ts title="sign-in-step.component.ts"
    import { Component, signal } from "@angular/core";
    import { SignInComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sign-in-step",
      imports: [SignInComponent],
      template: `
        <sign-in
          [fullscreen]="false"
          [autoStart]="false"
          [redirectAfterSuccess]="false"
          class="w-full max-w-sm"
          (success)="step.set('done')"
        />
      `,
    })
    export class SignInStepComponent {
      readonly step = signal("credentials");
    }
    ```
  </Lang>
</CodeSample>

### Extending the component [#extending-the-component]

Subclass it to replace the template while keeping the whole authentication sequence. Bind your controls to
`signInForm` — the validation schema comes along with it, so `[formRoot]` alone drives submit interception,
`preventDefault()` and validity gating.

<CodeSample id="sign-in-extend" title="A custom template, the same authentication sequence">
  <Lang value="angular">
    ```ts title="custom-sign-in.component.ts"
    import { Component } from "@angular/core";
    import { FormField, FormRoot } from "@angular/forms/signals";
    import { SignInComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "custom-sign-in",
      imports: [FormRoot, FormField],
      template: `
        <form [formRoot]="signInForm" class="flex flex-col gap-4">
          <input [formField]="signInForm.username" autocomplete="username" placeholder="Username" />
          <input type="password" [formField]="signInForm.password" autocomplete="current-password" placeholder="Password" />
          <button type="submit" [disabled]="signInForm().invalid()">Sign In</button>
        </form>
      `,
    })
    export class CustomSignInComponent extends SignInComponent {}
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  credentials: { type: &#x22;model<Credentials>&#x22;, default: '{ username: &#x22;&#x22;, password: &#x22;&#x22; }', description: &#x22;Two-way bindable form model.&#x22; },
  class: { type: &#x22;string&#x22;, description: &#x22;Extra classes merged into the host.&#x22; },
  fullscreen: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Full-height centred layout. Set false when embedding.&#x22; },
  surface: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Renders the form as a card. Set false when the container already provides one.&#x22; },
  autoStart: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Starts the SSO/OAuth/SAML/bearer handshake on init. Set false when embedding.&#x22; },
  redirectAfterSuccess: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Navigates to the returnUrl once authenticated. Set false to let the host decide.&#x22; },
}"
/>

<TypeTable
  type="{
  success: { type: &#x22;void&#x22;, description: &#x22;Authenticated and the application is initialized — emitted before any navigation.&#x22; },
  forgotPassword: { type: &#x22;void&#x22;, description: &#x22;The user asked for a password reset.&#x22; },
  changePassword: { type: &#x22;string&#x22;, description: &#x22;Username — the server rejected the login with an expired password.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Nesting <sign-in> inside another <form> throws or submits the wrong thing">
    The component renders its own `<form>` — nested forms are invalid HTML, and browsers resolve them
    unpredictably. In a wizard, keep the navigation buttons outside the step, or let each step own its own
    submission instead of wrapping it.
  </Accordion>

  <Accordion title="An external-mode dialog immediately redirects the whole page to the identity provider">
    `autoStart` defaults to `true` — in `sso`/`oauth`/`saml`/`bearer` mode the component starts the handshake as
    soon as it mounts, which for a full-page redirect means navigating away from the dialog entirely. Set
    `[autoStart]="false"` whenever the component is embedded rather than owning the route.
  </Accordion>

  <Accordion title="Validation messages don't update after a language change">
    They will — messages are translated from the error `kind` (`login.errors.required`), not baked in at
    validation time, so a later language change is reflected automatically. If they appear frozen, check that the
    translation scope providing `login.errors.*` is actually loaded for the new language.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Authentication flows" href="./authentication-flows.mdx">
    How every piece — guard, interceptor, sign-in, logout — fits together end to end.
  </Card>

  <Card title="AuthGuard" href="./auth-guard.mdx">
    Protects routes, and redirects to change-password when the session's password has expired.
  </Card>
</Cards>
