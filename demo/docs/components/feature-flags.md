# Feature Flags

A developer/QA dialog that edits the application's `general` configuration live: grouped feature flags, feedback switches, logo URLs and converters. Changes are written to the `AppStore`, so the rest of the app reacts immediately — no need to edit the customization JSON and reload.

The dialog is admin-gated: it can always be opened, but a non-admin only sees an "admin only" notice.

## Imports

```ts
import { FeatureFlags } from "@sinequa/atomic-angular";
```

## Edit the config live

Open the dialog and edit any section — the panel below reflects `appStore.general()` in real time, which is exactly what the rest of the application reads. Feature flags are grouped by domain; the **Feedback**, **Logos** and **Converters** sections edit `general.feedback`, `general.logo` and `general.converters`. The search filter keeps everything findable. The dialog is opened imperatively through the `FeatureFlags` callable (same pattern as the other dialogs).

<demo-feature-flags></demo-feature-flags>

```ts
private readonly injector = inject(Injector);

openDialog(): void {
  FeatureFlags.call(undefined, { injector: this.injector });
}
```

## Read the config anywhere

The `general` config is read reactively from the `AppStore`, so any component reacts to an edit without extra wiring.

```ts
private readonly appStore = inject(AppStore);

readonly features = computed(() => this.appStore.general()?.features ?? {});
readonly advancedSearch = computed(() => this.appStore.general()?.features?.advancedSearch ?? false);
readonly converters = computed(() => this.appStore.general()?.converters ?? []);
```
