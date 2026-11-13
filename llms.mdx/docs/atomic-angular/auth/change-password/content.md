# Change Password (/docs/atomic-angular/auth/change-password)

A current/new/confirm password form that signs the user back in on success, so the session is never left stale — used both as the /login?mode=changepassword route and embedded in a profile panel.



The change-password form signs the user back in with the new password on success — the session is never
left stale. It comes in two components over one implementation: `ChangePasswordFormComponent`
(`<change-password-form>`) is the form alone — no logo, no card — and embeds anywhere (the user-profile panel,
the settings, a dialog body); `ChangePasswordComponent` (`<change-password>`) adds the logo and a card, and is the
standalone view (the `/login?mode=changepassword` route, through [`AuthPageComponent`](./authentication-flows.mdx)).
`ChangePassword.call()` opens the form in a standard dialog.

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

### Embedded in a panel [#embedded-in-a-panel]

<CodeSample id="change-password-embedded" title="No navigation on success or cancel">
  <Lang value="angular">
    ```html title="profile-panel.component.html"
    <change-password-form
      [username]="username()"
      [redirectAfterSuccess]="false"
      [redirectAfterCancel]="false"
      (cancel)="changingPassword.set(false)"
      (success)="changingPassword.set(false)"
    />
    ```
  </Lang>
</CodeSample>

### In a dialog [#in-a-dialog]

<CodeSample id="change-password-dialog" title="ChangePassword.call()">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { ChangePassword } from "@sinequa/atomic-angular";

    // `username` is optional: it defaults to the signed-in user.
    const outcome = await ChangePassword.call({ username: "john" });
    ```
  </Lang>
</CodeSample>

The form sits in the dialog body; Cancel and Confirm are the `DialogFooter`'s. To build your own dialog, render
`<change-password-form #form [showActions]="false" />` and bind Confirm to `form.canSubmit()` / `form.changePassword()`.

## Options [#options]

`ChangePasswordFormComponent` (`<change-password-form>`):

<TypeTable
  type="{
  passwords: { type: &#x22;WritableSignal<PasswordChange>&#x22;, default: &#x22;all empty&#x22;, description: &#x22;Form model: { currentPassword, newPassword, confirmPassword }.&#x22; },
  username: { type: &#x22;string | null&#x22;, default: &#x22;null&#x22;, description: &#x22;Account to sign back in with. Falls back to the authenticated principal's name.&#x22; },
  alert: { type: &#x22;string | undefined&#x22;, description: 'Translation key shown as a banner — e.g. &#x22;login.passwordExpired&#x22;.' },
  redirectAfterSuccess: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Initializes the app and navigates to / after the change.&#x22; },
  redirectAfterCancel: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Calls location.back() on cancel.&#x22; },
  showActions: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Renders the Cancel / Confirm row. Set false when the container owns the buttons (a dialog footer).&#x22; },
}"
/>

`ChangePasswordComponent` (`<change-password>`) takes the same inputs except `showActions`. It always draws its card.

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
