# Metadata & Source (/docs/atomic-angular/results/metadata-and-source)

Two small, read-only display components for a result row — an article field rendered as a row of tags, and the icon identifying which source or collection a document came from.



Two components that each render one property of an `Article`, nothing more — no interaction, no state.

## Metadata [#metadata]

Renders one `Article` field — `author`, a list of tags, anything array-shaped or scalar — as a row of `Tag`s.

<CodeSample id="metadata-basic" title="Authors, capped at three">
  <Lang value="angular">
    ```ts title="result-row.component.ts"
    import { Component, input } from "@angular/core";
    import { MetadataComponent } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "result-row",
      imports: [MetadataComponent],
      template: `<metadata variant="secondary" [article]="article()" metadata="author" [limit]="3" />`,
    })
    export class ResultRowComponent {
      readonly article = input.required<Article>();
    }
    ```
  </Lang>
</CodeSample>

<TypeTable
  type="{
  article: { type: &#x22;Article&#x22;, description: &#x22;Required.&#x22; },
  metadata: { type: &#x22;string&#x22;, description: &#x22;Required. Key of the article field to display.&#x22; },
  limit: { type: &#x22;string | number | undefined&#x22;, description: &#x22;Maximum number of tags shown. All shown by default.&#x22; },
  variant: { type: '&#x22;primary&#x22; | &#x22;secondary&#x22;', default: '&#x22;primary&#x22;', description: &#x22;Soft fill or outline.&#x22; },
  scheme: { type: &#x22;TagVariants[\&#x22;scheme\&#x22;]&#x22;, default: '&#x22;sage&#x22;', description: &#x22;Any of Tag's 12 color schemes.&#x22; },
  size: { type: '&#x22;xs&#x22; | &#x22;sm&#x22; | &#x22;md&#x22;', default: '&#x22;xs&#x22;' },
}"
/>

## Source [#source]

Resolves and displays the icon for a document's collection, source or connector, from
`AppStore`'s `sources` configuration.

<CodeSample id="source-basic" title="A collection's icon">
  <Lang value="angular">
    ```ts title="result-row.component.ts"
    import { Component } from "@angular/core";
    import { SourceComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "result-row",
      imports: [SourceComponent],
      template: `<source [collection]="['collection/myCollection']" connector="myConnector" />`,
    })
    export class ResultRowComponent {}
    ```
  </Lang>
</CodeSample>

<TypeTable
  type="{
  collection: { type: &#x22;string[]&#x22;, description: 'Collection path segments, e.g. [&#x22;collection/myCollection&#x22;].' },
  connector: { type: &#x22;string&#x22;, description: &#x22;Connector name.&#x22; },
}"
/>

Resolution order: collection, then source, then connector — provide at least one. Configure overrides through
the `sources` customization JSON:

```json title="sources customJSON" partial
{
  "collection": { "Documents/Set1": { "iconClass": "fa-kit fa-sharepoint" } },
  "source": { "Sharepoint": { "iconClass": "fa-kit fa-sharepoint" } },
  "connector": { "crawler": { "iconPath": "your/image/path.png" } }
}
```

An `iconPath` renders an `<img>`; otherwise `iconClass` is applied to an `<i>` element.

## What's next [#whats-next]

<Cards>
  <Card title="Sponsored Results" href="./sponsored-results.mdx">
    Another small, configuration-driven display component.
  </Card>
</Cards>
