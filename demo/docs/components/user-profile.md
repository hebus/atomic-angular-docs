# User Profile

Dialog to view and edit the current user's profile (name, mail, job title, …) and change the application language. Invoked via the `UserProfile` callable. The whole profile is a single [signal forms](https://angular.dev/guide/forms/signals) field tree inside a real `<form>`; the language picker is the galactik `Select`, deliberately left outside it.

## Example

<demo-user-profile></demo-user-profile>

```ts
import { UserProfile } from "@sinequa/atomic-angular";

UserProfile.call(undefined, { injector });
```

The dialog wraps the standalone `<user-profile-form>` component, which can also be embedded on its own.

## Notes

- Backed by `PrincipalStore`, `AppStore`, `UserSettingsStore` and `UserProfileService` (all `providedIn: 'root'`).
- Which fields are shown comes from `appStore.general().features.userProfile.data` (falls back to a sensible default set).
- One property is edited at a time: each row is read-only (through the schema's `readonly()` rule) until its edit button is pressed, and saving sends a `PATCH` for that single property. `Escape` discards the draft.
- Keyboard-friendly: tabbing into a field reveals its actions, and the focus returns to the edit button after save or cancel.
- Fully described to assistive technology: each row is a `role="group"` named by its `<label>`, the buttons are named after the property they act on, and a polite live region announces edit / save / cancel / delete.
- The demo seeds a sample principal and stubs `api/v2/user-profile/{id}` (+ `usersettings`), so the profile loads and edits / language changes complete locally.
