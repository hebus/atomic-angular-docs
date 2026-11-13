# ThemeToggle (/docs/atomic-angular/theming-and-shell/theme-toggle)

A labeled light/dark switch for one ThemeStore scope, built on Signal Forms' checkbox contract.



`<theme-toggle>` is a hidden checkbox bound through Signal Forms, with an icon and a "Dark mode" label doing the
visible work — checking it calls `ThemeStore.setDarkMode()` for the given scope.

## Minimal example [#minimal-example]

<CodeSample id="theme-toggle-basic" title="A dark-mode switch for the main scope">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { ThemeToggleComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [ThemeToggleComponent],
      template: `<theme-toggle scope="main" />`,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  scope: { type: &#x22;string&#x22;, description: &#x22;Required. Which ThemeStore scope this toggle reads from and writes to.&#x22; },
  darkMode: { type: &#x22;model<boolean>&#x22;, default: &#x22;false&#x22;, description: &#x22;Two-way — kept in sync with the scope's dark-mode state.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Ticking the checkbox does nothing">
    `ThemeStore.scopes()` has no entry for that scope — `toggleDarkMode()` reads the current scope and returns
    early when it is `undefined` or has no `cssVars`. Register the scope first (`loadDefaultTheme`/`setCurrentTheme`),
    same as [ThemeProvider](./theme-provider.mdx#pitfalls).
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Theme" href="./theme.mdx">
    Register themes at bootstrap and apply one to the whole page.
  </Card>
</Cards>
