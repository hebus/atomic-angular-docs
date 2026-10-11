# Sign In

The credentials sign-in form (username + password). Rendered inline via the `<sign-in>` selector. Both fields use the galactik `input-group`.

## Example

<demo-sign-in></demo-sign-in>

```html
<sign-in (forgotPassword)="onForgotPassword()" />
```

## Notes

- With no `authMode` configured, the component shows the credentials form and does **not** trigger `login()`.
- It is a real `<form>`: **Enter submits**, the browser can save the credentials (`autocomplete`), and the submit button stays disabled until both fields are filled. Required messages show once a field has been left.
- The form model is the two-way `credentials` (`{ username, password }`) — it replaces the former `username` / `password` models.
- The host defaults to `h-dvh`; pass `class="h-auto"` — or `[fullscreen]="false"` — to fit it inside a smaller container.
- To embed it in a dialog or a wizard step, add `[autoStart]="false"` (so mounting never redirects the page to an identity provider) and `[redirectAfterSuccess]="false"`, then listen to `(success)`.
- Clicking **Connect** calls the real `login()` (fails without a backend) — here it only demonstrates the form.
