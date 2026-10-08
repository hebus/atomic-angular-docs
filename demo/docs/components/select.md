# Select

Accessible single- or multiple-choice dropdown built on `@angular/aria` (a non-editable combobox trigger + a listbox popup). It behaves like a native `<select>` — keyboard navigable, `aria-selected`, popover-positioned — but accepts arbitrary trigger and option content and any option value type.

By default `SelectMenu` renders its own trigger (button + selected label + chevron), driven by the `placeholder` input. The field label and hint are plain `fieldLabel` / `hint` inputs (or projected `.select-label` / `.select-hint` elements for rich content); you only supply the option template (`#selectOption`). Project a `[selectTrigger]` element only when you need a **fully custom trigger** (different chrome, an icon button, a sentinel empty state…). Styling follows the galactik design system via **slot classes** (`select-label`, `select-trigger`, `select-menu`, `select-option`, …); the `<SelectMenu>` host is the styling root.

## Imports

```ts
import { SelectComponent, SelectTriggerDirective } from "@sinequa/galactik";
```

## Field

The full design-system field with the **built-in trigger**: a label, a bordered trigger with a chevron, rich options (label + sub-label + selected check), and a hint. `fieldLabel`, `placeholder` and `hint` are plain inputs; `[key]` gives each option a comparable identity; `[label]` supplies typeahead text (and the trigger's selected-value text).

<demo-select-field></demo-select-field>

```html
<SelectMenu
  [options]="countries" [(value)]="selected" [key]="keyOf" [label]="labelOf" size="md"
  fieldLabel="Country" placeholder="Select a country…" hint="Choose the country to search in.">
  <ng-template #selectOption let-country let-selected="selected">
    <span class="select-option-body">
      <span class="select-option-label">{{ country.label }}</span>
      <span class="select-option-sublabel">{{ country.capital }}</span>
    </span>
    @if (selected) { <check-icon class="select-option-check" /> }
  </ng-template>
</SelectMenu>
```

The chevron rotates automatically when the trigger is `aria-expanded` (handled by the wrap). The trigger shows `label(value)` by default — supply a `#selectValue` template to render the selected value differently (e.g. with a leading icon) without rebuilding the whole trigger. The selected option is emphasized via `aria-selected`; add a `select-option-check` element (using the template's `selected` context) for an explicit check.

## Sizes

`size="sm | md | lg"` scales the whole control: trigger height 24 / 36 / 44px, trigger text 12 / 14 / 14px, field label 12 / 14 / 16px semibold, and the gap between label, trigger and hint 2 / 4 / 8px.

<demo-select-sizes></demo-select-sizes>

```html
<SelectMenu [options]="fruits" [(value)]="value" size="sm" placeholder="Small" />
<SelectMenu [options]="fruits" [(value)]="value" size="md" placeholder="Medium" />
<SelectMenu [options]="fruits" [(value)]="value" size="lg" placeholder="Large" />
```

## Empty state

When `options` is empty, the popup shows a `select-empty` row with `noOptionsText` instead of a blank list.

<demo-select-empty></demo-select-empty>

```html
<SelectMenu [options]="results" [(value)]="value" placeholder="Search a document…" noOptionsText="No matching documents" />
```

## Scroll to selected

When the list is longer than the popup, opening it scrolls the currently-selected option into view (centered) — no need to scroll manually to find it.

<demo-select-scroll></demo-select-scroll>

## Placement

`placement` accepts any [`Placement`](https://floating-ui.com/docs/computePosition#placement) from `@floating-ui/dom` (default `bottom-start`). The popup flips and shifts to stay on-screen.

<demo-select-placement></demo-select-placement>

```html
<SelectMenu [options]="fruits" [(value)]="value" placement="top-start" placeholder="Fruit" />
```

## Multiple selection

Set `multiple` to let the user pick several options. The bound `value` becomes an **array** (`TOption[]`, empty `[]` = nothing selected), the popup **stays open** so selections can be chained (click or `Space` toggles each option), and every selected option shows its check. Bind an array signal with `[(value)]` — this is what infers the array value type — or wire it to a signal-forms field of type `TOption[]`.

<demo-select-multiple></demo-select-multiple>

```html
<SelectMenu multiple [options]="fruits" [(value)]="selected" fieldLabel="Fruits"
  placeholder="Select fruits…" hint="Pick one or more — the popup stays open.">
  <ng-template #selectOption let-fruit let-selected="selected">
    <span class="select-option-body"><span class="select-option-label">{{ fruit }}</span></span>
    @if (selected) { <check-icon class="select-option-check" /> }
  </ng-template>
</SelectMenu>
```

```ts
readonly selected = signal<string[]>([]);
```

## Custom trigger (escape hatch)

For a fully custom trigger, project a `[selectTrigger]` element — `SelectMenu` renders yours instead of the built-in one, and `placeholder` / `#selectValue` no longer apply. Omit the `select-trigger` marker class to drop the bordered field look (e.g. a compact tertiary icon button). This is how `SortSelectorComponent` uses it — an icon button that opens a DS-styled menu — and it's also the way to handle a sentinel empty state (see Signal Forms below).

## Signal Forms

`SelectComponent` implements the signal-forms [`FormValueControl`](https://angular.dev/guide/forms/signals) contract through its `value` model, so it binds to a field with `[formField]="form.field"` — no `[value]`/`(valueChange)` plumbing.

The Select's empty state is **`null`** (never `undefined`): pushing `undefined` into a field removes the property and orphans it (`NG01902`), whereas `null` is a valid value. So the field type must include `null` (e.g. `{ country: string | null }`, initial `null`). This demo keeps a projected `[selectTrigger]` to show a placeholder for the `null` state — also a showcase of the escape hatch.

<demo-select-signal-form></demo-select-signal-form>

```ts title="shipping.component.ts"
import { form } from "@angular/forms/signals";

readonly model = signal<{ country: string | null; speed: string | null }>({ country: null, speed: null });
readonly shippingForm = form(this.model);
```

```html
@let country = shippingForm.country;
<SelectMenu [options]="countries" [formField]="country" size="md">
  <span class="select-label">Country</span>
  <button selectTrigger type="button" class="select-trigger">
    <span class="select-trigger-label" [class.select-placeholder]="!country().value()">
      {{ country().value() || "Select a country…" }}
    </span>
    <chevron-down-icon class="select-chevron" />
  </button>
  <ng-template #selectOption let-c let-selected="selected">
    <span class="select-option-label">{{ c }}</span>
    @if (selected) { <check-icon class="select-option-check" /> }
  </ng-template>
</SelectMenu>
```

Selecting an option writes through to the field (shown live above). As a single-choice control, clicking the selected option deselects it — `value`/the field goes back to `null` (safe in both `[(value)]` and `[formField]`, since `null` never orphans the field).

## Hover and keyboard share one active row

In the popup, the row under the mouse **becomes** the active row, so a single row is highlighted and the arrow keys carry on from it. `@angular/aria` only tracks the keyboard's row (`data-active="true"`); the `activateOnHover` attribute on an `ngListbox` adds the pointer (`pointermove`, never on a scroll under a still pointer; touch and disabled rows are ignored). `SelectMenu` and `Autocomplete` already do it. A listbox you build yourself with `selectOptionVariants` must opt in — the row style has no `:hover` of its own anymore.

<demo-select-active-row></demo-select-active-row>

```html
<ul ngListbox activateOnHover focusMode="activedescendant" [class]="menu">
  <li ngOption value="fr" [class]="row">France</li>
</ul>
```

## Keyboard shortcuts

Handled automatically by `@angular/aria`.

| Key            | Behavior                                               |
| -------------- | ------------------------------------------------------ |
| `↓` / `↑`      | Navigate options (disabled options are skipped).       |
| `Home` / `End` | First / last option.                                   |
| `Enter`        | Select the active option and close the popup.          |
| `Escape`       | Close the popup without changing the selection.        |
| `a`–`z`        | Typeahead — jump to the option whose label matches.    |

## API Reference

### SelectComponent&lt;TOption, TValue = TOption | null&gt;

| Input             | Type                        | Default          | Description                                                        |
| ----------------- | --------------------------- | ---------------- | ------------------------------------------------------------------ |
| `options`         | `readonly TOption[]`        | `[]`             | The available options.                                             |
| `value`           | `TValue` (model)            | `null`           | Selected value — supports `[(value)]`. Single: `TOption \| null` (`null` = no selection). Multiple: `TOption[]` (`[]` = none). |
| `multiple`        | `boolean`                   | `false`          | Allow selecting several options; `value` becomes `TOption[]` and the popup stays open. |
| `size`            | `"sm" \| "md" \| "lg"`      | `"md"`           | Trigger height for the DS field chrome.                            |
| `fieldLabel`      | `string`                    | —                | Label above the trigger (or project a `.select-label` element).    |
| `placeholder`     | `string`                    | `""`             | Built-in trigger text when no value is selected.                   |
| `hint`            | `string`                    | —                | Help text below the trigger (or project a `.select-hint` element). |
| `disabled`        | `boolean`                   | `false`          | Disable the built-in trigger.                                      |
| `placement`       | `Placement`                 | `"bottom-start"` | Popup placement relative to the trigger.                           |
| `selectionMode`   | `"explicit" \| "follow"`    | `"explicit"`     | Commit on Enter/click, or follow keyboard navigation.              |
| `wrap`            | `boolean`                   | `true`           | Loop keyboard navigation.                                          |
| `key`             | `(option: TOption) => unknown` | identity      | Comparable identity of an option (strict equality with `value`).   |
| `label`           | `(option: TOption) => string`  | `String(option)` | Text label — typeahead and default option template.             |
| `optionDisabled`  | `(option: TOption) => boolean` | `() => false` | Predicate disabling an option.                                    |
| `class`           | `string`                    | —                | Extra classes for the host (styling root); e.g. width overrides.   |
| `contentClass`    | `string`                    | —                | Extra classes for the popup surface.                               |

| Output        | Payload          | Description                              |
| ------------- | ---------------- | ---------------------------------------- |
| `valueChange` | `TValue` | Emits the selected value (`TOption \| null` single, `TOption[]` multiple) — from `model`. |
| `touch`       | `void`      | Signal-forms contract: emitted on interaction (selection / trigger blur) so `[formField]` marks the field touched. |

### Content

| Ref / selector    | Context                   | Description                                                                 |
| ----------------- | ------------------------- | --------------------------------------------------------------------------- |
| `#selectOption`   | `SelectOptionContext<TOption>` | Option row template (default: `label(option)`).                        |
| `#selectValue`    | `{ $implicit: TValue }`   | Selected-value template in the built-in trigger (default: `label(value)`).  |
| `[selectTrigger]` | —                         | Escape hatch: a fully custom trigger element (replaces the built-in one).   |

### Slot classes

| Class                                    | On                                    |
| ---------------------------------------- | ------------------------------------- |
| `select-label` / `select-hint`          | Label above / hint below the trigger. |
| `select-trigger`                         | The trigger element (opt-in chrome).  |
| `select-trigger-label` / `select-placeholder` | Trigger text / empty state.      |
| `select-chevron`                         | Chevron icon (rotates when open).     |
| `select-option-body`                     | Option content wrapper (fills row).   |
| `select-option-label` / `select-option-sublabel` | Option primary / secondary text. |
| `select-option-check`                    | Trailing selected indicator.          |

### SelectTriggerDirective

Apply `selectTrigger` to the trigger element inside a `<SelectMenu>`. Wires the `@angular/aria` non-editable combobox behavior (`role=combobox`, `aria-expanded`, open/close on click and keyboard). Styling is separate — add `select-trigger` for the DS field look.
