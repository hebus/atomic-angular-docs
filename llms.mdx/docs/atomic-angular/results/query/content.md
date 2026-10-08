# Query (/docs/atomic-angular/results/query)

Run a search, tell a failed request apart from a genuine zero results, and page through a result — the service every result-rendering component in this library sits on top of.



`QueryService` is the one place a search actually happens: it turns a `Query` into a request, exposes the last
`Result` and its failure state as signals, and moves between pages. Almost every other component in this
section — sorting, spelling correction, missing terms — reads the `Result` this service produced rather than
issuing a request of its own.

<Callout title="Concept — Result vs. failure">
  A search that fails still resolves to a `Result` — the request never throws — with the failure captured on
  `$error` instead. An empty `records` array is ambiguous by itself: it means "the corpus matched nothing" on a
  successful request, and "something went wrong" on a failed one. Check `$error` first, always.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="query-basic" title="Search, and tell a failure apart from zero results">
  <Lang value="angular">
    ```ts title="results.component.ts"
    import { Component, inject } from "@angular/core";
    import { QueryService } from "@sinequa/atomic-angular";

    @Component({
      selector: "results-component",
      template: `
        @if (queryService.failure(); as error) {
          <p>Search failed: {{ error.message }}</p>
        } @else if (queryService.result().rowCount === 0) {
          <p>No results</p>
        } @else {
          <ul>
            @for (record of queryService.result().records; track record.id) {
              <li>{{ record.title }}</li>
            }
          </ul>
        }
      `,
    })
    export class ResultsComponent {
      protected readonly queryService = inject(QueryService);

      constructor() {
        this.queryService.search({ text: "quarterly report" }).subscribe();
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Call[&#x22;search(partialQuery)&#x22;] --> Merge[&#x22;merge with QueryParamsStore, unless includeQueryParams=false&#x22;]
    Merge --> Request[&#x22;HTTP request&#x22;]
    Request --> Response{&#x22;Request succeeded?&#x22;}
    Response -->|no| Failed[&#x22;Result with $error set, empty records&#x22;]
    Response -->|yes| Ok[&#x22;Result with records, rowCount, $error undefined&#x22;]
    Failed --> Signal[&#x22;result signal / failure computed&#x22;]
    Ok --> Signal"
/>

`search()` still returns an `Observable<Result>` for callers that want to compose it, but the same `Result`
also lands on the `result` signal (and `failure`, `result().$error`) — which is what a template reads instead
of subscribing manually. **The observable never errors**: a failed request still emits, because throwing would
cancel the navigation of any route resolver built on this service, which historically rendered an empty page
instead.

<Callout title="A global toast is not a substitute">
  `provideAtomicNotifications()` (see [Notify failed requests as
  toasts](../integration/atomic-notifications.mdx)) already surfaces every failed request to the *user* as a
  toast — but that leaves the *component* still rendering "0 results" underneath unless it also checks
  `$error` itself. The two are complementary, not either/or.
</Callout>

## Recipes [#recipes]

### Paging through a result [#paging-through-a-result]

<CodeSample id="query-paging" title="Next/previous page">
  <Lang value="angular">
    ```ts title="pager.component.ts"
    import { Component, inject } from "@angular/core";
    import { QueryService } from "@sinequa/atomic-angular";

    @Component({
      selector: "pager-component",
      template: `
        <button type="button" (click)="queryService.gotoPage(currentPage() - 1)" [disabled]="currentPage() <= 1">
          Previous
        </button>
        <button type="button" (click)="queryService.gotoPage(currentPage() + 1)">Next</button>
      `,
    })
    export class PagerComponent {
      protected readonly queryService = inject(QueryService);
      protected readonly currentPage = () => this.queryService.result().page ?? 1;
    }
    ```
  </Lang>
</CodeSample>

### Running several queries in parallel [#running-several-queries-in-parallel]

<CodeSample id="query-bulk" title="Compare two searches at once">
  <Lang value="angular">
    ```ts title="compare.component.ts"
    import { Component, inject } from "@angular/core";
    import { QueryService } from "@sinequa/atomic-angular";
    import type { Query } from "@sinequa/atomic";

    @Component({
      selector: "compare-component",
      template: ``,
    })
    export class CompareComponent {
      private readonly queryService = inject(QueryService);

      protected compare(a: Query, b: Query) {
        this.queryService.bulkSearch([a, b]).subscribe(([resultA, resultB]) => {
          console.log(resultA.rowCount, resultB.rowCount);
        });
      }
    }
    ```
  </Lang>
</CodeSample>

Results come back in the same order as the input queries — index them by position, not by matching them back
to a query afterward.

## Options [#options]

<TypeTable
  type="{
  &#x22;search(q?, includeQueryParams?, audit?)&#x22;: {
    type: &#x22;(q?: Partial<Query>, includeQueryParams?: boolean, audit?: AuditEvents): Observable<Result>&#x22;,
    description: &#x22;includeQueryParams (default true) merges the current URL query params automatically.&#x22;,
  },
  &#x22;bulkSearch(q, audit?)&#x22;: { type: &#x22;(q: Query[], audit?: AuditEvents): Observable<Result[]>&#x22; },
  &#x22;gotoPage(page)&#x22;: { type: &#x22;(page: number): void&#x22; },
  result: { type: &#x22;Signal<Result>&#x22;, description: &#x22;The last result, whether it succeeded or failed.&#x22; },
  failure: { type: &#x22;Signal<ApiError | undefined>&#x22;, description: &#x22;result().$error — set only on a failed request.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A malformed filter shows as &#x22;0 results&#x22; instead of an error">
    You checked `records.length` (or `rowCount`) without checking `$error` first — both a genuine zero-match and a
    failed request (a 500 on a bad filter, most often) arrive as an empty `records` array. Check `failure()`
    (or `result().$error`) before drawing any conclusion from an empty result.
  </Accordion>

  <Accordion title="Subscribing to search() throws, or the subscription silently never fires">
    It should not throw — the whole point of carrying the failure on `$error` is that `search()` never errors the
    observable. If nothing fires at all, check that the query actually reached the service (a route resolver that
    swallowed the query, most often), not this service's error handling.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Autocomplete" href="./autocomplete.mdx">
    Suggestions as the user types, before a search is even run.
  </Card>

  <Card title="Did You Mean" href="./did-you-mean.mdx">
    Turn a corrected result's didYouMean property into the right message.
  </Card>
</Cards>
