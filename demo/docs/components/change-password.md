# Change Password

Form to change the current password. Rendered inline via the `<change-password>` selector. All three fields use the galactik `input-group`, with a keyboard-reachable visibility toggle in the right icon slot.

## Example

<demo-change-password></demo-change-password>

```html
<change-password
  [username]="username()"
  [redirectAfterSuccess]="false"
  [redirectAfterCancel]="false"
  (cancel)="close()"
  (success)="close()" />
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
<change-password [username]="username()" alert="login.passwordExpired" />
```

## In a dialog (`createCallable`)

The form is a self-contained step, so it drops into a dialog opened imperatively. `[surface]="false"` removes its own card — the dialog body already provides one — and the two `redirect*` inputs hand navigation back to the caller. The promise resolves with the `DialogEvent`.

<demo-change-password-callable></demo-change-password-callable>

```typescript
@Component({
  selector: "change-password-dialog",
  imports: [ChangePasswordComponent, DialogComponent, DialogContentComponent, DialogBodyComponent],
  template: `
    <dialog #dialog (closed)="call.end($event)">
      <DialogContent size="md">
        <DialogBody>
          <change-password
            [username]="call.props().username"
            [surface]="false"
            [redirectAfterSuccess]="false"
            [redirectAfterCancel]="false"
            (cancel)="dialog.close('dialog-cancel')"
            (success)="dialog.close('dialog-confirm')" />
        </DialogBody>
      </DialogContent>
    </dialog>
  `
})
export class ChangePasswordDialog {
  protected readonly call = injectCallRef<{ username: string }, DialogEvent>();
  private readonly dialog = viewChild.required(DialogComponent);

  constructor() {
    afterNextRender(() => this.dialog().showModal());
  }
}

export const ChangePassword = createCallable<{ username: string }, DialogEvent>(ChangePasswordDialog);

// anywhere:
const outcome = await ChangePassword.call({ username: "john.doe" });
```

:::warning
Do not wrap `<change-password>` in a `<form>` of your own — it renders its own, and nested forms are invalid HTML. The same applies to a wizard: let each step own its submission.
:::

## Notes

- It is a real `<form>`: **Enter submits**, and the submit button stays disabled until all three fields are filled and the two new passwords match.
- The form model is the two-way `passwords` (`{ currentPassword, newPassword, confirmPassword }`) — it replaces the three former scalar models.
- `[redirectAfterSuccess]="false"` and `[redirectAfterCancel]="false"` hand navigation back to the host — without them the component initializes the app and navigates to `/` on success, and calls `location.back()` on cancel. That is what makes it embeddable in a panel or a dialog.
- The fields carry `autocomplete="current-password"` / `"new-password"`, so password managers can propose and store a generated password.
- Submitting calls the real `changePassword` API (fails without a backend) — here it only demonstrates the form.
