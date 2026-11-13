# Aggregation Date

A date facet: a radio list of preset ranges (Today, This week, This month…) plus a **custom range**, picked in a dialog with a two-month calendar. It is what [`<Aggregation>`](/components/aggregation) renders for a date column; use it directly when the column is known to be a date.

## Demo

Pick a preset, or choose **Custom Range** to open the calendar.

<demo-aggregation-date-basic></demo-aggregation-date-basic>

```html
<aggregation-date name="Modified" column="modified" />
```

```typescript
appStore = inject(AppStore);
aggregationsStore = inject(AggregationsStore);

constructor() {
  this.appStore.update({
    columnMap: { modified: { name: "modified", eType: EngineType.date } as CCColumn },
    customJSONs: [{
      name: "filters",
      data: [{ name: "Modified", column: "modified", display: "Modified" }] as unknown as CJson,
      preLogin: false
    }]
  });
  this.aggregationsStore.update(AGGREGATIONS_MOCK);
}
```

## Custom range

The dialog shows **one calendar over two months side by side**, so the range stays visible while it is picked:

- a first click sets the start, a second click closes the range — clicking an earlier day swaps the two ends;
- both ends are highlighted, every day in between is tinted, and a preview follows the pointer while picking the second end;
- a summary under the calendar reads the range back in the active language ("March 12, 2026 → April 4, 2026");
- validating after a **single click** filters on that day alone (from 00:00 to 23:59:59).

Month and weekday names, and the first day of the week, follow the application language — switch the demo's language to see the calendar in French or German.

When a custom range is already applied, the dialog opens pre-filled on it. Here the facet is controlled with a range selection — open **Custom Range**:

<demo-aggregation-date-applied-range></demo-aggregation-date-applied-range>

```html
<aggregation-date
  name="Modified" column="modified"
  [aggregation]="date"
  [query]="query"
  [selection]="selection()"
  (selectionChange)="selection.set($event)" />
```

```typescript
selection = signal<AggregationSelection>({
  kind: "range",
  from: new Date(2026, 2, 12).toISOString(),
  to: new Date(2026, 3, 4).toISOString()
});
```

## Inside a popover

In a filters bar, a facet lives in a popover (`<filter-button>`). Open the **Modified** popover, choose **Custom Range**, then open the calendar by **clicking** From or To, or by focusing one of them (Tab) and pressing **Enter**: the popover must stay open behind the calendar, and still be there once a range is picked.

<demo-aggregation-date-popover></demo-aggregation-date-popover>

```html
<filter-button name="Modified" column="modified" />
```

The custom-range dialog is modal, and `showModal()` closes every native `popover="auto"` that is not an ancestor of the dialog. A dialog mounted in `document.body` would therefore take the popover — and the facet — down with it. `<aggregation-date>` mounts the dialog **inside itself** instead (the `container` option of `Callable.call()`), so it stays a descendant of the popover and nothing has to be configured. It also means the calendar inherits the CSS custom properties set on the facet, which is what lets a class on `<aggregation-date>` restyle that facet's calendar only.

While focus is on a preset radio, **Enter** applies the pending selection like the Apply button (and closes the popover, as Apply does). On From / To, Enter opens the calendar.

## Masked dates

A date column aggregated with a mask (`YYYY`, `YYYY-MM`) comes back as `{ value: "2016", count: 12 }`, with no `display`. The facet handles it on its own:

- the **mask is deduced from the values** (`2016` → `YYYY`, `2024-03` → `YYYY-MM`);
- the **label is the value itself**, formatted in the active language for `YYYY-MM` (`March 2024` / `mars 2024`) — switch the demo's language to see it follow;
- picking one commits the **full dates of the period**: `gte 2016-01-01` and `lt 2017-01-01` (December rolls over to January of the next year);
- the mask goes into the query's **`aggregation_overrides`**, keyed by **aggregation name** (not by column) — `{ YearsMasked: { mask: "YYYY" } }` — which tells the server how the values are built. Overrides of other aggregations are kept.

In default mode the facet writes the override to `QueryParamsStore` itself (not to the URL: a committed range is self-sufficient, only the masked aggregation values are lost after a page reload until the next apply) and removes it when the filter is cleared. In controlled mode it is emitted through `(aggregationOverridesChange)`, right before `(filtersChange)`; the host assigns it to the query it fetches with. Every demo below is controlled with `[aggregation]` + `[selection]`, so none needs a backend.

### Masked years

Each radio shows its value as label (`2016`, `2017`…). Picking one emits the period as full dates, and the mask in `aggregation_overrides`.

<demo-aggregation-date-masked-years></demo-aggregation-date-masked-years>

```html
<aggregation-date
  [aggregation]="years"
  column="years"
  [query]="query"
  [selection]="selection()"
  (selectionChange)="selection.set($event)"
  (aggregationOverridesChange)="overrides.set($event)"
  (filtersChange)="filter.set($event)" />
```

```typescript
// overrides() goes to query.aggregation_overrides, filter() to the query filters
years = { name: "YearsMasked", column: "years", items: [{ value: "2016", count: 12 }, { value: "2017", count: 48 }] } as Aggregation;
```

### Masked months

Same with a month mask (`YYYY-MM`): the label follows the active language while the value stays ISO.

<demo-aggregation-date-masked-months></demo-aggregation-date-masked-months>

```html
<aggregation-date
  [aggregation]="months"
  column="months"
  [query]="query"
  [selection]="selection()"
  (selectionChange)="selection.set($event)"
  (aggregationOverridesChange)="overrides.set($event)"
  (filtersChange)="filter.set($event)" />
```

```typescript
months = { name: "MonthsMasked", column: "months", items: [{ value: "2024-01", count: 31 }, { value: "2024-02", count: 18 }] } as Aggregation;
```

### Reload narrowed to the applied value

Pick **2021** (not the first), then **Reload with the filter**: the engine now returns only the selected value, which moves to index 0. Its radio stays checked, because the options are tracked by their `display`, not by their index. This is a display check, independent of the date format: the filter sent to the backend is still the full-date range with its `aggregation_overrides`, shown next to the facet, and it does not change on reload.

<demo-aggregation-date-masked-reload></demo-aggregation-date-masked-reload>

```html
<aggregation-date
  [aggregation]="aggregation()"
  column="reload"
  [query]="query"
  [selection]="selection()"
  (selectionChange)="selection.set($event)" />
```

```typescript
// aggregation() narrows to the applied value once the engine reloads with the filter
reload() {
  const selection = this.selection();
  if (selection.kind !== "option") return;
  this.items.set(ALL_ITEMS.filter(item => item.value === selection.option));
}
```

### Distribution without `display` (two bounds)

The server returns a formula such as ``dist`Year 2016`:(>= 2016-01-01 AND < 2017-01-01)``. It is converted into the full-date filter `and(gte, lt)`, and the label is taken from the text between backticks (language variants `default[fr]french` follow the active language). With no label at all (third item), it is built from the bounds. There is no mask here — these are not masked dates, so `aggregation_overrides` stays empty.

**Restore from range** feeds the committed filter back, as a URL would: the preset radio must be checked, not "custom range".

<demo-aggregation-date-masked-distribution></demo-aggregation-date-masked-distribution>

```html
<aggregation-date
  [aggregation]="distribution"
  column="dist"
  [query]="query"
  [selection]="selection()"
  (selectionChange)="selection.set($event)" />
```

```typescript
restoreFromRange() {
  this.selection.set({ kind: "range", from: "2017-01-01", to: "2018-01-01" });
}
```

### Control — items with a `display`

Nothing changes for the regular case: the label is the item's own `display`, and no override is emitted.

<demo-aggregation-date-masked-control></demo-aggregation-date-masked-control>

```html
<aggregation-date [aggregation]="withDisplay" column="labelled" [query]="query" [selection]="selection()" (selectionChange)="selection.set($event)" />
```

## Set up the calendar

The calendar is built on [vanilla-calendar-pro](https://vanilla-calendar.pro) and is internal to the facet — there is no component to declare and no provider to register. The application only installs the peer dependency and imports the stylesheet once, from its **global** stylesheet (at 26 kB it would exceed a component's style budget):

```bash
npm install vanilla-calendar-pro
```

```css
/* styles.css */
@import "@sinequa/atomic-angular/styles/calendar.css";
```

The stylesheet maps every calendar color onto galactik tokens, so it follows the light/dark theme on its own. Do not import vanilla-calendar-pro's own CSS on top: it would bring back its cyan selection and red weekends.

## Customize the calendar colors

Each color is a `--vc-*` custom property on the `date-range-calendar` element. Override them after the `@import` — globally, or under a class to restyle a single facet, as on the right below. Pointing them at galactik tokens keeps the light/dark switch. These variables are those of [vanilla-calendar-pro](https://vanilla-calendar.pro), which remains the reference for what each one paints.

<demo-aggregation-date-calendar-colors></demo-aggregation-date-calendar-colors>

```html
<aggregation-date class="calendar-accent" name="Modified" column="modified" />
```

```css
.calendar-accent date-range-calendar {
  --vc-date-selected-bg: var(--bg-accent-base);          /* both ends of the range */
  --vc-date-range-middle-bg: var(--bg-neutral-hovered);  /* days in between */
  --vc-date-range-middle-color: var(--font-neutral-base);
  --vc-date-hover-bg: var(--bg-neutral-hovered);         /* preview while picking */
  --vc-date-hover-edge-bg: var(--bg-accent-hover);
}
```

| Property                                                     | Paints                               | Default                                        |
| ------------------------------------------------------------ | ------------------------------------ | ---------------------------------------------- |
| `--vc-bg` / `--vc-color`                                     | calendar surface and text            | `--bg-neutral-white` / `--font-neutral-base`   |
| `--vc-date-selected-bg` / `--vc-date-selected-color`         | both ends of the range               | `--bg-primary-base` / `--font-neutral-white`   |
| `--vc-date-range-middle-bg` / `--vc-date-range-middle-color` | days between the ends                | `--bg-primary-lighter` / `--font-primary-base` |
| `--vc-date-hover-bg` / `--vc-date-hover-edge-bg`             | preview while picking the second end | `--bg-primary-lighter` / `--bg-primary-light`  |
| `--vc-date-today-bg` / `--vc-date-today-color`               | today                                | `--bg-primary-lighter` / `--font-primary-base` |
| `--vc-date-disabled-color`                                   | disabled days                        | `--font-neutral-disabled`                      |
| `--vc-focus-outline-color`                                   | keyboard focus ring                  | `--stroke-focus`                               |

Collapsible facets, URL synchronization and controlled mode work as for every aggregation — see [Aggregation](/components/aggregation).
