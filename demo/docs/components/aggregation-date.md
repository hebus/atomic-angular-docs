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

Each color is a `--vc-*` custom property on the `date-range-calendar` element. Override them after the `@import` — globally, or under a class to restyle a single facet, as on the right below. Pointing them at galactik tokens keeps the light/dark switch.

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

| Property | Paints | Default |
| --- | --- | --- |
| `--vc-bg` / `--vc-color` | calendar surface and text | `--bg-neutral-white` / `--font-neutral-base` |
| `--vc-date-selected-bg` / `--vc-date-selected-color` | both ends of the range | `--bg-primary-base` / `--font-neutral-white` |
| `--vc-date-range-middle-bg` / `--vc-date-range-middle-color` | days between the ends | `--bg-primary-lighter` / `--font-primary-base` |
| `--vc-date-hover-bg` / `--vc-date-hover-edge-bg` | preview while picking the second end | `--bg-primary-lighter` / `--bg-primary-light` |
| `--vc-date-today-bg` / `--vc-date-today-color` | today | `--bg-primary-lighter` / `--font-primary-base` |
| `--vc-date-disabled-color` | disabled days | `--font-neutral-disabled` |
| `--vc-focus-outline-color` | keyboard focus ring | `--stroke-focus` |

Collapsible facets, URL synchronization and controlled mode work as for every aggregation — see [Aggregation](/components/aggregation).
