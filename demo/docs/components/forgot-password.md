# Forgot Password

Form to request a password-reset email. Rendered inline via the `<forgot-password>` selector. The username field uses the galactik `input-group`.

## Example

<demo-forgot-password></demo-forgot-password>

```html
<forgot-password (cancel)="back()" (success)="onSent()" />
```

## Notes

- Emits `cancel` and `success`. The form model is the two-way `resetRequest` (`{ username }`) — it replaces the former `userName` model, and note the lowercase `n`.
- It is a real `<form>`: **Enter submits**, and the submit button stays disabled until the username is filled. The required message shows once the field has been left.
- Submitting calls the real `fetchSendPasswordResetEmail` (fails without a backend) — here it only demonstrates the form.
