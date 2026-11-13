# ThemeProvider (/docs/atomic-angular/theming-and-shell/theme-provider)

Apply a scope's active theme to one element and everything under it, as CSS custom properties — nestable, so a page can mix several themes.



`[themeProvider]` reads a scope's current theme and dark-mode state from [`ThemeStore`](./theme.mdx) and writes
the matching CSS variables directly onto the element it is bound to, via `element.style.setProperty`. Every
descendant inherits those variables through normal CSS cascade — including another `[themeProvider]` further
down, which is what makes nesting themes just a matter of choosing distinct scope names.

## Minimal example [#minimal-example]

<CodeSample id="theme-provider-basic" title="Two independently themed panels">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, inject } from "@angular/core";
    import { ThemeProviderDirective, ThemeStore } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [ThemeProviderDirective],
      template: `
        <div themeProvider="sidebar">
          <span class="text-(--theme-primary)">Themed by "sidebar"</span>
        </div>
        <div themeProvider="main">
          <span class="text-(--theme-primary)">Themed by "main"</span>
        </div>
      `,
    })
    export class SampleComponent {
      private readonly themeStore = inject(ThemeStore);

      constructor() {
        this.themeStore.loadDefaultTheme("sidebar");
        this.themeStore.loadDefaultTheme("main", true);
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  themeProvider: {
    type: &#x22;string&#x22;,
    description: &#x22;Required. The scope name looked up in ThemeStore — read reactively, so switching the scope's theme updates this element live.&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The element never gets any CSS variable">
    `ThemeStore.scopes()` has no entry for that scope yet — the directive's `effect()` returns early when the
    scope is unregistered. Call `loadDefaultTheme(scope)` or `setCurrentTheme(scope, name)` once before (or
    reactively alongside) mounting the element.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="ThemeSelector" href="./theme-selector.mdx">
    Let the user pick which registered theme a scope uses.
  </Card>
</Cards>
