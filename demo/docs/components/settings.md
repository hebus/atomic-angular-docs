# Settings

Settings dialog: the Account panel views and edits the current user's profile (name, mail, job title, …); the Appearance panel changes the theme and the application language; the Alerts panel lists the user's alerts and shows the alert form in the panel itself, without opening a second dialog; the Keyboard shortcuts panel lists the registered shortcuts. Invoked via the `Settings` callable. The whole profile is a single [signal forms](https://angular.dev/guide/forms/signals) field tree inside a real `<form>`.

## Example

<demo-settings></demo-settings>

```ts
import { Settings } from "@sinequa/atomic-angular";

Settings.call({ panel: "account" }, { injector });
```

The dialog wraps the standalone `<user-profile-form>` component, which can also be embedded on its own.

## Notes

- On a touch screen the **Keyboard shortcuts** entry is not offered (with `provideInputModality()`: while the page is driven with a finger, and back at the first keyboard use, including a shortcut pressed with Ctrl, Cmd or Option). It stays when the dialog is opened on that very panel (`Settings.call({ panel: "shortcuts" })`).
- Under 768px (a phone) the navigation is a strip of buttons on top of the panel, that scrolls sideways, instead of a column beside it.
- Backed by `PrincipalStore`, `AppStore`, `UserSettingsStore` and `UserProfileService` (all `providedIn: 'root'`).
- Which fields are shown comes from `appStore.general().features.userProfile.data` (falls back to a sensible default set).
- Free-form properties come from `features.userProfile.customData`: an entry is a name (`"nickname"`) or an object giving a default (`{ "team": "Design" }`). A boolean is a switch, saved as soon as it is flipped; an array is shown as tags and edited as JSON, as a whole; an object is shown leaf by leaf, each leaf editable and written at its path — the structure belongs to the administrator's custom JSON. A `/`-separated entry (`agent/favorites`) is a nested property. `features.userProfile.privateCustomData` takes the same entries; its values are only visible to their owner, shown in a "Private" tab, and go through the private endpoints only.
- One property is edited at a time: each row is read-only (through the schema's `readonly()` rule) until its edit button is pressed, and saving sends a `PATCH` for that single property. `Escape` discards the draft.
- Keyboard-friendly: tabbing into a field reveals its actions, and the focus returns to the edit button after save or cancel.
- Fully described to assistive technology: each row is a `role="group"` named by its `<label>`, the buttons are named after the property they act on, and a polite live region announces edit / save / cancel / delete.
- The demo has an editor for the administrator's `general.features.userProfile` JSON: change it, apply it, and reopen the dialog to see how the Account panel renders each kind of entry. Saves and deletions (nested `customData` paths included) are kept in memory until the reset.
- The demo seeds a sample principal and stubs `api/v2/user-profile/{id}` (+ `usersettings`), so the profile loads and edits / language changes complete locally.
- The Account panel offers **Change password** when the application allows it: `general.features.allowChangePassword`, the `credentials` auth mode and an editable partition. The demo turns all three on (the auth mode only while this page is shown), so the button is there next to the profile; it shows the bare `<change-password-form>` in the panel — no logo, no card. The demo stubs the change endpoint with a refusal, so submitting shows the inline error and nothing else happens.
