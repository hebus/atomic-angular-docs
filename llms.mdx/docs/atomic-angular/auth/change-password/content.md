# Change Password (/docs/atomic-angular/auth/change-password)

A current/new/confirm password form that signs the user back in on success, so the session is never left stale — used both as the /login?mode=changepassword route and embedded in a profile panel.



`ChangePassword` renders the change-password form and, on success, signs the user back in with the new
password — the session is never left stale. It is used both as a standalone view (the
`/login?mode=changepassword` route, through [`AuthPageComponent`](./authentication-flows.mdx)) and embedded —
the user-profile panel hosts it inline.

## Minimal example [#minimal-example]

<CodeSample id="change-password-basic" title="Standalone">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { ChangePasswordComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [ChangePasswordComponent],
      template: `<change-password [username]="username()" (cancel)="back()" />`,
    })
    export class SampleComponent {
      readonly username = signal("john");
      back() {
        /* … */
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Submit[&#x22;submit(passwordForm)&#x22;] --> Valid{&#x22;valid?&#x22;}
    Valid -->|no| Touched[&#x22;mark touched, show messages&#x22;]
    Valid -->|yes| Change[&#x22;api.password.change(new, current)&#x22;]
    Change -->|failed| Failed[&#x22;errorMsg + audit Change_Password_Failed&#x22;]
    Change -->|ok| User{&#x22;username resolved?&#x22;}
    User -->|no| LoginPage[&#x22;notify + navigate to /login&#x22;]
    User -->|yes| Clear[&#x22;auth.logout(), drop the old token&#x22;]
    Clear --> Relogin[&#x22;auth.login(username, newPassword)&#x22;]
    Relogin -->|failed| Retry[&#x22;navigate to /login?username=...&#x22;]
    Relogin -->|ok| Redirect{&#x22;redirectAfterSuccess?&#x22;}
    Redirect -->|yes| Init[&#x22;initialize, navigate to /&#x22;]
    Redirect -->|no| Emit[&#x22;emit success&#x22;]"
/>

The old token is cleared **after** the change succeeds, never before — a failed change leaves the session
intact.

## Recipes [#recipes]

### Embedded in a panel or a dialog [#embedded-in-a-panel-or-a-dialog]

<CodeSample id="change-password-embedded" title="No navigation on success or cancel">
  <Lang value="angular">
    ```html title="profile-panel.component.html"
    <ChangePassword
      [username]="username()"
      [redirectAfterSuccess]="false"
      [redirectAfterCancel]="false"
      (cancel)="changingPassword.set(false)"
      (success)="changingPassword.set(false)"
    />
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  passwords: { type: &#x22;model<PasswordChange>&#x22;, default: &#x22;all empty&#x22;, description: &#x22;Form model: { currentPassword, newPassword, confirmPassword }.&#x22; },
  username: { type: &#x22;string | null&#x22;, default: &#x22;null&#x22;, description: &#x22;Account to sign back in with. Falls back to the authenticated principal's name.&#x22; },
  alert: { type: &#x22;string | undefined&#x22;, description: 'Translation key shown as a banner — e.g. &#x22;login.passwordExpired&#x22;.' },
  redirectAfterSuccess: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Initializes the app and navigates to / after the change.&#x22; },
  redirectAfterCancel: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Calls location.back() on cancel.&#x22; },
  surface: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Renders the form as a card. Set false when the container already provides one.&#x22; },
}"
/>

<TypeTable
  type="{
  success: { type: &#x22;void&#x22;, description: &#x22;Password changed and the user is signed back in.&#x22; },
  cancel: { type: &#x22;void&#x22;, description: &#x22;The user dismissed the form.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The server rejects the change with a confusing error">
    The client API's argument order is `change(newPassword, currentPassword)` — swapping them is the classic
    mistake, and the server's rejection message does not make the actual cause obvious.
  </Accordion>

  <Accordion title="No mismatch message shows while typing, even though the two fields clearly differ">
    Expected while either password field is still empty: `required` already covers that case, and showing both
    messages at once helps nobody. The mismatch message appears once both fields have content.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Forgot Password" href="./forgot-password.mdx">
    The screen behind Sign In's "forgot password" link.
  </Card>
</Cards>
