# Filters Panel

The facets of the search and the quick filters of the user, in one card-sized column.

## Imports

```ts
import { FiltersPanelComponent } from "@sinequa/atomic-angular";
```

## Facets and quick filters

**All** holds the facets (driven by the application's `filters` custom JSON) with a field that narrows them by name, the count of documents, and a button that saves the filters applied right now as a quick filter. **Quick Filters** lists what the user saved: hover the count of a row to see its filters as tags, click the row to replace **all** the applied filters by its own (the text of the query stays), and use the cross to delete it.

The panel is the content only: it fills the height it is given and scrolls inside. Where it goes (a column, an overlay, a sheet) and what closes it are the host's.

Only the line of the count of filters shows the card (hover it, or focus the row): the row itself applies the quick filter. A name or a filter that is too long is cut off with an ellipsis, and a tooltip gives the whole text on hover — try the last quick filter of the list.

<demo-filters-panel-basic></demo-filters-panel-basic>

```html
<filters-panel [documentCount]="result()?.rowCount ?? 0" (closed)="open.set(false)" />
```

## Nothing saved yet

The empty state of the **Quick Filters** tab (switch to it).

<demo-filters-panel-empty></demo-filters-panel-empty>

```html
<filters-panel [documentCount]="1" />
```

## API Reference

### FiltersPanelComponent (`<filters-panel>`)

| Input | Type | Default | Description |
|---|---|---|---|
| `documentCount` | `number` | `0` | How many documents the search found: the count under the field. The panel does not run the search. |

| Output | Payload | Description |
|---|---|---|
| `closed` | `void` | The user clicked the cross of the header. Closing is the host's. |
