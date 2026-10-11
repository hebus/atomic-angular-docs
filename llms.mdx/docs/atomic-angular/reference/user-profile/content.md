# User profile (/docs/atomic-angular/reference/user-profile)

Load and edit the signed-in user's profile, one property at a time, through a Signal Forms field tree hosted in an imperative dialog.



`UserProfileFormComponent` renders and edits the current user's profile; `UserProfile` hosts that form in a
callable dialog. The form edits one property at a time — each row is read-only until its edit button is
pressed, and saving sends a `PATCH` for that single property only, never the whole profile.

## Minimal example [#minimal-example]

<CodeSample id="user-profile-basic" title="Open the profile dialog">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, inject, Injector } from "@angular/core";
    import { UserProfile } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      template: `<button type="button" (click)="openProfile()">Profile</button>`,
    })
    export class SampleComponent {
      private readonly injector = inject(Injector);

      protected async openProfile() {
        await UserProfile.call(undefined, { injector: this.injector });
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
    PrincipalStore -- &#x22;userId&#x22; --> Resource[&#x22;UserProfileService.getUserProfile (httpResource)&#x22;]
    Resource --> User[&#x22;user() linkedSignal&#x22;]
    User --> Model[&#x22;profileModel() linkedSignal&#x22;]
    Model --> Tree[&#x22;Signal Forms field tree&#x22;]
    Tree -- &#x22;save (submission.action)&#x22; --> Patch[&#x22;client.api.userProfile.patch&#x22;]
    Patch --> Resource
    AppStore -- &#x22;general().features.userProfile&#x22; --> Keys[&#x22;configured keys() / customData()&#x22;]
    Keys --> Model"
/>

Which properties appear is configuration-driven: `general.features.userProfile.data` selects the standard
profile keys, `customData` adds free-form ones. The form model is a `linkedSignal` — a successful save, a
deletion or a profile reload re-seeds every field from server state, which is what discards a cancelled draft
with no manual DOM restore.

## Options [#options]

<TypeTable
  type="{
  currentLanguage: { type: &#x22;model<string | null>&#x22;, description: &#x22;The language shown in the picker. null is the empty state — never undefined, which would orphan the Select's field (NG01902).&#x22; },
  changingPassword: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;Whether the inline ChangePassword form replaces the profile fields.&#x22; },
  allowChangePassword: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;Whether the deployment offers a password change: the feature flag, a credentials auth mode, and an editable partition, all three.&#x22; },
  &#x22;changeLanguage()&#x22;: { type: &#x22;(): void&#x22;, description: &#x22;Applies currentLanguage() to UserSettingsStore and to Transloco.&#x22; },
}"
/>

`UserProfileFormComponent` takes no input and has no output — everything else is protected, internal wiring.

<TypeTable
  type="{
  &#x22;getUserProfile(userId)&#x22;: {
    type: &#x22;(userId: Signal<string | undefined>): HttpResourceRef<UserProfile | undefined>&#x22;,
    description: &#x22;UserProfileService. A signal of undefined issues no request.&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
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
    The form UserProfile hosts inline when the deployment allows it.
  </Card>
</Cards>
