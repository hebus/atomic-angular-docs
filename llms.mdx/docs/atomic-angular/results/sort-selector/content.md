# Sort Selector (/docs/atomic-angular/results/sort-selector)

A dropdown listing the sort choices a tab or query configuration actually offers, resolved from the current result rather than passed in by hand.



`<sort-selector>` reads which sort choices apply from the **result** it is given — a tab search and a regular
query can expose different lists, and the component resolves the right one instead of the caller having to
know which applies.

## Minimal example [#minimal-example]

<CodeSample id="sort-selector-basic" title="Sorting the current result">
  <Lang value="angular">
    ```ts title="results-toolbar.component.ts"
    import { Component, signal } from "@angular/core";
    import { SortSelectorComponent } from "@sinequa/atomic-angular";
    import type { Result } from "@sinequa/atomic";
    import type { SortingChoice } from "@sinequa/atomic-angular";

    @Component({
      selector: "results-toolbar",
      imports: [SortSelectorComponent],
      template: `
        @if (result(); as r) {
          <sort-selector [result]="r" (onSort)="applySort($event)" />
        }
      `,
    })
    export class ResultsToolbarComponent {
      protected readonly result = signal<Result | undefined>(undefined);

      protected applySort(sort: SortingChoice) {
        console.log(sort.name, sort.$isDesc);
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

1. **Tab search** — extracts sorting choices from the specific tab's own configuration (`tab.sortingChoices`),
   falling back to the query's if the tab defines none.
2. **Regular query** — uses the query configuration's `sortingChoices` directly.
3. Either way, a choice whose `orderByClause` includes `globalrelevance` is filtered out when the result has no
   relevance score (`!result().hasRelevance`) — a relevance sort makes no sense without one.

<Mermaid
  chart="flowchart TD
    Result[&#x22;result()&#x22;] --> Tab{&#x22;isTabSearch(query)?&#x22;}
    Tab -->|yes| TabChoices[&#x22;tab.sortingChoices&#x22;]
    Tab -->|no| QueryChoices[&#x22;query.sortingChoices&#x22;]
    TabChoices --> Filter{&#x22;hasRelevance?&#x22;}
    QueryChoices --> Filter
    Filter -->|no| Drop[&#x22;Drop globalrelevance choices&#x22;]
    Filter -->|yes| Keep[&#x22;Keep all&#x22;]
    Drop --> Options[&#x22;sortOptions()&#x22;]
    Keep --> Options"
/>

## Options [#options]

<TypeTable
  type="{
  result: { type: &#x22;Result&#x22;, description: &#x22;Required. Identifies the query (by name) and, for a tab search, which tab's choices apply.&#x22; },
  position: { type: &#x22;Placement&#x22;, default: '&#x22;bottom-start&#x22;', description: &#x22;Dropdown placement, from @floating-ui/dom.&#x22; },
  tabIndex: {
    type: &#x22;number | undefined&#x22;,
    description: &#x22;Set inside an ngToolbar with a roving tabindex (0 for the active widget, -1 otherwise); leave undefined outside one.&#x22;,
  },
}"
/>

`onSort` emits a `SortingChoice` (the configured choice plus a resolved `$isDesc` boolean) only when the user
picks a **different** option than the one currently active — reselecting the active sort emits nothing.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A sort choice configured in the app doesn't appear in the dropdown">
    Check whether its `orderByClause` targets `globalrelevance` — those choices are filtered out whenever the
    current result has no relevance score (`hasRelevance` is `false`), regardless of the configuration.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Query" href="./query.mdx">
    Where the Result this component reads sortingChoices from comes from.
  </Card>
</Cards>
