# ThemeSelector (/docs/atomic-angular/theming-and-shell/theme-selector)

A menu, opened from your own trigger content, listing every registered theme for a scope and switching it on click.



`<theme-selector>` projects whatever you put inside it as the menu's trigger button — there is no default
label or icon — and opens a menu of every theme registered for the given `scope`, each row swatched with that
theme's `primary` color.

## Minimal example [#minimal-example]

<CodeSample id="theme-selector-basic" title="A named trigger opening the theme menu">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { ThemeSelectorComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [ThemeSelectorComponent],
      template: `<theme-selector scope="main">Theme</theme-selector>`,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  scope: { type: &#x22;string&#x22;, description: &#x22;Required. Which ThemeStore scope this selector reads from and writes to.&#x22; },
  showPrivate: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Include themes flagged private in the menu.&#x22; },
  selectedTheme: { type: &#x22;model<string | undefined>&#x22;, description: &#x22;Two-way — the active theme's name, kept in sync with the scope.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The trigger button renders empty">
    `<theme-selector>` has no default trigger content — its template is `<button [menuTrigger]="…"><ng-content /></button>`.
    Project a label, an icon, or both between the tags; an empty `<theme-selector scope="main" />` is a button with
    nothing to click on.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="ThemeToggle" href="./theme-toggle.mdx">
    A light/dark switch for the same scope.
  </Card>
</Cards>
