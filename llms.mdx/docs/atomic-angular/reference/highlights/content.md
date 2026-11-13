# Highlights (/docs/atomic-angular/reference/highlights)

The injection token configuring the five preview highlight categories — company, geo, person, extract locations, match locations — and how to override their colors.



`HIGHLIGHTS` configures the colors the document preview uses to highlight five categories of text — entities
the engine extracted, and the terms that matched the query. It ships with defaults and can be overridden
per-application.

## Options [#options]

<TypeTable
  type="{
  name: {
    type: '&#x22;company&#x22; | &#x22;geo&#x22; | &#x22;person&#x22; | &#x22;extractslocations&#x22; | &#x22;matchlocations&#x22;',
    description: &#x22;The highlight category.&#x22;,
  },
  color: { type: &#x22;string&#x22;, description: &#x22;Text color.&#x22; },
  bgColor: { type: &#x22;string&#x22;, description: &#x22;Background color.&#x22; },
}"
/>

## Recipes [#recipes]

### Overriding one highlight's colors [#overriding-one-highlights-colors]

`HIGHLIGHTS`'s default factory returns all five; a `provide` override replaces the whole array, so keep every
entry you are not changing.

<CodeSample id="highlights-override" title="Recoloring match locations">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import type { ApplicationConfig } from "@angular/core";
    import { HIGHLIGHTS } from "@sinequa/atomic-angular";

    export const appConfig: ApplicationConfig = {
      providers: [
        {
          provide: HIGHLIGHTS,
          useValue: [
            { name: "company", color: "white", bgColor: "#FF7675" },
            { name: "geo", color: "white", bgColor: "#74B9FF" },
            { name: "person", color: "white", bgColor: "#00ABB5" },
            { name: "extractslocations", color: "black", bgColor: "#fffacd" },
            // Only this one actually changes.
            { name: "matchlocations", color: "black", bgColor: "#ffd700" },
          ],
        },
      ],
    };
    ```
  </Lang>
</CodeSample>

## What's next [#whats-next]

<Cards>
  <Card title="Feature flags" href="./feature-flags.mdx">
    Every key of the app's general configuration, and which ones actually gate behavior.
  </Card>
</Cards>
