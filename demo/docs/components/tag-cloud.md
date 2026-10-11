# Tag Cloud

Aggregation values as a wrapping list of tags, sized by count. Ships from the **main entry point** and needs **no dependency**.

This is the lightweight option, and the one to reach for by default. For the packed look, see [Word Cloud](/components/word-cloud).

## Basic usage

Pass several aggregations at once — a useful cloud mixes entity types, which in Sinequa are separate aggregations. `uniformRepartition` gives each an equal share of the limit so one high-cardinality field cannot crowd out the others.

<demo-tag-cloud></demo-tag-cloud>

```html
<div class="h-56">
  <TagCloud
    [aggregations]="[companies(), people()]"
    [limit]="14"
    [uniformRepartition]="true"
    [showCount]="true"
    (tagSelected)="applyFilter($event)" />
</div>
```

## Sizing

Font size is a linear min-max scaling of counts onto ten discrete steps — `weight * 0.25rem + 0.5rem`, so weight 1 renders at 0.75rem and weight 10 at 3rem. Discrete steps keep the cloud visually coherent; when every count is identical the scale returns the middle step rather than dividing by zero.

Tags are real button elements: clickable, focusable and readable by a screen reader.
