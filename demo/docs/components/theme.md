# Theme

Two components from `@sinequa/atomic-angular` that drive the theme of a region of
the page through the global `ThemeStore`:

- `<theme-selector>` — opens a menu listing all registered themes and applies the
  selected one to its scope.
- `<theme-toggle>` — toggles dark mode on/off for its scope.

Both components are scoped: they read and write a named entry inside
`ThemeStore.scopes`. Pair them with the `[themeProvider]` directive on a wrapper
element so the resolved CSS variables (`--background`, `--foreground`, …) are
applied to that subtree.

## Imports

```ts
import {
  ThemeProviderDirective,
  ThemeSelectorComponent,
  ThemeStore,
  ThemeToggleComponent
} from "@sinequa/atomic-angular";
```

## Theme selector

`<theme-selector>` projects its content into a trigger button. Clicking the
button opens a menu listing every theme registered in `THEMES` (private themes
are filtered out unless `showPrivate` is set). Selecting an entry calls
`ThemeStore.setCurrentTheme(scope, themeName)`.

<demo-theme-selector></demo-theme-selector>

```html
<div [themeProvider]="scope">
  <theme-selector [scope]="scope">
    Change theme
  </theme-selector>
</div>
```

```typescript
import { Component, inject, OnInit } from "@angular/core";
import { ThemeStore } from "@sinequa/atomic-angular";

@Component({
  /* ... */
})
export class MyPage implements OnInit {
  readonly scope = "my-page";
  private readonly themeStore = inject(ThemeStore);

  ngOnInit(): void {
    this.themeStore.loadDefaultTheme(this.scope);
  }
}
```

## Theme toggle

`<theme-toggle>` is a labelled checkbox that flips the `darkMode` flag of its
scope through `ThemeStore.setDarkMode(scope, value)`. The `[themeProvider]`
directive reacts and swaps the scope's CSS variables between light and dark.

<demo-theme-toggle></demo-theme-toggle>

```html
<div [themeProvider]="scope">
  <theme-toggle [scope]="scope" />
</div>
```

## Combined

Because both components target the same `ThemeStore` scope, they can be wired
side by side and stay in sync — changing the theme keeps the dark-mode flag,
and toggling dark mode keeps the selected theme.

<demo-theme-combined></demo-theme-combined>

```html
<div [themeProvider]="scope">
  <theme-selector [scope]="scope">Change theme</theme-selector>
  <theme-toggle [scope]="scope" />
</div>
```

## API Reference

### &lt;theme-selector&gt;

#### Inputs

| Name           | Type      | Default | Description                                                                 |
| -------------- | --------- | ------- | --------------------------------------------------------------------------- |
| `scope`        | `string`  | —       | Name of the `ThemeStore` scope this selector reads from and writes to.       |
| `showPrivate`  | `boolean` | `false` | When `true`, themes marked `private` in `THEMES` are also listed.            |

#### Models

| Name             | Type                  | Description                                            |
| ---------------- | --------------------- | ------------------------------------------------------ |
| `selectedTheme`  | `string \| undefined` | Two-way bound to the currently selected theme name.    |

#### Content

The component projects its `ng-content` inside the trigger button — use it for
a label and/or an icon.

### &lt;theme-toggle&gt;

#### Inputs

| Name    | Type     | Default | Description                                                  |
| ------- | -------- | ------- | ------------------------------------------------------------ |
| `scope` | `string` | —       | Name of the `ThemeStore` scope whose `darkMode` flag is bound.|

#### Models

| Name       | Type                   | Description                                       |
| ---------- | ---------------------- | ------------------------------------------------- |
| `darkMode` | `boolean \| undefined` | Two-way bound mirror of `scopes[scope].darkMode`. |

## Notes

- Both components require a scope to be initialised in `ThemeStore` before they
  can react — call `themeStore.loadDefaultTheme(scope)` (or `setCurrentTheme` /
  `setDarkMode`) once, typically from the host page's `ngOnInit`.
- Use `[themeProvider]="scope"` on the wrapper element you want themed. Without
  it the store changes still happen but nothing in the DOM picks them up.
- The selector's `scope` and `showPrivate` are signals — they react to updates
  at runtime.
