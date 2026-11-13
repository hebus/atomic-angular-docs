# List (/docs/galactik/display/list)

An accessible list of selectable rows built on @angular/aria/listbox, with composable slots for content lists, action menus and navigation lists.



`List` is a container of selectable rows built on `@angular/aria/listbox` (`role="listbox"`/`role="option"`).
`ListItem` is a row, and a set of slot components/directives (`ListItemText`, `ListItemLeft`, `ListItemIcon`,
`ListItemAvatar`, `ListItemAction`, `ListItemChevron`, `ListItemExpander`) compose the row content for content
lists, action menus, navigation lists and tree-style rows. A row can also carry one **action** (typically
a delete) that a keyboard user reaches with a key rather than with Tab — see
[Row action and its key](#row-action-and-its-key).

## Minimal example [#minimal-example]

<CodeSample id="list-basic" title="A single-selection list">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import {
      ListComponent,
      ListItemComponent,
      ListItemLeftDirective,
      ListItemIconDirective,
      ListItemTextComponent,
      FileIcon,
      ImageIcon,
      UserIcon,
    } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [ListComponent, ListItemComponent, ListItemLeftDirective, ListItemIconDirective, ListItemTextComponent, FileIcon, ImageIcon, UserIcon],
      template: `
        <List class="gap-(--spacing-3xs)" [(value)]="picked">
          <ListItem value="doc">
            <ListItemLeft><ListItemIcon><file-icon /></ListItemIcon><ListItemText>Documents</ListItemText></ListItemLeft>
          </ListItem>
          <ListItem value="img">
            <ListItemLeft><ListItemIcon><image-icon /></ListItemIcon><ListItemText>Images</ListItemText></ListItemLeft>
          </ListItem>
          <ListItem value="ppl">
            <ListItemLeft><ListItemIcon><user-icon /></ListItemIcon><ListItemText>People</ListItemText></ListItemLeft>
          </ListItem>
        </List>
      `,
    })
    export class SampleComponent {
      // `value` is always a V[] model, even for single selection.
      picked = signal<string[]>(["doc"]);
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`List` composes `@angular/aria/listbox`'s `Listbox` as a **host directive** on its own host element (not a
wrapper), and `ListItem` composes `Option` the same way — required so a projected `ListItem` resolves its
ancestor `Listbox` through the element-injector hierarchy, which an `ng-content` wrapper would break. Every
selection, keyboard-navigation and ARIA-reflection concern (`aria-selected`, `aria-disabled`, roving tabindex,
typeahead) comes from `@angular/aria`, not from galactik.

<Mermaid
  chart="flowchart TD
    List[&#x22;List (host-directive: Listbox, role=listbox)&#x22;]
    Item[&#x22;ListItem (host-directive: Option, role=option)&#x22;]
    Left[&#x22;ListItemLeft&#x22;]
    Text[&#x22;ListItemText (label + subtext)&#x22;]
    Action[&#x22;ListItemAction&#x22;]

    List -->|&#x22;variant()/size() defaults via LIST_REF&#x22;| Item
    Item --> Left
    Left --> Text
    Item --> Action

    User((&#x22;User&#x22;)) -- &#x22;click / arrow keys / typeahead&#x22; --> List
    User -- &#x22;the action's key (Delete by default)&#x22; --> Item
    List -- &#x22;aria-selected reflected on Option&#x22; --> Item
    List -- &#x22;[(value)] selection model&#x22; --> Consumer[[&#x22;Host component&#x22;]]
    Item -- &#x22;trigger()&#x22; --> Action
    Action -- &#x22;(click), stopPropagation()&#x22; --> Consumer"
/>

By default, `selectionMode="follow"` means moving keyboard focus (arrow keys) immediately changes the
selection — the listbox default. Set `selectionMode="explicit"` (paired with `multi`, typically) whenever a
row also carries its own interactive affordance like `ListItemAction`, since "select on focus" would otherwise
fight with reaching that action.

### Row action and its key [#row-action-and-its-key]

A `ListItemAction` is **not focusable**: its host `ListItem` is a listbox `option`, and ARIA forbids an option from
containing an interactive control. A mouse user clicks the icon, which appears on hover. A keyboard user presses
the action's key while the row has focus, and `ListItem` calls the action's `trigger()` — your `(click)` handler
fires exactly as it would for a click.

That key is declared on the action (`keys`, `Delete` by default) and made discoverable in three ways, because no
single one reaches everybody:

* **`aria-keyshortcuts`** on the row, set from `keys`;
* **a sentence** (`description`), rendered visually hidden and linked to the row by `aria-describedby`, so a
  screen reader reads it when the row takes focus. `aria-keyshortcuts` alone is not reliably read: it depends on
  the reader and its settings, and is then the raw key name, in English;
* **a second line in the row** (only when `description` is set), shown only while the row has *keyboard* focus (`:focus-visible`): the same
  sentence with the key set apart as a keycap. It is hidden otherwise — the mouse has the click, and showing it
  on hover would move the rows under the pointer. The row grows by that one line, and its trailing tag and action
  stay vertically centred on it. The rows below move down by that height while the row is focused, and back up
  when the focus leaves: reserving the space, overlaying the line and animating the height were tried and look
  worse, so the shift is accepted.

Both visible and hidden copies are `aria-hidden` or kept out of the option's name, so nothing is announced twice.
A disabled action promises nothing: no key, no sentence, no line.

## Recipes [#recipes]

### Multi-selection with a per-row action [#multi-selection-with-a-per-row-action]

<CodeSample id="list-multi-action" title="Explicit selection, with a trailing remove action">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import {
      ListComponent,
      ListItemComponent,
      ListItemLeftDirective,
      ListItemAvatarDirective,
      ListItemTextComponent,
      ListItemActionComponent,
      XMarkIcon,
    } from "@sinequa/galactik";

    interface User {
      id: string;
      name: string;
      email: string;
      initials: string;
    }

    @Component({
      selector: "sample-component",
      imports: [ListComponent, ListItemComponent, ListItemLeftDirective, ListItemAvatarDirective, ListItemTextComponent, ListItemActionComponent, XMarkIcon],
      template: `
        <List class="gap-(--spacing-3xs)" multi size="medium" selectionMode="explicit" [(value)]="picked">
          @for (u of users(); track u.id) {
            <ListItem [value]="u.id">
              <ListItemLeft>
                <ListItemAvatar>{{ u.initials }}</ListItemAvatar>
                <ListItemText [subtext]="u.email">{{ u.name }}</ListItemText>
              </ListItemLeft>
              <ListItemAction ariaLabel="Remove" (click)="remove(u.id, $event)"><x-mark-icon /></ListItemAction>
            </ListItem>
          }
        </List>
      `,
    })
    export class SampleComponent {
      users = signal<User[]>([
        { id: "ada", name: "Ada Lovelace", email: "ada@example.com", initials: "AL" },
        { id: "alan", name: "Alan Turing", email: "alan@example.com", initials: "AT" },
      ]);
      picked = signal<string[]>(["alan"]);

      remove(id: string, event: Event): void {
        event.stopPropagation(); // do not toggle the row's selection while removing it
        this.users.update((list) => list.filter((u) => u.id !== id));
        this.picked.update((p) => p.filter((v) => v !== id));
      }
    }
    ```
  </Lang>
</CodeSample>

### Name the key of a row action [#name-the-key-of-a-row-action]

Galactik has no translation layer: the sentence and the key's name are yours to provide. `description` must
contain `shortcut` as is for the key to be set apart as a keycap inside it. A key that only exists on some
keyboards is the caller's to add — a MacBook has no dedicated `Delete` (it is `fn+⌫`, and `⌫` alone emits
`Backspace`), so declare both there. `isApplePlatform()` is exported for that.

<CodeSample id="list-action-key" title="A delete action with a translated, announced key">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { isApplePlatform, ListComponent, ListItemComponent, ListItemTextComponent, ListItemActionComponent, XMarkIcon } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [ListComponent, ListItemComponent, ListItemTextComponent, ListItemActionComponent, XMarkIcon],
      template: `
        <List aria-label="Recent searches" size="medium" selectionMode="explicit">
          @for (search of searches(); track search) {
            <ListItem [value]="search">
              <ListItemText>{{ search }}</ListItemText>
              <ListItemAction
                ariaLabel="Remove"
                [keys]="deleteKeys"
                shortcut="Del"
                description="Press Del to delete"
                (click)="remove(search, $event)">
                <x-mark-icon />
              </ListItemAction>
            </ListItem>
          }
        </List>
      `,
    })
    export class SampleComponent {
      searches = signal(["annual report", "contract template", "onboarding"]);

      // `Delete` everywhere, plus `Backspace` on a Mac, whose keyboard has no dedicated `Delete`.
      protected readonly deleteKeys = isApplePlatform() ? ["Delete", "Backspace"] : ["Delete"];

      remove(search: string, event: Event): void {
        event.stopPropagation(); // do not toggle the row's selection while removing it
        this.searches.update((list) => list.filter((s) => s !== search));
      }
    }
    ```
  </Lang>
</CodeSample>

The action does not have to be a delete: `keys` takes any `KeyboardEvent.key` values (`["Enter"]`, `["F2"]`…),
and the first one names the action in `aria-keyshortcuts`. There is still **one action per row**: `ListItem`
triggers the first `ListItemAction` it projects.

### Another icon, another key [#another-icon-another-key]

The icon is projected content and the key is `keys`, so an action is not a delete unless you make it one. Here
a rename: a pencil, answering to `F2` (the key file managers use). What the action *does* is whatever your
`(click)` handler does — the key only calls it.

<CodeSample id="list-action-rename" title="A rename action on F2, with its own icon and sentence">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { EditIcon, ListComponent, ListItemActionComponent, ListItemComponent, ListItemTextComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [ListComponent, ListItemComponent, ListItemTextComponent, ListItemActionComponent, EditIcon],
      template: `
        <List aria-label="Documents" size="medium" selectionMode="explicit">
          @for (name of names(); track name) {
            <ListItem [value]="name">
              <ListItemText>{{ name }}</ListItemText>
              <ListItemAction
                ariaLabel="Rename"
                [keys]="['F2']"
                shortcut="F2"
                description="Press F2 to rename"
                (click)="rename(name, $event)">
                <edit-icon />
              </ListItemAction>
            </ListItem>
          }
        </List>
      `,
    })
    export class SampleComponent {
      names = signal(["Annual report", "Contract template"]);

      rename(name: string, event: Event): void {
        event.stopPropagation(); // do not toggle the row's selection
        const next = window.prompt("New name", name);
        if (next) this.names.update((list) => list.map((n) => (n === name ? next : n)));
      }
    }
    ```
  </Lang>
</CodeSample>

The hover colour is part of the row, not of the action: every `ListItemAction` turns to the error colour on keyboard
focus and when hovered, since the delete is its main use. There is no `class` input to change that, and an icon
is the only thing you control. If an action needs its own look, or several actions side by side, it is not a
`ListItemAction` — see [Limits](#limits).

### Show a hint while the keyboard is in the list [#show-a-hint-while-the-keyboard-is-in-the-list]

A list is a single tab stop and the arrow keys do the rest, which nothing tells a keyboard user.
`List.keyboardFocused` is true while the keyboard focus — `:focus-visible`, so not a mouse click — is inside the
list, which is exactly when a hint is useful. Read it through the `list` template reference.

<CodeSample id="list-keyboard-hint" title="A navigation hint shown only to the keyboard">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { KbdComponent, ListComponent, ListItemComponent, ListItemTextComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [ListComponent, ListItemComponent, ListItemTextComponent, KbdComponent],
      template: `
        <List #list="list" aria-label="Documents" size="medium">
          <ListItem value="a"><ListItemText>Annual report</ListItemText></ListItem>
          <ListItem value="b"><ListItemText>Contract template</ListItemText></ListItem>
        </List>
        <!-- aria-hidden: a listbox already announces its arrow-key navigation to a screen reader -->
        @if (list.keyboardFocused()) {
          <p aria-hidden="true"><kbd>↑</kbd> <kbd>↓</kbd> to navigate</p>
        }
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

### Tree rows [#tree-rows]

`depth` indents a row by 20px per level, and `ListItemExpander` renders the rotating expand/collapse chevron.
In today's listbox-backed `List`, tree behavior is **style only** — expansion state and which children render
is entirely up to the consumer; there is no `role="tree"` keyboard semantics yet (a future
`@angular/aria/tree`-backed variant will add it).

<CodeSample id="list-tree" title="A collapsible folder row">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import {
      ListComponent,
      ListItemComponent,
      ListItemLeftDirective,
      ListItemIconDirective,
      ListItemTextComponent,
      ListItemExpanderComponent,
      FolderIcon,
      FileIcon,
    } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [ListComponent, ListItemComponent, ListItemLeftDirective, ListItemIconDirective, ListItemTextComponent, ListItemExpanderComponent, FolderIcon, FileIcon],
      template: `
        <List [(value)]="picked">
          <ListItem value="src">
            <ListItemExpander [expanded]="open()" ariaLabel="Toggle" (click)="toggle($event)" />
            <ListItemLeft><ListItemIcon><folder-icon /></ListItemIcon><ListItemText>src</ListItemText></ListItemLeft>
          </ListItem>
          @if (open()) {
            <ListItem value="main" [depth]="1">
              <ListItemLeft><ListItemIcon><file-icon /></ListItemIcon><ListItemText>main.ts</ListItemText></ListItemLeft>
            </ListItem>
          }
        </List>
      `,
    })
    export class SampleComponent {
      picked = signal<string[]>([]);
      open = signal(true);

      toggle(event: Event): void {
        event.stopPropagation(); // do not select the row while expanding/collapsing it
        this.open.update((v) => !v);
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  variant: { type: '&#x22;list-content&#x22; | &#x22;list-navigation&#x22; | &#x22;list-menu&#x22;', default: '&#x22;list-content&#x22;', description: &#x22;Set on List, propagated to every child ListItem (an item may override it locally).&#x22; },
  size: { type: '&#x22;small&#x22; | &#x22;medium&#x22;', default: '&#x22;small&#x22;', description: &#x22;Set on List, propagated to every child ListItem.&#x22; },
  value: { type: &#x22;V[]&#x22;, default: &#x22;[]&#x22;, description: &#x22;Selection model, bind with [(value)]. Always an array, even for single selection.&#x22; },
  multi: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Enables multiple selection.&#x22; },
  selectionMode: { type: '&#x22;follow&#x22; | &#x22;explicit&#x22;', default: '&#x22;follow&#x22;', description: &#x22;follow: selection tracks keyboard focus. explicit: select only via click/Space.&#x22; },
  focusMode: { type: '&#x22;roving&#x22; | &#x22;activedescendant&#x22;', default: '&#x22;roving&#x22;', description: 'activedescendant keeps DOM focus on a host input (used by Autocomplete); the &#x22;focused&#x22; row is then exposed via data-active, not native :focus.' },
  keyboardFocused: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;Read-only, via the list template reference. True while the keyboard focus (:focus-visible) is inside the list, false for a mouse click and once the focus has left.&#x22; },
}"
/>

`ListItemAction`:

<TypeTable
  type="{
  ariaLabel: { type: &#x22;string&#x22;, description: &#x22;The action's label, shown in the hover tooltip (not as aria-label): the icon is hidden from assistive technology, which reaches the action by its key.&#x22; },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;The key no longer triggers it, and nothing announces it any more: no aria-keyshortcuts, no linked sentence, no line.&#x22; },
  keys: { type: &#x22;readonly string[]&#x22;, default: '[&#x22;Delete&#x22;]', description: &#x22;The KeyboardEvent.key values that trigger the action. The first one names it in aria-keyshortcuts and, without shortcut, in the hint.&#x22; },
  shortcut: { type: &#x22;string&#x22;, description: 'The key\'s name, in the user\'s language, set apart as a keycap inside description. Defaults to the first key\'s short name (&#x22;Del&#x22; for Delete).' },
  description: { type: &#x22;string&#x22;, description: 'The sentence (&#x22;Press Del to delete&#x22;), linked to the row by aria-describedby and written in the row on keyboard focus. Must contain shortcut as is for it to be set apart. Without it, only aria-keyshortcuts and the bare key are given.' },
}"
/>

`trigger()` is also public: it does what a click on the icon does, unless the action is disabled. `ListItem` calls it
on the key.

`disabled`, `readonly`, `softDisabled`, `wrap`, `orientation`, `typeaheadDelay` are forwarded from
`@angular/aria/listbox`'s `Listbox` and default to whatever that package ships. `ListItem` additionally takes
`depth` (tree indentation, 20px/level) and forwards `value` (required), `disabled`, `label` from `Option`.

## Limits [#limits]

**One action per row.** `ListItem` looks for a single `ListItemAction` (the first it projects) and gives it the key.
That is a property of the component, not an omission of this page.

Projecting a second one does not fail, but only half works:

* the second icon is drawn and reacts to the **mouse** — its `(click)` fires;
* it is **unreachable from the keyboard**: the row sets `aria-keyshortcuts` and `aria-describedby` from the first
  action only, and a key press only ever triggers the first;
* each action still draws its own hint line on keyboard focus, so a focused row would advertise a key that does
  nothing.

Do not use it that way. When a row needs several actions, or an action with its own look, use a component that
can hold several focusable controls: &#x2A;*[`RowGrid`](./row-grid.mdx)** is a keyboard-navigable ARIA grid whose rows
hold any number of them — `Tab` enters the focused row and walks its controls, `Enter` activates the row.

**No editable content in a row.** A `ListItem` is a listbox `option`: ARIA forbids an interactive element inside
it, and the row takes `Delete` (and `Backspace&#x60; on a Mac) for its action whatever has the focus. A row that holds a
text field, a select or any other control is not a list row — use &#x2A;*[`RowGrid`](./row-grid.mdx)** instead.

The limit is on actions, not on keys: `keys` may list several `KeyboardEvent.key` values
(`["Delete", "Backspace"]`), all of which trigger the same action.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="ListItemAction's icon never receives keyboard focus, and a screen reader does not read it on mouse hover">
    `ListItemAction` renders a non-focusable `<span aria-hidden="true">`, not a `<button>` — its host `<ListItem>`
    is already a listbox `option`, and ARIA forbids an option from containing an interactive control. The label
    you pass renders in the hover tooltip, not as `aria-label`: the children of an `option` are presentational, and
    a screen reader's mouse tracking (checked with NVDA) reads nothing under the pointer in an option, whatever
    role or name the icon has. A named `role="img"` was tried and changes nothing there.

    The keyboard path is the action's key on the focused row (`keys`, `Delete` by default): `<ListItem>` sets
    `aria-keyshortcuts` from it whenever it projects a usable `ListItemAction`, and pressing the key calls the
    action's `trigger()` on your behalf — your `(click)` handler on `<ListItemAction>` still fires, unchanged.
    See [Row action and its key](#row-action-and-its-key). `ListItemExpander` is the exception in this family: it
    does render a real `<button>`, reachable by `Tab` in the usual way.
  </Accordion>

  <Accordion title="A second ListItemAction in a row is clickable but not reachable from the keyboard">
    Only the first `ListItemAction` of a row is bound to a key: `aria-keyshortcuts`, the `aria-describedby` sentence and
    the key handling all read that one. A second one still draws and still answers to a click, which hides the
    problem from anyone testing with a mouse. See [Limits](#limits) for what to use instead.
  </Accordion>

  <Accordion title="The key is announced but not set apart in the hint line">
    The visible line splits `description` around `shortcut` to draw the key as a keycap. If `description` does not
    contain `shortcut` exactly — a different case, a translated name that differs from the one in the sentence —
    the sentence is written as is, with no keycap. Pass the same word to both.
  </Accordion>

  <Accordion title="Backspace deletes on a Mac but not on Windows">
    That is by design, and it is the caller's choice, not the library's. `keys` is `["Delete"]` unless you say
    otherwise: Backspace in a list does not express an intent to delete on a keyboard that has a `Delete` key. A
    MacBook has none, so pass `["Delete", "Backspace"]` when `isApplePlatform()` — see
    [Name the key of a row action](#name-the-key-of-a-row-action).
  </Accordion>

  <Accordion title="Rows overlap or misalign in a list with a custom-height template">
    `List`'s virtualizer estimates row height at a fixed value and never measures actual rendered height — keep
    rows a uniform height. This does not apply to `<aggregation-tree>`-style consumers with their own measured
    virtualizer; a plain `List` always assumes uniform rows.
  </Accordion>

  <Accordion title="value is required on every ListItem, and it's always compared as an array">
    Even a single-selection `List` compares `value` against a `V[]` selection model — there is no scalar shortcut.
    Every `ListItem` needs its own `value`, since it is the row's identity in that array.
  </Accordion>

  <Accordion title="A second ListItemComponent exists in @sinequa/ui, with a much smaller surface">
    `@sinequa/ui` (atomic-ui) also exports a `ListItemComponent`, but as a thinner styling-only directive
    (variants `default`/`destructive`/`primary`/`link`/`none`) with no `List` container, no slot sub-components,
    and no `@angular/aria` backing. Double-check the import path whenever `ListItem`/`ListItemComponent` is
    ambiguous — for new work, the galactik version documented here is the target.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="RowGrid" href="./row-grid.mdx">
    Reach for it instead of List whenever a row needs more than one focusable control.
  </Card>

  <Card title="Tabs" href="../navigation/tabs.mdx">
    Another @angular/aria-backed composite widget, for switching between panels instead of selecting rows.
  </Card>
</Cards>
