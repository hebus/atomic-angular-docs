# Theme (/docs/atomic-angular/theming-and-shell/theme)

Register one or more color themes at bootstrap, then switch a scope between them (and between light/dark) at runtime through ThemeStore.



A theme is a named set of CSS custom properties — one value per color role (`primary`, `background`,
`destructive`, …), in a light and a dark variant. `ThemeStore` holds every registered theme and, for each
**scope** you define, which one is currently active and in which mode.

<Callout title="Concept — scope">
  A scope is just a string key you choose (`"application"`, `"main"`, the id of a panel) — `ThemeStore` keeps one
  independent theme/dark-mode pair per scope, so nesting or coexisting themes is a matter of using different scope
  names, not a feature you configure.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="theme-bootstrap" title="Register a theme and apply it to the whole page">
  <Lang value="angular">
    ```ts title="main.ts"
    import { bootstrapApplication } from "@angular/platform-browser";
    import { withThemeBodyHook, withThemes, type Theme } from "@sinequa/atomic-angular";
    import { AppComponent } from "./app.component";
    import { appConfig } from "./app.config";

    // A theme repeats every color role of the built-in "Default" theme (see the
    // exported `Theme` type) — only `primary` is shown here for brevity.
    const THEMES = [{ name: "Ruby", colors: { primary: "0 84% 45%" } }] as unknown as Theme[];

    bootstrapApplication(AppComponent, appConfig)
      .then((app) => withThemes(app, THEMES))
      .then((app) => withThemeBodyHook(app, { scope: "application", theme: "Ruby" }))
      .catch((err) => console.error(err));
    ```
  </Lang>
</CodeSample>

Exporting `THEMES` from its own file is worth doing as soon as a theme carries more than a couple of colors —
a full color set is a large literal, and keeping it out of `app.config.ts` keeps the bootstrap file readable.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Themes[&#x22;THEMES array&#x22;] -- &#x22;withThemes(app, THEMES)&#x22; --> Registry[&#x22;module-level THEMES (utils/theme-registry)&#x22;]
    Registry -- &#x22;read by&#x22; --> Store[&#x22;ThemeStore.setCurrentTheme()&#x22;]
    Store -- &#x22;processCssVars()&#x22; --> Vars[&#x22;CssVars { light, dark }&#x22;]
    Vars -- &#x22;scopes()[scope]&#x22; --> BodyHook[&#x22;withThemeBodyHook — scope 'application'&#x22;]
    Vars -- &#x22;scopes()[scope]&#x22; --> Provider[&#x22;ThemeProviderDirective — any scope&#x22;]
    BodyHook -- &#x22;applyThemeToNativeElement&#x22; --> Body[[&#x22;document.body&#x22;]]
    Provider -- &#x22;applyThemeToNativeElement&#x22; --> Host[[&#x22;directive's host element&#x22;]]"
/>

`withThemes()` pushes your themes into a module-level array read by `ThemeStore` — it does nothing else, and
order relative to `withThemeBodyHook()` matters: the hook reads that array through `setCurrentTheme()`, so it
must run after `withThemes()` in the bootstrap chain. `withThemeBodyHook()` is the one integration that targets
`document.body` directly, through the fixed scope name `"application"` (or whatever `scope` you pass it) —
every other scope is applied through `[themeProvider]` on a specific element instead (see
[ThemeProvider](./theme-provider.mdx)).

## Options [#options]

<TypeTable
  type="{
  &#x22;loadDefaultTheme(scope, darkMode?)&#x22;: {
    type: &#x22;(scope: string, darkMode?: boolean) => void&#x22;,
    description: 'Shortcut for setCurrentTheme(scope, &#x22;Default&#x22;, darkMode).',
  },
  &#x22;setCurrentTheme(scope, themeName, darkMode?)&#x22;: {
    type: &#x22;(scope: string, themeName: string, darkMode?: boolean) => void&#x22;,
    description: &#x22;Switches the scope's active theme. Omitted darkMode keeps the scope's current mode, or false for a new scope.&#x22;,
  },
  &#x22;setDarkMode(scope, darkMode)&#x22;: {
    type: &#x22;(scope: string, darkMode: boolean) => void&#x22;,
    description: &#x22;Toggles light/dark for a scope without changing which theme is active.&#x22;,
  },
  &#x22;scopes()&#x22;: {
    type: &#x22;Signal<Record<string, { cssVars, darkMode, themeName }>>&#x22;,
    description: &#x22;The full per-scope state, read by every consumer (ThemeProvider, ThemeSelector, ThemeToggle).&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="setCurrentTheme() throws &#x22;Theme &#x22;X&#x22; not found&#x22;">
    The theme name passed does not match any entry's `name` in the array `withThemes()` registered — including the
    built-in `"Default"` theme name used by `loadDefaultTheme()`, which only exists if your own `THEMES` array
    actually defines one named exactly `"Default"`.
  </Accordion>

  <Accordion title="A scope's theme never applies to the page">
    `withThemeBodyHook()` only ever targets `document.body`, for the one scope you passed it (`"application"` by
    default). Every other scope needs its own `[themeProvider]="scopeName"` on the element that should carry it —
    registering a scope in `ThemeStore` does not apply it anywhere on its own.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="ThemeProvider" href="./theme-provider.mdx">
    Apply a scope's theme to one element (and everything under it), nestable.
  </Card>

  <Card title="ThemeSelector" href="./theme-selector.mdx">
    A menu of registered themes, bound to a scope.
  </Card>

  <Card title="ThemeToggle" href="./theme-toggle.mdx">
    A light/dark switch for a scope.
  </Card>
</Cards>
