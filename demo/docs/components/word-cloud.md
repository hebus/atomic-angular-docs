# Word Cloud

A compact cloud: large words in the middle, smaller ones tucked into the gaps, a share of them rotated. Ships from the **main entry point** and needs **no dependency** — the placement algorithm is built in.

For a simple wrapping list, prefer [Tag Cloud](/components/tag-cloud), which is far lighter.

## Basic usage

Same data as the tag cloud, packed instead of listed. Resize the window to watch it re-lay out.

<demo-word-cloud></demo-word-cloud>

```html
<div class="h-72">
  <WordCloud
    [aggregations]="[companies(), people()]"
    [limit]="20"
    [uniformRepartition]="true"
    (tagSelected)="applyFilter($event)" />
</div>
```

## How the placement works

1. Sort by weight, biggest first — a large word placed late has nowhere left to go.
2. Walk an Archimedean spiral outwards from the centre.
3. Stop at the first position whose bounding box hits nothing already placed.
4. Give up after a bounded number of steps rather than looping forever.

Font size scales with the **square root** of the weight: size is linear but the eye reads area, which grows quadratically. Scaling linearly makes the largest word look several times more important than it is.

## What it costs

**Words that find no room are dropped**, and the count is shown as a discreet `N not shown` rather than hidden. A cloud needs space — in a narrow container, the tag cloud is the better choice.

Text is measured on a detached canvas, and the layout re-runs once webfonts have loaded: measuring against fallback metrics would make the words overlap when the real font swaps in.
