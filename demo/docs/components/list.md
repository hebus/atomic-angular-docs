# List

An accessible list of selectable rows — `<List>` (container) and `<ListItem>` (row) — built on the
`@angular/aria/listbox` primitive (`role="listbox"`: roving tabindex, keyboard navigation, typeahead,
single/multiple selection). Selection lives in the container's `value` model (`V[]`). Rows expose the
selected/disabled state via `aria-selected` / `aria-disabled`, which the CVA styles.

Row content is composed from slot components: `<ListItemText>`, `<ListItemIcon>`, `<ListItemAvatar>`,
`<ListItemAction>`, `<ListItemChevron>`, `<ListItemExpander>`, and `<ListItemLeft>` — the wrapper that
groups the leading visual + text and carries their spacing (see the note below).

## Content

Default `list-content` rows with a leading icon and a label. Single selection (the listbox default is
`selectionMode="follow"`, so selection follows keyboard focus).

<demo-list-content></demo-list-content>

```html
picked = signal<string[]>(['doc']);

<List class="gap-(--spacing-3xs)" [(value)]="picked">
  <ListItem value="doc"><ListItemLeft><ListItemIcon><file-icon /></ListItemIcon><ListItemText>Documents</ListItemText></ListItemLeft></ListItem>
  <ListItem value="img"><ListItemLeft><ListItemIcon><image-icon /></ListItemIcon><ListItemText>Images</ListItemText></ListItemLeft></ListItem>
  <ListItem value="ppl"><ListItemLeft><ListItemIcon><user-icon /></ListItemIcon><ListItemText>People</ListItemText></ListItemLeft></ListItem>
</List>
```

## Multiple selection & rich slots

Add `multi` (and `selectionMode="explicit"` so arrows only move focus). Rows here show an avatar, a
label + subtext, and a hover-revealed remove action (`<ListItemAction>` turns red on hover; its click is
stopped from toggling the row). Two-line rows (text + subtext) use `size="medium"` for enough height.

<demo-list-multi></demo-list-multi>

```html
users = signal([
  { id: 'ada',   name: 'Ada Lovelace', email: 'ada@example.com',   initials: 'AL' },
  { id: 'alan',  name: 'Alan Turing',  email: 'alan@example.com',  initials: 'AT' },
  { id: 'grace', name: 'Grace Hopper', email: 'grace@example.com', initials: 'GH' },
]);
picked = signal<string[]>(['alan']);

<List class="gap-(--spacing-3xs)" multi size="medium" selectionMode="explicit" [(value)]="picked">
  @for (u of users(); track u.id) {
    <ListItem [value]="u.id">
      <ListItemLeft>
        <ListItemAvatar>{{ u.initials }}</ListItemAvatar>
        <ListItemText [subtext]="u.email">{{ u.name }}</ListItemText>
      </ListItemLeft>
      <ListItemAction ariaLabel="Remove" (click)="remove(u.id, $event)"><trash-icon /></ListItemAction>
    </ListItem>
  }
</List>
```

## Menu variant

`variant="list-menu"` renders interactive option rows with the menu look (dropdown / action menus).

<demo-list-menu></demo-list-menu>

```html
<List class="gap-(--spacing-3xs)" variant="list-menu" [(value)]="picked">
  <ListItem value="favorite"><ListItemLeft><ListItemIcon><star-icon /></ListItemIcon><ListItemText>Add to favorites</ListItemText></ListItemLeft></ListItem>
  <ListItem value="move"><ListItemLeft><ListItemIcon><folder-icon /></ListItemIcon><ListItemText>Move to folder</ListItemText></ListItemLeft></ListItem>
  <ListItem value="delete"><ListItemLeft><ListItemIcon><trash-icon /></ListItemIcon><ListItemText>Delete</ListItemText></ListItemLeft></ListItem>
</List>
```

## Navigation variant

`variant="list-navigation"` styles clickable navigation rows; pair with `<ListItemChevron>` for the
trailing "›" affordance (it slides on hover).

<demo-list-navigation></demo-list-navigation>

```html
<List class="gap-(--spacing-3xs)" variant="list-navigation">
  <ListItem value="general"><ListItemText>General settings</ListItemText><ListItemChevron /></ListItem>
  <ListItem value="security"><ListItemText>Security &amp; privacy</ListItemText><ListItemChevron /></ListItem>
</List>
```

## States

`size` accepts `small` (default) and `medium`. It only changes row height on `list-navigation` and
`list-menu` — `list-content` rows own a fixed two-line height (label + subtext) and re-assert it after
`size` in the CVA, so `size` is a deliberate no-op on that variant. A `disabled` item reflects
`aria-disabled`, is skipped by keyboard navigation and cannot be selected. `variant` / `size` set on
`<List>` are inherited by every `<ListItem>` (each item may override).

<demo-list-states></demo-list-states>

```html
<List variant="list-navigation" size="medium" [(value)]="v">
  <ListItem value="1"><ListItemText>Enabled</ListItemText></ListItem>
  <ListItem value="2" disabled><ListItemText>Disabled</ListItemText></ListItem>
</List>
```

## Tree hooks

`depth` indents a row (20px per level) and `<ListItemExpander>` renders the expand chevron. In the
current listbox-backed List these are **style-only**: expansion is driven by the consumer. Full ARIA
tree keyboard semantics (`role="tree"`, expand/collapse via keyboard) will come from a future
`@angular/aria/tree`-backed variant.

<demo-list-tree></demo-list-tree>

```html
open = signal(true);

<List [(value)]="picked">
  <ListItem value="src">
    <ListItemExpander [expanded]="open()" ariaLabel="Toggle" (click)="toggle($event)" />
    <ListItemLeft><ListItemIcon><folder-icon /></ListItemIcon><ListItemText>src</ListItemText></ListItemLeft>
  </ListItem>
  @if (open()) {
    <ListItem value="app" [depth]="1"><ListItemLeft><ListItemIcon><file-icon /></ListItemIcon><ListItemText>app.ts</ListItemText></ListItemLeft></ListItem>
  }
</List>
```

## Notes

- **Row spacing is a container concern, not in the CVA.** The CVA styles each item only; `<List>` renders
  rows adjacent by default (listbox/menu convention). Add a gap on the container via its `class` input —
  e.g. `class="gap-(--spacing-3xs)"` (used throughout this page).
- **Backing primitive**: `<List>` host-composes `@angular/aria/listbox` `Listbox`; `<ListItem>` composes
  `Option`. Host directives are required (not an `<ng-content>` wrapper) so projected `<ListItem>` rows
  resolve the parent `Listbox` through the element-injector hierarchy.
- **`value` is required** on every `<ListItem>` (it is the option's identity in the listbox selection).
- **Wrap the leading visual + text in `<ListItemLeft>`.** The `list-content` and `list-menu` variants set
  the item's own `gap` to `0` (so the left region and trailing actions sit flush); the icon/avatar ↔ text
  spacing is provided by `.list-item-left` (`gap-(--spacing-2xs)`), which also grows (`flex-1`) to push
  trailing actions to the right edge. A text-only row does not need it (`<ListItemText>` is already `flex-1`).
- **Defaults inherited from the ARIA listbox** (not overridable through host-directive forwarding):
  `focusMode="roving"`, `selectionMode="follow"`, `wrap=true`, `orientation="vertical"`. Pass
  `selectionMode="explicit"` to select only on click / Space.
- **Slot classes** are also exported (`LIST_ITEM_TEXT_CLASS`, `LIST_ITEM_ICON_CLASS`, …) for consumers
  who prefer applying the CVA slot classes directly instead of the slot components.
- **`selected` fallback & tree slots** in the CVA are kept for the upcoming `Tree`-backed variant.

## API Reference

### List

| Input           | Type                                             | Default          | Description                                                              |
| ---------------- | -------------------------------------------------- | ----------------- | --------------------------------------------------------------------------- |
| `class`          | `string`                                           | —                 | Extra classes merged into the host.                                       |
| `variant`        | `"list-content" \| "list-menu" \| "list-navigation"` | `"list-content"` | Default visual variant propagated to every `<ListItem>` (item may override). |
| `size`           | `"small" \| "medium"`                              | `"small"`         | Default size propagated to every `<ListItem>` (item may override). No-op on `list-content` — see States above. |
| `value`          | `V[]` (model)                                      | `[]`              | Selected values — forwarded from `@angular/aria/listbox` `Listbox`; supports `[(value)]`. |
| `multi`          | `boolean`                                          | `false`           | Allow multiple selection — forwarded from `Listbox`.                     |
| `wrap`           | `boolean`                                          | `true`            | Loop keyboard navigation — forwarded from `Listbox`.                     |
| `orientation`    | `"vertical" \| "horizontal"`                       | `"vertical"`      | Layout & arrow-key direction — forwarded from `Listbox`.                  |
| `focusMode`      | `"roving" \| "activedescendant"`                   | `"roving"`        | Focus strategy — forwarded from `Listbox`.                                |
| `selectionMode`  | `"follow" \| "explicit"`                           | `"follow"`        | Commit selection on keyboard focus, or only on click/Space — forwarded from `Listbox`. |
| `disabled`       | `boolean`                                          | `false`           | Disable the whole list — forwarded from `Listbox`.                        |
| `readonly`       | `boolean`                                          | `false`           | Read-only list (selection visible but not changeable) — forwarded from `Listbox`. |
| `softDisabled`   | `boolean`                                          | `true`            | When `true`, disabled options are still reachable via keyboard navigation — forwarded from `Listbox`. |
| `typeaheadDelay` | `number` (ms)                                      | `500`             | Window for the keyboard typeahead buffer — forwarded from `Listbox`.      |

| Output        | Payload | Description                                            |
| -------------- | ------- | --------------------------------------------------------- |
| `valueChange` | `V[]`   | Emits the selected values — forwarded from `Listbox`, from `model`. |

### ListItem

| Input      | Type                                                | Default            | Description                                                         |
| ---------- | ----------------------------------------------------- | -------------------- | ------------------------------------------------------------------------ |
| `value`    | `V` (required)                                       | —                    | Option identity in the listbox selection — forwarded from `Option`. |
| `disabled` | `boolean`                                             | `false`              | Skip this row in keyboard navigation and block selection — forwarded from `Option`. |
| `label`    | `string`                                              | —                    | Typeahead label override — forwarded from `Option`.                 |
| `class`    | `string`                                              | —                    | Extra classes merged into the row.                                   |
| `variant`  | `"list-content" \| "list-menu" \| "list-navigation"` | inherited from `List` | Explicit variant; falls back to the parent `<List>`'s, then `"list-content"`. |
| `size`     | `"small" \| "medium"`                                 | inherited from `List` | Explicit size; falls back to the parent `<List>`'s, then `"small"`. No-op on `list-content` — see States above. |
| `depth`    | `number`                                              | `0`                  | Tree indentation depth — 20px per level.                              |

### ListItemText

| Input     | Type     | Default | Description                                     |
| --------- | -------- | ------- | ------------------------------------------------- |
| `class`   | `string` | —       | Extra classes merged into the text block wrapper. |
| `subtext` | `string` | —       | Optional secondary line under the main label.    |

### ListItemLeft / ListItemIcon / ListItemAvatar

Layout-only directives — each accepts a single `class` input (`string`, no default) merged into their
slot class (`.list-item-left`, `.list-item-icon`, `.list-item-avatar`). Project the leading icon /
initials / image as content.

### ListItemAction

| Input       | Type      | Default | Description                                                                 |
| ------------ | --------- | ------- | --------------------------------------------------------------------------- |
| `ariaLabel` | `string`  | —       | Rendered as `title` (mouse tooltip) — the action is hidden from assistive tech, reached via `Delete` on the row instead. |
| `disabled`  | `boolean` | `false` | Disables the action (dims it, ignores clicks).                             |

Emits a native `(click)` when activated by pointer, or via `Delete` on the owning `<ListItem>` (only
when the row projects a `<ListItemAction>`).

### ListItemChevron

No inputs — renders the trailing "›" navigation affordance.

### ListItemExpander

| Input       | Type      | Default | Description                                          |
| ------------ | --------- | ------- | ----------------------------------------------------- |
| `expanded`  | `boolean` | `false` | Expansion state (consumer-driven) — orients the chevron. |
| `ariaLabel` | `string`  | —       | Accessible label of the expand/collapse button.       |

Emits a native `(click)` when the chevron button is activated — style-only, no built-in tree keyboard semantics yet.
```
