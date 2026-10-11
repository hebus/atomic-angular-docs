# Menu

Accessible dropdown menu built on top of `@angular/aria/menu`. The trigger button is wired to a popover-positioned menu — selecting an item closes the menu and emits `(itemSelected)`.

## Imports

```ts
import {
  MenuComponent,
  MenuContentComponent,
  MenuItemComponent,
  MenuTriggerDirective,
  SubMenuComponent
} from "@sinequa/galactik";
```

## Basic

The minimal form: a trigger bound to a `<Menu>` and a few items.

<demo-menu-basic></demo-menu-basic>

```html
<button [menuTrigger]="basicMenu">Open</button>

<Menu #basicMenu="menu" (itemSelected)="onSelect($event)">
  <MenuContent>
    <MenuItem value="new">New</MenuItem>
    <MenuItem value="open">Open…</MenuItem>
    <MenuItem value="save">Save</MenuItem>
  </MenuContent>
</Menu>
```

`#basicMenu="menu"` is required — without `exportAs`, the template ref points to the host element and the `[menuTrigger]` binding fails to type-check.

## With icons

`.dialog-item-icon` and `.label` are styled by Tailwind variants on the host of `MenuItem` — the icon slot is sized and muted, the label fills the row.

<demo-menu-icons></demo-menu-icons>

```html
<Menu>
  <MenuContent>
    <MenuItem value="new">
      <plus-icon class="dialog-item-icon" />
      <span class="label">New</span>
    </MenuItem>
    <MenuItem value="open">
      <folder-open-icon class="dialog-item-icon" />
      <span class="label">Open…</span>
    </MenuItem>
    <MenuItem value="save">
      <save-icon class="dialog-item-icon" />
      <span class="label">Save</span>
    </MenuItem>
  </MenuContent>
</Menu>
```

## Disabled items

An item with `[disabled]="true"` is skipped by keyboard navigation (arrows, typeahead) and never emits `itemSelected`.

<demo-menu-disabled></demo-menu-disabled>

```html
<Menu>
  <MenuContent>
    <MenuItem value="undo">Undo</MenuItem>
    <MenuItem value="redo" [disabled]="true">Redo</MenuItem>
    <MenuItem value="clear">Clear</MenuItem>
  </MenuContent>
</Menu>
```

## Checkable items

An item that toggles a state is a `menuitemcheckbox`, not a `menuitem` wrapping a control: a `menuitem` must
not contain an interactive control, which would sit outside the menu's own keyboard navigation. Set `role`
and feed `checked` — the latter renders `aria-checked`, which `@angular/aria` leaves to the consumer.

Such an item **does not close the menu** when activated, so several options can be toggled in a row. Use
`role="menuitemradio"` for a mutually exclusive group; it behaves the same way.

<demo-menu-checkbox></demo-menu-checkbox>

```html
<Menu (itemSelected)="toggle($event)">
  <MenuContent>
    <MenuItem value="sidebar" role="menuitemcheckbox" [checked]="sidebar()">
      <span class="label">Show sidebar</span>
      @if (sidebar()) {
        <check-icon class="size-4" />
      }
    </MenuItem>

    <!-- A Switch works too, as a decoration: `presentational` takes it out of the keyboard path
         and the accessibility tree, leaving the item as the single control. -->
    <MenuItem value="minimap" role="menuitemcheckbox" [checked]="minimap()">
      <span class="label">Show minimap</span>
      <Switch [checked]="minimap()" presentational />
    </MenuItem>
  </MenuContent>
</Menu>
```

The state stays owned by the parent: the item emits its `value` through `itemSelected`, the parent flips its
own signal, and `checked` reflects it back.

## Headings and separator

Use `role="group"` + `aria-labelledby` to semantically group related items.

<demo-menu-headings></demo-menu-headings>

```html
<Menu>
  <MenuContent>
    <span id="file-label" class="heading">FILE</span>
    <div role="group" aria-labelledby="file-label">
      <MenuItem value="new">New</MenuItem>
      <MenuItem value="open">Open</MenuItem>
    </div>

    <div class="dialog-sep"></div>

    <span id="edit-label" class="heading">EDIT</span>
    <div role="group" aria-labelledby="edit-label">
      <MenuItem value="copy">Copy</MenuItem>
      <MenuItem value="paste">Paste</MenuItem>
    </div>
  </MenuContent>
</Menu>
```

## Submenu

Link a `MenuItem` to a `SubMenu` via `[submenu]="ref"`. The template ref must point to `#ref="ngMenu"` (not `"submenu"`).

<demo-menu-submenu></demo-menu-submenu>

```html
<Menu>
  <MenuContent>
    <MenuItem value="share">Share</MenuItem>
    <MenuItem value="more" [submenu]="moreSub">
      <span class="label">More</span>
      <chevron-right-icon class="arrow" />
    </MenuItem>

    <SubMenu #moreSub="ngMenu">
      <MenuItem value="export">Export</MenuItem>
      <MenuItem value="archive">Archive</MenuItem>
      <MenuItem value="delete">Delete</MenuItem>
    </SubMenu>
  </MenuContent>
</Menu>
```

## Nested submenus

`SubMenu` can contain another `SubMenu`. Right-arrow / left-arrow navigation flows through every level.

<demo-menu-nested></demo-menu-nested>

```html
<Menu>
  <MenuContent>
    <MenuItem value="reset" [submenu]="resetSub">
      <span class="label">Reset</span>
      <chevron-right-icon class="arrow" />
    </MenuItem>

    <SubMenu #resetSub="ngMenu">
      <MenuItem value="reset-password">Password</MenuItem>
      <MenuItem value="advanced" [submenu]="advancedSub">
        <span class="label">Advanced</span>
        <chevron-right-icon class="arrow" />
      </MenuItem>

      <SubMenu #advancedSub="ngMenu">
        <MenuItem value="reset-all">Reset everything</MenuItem>
        <MenuItem value="factory">Factory reset</MenuItem>
      </SubMenu>
    </SubMenu>
  </MenuContent>
</Menu>
```

## Deeply nested submenus

Nesting is **not limited to one level** — a `SubMenu` can reference another `SubMenu`, as deep as you need. Below the chain runs five menus deep (root → Move to → Documents → Projects → 2024). Every level is a *sibling* `SubMenu` wired to its parent item through `[submenu]`, and keyboard `→` / `←` walks in and out of each level.

<demo-menu-deep-nesting></demo-menu-deep-nesting>

```html
<Menu>
  <MenuContent>
    <MenuItem value="move" [submenu]="moveSub">
      <folder-icon class="dialog-item-icon" />
      <span class="label">Move to</span>
      <chevron-right-icon class="arrow" />
    </MenuItem>

    <!-- Level 1 -->
    <SubMenu #moveSub="ngMenu">
      <MenuItem value="/Documents" [submenu]="docsSub">
        <span class="label">Documents</span>
        <chevron-right-icon class="arrow" />
      </MenuItem>

      <!-- Level 2 -->
      <SubMenu #docsSub="ngMenu">
        <MenuItem value="/Documents/Projects" [submenu]="projectsSub">
          <span class="label">Projects</span>
          <chevron-right-icon class="arrow" />
        </MenuItem>

        <!-- Level 3 -->
        <SubMenu #projectsSub="ngMenu">
          <MenuItem value="/Documents/Projects/2024" [submenu]="yearSub">
            <span class="label">2024</span>
            <chevron-right-icon class="arrow" />
          </MenuItem>

          <!-- Level 4 -->
          <SubMenu #yearSub="ngMenu">
            <MenuItem value="…/2024/Q1">Q1</MenuItem>
            <MenuItem value="…/2024/Q2">Q2</MenuItem>
          </SubMenu>
        </SubMenu>
      </SubMenu>
    </SubMenu>
  </MenuContent>
</Menu>
```

Each `SubMenu` is a **sibling** of the `MenuItem` that opens it (`[submenu]="ref"` with `#ref="ngMenu"`), never a child. See the mental model in the README.

## Automatic positioning (Floating UI)

You never set coordinates by hand. The root menu and every submenu are positioned by [`@floating-ui/dom`](https://floating-ui.com/) with `autoUpdate`, so each panel follows its anchor on scroll and resize:

- **Root menu** — anchored to the trigger with `offset(4)`, default placement `bottom` (`bottom-start` in the demos).
- **Submenus** — anchored to their parent item with `offset(8)`, default placement `right-start`.
- **`flip()`** — when there isn't room on the preferred side (e.g. a submenu near the right edge of the viewport), the panel flips to the opposite side.
- **`shift()`** — nudges the panel along its axis so it stays fully on-screen.

Open the deeply-nested demo above near a window edge and watch levels flip from right to left on their own. To force a preferred side on a specific submenu, use `placement` (next section).

## Placement

`SubMenu.placement` accepts any [`Placement`](https://floating-ui.com/docs/computePosition#placement) from `@floating-ui/dom`. Defaults to `right-start`. Same input name as `Menu.placement` for consistency.

<demo-menu-position></demo-menu-position>

```html
<Menu>
  <MenuContent>
    <MenuItem value="theme" [submenu]="themeSub">Theme</MenuItem>

    <SubMenu #themeSub="ngMenu" placement="left-start">
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
      <MenuItem value="system">System</MenuItem>
    </SubMenu>
  </MenuContent>
</Menu>
```

## Custom styles

The `class` input on each component is merged with the default classes through `cn()` — `tailwind-merge` resolves conflicts (e.g. `w-80` replaces `w-60`).

<demo-menu-styled></demo-menu-styled>

```html
<Menu class="w-72 bg-slate-900 text-white border-slate-700">
  <MenuContent>
    <MenuItem class="hover:bg-slate-800" value="profile">Profile</MenuItem>
    <MenuItem class="hover:bg-slate-800" value="settings">Settings</MenuItem>
    <div class="dialog-sep"></div>
    <MenuItem class="text-red-400 hover:bg-red-900/20" value="logout">
      Sign out
    </MenuItem>
  </MenuContent>
</Menu>
```

## Typed values

`Menu<V>` is generic — if your `value`s are a union, the `(itemSelected)` handler is correctly typed.

<demo-menu-typed></demo-menu-typed>

```typescript
type Action = "edit" | "duplicate" | "delete";

@Component({
  template: `
    <Menu (itemSelected)="onAction($event)">
      <MenuContent>
        <MenuItem value="edit">Edit</MenuItem>
        <MenuItem value="duplicate">Duplicate</MenuItem>
        <MenuItem value="delete">Delete</MenuItem>
      </MenuContent>
    </Menu>
  `
})
export class RowActions {
  onAction(value: Action) {
    // value is typed as Action
  }
}
```

## Wrap + typeahead

`[wrap]="true"` makes focus loop back to the first item after the last. `[typeaheadDelay]` controls the keyboard buffer window (in ms).

> ⚠️ **Typeahead is non-functional in Angular 21** (developer preview). The input is exposed in anticipation of the future API, but typing does nothing today.

<demo-menu-wrap></demo-menu-wrap>

```html
<Menu [wrap]="true" [typeaheadDelay]="800">
  <MenuContent>
    <MenuItem value="apple">Apple</MenuItem>
    <MenuItem value="banana">Banana</MenuItem>
    <MenuItem value="cherry">Cherry</MenuItem>
    <MenuItem value="date">Date</MenuItem>
  </MenuContent>
</Menu>
```

## Keyboard shortcuts

All shortcuts below are handled automatically by `@angular/aria/menu`.

| Key                       | Behavior                                                                                        |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| `↓` / `↑`                 | Navigate between items (disabled items are skipped).                                            |
| `Home` / `End`            | First / last item.                                                                              |
| `Enter` / `Space`         | Select the current item and close the menu.                                                     |
| `Escape`                  | Close the current menu (submenu or root).                                                       |
| `→` (LTR)                 | Open a submenu and focus its first item.                                                        |
| `←` (LTR)                 | Return to the parent menu from a submenu.                                                       |
| `a`–`z`                   | **Typeahead** — focus the first item whose label starts with the typed sequence. ⚠️ non-functional in Angular 21. |
| `Tab`                     | Leave the menu and close the popover.                                                           |

## API Reference

### MenuComponent

| Input            | Type                      | Default          | Description                                                                |
| ---------------- | ------------------------- | ---------------- | -------------------------------------------------------------------------- |
| `wrap`           | `boolean`                 | `false`          | Loop focus from last item back to first.                                   |
| `typeaheadDelay` | `number` (ms)             | `500`            | Window for the keyboard typeahead buffer. *(non-functional in Angular 21)* |
| `placement`      | `Placement`               | `"bottom-start"` | Popover placement relative to the trigger.                                 |
| `class`          | `string`                  | —                | Extra classes — merged via `tailwind-merge`.                               |

| Output         | Payload | Description                                  |
| -------------- | ------- | -------------------------------------------- |
| `itemSelected` | `V`     | Emits the `value` of the selected `MenuItem`. |

### MenuItemComponent

| Input      | Type      | Default        | Description                                                       |
| ---------- | --------- | -------------- | ----------------------------------------------------------------- |
| `value`    | `V`       | —              | Value emitted on selection. Drives the generic on `Menu<V>`.     |
| `disabled` | `boolean` | `false`        | Skip this item in keyboard navigation and block selection.       |
| `submenu`  | `SubMenu` | —              | Bind a submenu — typically `[submenu]="ref"` with `#ref="ngMenu"`. |
| `role`     | `"menuitem" \| "menuitemcheckbox" \| "menuitemradio"` | `"menuitem"` | A checkbox/radio item toggles a state and keeps the menu open. |
| `checked`  | `boolean` | —              | Renders `aria-checked`. Only meaningful with a checkbox/radio `role`; omitted, the attribute is absent. |
| `class`    | `string`  | —              | Extra classes — merged via `tailwind-merge`.                      |

### SubMenuComponent

| Input       | Type        | Default         | Description                                  |
| ----------- | ----------- | --------------- | -------------------------------------------- |
| `placement` | `Placement` | `"right-start"` | Placement relative to the parent item.       |
| `class`     | `string`    | —               | Extra classes — merged via `tailwind-merge`. |

### MenuTriggerDirective

| Input         | Type            | Description                                                                       |
| ------------- | --------------- | --------------------------------------------------------------------------------- |
| `menuTrigger` | `MenuComponent` | The menu to open. Bind via `[menuTrigger]="ref"` with `#ref="menu"` on the menu. |
