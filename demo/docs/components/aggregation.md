# Aggregation

Aggregation components display faceted search filters: tree navigation, flat list, date ranges, and a filters bar. All read from `AggregationsStore` and `AppStore`.

This page is about what the facets have in common. The flat list has a page of its own, [Aggregation List](/components/aggregation-list), for what only concerns it: the selection and its events, the counts, "Load more", distribution facets, long labels, the search highlight and the keyboard. The tree and the date facets have theirs too: [Aggregation Tree](/components/aggregation-tree), [Aggregation Date](/components/aggregation-date).

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

## Height

The scroll area of a list, a tree or a date facet adapts to the height its host is given. There is no built-in cap and no `--scroll-height` variable any more:

- **Bounded host** (`h-*`, or a parent with a definite height): the list area fills the room left under the header and the search box, and scrolls internally. Every value (or folder) stays reachable, even in a container shorter than the content.
- **Capped host** (`max-h-*`): the facet grows with its content up to the cap, then scrolls.
- **Unbounded host**: the facet takes the height of its content.

The bound applies to the whole facet (header and search box included), not only to the list.

### Playground

Pick how the facets are bounded and drag the slider: the facets follow live, and the code below always reflects the current setting. The last row is the generic `<aggregation>`, which follows the same rules.

<demo-aggregation-height-playground></demo-aggregation-height-playground>

### Bounded host, shorter than the content

The list area shrinks and scrolls; the last value / folder stays reachable.

<demo-aggregation-height-short></demo-aggregation-height-short>

```html
<aggregation-list class="h-40" name="Authors" column="author" />
<aggregation-tree class="h-40" name="Folders" column="folder" />
<aggregation-date class="h-40" name="Modified" column="modified" />
```

### Bounded host, taller than the content

The host keeps its height; the list area fills the room under the header.

<demo-aggregation-height-tall></demo-aggregation-height-tall>

```html
<aggregation-list class="h-128" name="Authors" column="author" />
<aggregation-tree class="h-128" name="Folders" column="folder" />
<aggregation-date class="h-128" name="Modified" column="modified" />
```

### Capped host

The facet grows with its content up to the cap, then the list area scrolls.

<demo-aggregation-height-capped></demo-aggregation-height-capped>

```html
<aggregation-list class="max-h-60" name="Authors" column="author" />
<aggregation-tree class="max-h-60" name="Folders" column="folder" />
<aggregation-date class="max-h-60" name="Modified" column="modified" />
```

### Bounded parent

The facet inherits the bound of its container: no class on the facet itself.

<demo-aggregation-height-parent></demo-aggregation-height-parent>

```html
<div class="h-56">
  <aggregation-list name="Authors" column="author" />
</div>
```

### Unbounded host

The facet takes the height of its content.

<demo-aggregation-height-unbounded></demo-aggregation-height-unbounded>

```html
<aggregation-list name="Authors" column="author" />
<aggregation-tree name="Folders" column="folder" />
<aggregation-date name="Modified" column="modified" />
```

### Generic `<aggregation>`

`<aggregation>` picks list, tree or date from the data and follows the same rules.

<demo-aggregation-height-generic></demo-aggregation-height-generic>

```html
<aggregation class="h-60" name="Authors" column="author" />
<aggregation class="h-60" name="Folders" column="folder" />
<aggregation class="h-60" name="Modified" column="modified" />
```

### Migrating from `--scroll-height`

The variable is no longer read: replace `[--scroll-height:20rem]` with a `max-h-*` (or `h-*`) on the facet itself.

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

The **From** / **To** fields of the custom range option sit right after the radio button, side by side when the facet is wide enough and stacked (and aligned with each other) when it is not — they are never pushed to the far right of the row. The range itself is picked in a two-month calendar — see [Aggregation Date](/components/aggregation-date).

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

In controlled mode the facet header follows the host-supplied `display` on the `[aggregation]` object — a per-instance, per-language label the raw aggregation _name_ could never provide. Switch the language below: the three headers update live while the aggregation `name` stays untouched. Precedence is **app custom-JSON > host `display` > `name`**; the date uses the `created` column on purpose (absent from the app customJSON, so the host owns its label — `modified` would let the app display win). For custom _markup_ in the header, project a `<label>`: list and tree now relay the slot into `AggregationPanel`, in parity with the date. A projected `<label>` wins over the `display` fallback.

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

## Announcing a state on a row (`[itemDescription]`)

Each row carries an `aria-label` (its name), and that label replaces whatever the row renders in its accessible name: a "not applied yet" mark drawn inside an `aggregationItem` template, `sr-only` included, is never read by a screen reader. `itemDescription` takes a callback `(item, { selected, level? }) => string | null | undefined`; a non-empty result is exposed through `aria-describedby` on the row (the `option` of a list, the `treeitem` of a tree) and announced after its name. Signals read by the callback are tracked. It does not apply to the date variant.

In controlled mode the facet keeps its ticks to itself until **Apply**: the host's `selection` is the _applied_ set, so a checked row outside it is pending. Tick a row without applying and inspect its `aria-describedby` (or listen with a screen reader).

<demo-aggregation-item-description-list></demo-aggregation-item-description-list>

```typescript
protected readonly describe: AggregationItemDescription = (item, { selected }) => {
  const applied = this.selection();
  const isApplied = applied.kind === "values" && applied.values.includes(String(item.value));
  return selected && !isApplied ? "Selected, not applied yet" : null;
};
```

```html
<aggregation-list
  name="Languages" column="language"
  [aggregation]="list"
  [query]="query"
  [selection]="selection()"
  [itemDescription]="describe"
  (selectionChange)="selection.set($event)" />
```

On a tree the callback also receives the node's `level`:

<demo-aggregation-item-description-tree></demo-aggregation-item-description-tree>

```typescript
protected readonly describe: AggregationItemDescription = (item, { selected, level }) => {
  const applied = this.selection();
  const path = `/${(item as { $path?: string }).$path}/*`;
  const isApplied = applied.kind === "paths" && applied.paths.includes(path);
  return selected && !isApplied ? `Level ${level}, selected, not applied yet` : null;
};
```

```html
<aggregation-tree
  name="Departments" column="treepath" expandedLevel="2" [searchable]="false"
  [aggregation]="tree"
  [query]="query"
  [selection]="selection()"
  [itemDescription]="describe"
  (selectionChange)="selection.set($event)" />
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

## The list on its own

Some behaviours only concern the flat list, and are on the [Aggregation List](/components/aggregation-list) page: "Load more" (in the default mode, in controlled mode and in a `FilterButton` popover), distribution facets, long labels, re-applying the search highlight, and disabled items with the keyboard navigation of the list.
