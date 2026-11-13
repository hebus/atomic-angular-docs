# Aggregation List

A facet that shows the values of an aggregation as a flat list: one checkbox, one label and, if you ask for it, one count per value. Ticking values only prepares a selection; **Apply** turns it into a filter. This page is about the list on its own. What it shares with the tree and the date facets — height, collapsing, URL synchronization, controlled mode, custom rows — is on the [Aggregation](/components/aggregation) page.

## Basic

In its default mode the list reads the aggregation from the shared `AggregationsStore` (by `name` and `column`) and writes the applied filter into the `QueryParamsStore` and the URL. Tick a few values, press **Apply**, and watch the filter appear.

<demo-aggregation-list-basic></demo-aggregation-list-basic>

```html
<aggregation-list name="Authors" column="author" />
```

```typescript
aggregationsStore = inject(AggregationsStore);

constructor() {
  this.aggregationsStore.update(AGGREGATIONS_MOCK);
}
```

A list is made of four parts, top to bottom:

- **The header**: the title, the number of applied filters (`[showFiltersCount]`), the magnifier that opens the search box (when the facet is `searchable`) and the chevron (when it is `collapsible`). `[headless]` leaves it out, for a facet shown alone in a popover.
- **The bar**: **Select all** with the number of ticked values, **Clear all**, and **Apply** once something is waiting to be applied.
- **The values**: a virtualized `listbox`, one `option` per value.
- **The footer**: the **Load more** button, while the server has more values.

## Selecting and applying

Ticking a value does not filter anything. The tick is kept as a pending selection, **Apply** commits it, **Clear all** drops the applied filter and the pending ticks. Enter applies when something is pending (on a value that is not, it ticks it).

In controlled mode — when you pass `[aggregation]`, `[selection]` or `[query]` — nothing is written to the stores: the list reports what the user did through its outputs. They fire in a fixed order, which the log below shows. `onSelect` reports every tick. Apply then emits `selectionChange`, `filtersChange` and `onApply`; Clear emits `selectionChange`, `filtersChange` with `undefined`, then `onClear`.

<demo-aggregation-list-events></demo-aggregation-list-events>

```html
<aggregation-list
  name="Departments" column="department"
  [aggregation]="departments"
  [query]="query"
  [selection]="selection()"
  (onSelect)="ticked($event)"
  (selectionChange)="selection.set($event)"
  (filtersChange)="search($event)"
  (onApply)="applied()"
  (onClear)="cleared()" />
```

To apply on every gesture instead of waiting for **Apply**, see [`applyOnSelect` and `quickFilter`](/components/aggregation).

## Counts

The count at the end of a row only shows when the application asks for it: `features.showAggregationItemCount` in the `general` custom JSON. A value with a count of zero has none, whatever the setting, and its row is dimmed and out of reach (see "Disabled items & keyboard navigation" below). The placeholder rows of **Load more** follow the same rule: they only draw a count when the rows to come will have one.

<demo-aggregation-list-counts></demo-aggregation-list-counts>

```typescript
// the setting is read from the app's custom JSON
appStore.update({ data: { general: { features: { showAggregationItemCount: true } } } });
```

## Many values

The list is virtualized (`@tanstack/angular-virtual`): it renders the rows in view and a few around them, whatever the number of values, and measures each row so that a label that wraps grows its row. The facet needs a height to scroll in: a `h-*` or `max-h-*` on the host, or a parent with a height — see [Height](/components/aggregation).

<demo-aggregation-list-many></demo-aggregation-list-many>

```html
<aggregation-list class="h-72" name="Authors" column="manyauthors" [aggregation]="authors" [query]="query" />
```

## Load more

The button shows when the server has more values (`$hasMore`) and the search returned nothing — which includes the initial state, before any search. A click issues the same paginated request as the default mode and appends the page to the values.

While the next page is fetched, the button shows three animated dots instead of its text, three placeholder rows appear after the last value, and further clicks are ignored: the button keeps the focus (`aria-disabled`, not `disabled`) and says it is working with `aria-busy`. If the request fails, the button is given back. _(The backend of these demos is simulated client-side and answers after about 1.2 s, so that the loading state can be seen.)_

In controlled mode the page size comes from `[query].aggregations[name].count` (the controlled query may not be attached to the app) and the result goes into the **local** state: the shared `AggregationsStore` is never touched. Click "Load more" and watch the store readout stay empty of "Regions". **Reset** plays the demo again.

<demo-aggregation-load-more></demo-aggregation-load-more>

```html
<!-- page size comes from query.aggregations[name].count, not AppStore -->
<aggregation-list
  name="Regions" column="region"
  [aggregation]="regionsAggregation"
  [selection]="selection()"
  [query]="{ name: 'agent-query', text: '', aggregations: { Regions: { count: 3 } } }"
  (selectionChange)="selection.set($event)" />
```

### In a `FilterButton` popover

In a popover the button sits at the bottom of the facet, **outside** the scrolling list: the list shrinks (and scrolls) to keep the button visible, so there is still a single scrollbar, whatever room the popover has.

Open the popover: 14 of 20 offices are loaded. Scroll the list, then click "Load more" to fetch the next 3 (twice, then the button goes away). The popover is as tall as the room it has around the button (up to 19 rows): scroll the page so the button sits near the top of the window to see more rows at once. **Reset** puts the 14 offices back, and **Show counts** shows the facet with and without the count at the end of its rows.

<demo-aggregation-load-more-popover></demo-aggregation-load-more-popover>

```html
<filter-button name="Offices" column="office" />
```

## Distribution facet (`isDistribution` / `valuesAreExpressions`)

ES-32994: a distribution bucket's `value` is a whole backend expression (``size`10 Kb to 100 Kb`:(>= 10240 AND < 102400)``), not comparable to what the applied filter stores — only its `display` is. Select a bucket below, notice the applied-filter chip in the store readout, then reload the page (or navigate to another demo and back): the bucket must still show as checked.

<demo-aggregation-distribution></demo-aggregation-distribution>

```html
<aggregation-list name="Sizes" column="size" [showFiltersCount]="true" />
```

## Long labels

The list is virtualized: each row is positioned from its **measured** height. A label that wraps onto several lines therefore grows its row and pushes the following rows down instead of overlapping them. To keep every row on one line, truncate the label (the default template clamps it to one line; a projected template can use `truncate` or `line-clamp-1`).

<demo-aggregation-long-labels></demo-aggregation-long-labels>

```html
<!-- wraps: the row grows -->
<aggregation-list name="Organisational units" column="orgunit" [aggregation]="units">
  <ng-template aggregationItem let-name="name" let-count="count">
    <span class="min-w-0 grow break-words">{{ name }}</span>
    <span class="shrink-0">{{ count }}</span>
  </ng-template>
</aggregation-list>

<!-- one line, ellipsis, full text in the title -->
<aggregation-list name="Organisational units" column="orgunit" [aggregation]="units">
  <ng-template aggregationItem let-name="name" let-count="count">
    <span class="min-w-0 grow truncate" [attr.title]="name">{{ name }}</span>
    <span class="shrink-0">{{ count }}</span>
  </ng-template>
</aggregation-list>
```

## Re-applying the search highlight

The built-in search highlight lives in the default label, so a custom template loses it. Re-apply it with the public `highlightWord` pipe over the `name` context, using the `searchText` from the same context. Type in the facet search box — matches turn **bold**.

<demo-aggregation-highlight></demo-aggregation-highlight>

```html
<aggregation-list name="Authors" column="author" [searchable]="true">
  <ng-template aggregationItem let-name="name" let-searchText="searchText">
    <span class="grow">
      @for (chunk of name | highlightWord: searchText : 10; track $index) {
        <span [class.font-bold]="chunk.match">{{ chunk.text }}</span>
      }
    </span>
  </ng-template>
</aggregation-list>
```

## Disabled items & keyboard navigation (ES-33408)

A zero-count item is rendered dimmed and its row blocks mouse clicks (`pointer-events-none`), but it must also be **entirely unreachable by keyboard** — not just non-interactive once focused. The list wires the real `[disabled]` input of `@angular/aria`'s `Option` (not a plain `[attr.disabled]`, which a `<div>` ignores) together with `[softDisabled]="false"` on the listbox, so its roving tabindex skips zero-count items outright instead of merely refusing to act on them.

Click into the list below, then Tab in and use the arrow keys: "Invoices" and "Drafts" (`count: 0`) never receive focus, so Enter/Space can never check them — the selection readout must stay clear of both no matter how much you try.

<demo-aggregation-disabled-keyboard-nav></demo-aggregation-disabled-keyboard-nav>

```html
<aggregation-list
  name="Categories" column="category"
  [aggregation]="categoriesAggregation"
  [selection]="selection()"
  (selectionChange)="selection.set($event)" />
```

```typescript
categoriesAggregation: Aggregation = {
  name: "Categories",
  column: "category",
  items: [
    { value: "reports", display: "Reports", count: 128 },
    { value: "invoices", display: "Invoices (no results)", count: 0 }, // unreachable by keyboard
    { value: "contracts", display: "Contracts", count: 76 },
    { value: "drafts", display: "Drafts (no results)", count: 0 },     // unreachable by keyboard
    { value: "archived", display: "Archived", count: 34 }
  ]
};
```

### Keys

The values are a multi-select `listbox` (`@angular/aria`), with one tab stop: Tab goes into the list, the arrow keys move inside it, Tab leaves it.

| Key               | What it does                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `Tab`             | Moves into the list, then out of it.                                                               |
| `↑` / `↓`         | Moves to the previous or next value. It does not wrap, and it skips the values with a count of zero. |
| `Space`           | Ticks or unticks the value that has the focus.                                                     |
| `Enter`           | Applies the selection when something is pending, otherwise ticks the value (and applies it with `applyOnSelect`). |

The list is named after the facet (`aria-label`), each value after its label, and `aria-multiselectable` is set. A state that a row only shows visually can be announced with `[itemDescription]` — see [Announcing a state on a row](/components/aggregation).

## Going further

The rest of what a list can do is shared with the other facets and lives on the [Aggregation](/components/aggregation) page: the height rules, collapsing, URL synchronization, instant apply, controlled mode and its header label, custom rows (`aggregationItem`, `[itemDescription]`, `[showCheckbox]`) and the empty and missing states. The tree and the date facets have their own pages: [Aggregation Tree](/components/aggregation-tree), [Aggregation Date](/components/aggregation-date).

## API Reference

### AggregationListComponent

Selector: `<aggregation-list>`, `<AggregationList>`.

| Input             | Type                                           | Default     | Description                                                                                                         |
| ----------------- | ---------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| `name`            | `string \| null` (required)                    |             | Name of the aggregation to show. Looked up in the store, unless `[aggregation]` is set.                             |
| `column`          | `string \| null` (required)                    |             | Column of the aggregation.                                                                                          |
| `id`              | `string \| null`                               | `null`      | Id of the facet, used to group facets in an accordion.                                                              |
| `class`           | `string`                                       | `""`        | Extra classes for the host.                                                                                         |
| `collapsible`     | `boolean`                                      | `false`     | Lets the user collapse the facet from its header.                                                                   |
| `collapsed`       | `boolean`                                      | `false`     | Starts collapsed.                                                                                                   |
| `searchable`      | `boolean \| undefined`                         | `undefined` | Shows the search box. Left `undefined`, the facet follows the `searchable` flag of its custom JSON.                 |
| `showFiltersCount`| `boolean`                                      | `null`      | Shows the number of applied filters in the header.                                                                  |
| `showCheckbox`    | `boolean`                                      | `true`      | Draws the checkbox of each value. Without it, a click on the row still toggles the value.                           |
| `headless`        | `boolean`                                      | `false`     | Leaves out the header, for a popover that holds this one facet.                                                     |
| `applyOnSelect`   | `boolean`                                      | `false`     | Applies the filter on every selection gesture, instead of waiting for **Apply**.                                    |
| `syncUrl`         | `boolean`                                      | `true`      | Whether applying or clearing updates the URL.                                                                       |
| `hideWhenEmpty`   | `boolean`                                      | `false`     | Removes the facet from the layout when it has no value. A missing aggregation is always hidden.                     |
| `query`           | `Query \| undefined`                           | `undefined` | Controlled query: load more and the search in the facet run against it instead of the shared store.                 |
| `aggregation`     | `Aggregation \| undefined`                     | `undefined` | Controlled data: the aggregation to show, instead of the one in the store.                                          |
| `selection`       | `AggregationSelection \| undefined`            | `undefined` | Controlled selection: the applied values, instead of the filters of the store.                                      |
| `itemTemplate`    | `TemplateRef<AggregationItemContext> \| undefined` | `undefined` | Template of the content of a row, as an input. A projected `aggregationItem` wins over it.                      |
| `itemDescription` | `AggregationItemDescription \| undefined`      | `undefined` | Callback returning the accessible description of a row (`aria-describedby`).                                        |

| Output            | Payload                    | Description                                                                                                        |
| ----------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `onSelect`        | `AggregationItem[]`        | The ticked values changed (a tick, Select all, Clear). Nothing is applied yet.                                     |
| `onApply`         | `void`                     | The selection was applied.                                                                                         |
| `onClear`         | `void`                     | The facet was cleared.                                                                                             |
| `selectionChange` | `AggregationSelection`     | Controlled mode: the new applied selection. The counterpart of `[selection]`. Emitted before `filtersChange`.      |
| `filtersChange`   | `Filter \| undefined`      | Controlled mode: the applied selection as a structured `Filter`, `undefined` on clear.                             |

| Ref / selector        | Context                                                                    | Description                                                                                       |
| --------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `aggregationItem`     | `item`, `name`, `count`, `selected`, `field`, `searchText`                 | Content of a row, between the checkbox and the end of the row. Keeps selection, count and virtualization. |
| `<label>`             |                                                                            | Content of the header, instead of the icon and the title.                                         |

| Method                       | Description                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `apply(options?)`            | Applies the pending selection. `{ keepSearchText: true }` leaves the text of the search box.       |
| `clear()`                    | Drops the applied filter and the pending ticks.                                                    |
| `selectAll()`                | Ticks every value that has a result.                                                               |
| `unselectAll()`              | Unticks every value.                                                                               |
| `loadMore()`                 | Fetches the next page of values. Ignored while one is on its way.                                  |
| `select()`                   | Reports the ticked values (`onSelect`) and updates the pending state.                              |
