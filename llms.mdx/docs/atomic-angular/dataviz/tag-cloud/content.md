# Tag Cloud (/docs/atomic-angular/dataviz/tag-cloud)

Aggregation values rendered as a wrapping list of tags sized by count — the lightweight default, with no layout algorithm and no canvas.



The simplest way to show "what's in this aggregation, roughly, at a glance": a flex list of buttons, each
sized by its count. No placement algorithm, no measurement, no canvas — reach for this before
[`<WordCloud>`](./word-cloud.mdx), which trades that simplicity for a denser, packed look.

## Minimal example [#minimal-example]

<CodeSample id="tag-cloud-basic" title="Entities across several aggregations">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { TagCloudComponent } from "@sinequa/atomic-angular";
    import type { AggregationLike, TagCloudEntry } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [TagCloudComponent],
      template: `
        <div class="h-40">
          <TagCloud [aggregations]="[companies(), people(), locations()]" (tagSelected)="onTag($event)" />
        </div>
      `,
    })
    export class SampleComponent {
      // A useful cloud mixes entity types — each is a separate Sinequa aggregation.
      readonly companies = signal<AggregationLike | undefined>(undefined);
      readonly people = signal<AggregationLike | undefined>(undefined);
      readonly locations = signal<AggregationLike | undefined>(undefined);

      protected onTag(entry: TagCloudEntry) {
        console.log(`Filter ${entry.source} on`, entry.value);
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`buildTagCloud()` merges every supplied aggregation's items into one ranked list, keeping track of which
aggregation each entry came from (`entry.source`) so the cloud can color entity types consistently. Font size
is a direct, linear function of `entry.weight` — no measurement pass, which is what makes this component cheap
enough to not need its own bundle split.

## Recipes [#recipes]

### Balancing high-cardinality aggregations [#balancing-high-cardinality-aggregations]

Without `uniformRepartition`, the globally largest items win `limit` regardless of source — one aggregation
with many distinct values can crowd out the others entirely.

<CodeSample id="tag-cloud-balanced" title="An equal share per aggregation">
  <Lang value="angular">
    ```ts title="balanced-cloud.component.ts"
    import { Component, signal } from "@angular/core";
    import { TagCloudComponent } from "@sinequa/atomic-angular";
    import type { AggregationLike } from "@sinequa/atomic-angular";

    @Component({
      selector: "balanced-cloud",
      imports: [TagCloudComponent],
      template: `
        <div class="h-40">
          <TagCloud
            [aggregations]="[companies(), people()]"
            [limit]="30"
            [uniformRepartition]="true"
            [showCount]="true"
          />
        </div>
      `,
    })
    export class BalancedCloudComponent {
      readonly companies = signal<AggregationLike | undefined>(undefined);
      readonly people = signal<AggregationLike | undefined>(undefined);
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  aggregations: { type: &#x22;ReadonlyArray<AggregationLike | undefined>&#x22;, default: &#x22;[]&#x22;, description: &#x22;One or more aggregations — mixing several entity types is the common case.&#x22; },
  limit: { type: &#x22;number&#x22;, default: &#x22;50&#x22;, description: &#x22;Maximum number of tags displayed.&#x22; },
  countThreshold: { type: &#x22;number&#x22;, default: &#x22;0&#x22;, description: &#x22;Drop items at or below this count.&#x22; },
  uniformRepartition: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Give each aggregation an equal share of limit, instead of the globally largest items.&#x22; },
  showCount: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Append the count after each label.&#x22; },
  emptyLabel: { type: &#x22;string&#x22;, default: '&#x22;No data&#x22;', description: &#x22;Shown when every aggregation is empty.&#x22; },
}"
/>

## What's next [#whats-next]

<Cards>
  <Card title="Word Cloud" href="./word-cloud.mdx">
    Same data, packed into a compact spiral layout instead of a wrapping list.
  </Card>

  <Card title="Heatmap" href="./heatmap.mdx">
    For a two-dimensional distribution instead of a ranked one-dimensional list.
  </Card>
</Cards>
