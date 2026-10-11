# Forgot Password (/docs/atomic-angular/auth/forgot-password)

A one-field form that requests a password-reset email — no router, no navigation, safe to drop into a dialog or a wizard step as-is.



`ForgotPassword` asks for a username and requests a password-reset email for that account. It is the screen
behind the "forgot password" link of [Sign In](./sign-in.mdx), reached through
[`AuthPageComponent`](./authentication-flows.mdx) on `/login?mode=forgotpassword`.

## Minimal example [#minimal-example]

<CodeSample id="forgot-password-basic" title="A cancel/success pair, no navigation">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { ForgotPasswordComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [ForgotPasswordComponent],
      template: `<forgot-password (cancel)="back()" (success)="onSent()" />`,
    })
    export class SampleComponent {
      back() {
        /* … */
      }
      onSent() {
        /* … */
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

This component touches no store and injects no `Router` — everything it reports goes through `success`/
`cancel`, which is what makes it safe to embed anywhere. The reset email is only sent if the account exists
and has an email address; the server does not disclose which, and the confirmation message is deliberately
identical either way.

<Mermaid
  chart="flowchart TD
    Submit[&#x22;submit(resetForm)&#x22;] --> Valid{&#x22;username filled?&#x22;}
    Valid -->|no| Touched[&#x22;mark touched, show the required message&#x22;]
    Valid -->|yes| Send[&#x22;api.password.sendResetEmail(username)&#x22;]
    Send -->|ok| Notify[&#x22;notify.success + audit Send_Reset_Password_Link&#x22;]
    Notify --> Emit[&#x22;emit success&#x22;]
    Send -->|error| Error[&#x22;errorMsg + notify.error&#x22;]"
/>

## Recipes [#recipes]

### Carrying the username from a previous wizard step [#carrying-the-username-from-a-previous-wizard-step]

The model is two-way bindable, which is what lets a wizard carry the username from a previous step.

<CodeSample id="forgot-password-prefill" title="Pre-filling the username">
  <Lang value="angular">
    ```ts title="reset-step.component.ts"
    import { Component, signal } from "@angular/core";
    import { ForgotPasswordComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "reset-step",
      imports: [ForgotPasswordComponent],
      template: `<forgot-password [(resetRequest)]="resetRequest" (success)="step.set('sent')" />`,
    })
    export class ResetStepComponent {
      readonly resetRequest = signal({ username: "john" });
      readonly step = signal("form");
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  resetRequest: { type: &#x22;model<PasswordResetRequest>&#x22;, default: '{ username: &#x22;&#x22; }', description: &#x22;Form model. Note the lowercase n, aligned with Credentials.username.&#x22; },
  surface: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Renders the form as a card. Set false when the container already provides one.&#x22; },
}"
/>

<TypeTable
  type="{
  success: { type: &#x22;void&#x22;, description: &#x22;The reset email was requested successfully.&#x22; },
  cancel: { type: &#x22;void&#x22;, description: &#x22;The user dismissed the form.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The submit button stays disabled after a failed request">
    It should not — `pending` is cleared in a `finally`, including on the error path. If it stays disabled, check
    that no other guard on the submit button (a custom `[disabled]` override) is combining with the component's
    own state.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Signed Out" href="./signed-out.mdx">
    The confirmation screen shown after a logout — the third authentication view.
  </Card>
</Cards>
