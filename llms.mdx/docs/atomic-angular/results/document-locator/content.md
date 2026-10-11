# Document Locator (/docs/atomic-angular/results/document-locator)

A document's place in a hierarchy, as clickable breadcrumb segments that navigate through an aggregation — and overflow into a dropdown when the container is too narrow.



`<document-locator>` renders a document's location within a tree-shaped aggregation (a folder structure, a
collection hierarchy) as breadcrumbs. Clicking a segment updates the query's filters and navigates to that
location, and segments that don't fit the available width move into an overflow dropdown automatically.

## Minimal example [#minimal-example]

<CodeSample id="document-locator-basic" title="A document's collection path">
  <Lang value="angular">
    ```ts title="result-row.component.ts"
    import { Component, input } from "@angular/core";
    import { DocumentLocatorComponent } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "result-row",
      imports: [DocumentLocatorComponent],
      template: `<document-locator [article]="article()" aggregation="Collection" />`,
    })
    export class ResultRowComponent {
      readonly article = input.required<Article>();
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  article: { type: &#x22;Article&#x22;, description: &#x22;Required. Its treepath (or equivalent hierarchy value) is what gets segmented.&#x22; },
  aggregation: { type: &#x22;string&#x22;, description: &#x22;Required. Name of the tree aggregation this locator navigates — must match a configured tree facet, since a click writes a filter on it.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Clicking a breadcrumb segment does nothing">
    The `aggregation` name has to match a tree aggregation the app's configuration actually defines — a typo'd or
    missing name means the click has nothing to write a filter against. Cross-check against
    [Aggregation](../filters/aggregation.mdx#missing-vs-empty), which treats a misconfigured name the same way.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Aggregation" href="../filters/aggregation.mdx">
    The tree facet this component's segments ultimately filter on.
  </Card>
</Cards>
