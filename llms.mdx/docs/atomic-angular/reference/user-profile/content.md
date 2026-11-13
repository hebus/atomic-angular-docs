# User profile (/docs/atomic-angular/reference/user-profile)

Load and edit the signed-in user's profile, one property at a time, in the Account panel of the settings dialog — and how the administrator's custom JSON decides what the form shows.



`UserProfileFormComponent` renders and edits the current user's profile; the `Settings` callable dialog
hosts it in its Account panel. The form edits one property at a time — each row is read-only until its edit button is
pressed, and saving sends a `PATCH` for that single property only, never the whole profile.

**What the form shows is not decided by the code but by the administrator**, in the application's custom JSON
(`general.features.userProfile`). Users change *values*; they never change the *structure*. This page covers both
sides: how the form works, and how to write that configuration — including what is read-only.

## Minimal example [#minimal-example]

<CodeSample id="user-profile-basic" title="Open the settings on the account panel">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, inject, Injector } from "@angular/core";
    import { Settings } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      template: `<button type="button" (click)="openProfile()">Account</button>`,
    })
    export class SampleComponent {
      private readonly injector = inject(Injector);

      protected async openProfile() {
        await Settings.call({ panel: "account" }, { injector: this.injector });
      }
    }
    ```
  </Lang>
</CodeSample>

`UserProfileFormComponent` can also be embedded directly (`<user-profile-form />`, no inputs — it resolves the
profile itself from `PrincipalStore` and `UserProfileService`) when a host wants it inline rather than in a
dialog.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    PrincipalStore -- &#x22;userId&#x22; --> Resource[&#x22;UserProfileService.getUserProfile (resource)&#x22;]
    Resource --> User[&#x22;user() linkedSignal&#x22;]
    User --> Model[&#x22;profileModel() linkedSignal&#x22;]
    Model --> Tree[&#x22;Signal Forms field tree&#x22;]
    Tree -- &#x22;save (submission.action)&#x22; --> Patch[&#x22;client.api.userProfile.patch&#x22;]
    Patch --> Resource
    AppStore -- &#x22;general().features.userProfile&#x22; --> Keys[&#x22;configured keys() / customData()&#x22;]
    Keys --> Model"
/>

The form model is a `linkedSignal`: a successful save, a deletion or a profile reload re-seeds every field from
server state, which is what discards a cancelled draft with no manual DOM restore.

The layout is one card per bucket — **Information** for the configured standard fields, **Preferences** for the
free-form ones (the card is left out when there are none) — in one or two columns depending on the width of the
dialog. Each field is a plain text input with its actions inside the box, always visible: edit and delete at rest,
save and cancel while editing.

## Configuring the profile: the administrator's custom JSON [#configuring-the-profile-the-administrators-custom-json]

The configuration lives in the `general` custom JSON, under `features.userProfile`:

```json title="Custom JSON — general"
{
  "features": {
    "userProfile": {
      "enabled": true,
      "data": ["fullName", "mail", "jobTitle", "location", "profilePhoto"],
      "customData": [
        "nickname",
        { "team": "Design" },
        { "newsletter": true },
        { "favoriteTags": ["design", "a11y"] },
        { "workingHours": { "start": "9:00", "end": "17:00" } },
        "agent/favorites"
      ],
      "privateCustomData": ["internalNote", { "pin": "0000" }, "agent/favorites"]
    }
  }
}
```

<TypeTable
  type="{
  enabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Gates the profile in the Account panel.&#x22; },
  data: { type: &#x22;string[]&#x22;, description: &#x22;Which standard fields the Information card shows — the eight values listed below. Empty or missing: all of them.&#x22; },
  customData: { type: &#x22;(string | Record<string, unknown>)[]&#x22;, description: &#x22;The free-form properties of the Preferences card. Each entry is a property name, a `/`-separated path or an object giving defaults — see below.&#x22; },
  privateCustomData: { type: &#x22;(string | Record<string, unknown>)[]&#x22;, description: &#x22;The free-form properties only their owner can see, in the Private card. Same entries as `customData` — see below.&#x22; },
}"
/>

### Standard fields: `data` [#standard-fields-data]

`data` picks, among eight standard fields, the ones the form shows. These are the only values it accepts:

| Value          | Shown as       | Type in the profile | Note                                                                                                       |
| -------------- | -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| `fullName`     | Full name      | `string`            |                                                                                                            |
| `mail`         | Mail           | `string`            |                                                                                                            |
| `jobTitle`     | Job title      | `string`            | For example Product Owner.                                                                                 |
| `group`        | Group          | `string`            | The company group, for example R\&D.                                                                       |
| `organisation` | Organisation   | `string`            | For example Sinequa.                                                                                       |
| `location`     | Location       | `string`            |                                                                                                            |
| `skills`       | Skills         | `string`            | A free text, edited like any other field.                                                                  |
| `profilePhoto` | — (the avatar) | `string`            | Not a row: it turns on the avatar button, which opens the photo picker. The image is stored as a data URL. |

The profile's `id` is not in the list: it identifies the user, it is never shown or edited.

* **Empty or missing `data`**: all eight are shown.
* **Spelling**: values are matched exactly, case included — `"FullName"` matches nothing.
* **Unknown values are ignored**, without a warning. A list made only of unknown values therefore shows no
  standard field at all (it does not fall back to "all of them").
* **Order**: rows follow the order of the table above, whatever the order of your list.
* Labels come from `userProfile.data.<value>` in the `user-profile` translation scope.

### Free-form properties: `customData` [#free-form-properties-customdata]

An entry is one of two shapes, and the two can be mixed in the same list:

| Entry                  | Meaning                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `"nickname"`           | A property with no default.                                                                     |
| `{ "team": "Design" }` | A property with a **default value**. An object with several keys declares one property per key. |

The **default** is what the form shows while the profile holds no value for the property. It is shown, never
stored on its own: it is only written to the server if the user saves it. A property named like one of the standard
fields that are shown (`data`, compared without regard to case) is ignored, and when a key is declared twice the first
declaration wins. An entry that is neither a string
nor an object is skipped with a console warning — the JSON is read at run time, so a typo cannot break the form.

### What each kind of value becomes [#what-each-kind-of-value-becomes]

The default decides the kind (or, with no default, what the profile already stores for that property):

| Value                | Rendering                                                                                                                                                  | Users can…                                                                                                                                                                       |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string, number       | A text input.                                                                                                                                              | Edit and delete it. The value is saved as typed.                                                                                                                                 |
| boolean              | A **switch**, saved as soon as it is flipped, written as a real boolean (never the string `"true"`).                                                       | Flip it, or delete it to get the default back.                                                                                                                                   |
| array                | **Read-only tags** (a galactik `TagInput`), and an edit button that opens the array as **indented JSON** in a text area.                                   | Edit it as JSON — its items can be values, objects or arrays, mixed — or delete it. The text is validated before the save is offered; the whole array is written in one request. |
| object               | **One row per leaf**, named after its path: `{ "workingHours": { "start": "9:00" } }` gives `workingHours › start`. Objects nest: `hours › extra › lunch`. | Edit and delete each leaf. It is written at its path, the other leaves untouched.                                                                                                |
| `/`-separated string | A nested property, like a leaf: `"agent/favorites"` is `favorites` under `agent`, at any depth.                                                            | Edit and delete it, like a leaf.                                                                                                                                                 |

### Tabs [#tabs]

A profile with custom data would be one long form, so the form is split in **tabs**, one per block: *Information* (the
`data` fields), *Preferences* (`customData`) and *Private* (`privateCustomData`). A tab only exists when it has rows, and a
profile with a single block shows no tab at all. Each tab holds a card that says who can see its values (**Public** or
**Private**). Switching tab discards an edit in progress, and the content of a tab is rendered the first time it is
opened.

### Users edit values, not structures [#users-edit-values-not-structures]

The shape of an object or an array — which keys exist, how many items — belongs to the administrator's custom JSON.
So users edit the *leaves* — each one is written at its path with a path-based `PATCH` — and an array as a whole, as
JSON, since its items can be anything. For an object, what the profile stores for a leaf wins over the default, and an
object the profile already holds is shown leaf by leaf even when the configuration gives it no default.

The server does not create the nodes on the way: a `PATCH` on `obj/deep/leaf` answers `404` while `obj` or `obj/deep`
is not in the profile. The form therefore writes at the first missing node and carries the rest of the path as
nested objects — with an empty profile, `obj/deep/leaf` is written as `obj` = `{ "deep": { "leaf": … } }`.

**Not supported yet:**

* editing the items of an array one by one (an array is edited as JSON, as a whole);
* adding or removing a key of an object;
* a default that is `null` (it means "no default").

### Private values: `privateCustomData` [#private-values-privatecustomdata]

`privateCustomData` takes the same entries as `customData` (names, defaults, objects, `/`-separated paths, booleans,
arrays), and the form renders them the same way, in a card of their own, **Private**, after the others. What
changes is who can see them: only their owner. They are returned only for the signed-in user's own profile, and never
by the `GET api/v2/user-profile/{id}` of another user.

```json title="Custom JSON — general"
{
  "features": {
    "userProfile": {
      "privateCustomData": ["internalNote", { "pin": "0000" }, "agent/favorites"]
    }
  }
}
```

* A private property is read, saved and deleted through `api/v2/user-profile/privateCustomData/{path}` **only** — never
  through the public routes, nested paths included. A public property keeps using the public ones.
* A path declared in both `customData` and `privateCustomData` gives two rows, in two cards: they are two distinct
  values on the server.
* Every card says who can see its values — **Public** or **Private**, with an icon and a text (and a tooltip), so the
  information is not carried by the icon or a colour alone.
* No private value is ever logged, and none appears in a URL other than as the path of its property.
* Without `privateCustomData`, the form behaves as before: no Private card.

### Labels [#labels]

A standard field is labelled with `userProfile.data.<key>`. A free-form property is labelled with
`userProfile.customData.<key>` (`userProfile.privateCustomData.<key>` for a private one) when the application provides that translation in the `user-profile` scope, and with
the key itself otherwise — so nothing needs translating for the form to work. A leaf is named after its object:
the label of `workingHours` followed by `› start`.

```json title="user-profile/fr.json"
{
  "customData": {
    "nickname": "Surnom",
    "team": "Équipe",
    "workingHours": "Horaires de travail"
  }
}
```

### What a row tells the user [#what-a-row-tells-the-user]

Under each field, one message at a time:

| Message                            | When                                                                                                 |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------- |
| The error                          | The save failed (an expired session, a rejected value, …).                                           |
| **Saved**                          | For a few seconds after a save. The field also takes galactik's `success` look.                      |
| **Default value**                  | The profile holds no value; what is shown is the administrator's default.                            |
| *Enter to save · Escape to cancel* | While the row is edited. For an array: *Edit the JSON array · Escape to cancel* (Enter adds a line). |

### Deleting a value [#deleting-a-value]

The delete button removes the stored value, and the row falls back to the administrator's default (or to an empty
field when there is none). It is **disabled while the profile holds no value** for the property: there is nothing
to delete, and the server answers `404 Property path '…' not found` for a path the profile does not hold. If that
404 happens anyway — a stale state, a deletion made elsewhere — it is taken as "already absent": the row is shown
as deleted and no error is displayed. Any other failure, such as a `401` on an expired session, is shown.

### Keyboard [#keyboard]

`Enter` saves the row being edited, and `Escape` cancels it. The form usually lives in a dialog, which closes on
`Escape`: while a row is being edited the key belongs to the field, so cancelling the edit does **not** close the
dialog. On a row that is not being edited, `Escape` closes the dialog as it would anywhere else.

### Where the focus lands [#where-the-focus-lands]

A dialog announces itself, then lets `Tab` walk in: with nothing more, a keyboard user opening the account panel
would press `Tab` through the close button and the panel navigation before reaching the profile they came to
edit. So when the dialog **opens** on the account panel, the focus goes straight to its first control — the photo,
else the password button, else the first field. It waits for the profile to load, and never takes the focus back
from a user who has already moved on.

It happens once. As soon as the user picks a panel in the dialog's navigation, the account panel stops claiming
the focus: after that it belongs to the navigation button they just pressed.

## Options [#options]

<TypeTable
  type="{
  focusOnOpen: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;SettingsAccountPanelComponent. Puts the focus on the first control of the profile once it is rendered. The settings dialog turns it on only for the panel it opens on, until the user navigates.&#x22; },
  changingPassword: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;Whether the inline ChangePassword form replaces the profile fields.&#x22; },
  allowChangePassword: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;Whether the deployment offers a password change: the feature flag, a credentials auth mode, and an editable partition, all three.&#x22; },
}"
/>

`UserProfileFormComponent` takes no input and has no output — everything else is protected, internal wiring.

<TypeTable
  type="{
  &#x22;getUserProfile(userId)&#x22;: {
    type: &#x22;(userId: Signal<string | undefined>): ResourceRef<UserProfile | undefined>&#x22;,
    description: &#x22;UserProfileService. A signal of undefined issues no request. The resource is shared by every caller and created with the service's own injector, so it outlives the dialog that first asked for it.&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The save button of an array does nothing">
    The text must be the JSON of an **array**: an object, a string or a number is refused, with &#x2A;This is not a valid JSON
    array.* under the field, and no request is sent. Check the quotes and the trailing commas.
  </Accordion>

  <Accordion title="Saving a nested property answers 404">
    The server creates no node on the way. The form already writes at the first missing node, so a `404` on a nested path
    points at something else: an expired session, a backend that is older than the hierarchical `customData`
    (11.14.0), or `@sinequa/atomic` older than 2.15.0 for a private path.
  </Accordion>

  <Accordion title="A configured customData property does not show up">
    Check, in order: that `features.userProfile.enabled` is `true`; that the key does not have the name of a standard field
    that is shown (`data`) — those win and the custom one is ignored; that the entry is a string or a plain object (anything else
    is skipped, with a warning in the console); and that an object default is not empty — `{}` has no leaf, so it has
    no row.
  </Accordion>

  <Accordion title="The profile form is empty the second time the dialog is opened">
    Fixed in the version that creates the shared profile resource with the service's injector. Before it, the
    resource was created in the form — inside the dialog — and destroyed with it, while the service kept handing out
    that dead resource. If you call `getUserProfile()` yourself, create nothing around it: it already survives the
    component that asked for it.
  </Accordion>

  <Accordion title="Deleting a profile field crashes with NG01902">
    Store `""` for a deleted property, never `undefined` — Signal Forms excludes `undefined` properties from the
    field tree entirely, which orphans the control still bound to that key. The built-in delete action already
    does this; only relevant if you build a custom mutator against the same field tree.
  </Accordion>

  <Accordion title="The profile form is nested inside another form, and the browser complains">
    `UserProfileFormComponent` renders its own `<form>`, and so does the `ChangePassword` view it hosts inline.
    Never wrap it in a `<form>` of your own — nested `<form>` elements are invalid HTML, and the outer one's submit
    behavior becomes unpredictable.
  </Accordion>

  <Accordion title="The password-change entry point is missing even though allowChangePassword is on">
    `allowChangePassword` alone is not sufficient — the computed also requires a `credentials` auth mode and an
    editable partition. Check all three before assuming the flag is inert (unlike the four flags that genuinely
    are — see [Feature flags](./feature-flags.mdx)).
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Feature flags" href="./feature-flags.mdx">
    Where general.features.userProfile and allowChangePassword are configured.
  </Card>

  <Card title="Change Password" href="../auth/change-password.mdx">
    The form the Account panel hosts inline when the deployment allows it.
  </Card>
</Cards>
