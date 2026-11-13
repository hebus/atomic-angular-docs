# Quick Filters

A pill that opens the user's **quick filters**: named sets of filters that one click applies again (say "Recent PDFs" = PDF + last 30 days). It is made to lead a `<filters-bar>` of pills, in its `filtersBarStart` slot, and wears the same outline as the filters it sits with.

## Imports

```ts
import { QuickFiltersComponent } from "@sinequa/atomic-angular";
```

## Applying

Click the pill. A click on a quick filter **replaces** the active filters by its own and closes the popover; hover the line of the count of filters of a row to see what it holds, as chips in a card under it, as the icon of each filter's aggregation and its value (the name stays when the application gives no icon); a name or a value that is too long is cut off, and a tooltip gives the whole text (the last quick filter of the demo). Drag the handle on the top edge of the popover to make it taller (the bottom edge stays), or use the arrow keys on it. Everything is announced to assistive technology. The cross at the end of a row (or `Del` when the row has the focus) deletes the quick filter, without applying it. Quick filters are made from the filters of the results page: this pill is where they are applied and deleted.

<demo-quick-filters-basic></demo-quick-filters-basic>

```html
<filters-bar appearance="pill" align="center">
  <quick-filters filtersBarStart appearance="pill" />
</filters-bar>
```

## Nothing saved yet

The empty state names the way to fill the list. `scheme` is the colour family of the pill, as for the filter buttons.

<demo-quick-filters-empty></demo-quick-filters-empty>

```html
<quick-filters scheme="indigo" />
```

## API Reference

### QuickFiltersComponent (`<quick-filters>`)

| Input | Type | Default | Description |
|---|---|---|---|
| `scheme` | `FilterScheme` | `"sage"` | Colour family of the pill, one of the twelve schemes of the `Tag`. |
| `appearance` | `"default" \| "pill"` | `"pill"` | The look of the trigger: the outlined pill, or the flat button. |
| `position` | `Placement` | `"bottom-start"` | Where the popover goes, in Floating UI's terms. |
| `offset` | `number` | `8` | Distance in pixels between the pill and its popover. |

| Output | Payload | Description |
|---|---|---|
| `applied` | `QuickFilter` | A click has applied this quick filter. |
