# Aggregation

Aggregation components display faceted search filters: tree navigation, flat list, date ranges, and a filters bar. All read from `AggregationsStore` and `AppStore`.

## Demo

<demo-aggregation-basic></demo-aggregation-basic>

```html
<filters-bar />

<filter-button name="Authors" column="author" />
<filter-button name="Folders" column="folder" />

<aggregation-tree name="Sources" column="source" [expandedLevel]="1" />
<aggregation-tree name="Folders" column="folder" />
<aggregation-list name="Authors" column="author" />
<aggregation-date name="Modified" column="modified" />
```

```typescript
aggregationsStore = inject(AggregationsStore);
appStore = inject(AppStore);

constructor() {
  this.appStore.update({
    columnMap: {
      modified: { name: 'modified', eType: EngineType.date } as CCColumn
    }
  });
  this.aggregationsStore.update(AGGREGATIONS_MOCK);
}
```

## Distribution facet (`isDistribution` / `valuesAreExpressions`)

ES-32994: a distribution bucket's `value` is a whole backend expression (`` size`10 Kb to 100 Kb`:(>= 10240 AND < 102400) ``), not comparable to what the applied filter stores — only its `display` is. Select a bucket below, notice the applied-filter chip in the store readout, then reload the page (or navigate to another demo and back): the bucket must still show as checked.

<demo-aggregation-distribution></demo-aggregation-distribution>

```html
<aggregation-list name="Sizes" column="size" [showFiltersCount]="true" />
```

## Scroll height

The scrollable area has a default max-height of `20rem`. Override it with the `--scroll-height` CSS custom property.

<demo-aggregation-scroll-height></demo-aggregation-scroll-height>

```html
<!-- Default (20rem) -->
<aggregation-tree class="w-[200px]" name="Sources" column="source" />

<!-- Tailwind v4 arbitrary property -->
<aggregation-tree class="w-[200px] [--scroll-height:150px]" name="Folders" column="folder" />

<!-- Larger height -->
<aggregation-list class="w-[200px] [--scroll-height:400px]" name="Authors" column="author" />
```

## Collapsible

<demo-aggregation-collapsible></demo-aggregation-collapsible>

```html
<!-- Expanded by default -->
<aggregation-tree class="w-[200px]" name="Sources" column="source" [collapsible]="true" />
<aggregation-list class="w-[200px]" name="Authors" column="author" [collapsible]="true" />
<aggregation-date class="w-[280px]" name="Modified" column="modified" [collapsible]="true" />

<!-- Collapsed by default -->
<aggregation-tree class="w-[200px]" name="Sources" column="source" [collapsible]="true" [collapsed]="true" />
<aggregation-list class="w-[200px]" name="Authors" column="author" [collapsible]="true" [collapsed]="true" />
<aggregation-date class="w-[280px]" name="Modified" column="modified" [collapsible]="true" [collapsed]="true" />
```

## Custom range alignment

The **From** / **To** fields of the custom range option sit right after the radio button, side by side when the facet is wide enough and stacked (and aligned with each other) when it is not — they are never pushed to the far right of the row.

<demo-aggregation-custom-range></demo-aggregation-custom-range>

```html
<!-- narrow and wide facets: the custom range fields stay next to the radio -->
<aggregation-date class="w-[280px]" name="Modified" column="modified" />
<aggregation-date class="w-[480px]" name="Modified" column="modified" />
```

## URL synchronization (`syncUrl`)

Applying or clearing a filter **always** updates the store — results refresh and filter badges update either way. With `[syncUrl]="false"`, the **URL is left untouched**: no browser-history entry, not shareable by link, not restored on refresh. Toggle the switch, apply a filter, and watch the two readouts diverge.

<demo-aggregation-sync-url></demo-aggregation-sync-url>

```html
<!-- default: applying a filter pushes it into the URL -->
<aggregation-list name="Authors" column="author" />

<!-- store-only: the filter is applied but the URL is left untouched -->
<aggregation-list name="Authors" column="author" [syncUrl]="false" />
```

## Instant apply on click (`quickFilter`)

With the `quickFilter` feature flag enabled, clicking an item's **label** (not just its checkbox) selects it and immediately applies the filter — no separate "Apply" click needed. Clicking the checkbox itself still only toggles the selection either way. Toggle the flag off and clicking the label just selects, same as the checkbox.

<demo-aggregation-quick-filter></demo-aggregation-quick-filter>

```html
<!-- appStore.general()?.features?.quickFilter — works the same on the list and the tree -->
<aggregation-list name="Authors" column="author" />
<aggregation-tree name="Sources" column="source" [expandedLevel]="1" />
```

```typescript
appStore = inject(AppStore);

constructor() {
  this.appStore.update({ data: { general: { features: { quickFilter: true } } } });
}
```

## Apply on select (`[applyOnSelect]`)

The per-instance counterpart of the `quickFilter` flag, and it covers **every** selection gesture, not just the label: clicking the row, clicking the checkbox, or pressing Space/Enter on the focused item applies the filter straight away.

The two are independent — `applyOnSelect` works with the flag off, and with both on a single click must still apply **once**. The counter below is there to prove it: click a label with both toggles on and it must go up by one, not two.

<demo-aggregation-apply-on-select></demo-aggregation-apply-on-select>

```html
<aggregation-list name="Authors" column="author" [applyOnSelect]="true" />
<aggregation-tree name="Sources" column="source" [applyOnSelect]="true" />
```

Worth knowing: the facet's own search box is **kept** across an apply triggered this way (so several values can be ticked in a row — an explicit Apply still clears it), `Select all` / `Unselect all` still go through the Apply button, and every tick issues a query — hence the `false` default.

## Controlled mode

When you pass `[query]`, `[aggregation]`, or `[selection]`, the component switches to **controlled mode**: it sources everything from the inputs, keeps its own internal state, and never reads nor writes the shared stores or the URL. Changes surface only through `(selectionChange)` (round-trip into `[selection]`) and `(filtersChange)` (a ready-to-use structured `Filter`). Both lists below receive the **same** aggregation object and still keep independent selections. The tree uses `paths` (`"/A/B/*"`), the date uses `option`/`range` and emits **live** at selection time by default — set `emitOn="apply"` to defer the date to an Apply button like list/tree.

<demo-aggregation-controlled></demo-aggregation-controlled>

```html
<!-- controlled: host-owned data + selection; changes surface only via the outputs -->
<aggregation-list
  name="Languages" column="language"
  [aggregation]="languagesAggregation"
  [selection]="selection()"
  [query]="agentQuery"
  (selectionChange)="selection.set($event)"
  (filtersChange)="applyToQuery($event)" />

<!-- tree: selection = { kind: "paths", paths: ["/A/B/*"] } -->
<aggregation-tree
  name="Departments" column="treepath"
  [aggregation]="departmentsTree"
  [selection]="treeSelection()"
  [query]="agentQuery"
  (selectionChange)="treeSelection.set($event)" />

<!-- date: radio list — emits live at selection time by default (no apply click).
     selection = { kind: "option", option } (preset) or { kind: "range", from, to } -->
<aggregation-date
  name="Modified" column="modified"
  [aggregation]="modifiedAggregation"
  [selection]="dateSelection()"
  [query]="agentQuery"
  (selectionChange)="dateSelection.set($event)" />

<!-- emitOn="apply": defer emissions to an Apply button, like list/tree -->
<aggregation-date
  name="Modified" column="modified"
  emitOn="apply"
  [aggregation]="modifiedAggregation"
  [selection]="dateSelection()"
  [query]="agentQuery"
  (selectionChange)="dateSelection.set($event)"
  (filtersChange)="applyToQuery($event)" />
```

```typescript
// filtersChange is a structured Filter (undefined on clear) — pass it straight through
applyToQuery(filters: Filter | undefined) {
  fetchQuery({ ...this.agentQuery, filters });
}
```

## Controlled header label (`display` & `<label>`)

In controlled mode the facet header follows the host-supplied `display` on the `[aggregation]` object — a per-instance, per-language label the raw aggregation *name* could never provide. Switch the language below: the three headers update live while the aggregation `name` stays untouched. Precedence is **app custom-JSON > host `display` > `name`**; the date uses the `created` column on purpose (absent from the app customJSON, so the host owns its label — `modified` would let the app display win). For custom *markup* in the header, project a `<label>`: list and tree now relay the slot into `AggregationPanel`, in parity with the date. A projected `<label>` wins over the `display` fallback.

<demo-aggregation-header-label></demo-aggregation-header-label>

```html
<!-- per-language header label: set `display` on the controlled aggregation object.
     Build it as a computed/field (stable reference) — a new reference reseeds the instance,
     and an inline `{ ...agg, display }` literal also trips the excess-property check. -->
<aggregation-list
  name="Languages" column="language"
  [aggregation]="labelledLanguages()"
  [selection]="selection()" [query]="agentQuery"
  (selectionChange)="selection.set($event)" />

<!-- custom markup: project a <label> — it wins over the display fallback -->
<aggregation-tree name="Departments" column="treepath" [aggregation]="departmentsTree" [query]="agentQuery">
  <label>Departments (custom)</label>
</aggregation-tree>

<aggregation-date name="Created" column="created" [aggregation]="createdAggregation" [query]="agentQuery">
  <label>Created (custom)</label>
</aggregation-date>
```

```typescript
// stable, typed, and reseeds only when the language actually changes
readonly labelledLanguages = computed(() => ({ ...this.agg, display: this.labels[this.lang()] }));
```

## Controlled mode — load more

"Load more" issues the same paginated request as the default mode, but sizes the page from `[query].aggregations[name].count` (the controlled query may not be attached to the app) and appends the result to the **local** state — the shared `AggregationsStore` is never touched. Click "Load more" and watch the store readout stay empty of "Regions". *(This demo simulates the backend response client-side so it works without a live Sinequa backend.)*

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

## Custom item template (`aggregationItem`)

Project an `<ng-template aggregationItem>` to own the item's **content/label** region. The component keeps the checkbox, click-to-select, count, virtualization and — for the tree — the chevron, indentation and children recursion. The typed context exposes `item`, `name`, `count`, `selected`, `field`, `searchText` (plus `level` / `expanded` / `hasChildren` for the tree). The same directive works on the `<Aggregation>` wrapper (relayed to the active sub-component).

<demo-aggregation-item-template></demo-aggregation-item-template>

```html
<aggregation-list name="Authors" column="author">
  <ng-template aggregationItem let-item let-name="name" let-count="count" let-selected="selected">
    <span class="dot" [class]="selected ? 'on' : 'off'"></span>
    <span class="grow" [class.font-semibold]="selected">{{ name }}</span>
    <span class="badge">{{ count }}</span>
  </ng-template>
</aggregation-list>

<!-- tree: same directive, context adds level / expanded / hasChildren -->
<aggregation-tree name="Sources" column="source" expandedLevel="2">
  <ng-template aggregationItem let-node let-name="name" let-level="level" let-hasChildren="hasChildren">
    <span class="grow">{{ name }}</span>
    @if (hasChildren) { <span>L{{ level }}</span> }
  </ng-template>
</aggregation-tree>

<!-- also works on the <Aggregation> wrapper (relayed to the active sub-component) -->
<Aggregation name="Authors" column="author">
  <ng-template aggregationItem let-name="name" let-count="count">…</ng-template>
</Aggregation>
```

## Hiding the checkbox (`[showCheckbox]="false"`)

With `[showCheckbox]="false"` the per-item checkbox is not rendered. Selection still toggles on row click — convey it yourself from the `selected` context. Works on the list, the tree (chevron/indentation kept) and the `<Aggregation>` wrapper.

<demo-aggregation-no-checkbox></demo-aggregation-no-checkbox>

```html
<aggregation-list name="Authors" column="author" [showCheckbox]="false">
  <ng-template aggregationItem let-name="name" let-count="count" let-selected="selected">
    <span [class.font-semibold]="selected">{{ selected ? '✓ ' : '' }}{{ name }}</span>
    <span class="ml-auto">{{ count }}</span>
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

## Empty and missing aggregations

A **missing** aggregation — no entry in the store, a misconfiguration — always **removes itself from the layout** (`display: none`), unconditionally. An aggregation that **resolves to zero items** is a different, legitimate state: it keeps a dimmed, non-expandable header by default, and only vanishes when you opt in with `hideWhenEmpty`. Toggle the switches: with `hideWhenEmpty` on, the "Languages" facet in the first column also vanishes when served zero items, and "Authors" slides up with **no phantom gap** left behind (the column is a `flex flex-col gap-2`).

Two exemptions keep a facet the user can still act on regardless of `hideWhenEmpty`: a **date** aggregation with no bucket, whose custom range stays usable (a date facet has no "resolved but empty" state at all, so `hideWhenEmpty` has no effect on it), and any facet carrying an **applied filter** — it matters for trees, whose applied paths are not merged back into their items.

<demo-aggregation-hide-empty></demo-aggregation-hide-empty>

```html
<!-- hidden with hideWhenEmpty; dimmed header without -->
<aggregation-list name="Languages" column="language" [aggregation]="{ items: [] }" [hideWhenEmpty]="true" />

<!-- always hidden: no such aggregation in the store, hideWhenEmpty or not -->
<aggregation-list name="DoesNotExist" column="nope" />

<!-- visible: a date facet keeps its custom range without a single bucket -->
<aggregation-date name="Modified" column="modified" [aggregation]="{ items: [] }" />

<!-- visible: a filtered tree, even with zero nodes, hideWhenEmpty or not -->
<aggregation-tree name="Departments" column="treepath"
  [aggregation]="{ isTree: true, items: [] }"
  [selection]="{ kind: 'paths', paths: ['/Engineering/*'] }"
  [hideWhenEmpty]="true" />
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
