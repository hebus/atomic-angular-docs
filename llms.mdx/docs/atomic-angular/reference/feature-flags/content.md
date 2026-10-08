# Feature flags (/docs/atomic-angular/reference/feature-flags)

Every key of the app's general.features/feedback configuration, which ones actually gate behavior, and the live admin editor for testing them.



An application customizes its behavior mostly through the `general` object of its JSON configuration (a
top-level `general` key, or a `general` customJSON side-file) — read once through `AppStore.general()`. This
page is the one place that lists every key of `general.features`/`general.feedback` **and says which ones a
consumer actually checks**, since a name in the type is not a promise that anything reads it.

<Callout title="Concept — customJSON">
  Sinequa configuration ships either **inline**, inside the app's main JSON, or as a named **customJSON**
  side-file merged in under the same key at runtime. `general.features.quickFilter` reads identically either
  way — `AppStore.general()` resolves whichever source is present, inline or customJSON, and returns `{}` if
  neither is.
</Callout>

## Minimal example [#minimal-example]

Opening the live editor — an imperative dialog, like every other dialog in this library.

<CodeSample id="feature-flags-basic" title="Open the feature-flags editor">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, inject, Injector } from "@angular/core";
    import { FeatureFlags } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      template: `<button type="button" (click)="openFeatureFlags()">Feature flags</button>`,
    })
    export class SampleComponent {
      private readonly injector = inject(Injector);

      protected openFeatureFlags() {
        FeatureFlags.call(undefined, { injector: this.injector });
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`FeatureFlagsDialogComponent` reads `AppStore.general()` and lets an **administrator** edit it live: every
edit rewrites the whole `general` object back onto the store through the same source it was read from (the
`general` customJSON if the app has one, otherwise inline `data.general`), so unknown keys the dialog does not
know about survive the round-trip. A non-administrator still gets the dialog, with an "admin only" notice
instead of the editor — there is no separate access check to remember on the caller's side.

<Mermaid
  chart="flowchart TD
    Caller -- &#x22;FeatureFlags.call()&#x22; --> Dialog[FeatureFlagsDialogComponent]
    Dialog -- &#x22;isAdministrator() / isDelegatedAdmin()&#x22; --> Gate{Administrator?}
    Gate -->|no| Notice[&#x22;Admin-only notice&#x22;]
    Gate -->|yes| Editor[Grouped toggles, feedback switches, logos, converters]
    Editor -- &#x22;setAt(path)&#x22; --> Apply[applyGeneral]
    Apply -- &#x22;general customJSON exists?&#x22; --> Branch{Source}
    Branch -->|yes| WriteJSON[&#x22;AppStore.update customJSONs&#x22;]
    Branch -->|no| WriteData[&#x22;AppStore.update data.general&#x22;]"
/>

Changes apply to the current session only — nothing is persisted back to the backend configuration — which is
what makes the tool suitable for testing a behavior without touching the deployment.

## Options [#options]

### `general.features` — boolean flags [#generalfeatures--boolean-flags]

<TypeTable
  type="{
  quickFilter: { type: &#x22;boolean&#x22;, description: &#x22;List/tree: clicking an item's label applies its filter immediately. Consumed — see aggregation Pitfalls.&#x22; },
  showAggregationItemCount: { type: &#x22;boolean&#x22;, description: &#x22;Consumed by the aggregation item count display.&#x22; },
  previewMultiConversion: { type: &#x22;boolean&#x22;, description: &#x22;Consumed by the preview's format-conversion picker.&#x22; },
  persistFiltersAcrossTabs: { type: &#x22;boolean&#x22;, description: &#x22;Consumed by the tabs feature to keep filters when switching tabs.&#x22; },
  filterLinkChildren: { type: &#x22;boolean&#x22;, description: &#x22;Consumed by tree-filter linking behavior.&#x22; },
  allowChangePassword: {
    type: &#x22;boolean&#x22;,
    description: &#x22;Consumed — gates the change-password entry point together with an editable partition and a credentials auth mode.&#x22;,
  },
  editablepartition: {
    type: &#x22;boolean&#x22;,
    description: &#x22;Inert — editable in this dialog, but nothing in the library reads this key to gate any behavior.&#x22;,
  },
  advancedSearch: {
    type: &#x22;boolean&#x22;,
    description: &#x22;Inert — editable in this dialog, but nothing in the library reads this key; the advanced-search panel's own availability does not check it.&#x22;,
  },
  allowChatDrawer: {
    type: &#x22;boolean&#x22;,
    description: &#x22;Deprecated and inert — it gated the chat of the removed drawer. No longer listed in the dialog's catalog: it only shows up there, as an extra flag, when the stored configuration still carries it. Drop it from your configuration.&#x22;,
  },
  expandPreview: {
    type: &#x22;boolean&#x22;,
    description: &#x22;Inert — editable in this dialog, but nothing in the library reads this key.&#x22;,
  },
  &#x22;assistant.usePrefixName&#x22;: { type: &#x22;boolean&#x22;, description: &#x22;Consumed by the assistant feature.&#x22; },
  &#x22;filters.homepage&#x22;: { type: &#x22;boolean&#x22;, description: &#x22;Consumed — see Filters bar's homepage behavior.&#x22; },
  &#x22;userProfile.enabled&#x22;: { type: &#x22;boolean&#x22;, description: &#x22;Consumed — gates the User Profile entry point.&#x22; },
}"
/>

### `general.feedback` — six independent switches [#generalfeedback--six-independent-switches]

<TypeTable
  type="{
  like: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Absent is treated as enabled — every switch defaults to on.&#x22; },
  dislike: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22; },
  content: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22; },
  ui: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22; },
  lang: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22; },
  other: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Toggling a flag in the editor changes nothing in the running app">
    Check it against the tables above first: `editablepartition`, `advancedSearch` and `expandPreview` are
    all editable here because they exist in the `CFeatures` type, but no consumer in this
    library reads them — toggling them only changes the stored configuration value, with no observable effect.
    This was confirmed by searching the library's sources for a reader of each key, not assumed from the name.
  </Accordion>

  <Accordion title="APP_FEATURES injection token has no effect">
    `APP_FEATURES` is deprecated — it is a separate, older injection token, unrelated to `general.features` and not
    read by this dialog or by `AppStore`. Use `general.features` (edited here, read via `AppStore.general()`)
    instead.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Keyboard shortcuts" href="./keyboard-shortcuts.mdx">
    The service, directive and help dialog behind every registered shortcut.
  </Card>
</Cards>
