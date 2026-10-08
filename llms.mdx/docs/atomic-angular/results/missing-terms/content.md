# Missing Terms (/docs/atomic-angular/results/missing-terms)

Which of the query's terms this particular document doesn't contain, struck through, each a link to re-run the search requiring all of them.



A document can match a multi-term query without containing every term — `<missing-terms>` reads
`article.termspresence` and shows the ones absent from this specific document, each one a link that re-runs
the search with that term required.

## Minimal example [#minimal-example]

<CodeSample id="missing-terms-basic" title="On a result row">
  <Lang value="angular">
    ```ts title="result-row.component.ts"
    import { Component, input } from "@angular/core";
    import { MissingTermsComponent } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "result-row",
      imports: [MissingTermsComponent],
      template: `<missing-terms [article]="article()" />`,
    })
    export class ResultRowComponent {
      readonly article = input.required<Article>();
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Article[&#x22;article().termspresence&#x22;] --> Filter[&#x22;Keep entries with presence = missing&#x22;]
    QueryParamsStore -- &#x22;current query&#x22; --> Links[&#x22;Build a search link per missing term&#x22;]
    Filter --> MissingTerms[&#x22;missingTerms computed&#x22;]
    Links --> MissingTerms
    MissingTerms --> Render[&#x22;Struck-through terms, each clickable&#x22;]"
/>

Each rendered term's query params force that term into the search (rather than replacing it), so clicking one
broadens the current query instead of starting a new one.

## Options [#options]

<TypeTable
  type="{
  article: { type: &#x22;Article&#x22;, description: &#x22;Required. Its termspresence array is what this component reads; a document with none renders nothing.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Clicking a missing term inside a clickable result row also opens the document">
    The component stops click propagation on its own term links for exactly this reason — if a custom result row
    still sees both events firing, confirm the click handler on the row is not itself intercepting the event
    before it reaches this component.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Document Locator" href="./document-locator.mdx">
    Another per-document component — where it sits in a collection hierarchy.
  </Card>
</Cards>
