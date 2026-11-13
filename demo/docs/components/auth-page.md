# Auth Page

The full-page authentication shell: it switches between sign-in, change-password, forgot-password and the post-logout confirmation.

## Imports

```ts
import { AuthPageComponent, SignedOutComponent } from "@sinequa/atomic-angular";
```

## The views

`mode` forces a view. Without it, the view comes from the route (the `/logout` route shows `signed-out`, anything else shows the sign-in form) and from the `mode`, `username` and `alert` query parameters. The host is `min-h-screen` and centres its content, so the demo overrides the height. Nothing is sent to a server until a form is submitted.

<demo-auth-page></demo-auth-page>

```html
<auth-page />
<auth-page mode="forgotpassword" />
```

## Signed out

`signed-out` is what `/logout` renders instead of the sign-in form. In the external-auth modes (`sso` / `oauth` / `saml`) the form would restart the handshake and re-authenticate the user at once, defeating the logout. The one action navigates to the login path with `returnUrl=/`.

<demo-signed-out></demo-signed-out>

```html
<signed-out />
```

## Notes

- An expired password reported by the sign-in form switches the view to `changepassword` through the `(changePassword)` event, with the `login.passwordExpired` alert.
- Both forms return to `signin` on cancel, and the forgot-password form also on success.
- The sub-views have their own pages: Sign In, Forgot Password and Change Password.

## API Reference

### AuthPageComponent

| Input  | Type                                                                | Default     | Description                                          |
| ------ | ------------------------------------------------------------------- | ----------- | ---------------------------------------------------- |
| `mode` | `"signin" \| "changepassword" \| "login" \| "forgotpassword" \| "signedout"` | `undefined` | Forces a view. Defaults to the one derived from the route. |

### SignedOutComponent

No input or output. `signInAgain()` navigates to `client.config.loginPath ?? "/login"` with `returnUrl=/`.
