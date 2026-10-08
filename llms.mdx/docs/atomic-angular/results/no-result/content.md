# No Result (/docs/atomic-angular/results/no-result)

The stylized zero-match message — and where pagination for a result list actually lives, since the old Pager component is deprecated.



`<NoResult>` is a purely presentational, input-less message shown when a search genuinely matched nothing —
see [Query](./query.mdx) for telling that state apart from a failed request, which is the caller's
responsibility, not this component's.

## Minimal example [#minimal-example]

<CodeSample id="no-result-basic" title="Shown only on a genuine zero-match">
  <Lang value="angular">
    ```ts title="results.component.ts"
    import { Component, inject } from "@angular/core";
    import { NoResultComponent, QueryService } from "@sinequa/atomic-angular";

    @Component({
      selector: "results-component",
      imports: [NoResultComponent],
      template: `
        @if (!queryService.failure() && queryService.result().rowCount === 0) {
          <NoResult />
        }
      `,
    })
    export class ResultsComponent {
      protected readonly queryService = inject(QueryService);
    }
    ```
  </Lang>
</CodeSample>

The component takes no input: its icon and title are fixed, translated strings, and the icon's box stays
square as it grows from one line to two (a long translation, a narrow column, mobile) — nothing is exposed to
tune that.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="I need a Pager component for the result list">
    `PagerComponent` still exists but lives under `components/deprecated/` and is not part of the pages this
    migration documents — it predates `QueryService.gotoPage()`, which is the current, supported way to move
    between pages. See [Query](./query.mdx#paging-through-a-result).
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Query" href="./query.mdx">
    Tell a genuine zero-match apart from a failed request, and page through a result.
  </Card>
</Cards>
