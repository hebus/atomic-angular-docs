# Sponsored Results (/docs/atomic-angular/results/sponsored-results)

Up to three promoted links relevant to the current query, each opening in a new window with a "PROMOTED" badge — customizable, and query-parameter overridable for testing.



`<sponsored-results>` fetches and renders the application's configured sponsored links for the current query —
a small, self-contained list with no filtering or paging of its own.

## Minimal example [#minimal-example]

<CodeSample id="sponsored-results-basic" title="Above or beside the result list">
  <Lang value="angular">
    ```ts title="results-page.component.ts"
    import { Component } from "@angular/core";
    import { SponsoredResultsComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "results-page",
      imports: [SponsoredResultsComponent],
      template: `<sponsored-results />`,
    })
    export class ResultsPageComponent {}
    ```
  </Lang>
</CodeSample>

## Recipes [#recipes]

### A custom "Promoted" badge [#a-custom-promoted-badge]

Project a template marked with `*childMarker` to replace the default badge.

<CodeSample id="sponsored-results-custom-badge" title="A differently-worded badge">
  <Lang value="angular">
    ```ts title="results-page.component.ts"
    import { Component } from "@angular/core";
    import { ChildMarkerDirective, SponsoredResultsComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "results-page",
      imports: [SponsoredResultsComponent, ChildMarkerDirective],
      template: `
        <sponsored-results>
          <span *childMarker class="custom-promoted-badge">Sponsored</span>
        </sponsored-results>
      `,
    })
    export class ResultsPageComponent {}
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  slice: { type: &#x22;number&#x22;, default: &#x22;3&#x22;, description: &#x22;Maximum number of sponsored results shown. Also overridable per-request with the maxSponsoredResults query parameter.&#x22; },
  displayPromoted: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Shows the \&#x22;PROMOTED\&#x22; badge. Also overridable with the displayPromoted query parameter.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="An empty page still exposes a list landmark to assistive technology">
    It should not — the host's `role` is set conditionally to `"list"` only once there is at least one sponsored
    result, precisely to avoid exposing a list landmark with no list items when there is nothing to show.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Converter Select" href="./converter-select.mdx">
    Another small, configuration-driven display component.
  </Card>
</Cards>
