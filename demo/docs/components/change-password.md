# Change Password

Form to change the current password. Two components share one implementation:

- `<change-password-form>` — the form and nothing else. No logo, no card: drop it inline anywhere (a settings panel) or into a dialog body.
- `<change-password>` — the auth-page block: the logo and a card around that same form.

All three fields use the galactik `input-group`, with a keyboard-reachable visibility toggle in the right icon slot.

## Inline

<demo-change-password></demo-change-password>

```html
<change-password-form
  [username]="username()"
  [redirectAfterSuccess]="false"
  [redirectAfterCancel]="false"
  (cancel)="close()"
  (success)="close()" />
```

The form renders its own Cancel / Confirm row. A container that already owns the buttons sets `[showActions]="false"` and drives the form through `changePassword()`, `canSubmit()` and `pending()`.

## As an auth page block

<demo-change-password-page></demo-change-password-page>

```html
<change-password [username]="username()" />
```

## Cross-field validation

Type two different values in **New password** and **Confirm password**, then leave the confirmation field: the mismatch message appears under it and the field turns red. It stays silent while either field is still empty — `required` already covers that case.

```typescript
const passwordChangeSchema = schema<PasswordChange>(p => {
  required(p.currentPassword);
  required(p.newPassword);
  required(p.confirmPassword);

  validate(p.confirmPassword, ({ value, valueOf }) => {
    const confirm = value();
    const next = valueOf(p.newPassword);
    if (!confirm || !next || confirm === next) return undefined;
    return { kind: "passwordMismatch" };
  });
});
```

## With an alert banner

The `alert` input takes a translation key, rendered as a banner above the fields. This is how the expired-password flow announces itself when the server rejects a login.

<demo-change-password-alert></demo-change-password-alert>

```html
<change-password-form [username]="username()" alert="login.passwordExpired" />
```

## In a dialog (`createCallable`)

The library ships the dialog, like `OverrideUser` or `ResetUserSettings`: the form sits in the `DialogBody`, and Cancel / Confirm are the standard `DialogFooter` buttons. The promise resolves with the `DialogResult`.

<demo-change-password-callable></demo-change-password-callable>

```typescript
import { ChangePassword } from "@sinequa/atomic-angular";

// `username` is optional: it defaults to the signed-in user.
const outcome = await ChangePassword.call({ username: "john.doe" });
```

To compose your own dialog, put `<change-password-form #form [showActions]="false" (success)="dialog.close('dialog-confirm')" />` in a `DialogBody`, and bind the footer's Confirm button to `form.canSubmit()` / `form.changePassword()`.

:::warning
Do not wrap `<change-password-form>` in a `<form>` of your own — it renders its own, and nested forms are invalid HTML. The same applies to a wizard: let each step own its submission.
:::

## Notes

- It is a real `<form>`: **Enter submits**, and the submit button stays disabled until all three fields are filled and the two new passwords match.
- The form model is the `passwords` signal (`{ currentPassword, newPassword, confirmPassword }`).
- `[redirectAfterSuccess]="false"` and `[redirectAfterCancel]="false"` hand navigation back to the host — without them the component initializes the app and navigates to `/` on success, and calls `location.back()` on cancel. That is what makes it embeddable in a panel or a dialog.
- The fields carry `autocomplete="current-password"` / `"new-password"`, so password managers can propose and store a generated password.
- Submitting calls the real `changePassword` API (fails without a backend) — here it only demonstrates the form.
