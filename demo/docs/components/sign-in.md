# Sign In

The credentials sign-in form (username + password). Two components share one implementation:

- `<sign-in-form>` — the form and nothing else. No logo, no card, no handshake: drop it inline anywhere or into a dialog body.
- `<sign-in>` — the auth-page block: the logo and a card around that same form, plus the SSO / OAuth / SAML / bearer handshake and its loader.

Both fields use the galactik `input-group`.

## Inline

<demo-sign-in></demo-sign-in>

```html
<sign-in-form
  [redirectAfterSuccess]="false"
  (forgotPassword)="onForgotPassword()"
  (success)="close()" />
```

A container that owns the submit button sets `[showActions]="false"` and drives the form through `handleLoginWithCredentials()` and `canSubmit()`.

## As an auth page block

<demo-sign-in-page></demo-sign-in-page>

```html
<sign-in (forgotPassword)="onForgotPassword()" />
```

## In a dialog (`createCallable`)

The library ships the dialog, like `OverrideUser` or `ChangePassword`. It is a wizard: one dialog whose content switches in place. The credentials form is the first step; "Forgot password" shows the reset form in the same dialog (and goes back to it afterwards), and an expired password reported by the server shows the change-password form. The `DialogFooter` always holds the buttons of the current step.

<demo-sign-in-callable></demo-sign-in-callable>

```typescript
import { SignIn } from "@sinequa/atomic-angular";

const outcome = await SignIn.call();
// "dialog-confirm" → signed in, application initialized
// "dialog-cancel"  → dismissed
```

Only the credentials form is shown: the dialog never starts an SSO / OAuth / SAML handshake.

## Notes

- With no `authMode` configured, the component shows the credentials form and does **not** trigger `login()`.
- It is a real `<form>`: **Enter submits**, the browser can save the credentials (`autocomplete`), and the submit button stays disabled until both fields are filled. Required messages show once a field has been left.
- The form model is the two-way `credentials` (`{ username, password }`) of `<sign-in-form>`.
- `<sign-in>` defaults to a full-height host (`h-dvh`); pass `[fullscreen]="false"` to fit it inside a smaller container.
- To embed the credentials form in a dialog or a wizard step, use `<sign-in-form [redirectAfterSuccess]="false">` and listen to `(success)`: it never starts a handshake. With `<sign-in>`, add `[autoStart]="false"` so mounting never redirects the page to an identity provider.
- Clicking **Connect** calls the real `login()` (fails without a backend) — here it only demonstrates the form.
