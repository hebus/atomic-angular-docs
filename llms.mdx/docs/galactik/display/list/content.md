# List (/docs/galactik/display/list)

An accessible list of selectable rows built on @angular/aria/listbox, with composable slots for content lists, action menus and navigation lists.



`List` is a container of selectable rows built on `@angular/aria/listbox` (`role="listbox"`/`role="option"`).
`ListItem` is a row, and a set of slot components/directives (`ListItemText`, `ListItemLeft`, `ListItemIcon`,
`ListItemAvatar`, `ListItemAction`, `ListItemChevron`, `ListItemExpander`) compose the row content for content
lists, action menus, navigation lists and tree-style rows.

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
    List -- &#x22;aria-selected reflected on Option&#x22; --> Item
    List -- &#x22;[(value)] selection model&#x22; --> Consumer[[&#x22;Host component&#x22;]]
    Action -- &#x22;(click), stopPropagation()&#x22; --> Consumer"
/>

By default, `selectionMode="follow"` means moving keyboard focus (arrow keys) immediately changes the
selection — the listbox default. Set `selectionMode="explicit"` (paired with `multi`, typically) whenever a
row also carries its own interactive affordance like `ListItemAction`, since "select on focus" would otherwise
fight with reaching that action.

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
      TrashIcon,
    } from "@sinequa/galactik";

    interface User {
      id: string;
      name: string;
      email: string;
      initials: string;
    }

    @Component({
      selector: "sample-component",
      imports: [ListComponent, ListItemComponent, ListItemLeftDirective, ListItemAvatarDirective, ListItemTextComponent, ListItemActionComponent, TrashIcon],
      template: `
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
}"
/>

`disabled`, `readonly`, `softDisabled`, `wrap`, `orientation`, `typeaheadDelay` are forwarded from
`@angular/aria/listbox`'s `Listbox` and default to whatever that package ships. `ListItem` additionally takes
`depth` (tree indentation, 20px/level) and forwards `value` (required), `disabled`, `label` from `Option`.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="ListItemAction's icon never receives keyboard focus, and aria-label on it has no effect">
    `ListItemAction` renders a non-focusable `<span aria-hidden="true">`, not a `<button>` — its host `<ListItem>`
    is already a listbox `option`, and ARIA forbids an option from containing an interactive control. The label
    you pass renders as `title` (a mouse tooltip), not `aria-label`, since the span is hidden from assistive
    technology anyway.

    The keyboard path is `Delete` on the focused row: `<ListItem>` sets `aria-keyshortcuts="Delete"` whenever it
    projects a `ListItemAction`, and pressing `Delete` clicks the action's element on your behalf — your
    `(click)` handler on `<ListItemAction>` still fires, unchanged. `ListItemExpander` is the exception in this
    family: it does render a real `<button>`, reachable by `Tab` in the usual way.
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
