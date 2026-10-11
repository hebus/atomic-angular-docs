# Menu (/docs/galactik/overlay/menu)

An accessible dropdown or contextual menu built on @angular/aria — roving focus, typeahead, unlimited nested submenus, and checkable items with no interactive control inside a menuitem.



A dropdown of actions, a "kebab" row menu, a nested settings menu — `Menu` composes `MenuItem`s (with optional
nested `SubMenu`s) inside `MenuContent`, wired to a trigger with `MenuTriggerDirective`. It is itself a
popover — opening, positioning, dismissal and focus restoration all come from the same native Popover API
[Popover](./popover.mdx) is built on, applied as a host directive, so there is no `<div popover>` wrapper to
write yourself.

<Callout title="Concept — roving focus">
  A menu's items are not each individually tabbable: `Tab` leaves the whole menu in one step, and `↓`/`↑`/`Home`/
  `End` move a single "active" focus between items instead. This is the ARIA **menu** pattern, and
  `@angular/aria/menu` implements all of it — the roving focus, the keyboard navigation, and typeahead — so
  `Menu` only has to compose the pieces.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="menu-basic" title="A kebab-style contextual menu">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import {
      MenuComponent,
      MenuContentComponent,
      MenuItemComponent,
      MenuTriggerDirective,
    } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [MenuComponent, MenuContentComponent, MenuItemComponent, MenuTriggerDirective],
      template: `
        <button [menuTrigger]="menu">Options</button>

        <Menu #menu="menu" (itemSelected)="onSelect($event)">
          <MenuContent>
            <MenuItem value="edit">Edit</MenuItem>
            <MenuItem value="duplicate">Duplicate</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
          </MenuContent>
        </Menu>
      `,
    })
    export class SampleComponent {
      protected onSelect(value: string) {
        console.log("Selected item:", value);
      }
    }
    ```
  </Lang>
</CodeSample>

`[menuTrigger]="menu"` wires `popovertarget`, `aria-haspopup="menu"` and a reactive `aria-expanded` onto the
button — no manual `id` to invent or keep in sync. See [Pitfalls](#pitfalls) for the one thing this example
would silently break without: the `#menu="menu"` export form.

## How it works [#how-it-works]

`Menu` applies two host directives rather than wrapping either: `@angular/aria`'s `Menu` (roving focus,
keyboard navigation, typeahead, the `itemSelected` output) and this library's own `PopoverDirective`
(positioning, native show/close, the `state` signal). Selecting a non-submenu item closes the popover; opening
a submenu never bubbles into that same close path, so the root stays open while a submenu is showing.

<Mermaid
  chart="flowchart TD
    Button[&#x22;button [menuTrigger]&#x22;] -- click/Enter/Space --> Trigger[MenuTriggerDirective]
    Trigger -- popovertarget --> MenuHost[[&#x22;Menu (popover host)&#x22;]]
    MenuHost --> Content[MenuContent]
    Content --> Item1[MenuItem]
    Content --> Item2[&#x22;MenuItem with submenu&#x22;]
    Item2 -- submenu --> Sub[SubMenu]
    Sub --> SubItem[MenuItem]
    Item1 -- select --> ItemSelected((&#x22;itemSelected&#x22;))
    SubItem -- select, bubbles up --> ItemSelected
    ItemSelected -- closes the root --> MenuHost"
/>

`itemSelected` bound only on the root `<Menu>` still fires for an item selected several `SubMenu` levels deep —
selection bubbles all the way up, so there is never a reason to bind a handler on every nested level.

## Recipes [#recipes]

### Grouping items, with a separator [#grouping-items-with-a-separator]

`MenuContent` accepts arbitrary projected content — group items visually with `role="group"` + a heading span,
separated by a `.dialog-sep` marker div (both pre-styled).

<CodeSample id="menu-grouped" title="Grouped file/edit actions">
  <Lang value="angular">
    ```ts title="grouped-menu.component.ts"
    import { Component } from "@angular/core";
    import { MenuComponent, MenuContentComponent, MenuItemComponent, MenuTriggerDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [MenuComponent, MenuContentComponent, MenuItemComponent, MenuTriggerDirective],
      template: `
        <button [menuTrigger]="menu">File</button>

        <Menu #menu="menu" (itemSelected)="onSelect($event)">
          <MenuContent>
            <span id="file-label" class="heading">FILE</span>
            <div role="group" aria-labelledby="file-label">
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="open">Open</MenuItem>
            </div>

            <div class="dialog-sep"></div>

            <span id="edit-label" class="heading">EDIT</span>
            <div role="group" aria-labelledby="edit-label">
              <MenuItem value="undo">Undo</MenuItem>
              <MenuItem value="redo" [disabled]="true">Redo</MenuItem>
            </div>
          </MenuContent>
        </Menu>
      `,
    })
    export class SampleComponent {
      protected onSelect(value: string) {
        console.log("Selected:", value);
      }
    }
    ```
  </Lang>
</CodeSample>

`[disabled]="true"` excludes an item from keyboard navigation and selection. `.heading` spans and `role="group"`
wrappers are not focusable and are skipped by the roving navigation.

### Nested submenus [#nested-submenus]

Nest a `<SubMenu>` as a **sibling** of the `<MenuItem>` that opens it — never a child — and wire the two
together with `[submenu]`. Submenus can be nested arbitrarily deep by repeating the pattern.

<CodeSample id="menu-submenu" title="A submenu, one level deep">
  <Lang value="angular">
    ```ts title="submenu.component.ts"
    import { Component } from "@angular/core";
    import {
      MenuComponent,
      MenuContentComponent,
      MenuItemComponent,
      MenuTriggerDirective,
      SubMenuComponent,
    } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [MenuComponent, MenuContentComponent, MenuItemComponent, MenuTriggerDirective, SubMenuComponent],
      template: `
        <button [menuTrigger]="menu">Open</button>
        <Menu #menu="menu" (itemSelected)="onSelect($event)">
          <MenuContent>
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="more" [submenu]="moreSub">More…</MenuItem>

            <SubMenu #moreSub="ngMenu">
              <MenuItem value="rename">Rename</MenuItem>
              <MenuItem value="delete">Delete</MenuItem>
            </SubMenu>
          </MenuContent>
        </Menu>
      `,
    })
    export class SampleComponent {
      protected onSelect(value: string) {
        console.log("Selected item:", value);
      }
    }
    ```
  </Lang>
</CodeSample>

Do **not** add a `<MenuContent>` inside `<SubMenu>` — it is already implicit in the component's own template.
Customize a submenu's side with `placement` (defaults to `"right-start"`, and flips/shifts with Floating UI
like the root popover does).

### Checkable items — no control inside a `menuitem` [#checkable-items--no-control-inside-a-menuitem]

A menu entry that toggles a state cannot put a control (a checkbox, a switch) **inside** a `MenuItem`: a
`menuitem` containing an interactive control is invalid ARIA, and it would leave that control out of the
menu's own keyboard navigation. The ARIA APG answer is for the item itself to carry the role and the
state — supported through `role="menuitemcheckbox"`/`"menuitemradio"` plus a `checked` input, which also stops
the menu from closing when such an item is picked, so several options can be toggled in a row.

<CodeSample id="menu-checkable" title="A toggleable option in a menu">
  <Lang value="angular">
    ```ts title="view-menu.component.ts"
    import { Component, signal } from "@angular/core";
    import {
      MenuComponent,
      MenuContentComponent,
      MenuItemComponent,
      MenuTriggerDirective,
      SwitchComponent,
    } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [MenuComponent, MenuContentComponent, MenuItemComponent, MenuTriggerDirective, SwitchComponent],
      template: `
        <button [menuTrigger]="menu">View</button>

        <Menu #menu="menu">
          <MenuContent>
            <MenuItem value="minimap" role="menuitemcheckbox" [checked]="minimap()" (click)="minimap.set(!minimap())">
              <span class="label">Show minimap</span>
              <Switch [checked]="minimap()" presentational />
            </MenuItem>
          </MenuContent>
        </Menu>
      `,
    })
    export class SampleComponent {
      protected readonly minimap = signal(true);
    }
    ```
  </Lang>
</CodeSample>

The state stays owned by the host: the item emits its `value` through `itemSelected` as usual, the host flips
its own signal, and `checked`/the projected `Switch` reflect it back. `presentational` on `Switch` makes its
own `<input>` `inert` — out of the keyboard path and the accessibility tree, since the `MenuItem` itself is
already the interactive element the switch merely illustrates.

### Right-click / context menu [#right-click--context-menu]

`[menuTrigger]` only sets `popovertarget` — the native browser auto-invoke for that attribute only applies to
`<button>`, so a plain element needs to open the menu imperatively, e.g. on `contextmenu`.

<CodeSample id="menu-context" title="Opening on right-click">
  <Lang value="angular">
    ```ts title="context-menu.component.ts"
    import { Component } from "@angular/core";
    import { MenuComponent, MenuContentComponent, MenuItemComponent, MenuTriggerDirective } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [MenuComponent, MenuContentComponent, MenuItemComponent, MenuTriggerDirective],
      template: `
        <div
          [menuTrigger]="ctxMenu"
          role="button"
          tabindex="0"
          class="rounded-md border border-dashed p-8 text-center text-sm"
          (contextmenu)="onContextMenu($event, ctxMenu)">
          Right-click anywhere in this area
        </div>

        <Menu #ctxMenu="menu" (itemSelected)="onSelect($event)">
          <MenuContent>
            <MenuItem value="copy">Copy</MenuItem>
            <MenuItem value="paste">Paste</MenuItem>
          </MenuContent>
        </Menu>
      `,
    })
    export class SampleComponent {
      protected onContextMenu(event: MouseEvent, menu: MenuComponent) {
        event.preventDefault();
        menu.popover.show();
      }

      protected onSelect(value: string) {
        console.log("Selected:", value);
      }
    }
    ```
  </Lang>
</CodeSample>

`MenuComponent` exposes its underlying `PopoverDirective` through the public `popover` property
(`menu.popover.show()`/`.close()`/`.toggle()`/`.state()`), which is what makes this kind of imperative control
possible.

### Give another panel the Menu's look [#give-another-panel-the-menus-look]

A panel that is not a `Menu` — a listbox of search results, a custom popover — can wear the same surface through the
class helpers the `Menu` itself is built from: `menuPanelVariants()` (rounded, shadowed, padded panel),
`menuItemVariants()` (a row, with hover, active and disabled states), `menuContentVariants()` and
`menuSeparatorVariants()`. They only return class names; the behaviour — roles, keyboard, positioning — stays yours.

<CodeSample id="menu-surface-variants" title="A results list that looks like a Menu">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { menuItemVariants, menuPanelVariants } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      template: `
        <ul role="listbox" [class]="panel">
          @for (person of people; track person) {
            <li role="option" [class]="item">{{ person }}</li>
          }
        </ul>
      `,
    })
    export class SampleComponent {
      protected readonly people = ["Alice", "Bob", "Carol"];
      protected readonly panel = menuPanelVariants({ class: "max-h-60 overflow-auto" });
      protected readonly item = menuItemVariants();
    }
    ```
  </Lang>
</CodeSample>

A row that is the current one is tinted like a hovered item: `data-active="true"` for the Menu's own roving items and for
the options of an `@angular/aria` listbox (which mark the current row that way), `aria-selected="true"` for a listbox written
by hand following the APG.

## Options [#options]

<TypeTable
  type="{
  wrap: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;Forwarded from @angular/aria/menu. Whether focus wraps from the last item back to the first, and vice versa.&#x22;,
  },
  typeaheadDelay: {
    type: &#x22;number&#x22;,
    default: &#x22;500&#x22;,
    description: &#x22;Forwarded from @angular/aria/menu. Delay (ms) before the typeahead search buffer clears.&#x22;,
  },
  placement: {
    type: &#x22;Placement&#x22;,
    default: '&#x22;bottom&#x22; (root) · &#x22;right-start&#x22; (SubMenu)',
    description: &#x22;Forwarded from PopoverDirective. Any @floating-ui/dom placement; flips/shifts on collision.&#x22;,
  },
  offset: { type: &#x22;number&#x22;, default: &#x22;4&#x22;, description: &#x22;Forwarded from PopoverDirective. Distance in pixels between trigger and menu.&#x22; },
  class: { type: &#x22;string&#x22;, description: &#x22;Additional Tailwind classes, merged via cn().&#x22; },
}"
/>

`itemSelected` emits the selected `MenuItem`'s `value` — never emitted by an item that only opens a submenu.
Because the output is exposed through a host directive, Angular does not infer its generic type from the
template: type the handler's parameter explicitly to constrain it.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="[menuTrigger]=&#x22;menu&#x22; fails to type-check">
    The template reference must use the `exportAs` form — `#menu="menu"` — not a bare `#menu`. Without it, Angular
    types the reference as the host `HTMLElement` instead of `MenuComponent`, which is what `[menuTrigger]` and
    `.popover` both need.
  </Accordion>

  <Accordion title="[submenu]=&#x22;moreSub&#x22; fails to type-check">
    The reference on `<SubMenu>` must be `#moreSub="ngMenu"`, **not** `="submenu"`. `[submenu]` on `MenuItem`
    expects the underlying `@angular/aria` `Menu` directive instance — exported as `ngMenu` — not the
    `SubMenuComponent` wrapper, which is what `="submenu"` would give you instead.
  </Accordion>

  <Accordion title="A checkbox/switch inside a MenuItem breaks keyboard navigation">
    Putting an interactive control **inside** a `MenuItem` is invalid ARIA and takes that control out of the
    menu's own roving focus — clicking it may also close the menu on every toggle. Use
    `role="menuitemcheckbox"`/`"menuitemradio"` plus the `checked` input on `MenuItem` itself instead, with a
    `presentational` `Switch`/`Checkbox` as illustration only — see
    [Checkable items](#checkable-items--no-control-inside-a-menuitem) above.
  </Accordion>

  <Accordion title="A closed submenu still renders inline">
    `SubMenu`'s host relies on a `data-[visible=false]:hidden` utility to hide itself when closed. Overriding
    `class` with a `display` utility (`flex`, `block`, …) on `<SubMenu>` drops that variant unless you keep it or
    an equivalent rule — the panel then lays out inline even while closed.
  </Accordion>

  <Accordion title="Two menus, and a raw @angular/aria Menu underneath — same names, different layer">
    `atomic-ui`'s legacy `Menu`/`MenuContent`/`MenuItem` docs describe an older implementation, but on this branch
    `Menu` has already been fully migrated to Galactik across `@sinequa/atomic-angular` — there is no active
    duplicate to reconcile here, unlike `Sheet` and `Popover`. Any remaining `atomic-ui` `Menu` reference you find
    is historical.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Popover" href="./popover.mdx">
    The positioning primitive Menu is built on — reach for it directly for content that isn't a list of actions.
  </Card>

  <Card title="Dialog" href="./dialog.mdx">
    A modal window with the same imperative call/result API, for content heavier than a menu.
  </Card>
</Cards>
