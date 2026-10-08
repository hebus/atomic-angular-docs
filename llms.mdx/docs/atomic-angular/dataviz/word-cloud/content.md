# Word Cloud (/docs/atomic-angular/dataviz/word-cloud)

Aggregation values packed into a compact spiral layout — large words centered, smaller ones tucked into the gaps, some rotated.



The denser, classic "word cloud" look: words placed by a spiral search with collision detection, some rotated,
sized and colored like [`<TagCloud>`](./tag-cloud.mdx) but laid out rather than wrapped. Reach for `<TagCloud>`
first — this component carries a real placement algorithm, and is worth its cost only when the packed look is
the point.

## Minimal example [#minimal-example]

<CodeSample id="word-cloud-basic" title="A packed cloud of entities">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { WordCloudComponent } from "@sinequa/atomic-angular";
    import type { AggregationLike, TagCloudEntry } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [WordCloudComponent],
      template: `
        <div class="h-64">
          <WordCloud [aggregations]="[companies(), people()]" (tagSelected)="onTag($event)" />
        </div>
      `,
    })
    export class SampleComponent {
      readonly companies = signal<AggregationLike | undefined>(undefined);
      readonly people = signal<AggregationLike | undefined>(undefined);

      protected onTag(entry: TagCloudEntry) {
        console.log(`Filter ${entry.source} on`, entry.value);
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    A[&#x22;aggregations input&#x22;] --> B[&#x22;buildTagCloud() — shared with TagCloud&#x22;]
    B --> C[&#x22;layoutWordCloud() — spiral placement, collision detection&#x22;]
    D[&#x22;ResizeObserver on the host&#x22;] --> C
    E[&#x22;document.fonts.ready&#x22;] --> C
    C --> F[&#x22;placed words (SVG text) + skipped count&#x22;]"
/>

Rendered as SVG rather than absolutely-positioned `<div>`s: one coordinate system, rotation for free through
`transform`, and a native `<title>` tooltip needs no JavaScript. The words stay real, focusable DOM nodes.

The layout re-runs whenever the aggregation data, the container size, or web-font readiness changes — the last
one matters because the canvas used to measure each word's ink box needs the real font metrics, not a
fallback, to place words tightly.

## Recipes [#recipes]

### Reacting to dropped words [#reacting-to-dropped-words]

A cloud needs space: words that find no room are dropped rather than shown overlapping, and the count is
surfaced so the omission is never silent.

<CodeSample id="word-cloud-skipped" title="Surfacing the skipped count">
  <Lang value="angular">
    ```ts title="roomy-cloud.component.ts"
    import { Component, signal } from "@angular/core";
    import { WordCloudComponent } from "@sinequa/atomic-angular";
    import type { AggregationLike } from "@sinequa/atomic-angular";

    @Component({
      selector: "roomy-cloud",
      imports: [WordCloudComponent],
      template: `
        <p class="text-sm text-(--font-neutral-muted)">
          Showing the most frequent terms — some may not fit a narrow window.
        </p>
        <div class="h-72">
          <WordCloud [aggregations]="[terms()]" [limit]="80" />
        </div>
      `,
    })
    export class RoomyCloudComponent {
      readonly terms = signal<AggregationLike | undefined>(undefined);
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  aggregations: { type: &#x22;ReadonlyArray<AggregationLike | undefined>&#x22;, default: &#x22;[]&#x22;, description: &#x22;One or more aggregations.&#x22; },
  limit: { type: &#x22;number&#x22;, default: &#x22;50&#x22;, description: &#x22;Maximum words considered — some may still be dropped for lack of space.&#x22; },
  countThreshold: { type: &#x22;number&#x22;, default: &#x22;0&#x22;, description: &#x22;Drop items at or below this count.&#x22; },
  uniformRepartition: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Give each aggregation an equal share of limit.&#x22; },
  showCount: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Append the count to each label — it is measured as part of the word, so it affects packing.&#x22; },
  emptyLabel: { type: &#x22;string&#x22;, default: '&#x22;No data&#x22;', description: &#x22;Shown when every aggregation is empty.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Several words are missing, with no error">
    Expected in a narrow or short container: words that find no free space during placement are dropped, not
    overlapped. The dropped count renders as a small note in the corner (`N not shown`) — if the omission matters,
    either lower `limit`, enlarge the container, or use [`<TagCloud>`](./tag-cloud.mdx), which never drops
    anything since it only wraps.
  </Accordion>

  <Accordion title="The layout looks cramped or mis-measured right after the page loads">
    The placement measures text with the real web font once `document.fonts.ready` resolves — before that, the
    first layout pass may use fallback metrics. This resolves itself automatically and re-lays out; it is not a
    bug to guard against in host code.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Tag Cloud" href="./tag-cloud.mdx">
    The lighter sibling — no placement algorithm, nothing ever dropped.
  </Card>
</Cards>
