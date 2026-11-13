# Forgot Password

Form to request a password-reset email. Two components share one implementation:

- `<forgot-password-form>` — the form and nothing else. No logo, no card: drop it inline anywhere or into a dialog body.
- `<forgot-password>` — the auth-page block: the logo and a card around that same form.

The username field uses the galactik `input-group`.

## Inline

<demo-forgot-password></demo-forgot-password>

```html
<forgot-password-form (cancel)="back()" (success)="onSent()" />
```

A container that owns the buttons sets `[showActions]="false"` and drives the form through `submit()` and `canSubmit()`.

## As an auth page block

<demo-forgot-password-page></demo-forgot-password-page>

```html
<forgot-password (cancel)="back()" (success)="onSent()" />
```

## In a dialog (`createCallable`)

The library ships the dialog: the form sits in the `DialogBody`, and Cancel / Send are the standard `DialogFooter` buttons. The promise resolves with `"dialog-confirm"` once the reset email was requested.

<demo-forgot-password-callable></demo-forgot-password-callable>

```typescript
import { ForgotPassword } from "@sinequa/atomic-angular";

const outcome = await ForgotPassword.call();
```

## Notes

- Emits `cancel` and `success`. The form model is the `resetRequest` signal (`{ username }`) of `<forgot-password-form>`.
- It is a real `<form>`: **Enter submits**, and the submit button stays disabled until the username is filled. The required message shows once the field has been left.
- Submitting calls the real `fetchSendPasswordResetEmail` (fails without a backend) — here it only demonstrates the form.
