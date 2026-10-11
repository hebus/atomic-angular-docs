# Sidebar

App navigation panel: collapsible to icons on desktop, a native `<dialog>` drawer (`Sheet`) below the mobile breakpoint. Covers the common case — no rail, no nested submenus, no skeleton — while fixing the accessibility gaps that case never had: a real focusable trigger, a native modal drawer on mobile, and item labels that stay in the accessibility tree even once the panel is icon-only.

## Basic usage

Items are real anchors (`a[sidebarItem]`), not an element-tag component standing in for one — they compose with `routerLink`/`routerLinkActive` exactly like any other link. The trigger button resolves the `<Sidebar>` it belongs to through DI, no explicit binding needed, as long as it sits somewhere inside that sidebar's projected content.

<demo-sidebar-galactik-basic></demo-sidebar-galactik-basic>

```html
<Sidebar [(collapsed)]="collapsed" aria-label="Navigation principale">
  <div sidebarHeader>
    <span class="group-data-[collapsed=true]:sr-only">Sinequa</span>
    <button sidebarTrigger type="button" [attr.aria-label]="collapsed() ? 'Expand' : 'Collapse'">
      <PanelLeftIcon />
    </button>
  </div>
  <nav sidebarContent aria-label="Navigation principale">
    <div sidebarGroup>
      <span sidebarGroupLabel>General</span>
      <a sidebarItem routerLink="/home" routerLinkActive [ariaCurrentWhenActive]="'page'">
        <HouseIcon />
        <span sidebarItemLabel>Home</span>
      </a>
      <a sidebarItem routerLink="/search">
        <FileSearchIcon />
        <span sidebarItemLabel>Search</span>
      </a>
    </div>
    <div sidebarGroup>
      <span sidebarGroupLabel>Alerts</span>
      <a sidebarItem routerLink="/notifications">
        <BellIcon />
        <span sidebarItemLabel>Notifications</span>
        <badge size="xs">3</badge>
      </a>
    </div>
  </nav>
  <div sidebarFooter>
    <a sidebarItem routerLink="/account">
      <UserIcon />
      <span sidebarItemLabel>Account</span>
    </a>
  </div>
</Sidebar>
```

## Multiple scrollable zones

`Sidebar` projects *every* element carrying `sidebarContent`, not just the first one — put two side by side and each becomes its own independently scrolling region, no library change needed. The demo below has a tall main nav (`flex-1`, takes whatever room is left) and a short pinned one below it (`flex-none basis-32`, its own `border-t` to read as a distinct panel) — scroll one without moving the other.

<demo-sidebar-galactik-multi-content></demo-sidebar-galactik-multi-content>

```html
<Sidebar [(collapsed)]="collapsed" aria-label="Navigation principale">
  <div sidebarHeader>...</div>
  <nav sidebarContent aria-label="Navigation principale">
    <!-- as many groups as the app needs — this one grows/scrolls to fill the space left over -->
  </nav>
  <nav sidebarContent aria-label="Pinned" class="flex-none basis-32 border-t border-(--layer-page-edge)">
    <div sidebarGroup>
      <span sidebarGroupLabel>Pinned</span>
      <a sidebarItem routerLink="/recent">
        <ClockIcon />
        <span sidebarItemLabel>Recently viewed</span>
      </a>
    </div>
  </nav>
</Sidebar>
```

Nothing but `class` sets the split here — an equal 50/50 share needs no override at all (`sidebarContent`'s own base style is already `flex-1`), and a third zone works the same way, just another sibling `<nav sidebarContent>`.

## Collapsed mode

Collapsing never removes an accessible name from the DOM: `sidebarItemLabel` and `sidebarGroupLabel` go `sr-only`, not `hidden` — a screen-reader user still hears them even though sighted users only see icons. A trailing `<badge>` is dropped instead (no room next to a bare icon for a pill), and an item's own icon centers itself in the rail once its label is out of the flow. Any other text you put in `sidebarHeader`/`sidebarFooter` yourself (an app name next to a logo, say) needs the same `group-data-[collapsed=true]:sr-only` class added by hand — the icon rail has no room for it either, and the component doesn't know it's there to hide it for you.

Resize the browser window (not just this demo box — the breakpoint reads the actual viewport) below 768px to see the same `<Sidebar>` render as a native `<dialog>` drawer (`Sheet`) instead — same markup, no extra code on your side.

## Mobile drawer

The drawer starts closed, and its whole content — including a trigger placed inside `sidebarHeader` — lives inside it. Below the breakpoint there is therefore nothing on screen to open it from unless the app keeps a _second_ trigger **outside** the `<Sidebar>` (its own top bar, typically). That trigger cannot resolve the sidebar through DI, since it isn't a descendant of it — pass it explicitly instead, through the `#ref="sidebar"` template reference `Sidebar` exports (this is exactly what the demo above does, in a bar shown only below the 768px breakpoint):

```html
<button sidebarTrigger [sidebar]="sidebar" type="button" aria-label="Open navigation">
  <BarsIcon />
</button>

<Sidebar #sidebar="sidebar" aria-label="Main navigation">
  <!-- sidebarHeader / sidebarContent / sidebarFooter -->
</Sidebar>
```

## Recommended pattern

Putting the above together, this is the whole shape an app shell needs — one `<Sidebar>`, a trigger inside its header for the desktop collapse, and a second trigger outside it (in the app's own top bar, say) that only ever matters below the mobile breakpoint:

```html
<div class="app-shell">
  <!-- App's own top bar. This trigger only ever does anything below 768px — above it, Sidebar is
       mounted as the desktop <aside>, which the in-header trigger below already controls, so hiding
       this one on desktop (md:hidden) avoids offering a second, redundant, do-nothing button. -->
  <header class="flex items-center gap-2 md:hidden">
    <button sidebarTrigger [sidebar]="sidebar" type="button" aria-label="Open navigation">
      <BarsIcon />
    </button>
    <span>My App</span>
  </header>

  <div class="flex flex-1">
    <Sidebar #sidebar="sidebar" [(collapsed)]="collapsed" aria-label="Main navigation">
      <div sidebarHeader>
        <img src="logo.svg" alt="" />
        <!-- Resolves this Sidebar through DI (SIDEBAR_REF) — no [sidebar] binding needed here,
             unlike the one above: this button is projected INSIDE the Sidebar it controls. -->
        <button sidebarTrigger type="button" [attr.aria-label]="collapsed() ? 'Expand navigation' : 'Collapse navigation'">
          <PanelLeftIcon />
        </button>
      </div>
      <nav sidebarContent aria-label="Main navigation">
        <div sidebarGroup>
          <a sidebarItem routerLink="/home" routerLinkActive [ariaCurrentWhenActive]="'page'">
            <HouseIcon />
            <span sidebarItemLabel>Home</span>
          </a>
        </div>
      </nav>
    </Sidebar>
    <main class="flex-1"><router-outlet /></main>
  </div>
</div>
```

Using `variant="inset"` or `variant="floating"` instead of the default? Add a **third** trigger, outside the `<Sidebar>` like the mobile one, but shown only while `collapsed()` is `true` — see [Variants](#variants) below for why, and for that trigger's exact markup.

## Variants

`side="right"` anchors the panel — and the mobile drawer — to the opposite edge, for any of the three below.

**Collapsing behaves differently by variant.** `variant="sidebar"` (the first demo above) narrows to an icon rail when collapsed — still visible, still usable. `inset` and `floating` instead slide the *whole* panel off-screen: nothing narrows, the panel disappears entirely (and is made `inert` while it is, so it can't be reached by keyboard either). The trigger inside `sidebarHeader` disappears right along with the panel, so re-opening it needs a *second* trigger placed **outside** the `<Sidebar>` — shown only while collapsed (`@if (collapsed())`), positioned absolutely where the panel used to be. Every demo below also carries the same mobile bar as the [basic usage](#basic-usage) one, above — resize your browser window below 768px to see each render as the drawer instead.

### inset

`variant="inset"` draws no border, and no fill, of its own — it sits directly on the page background; the app's main content wrapper (tagged `sidebarInset`) gets the encased look instead.

<demo-sidebar-galactik-inset></demo-sidebar-galactik-inset>

```html
<div class="relative flex gap-2 p-2">
  @if (collapsed()) {
    <button sidebarTrigger [sidebar]="sidebar" type="button" aria-label="Expand navigation" class="absolute top-2 left-2 z-10">
      <PanelLeftIcon />
    </button>
  }
  <Sidebar #sidebar="sidebar" variant="inset" [(collapsed)]="collapsed" aria-label="Navigation principale">
    <div sidebarHeader>
      Sinequa
      <button sidebarTrigger type="button" aria-label="Collapse navigation">
        <PanelLeftIcon />
      </button>
    </div>
    <nav sidebarContent aria-label="Navigation principale">
      <div sidebarGroup>
        <a sidebarItem routerLink="/home">
          <HouseIcon />
          <span sidebarItemLabel>Home</span>
        </a>
      </div>
    </nav>
  </Sidebar>
  <main sidebarInset>App content</main>
</div>
```

### floating

`variant="floating"` keeps its own surface tone, but — unlike `sidebar`/`inset` — reserves **no** layout space at all, expanded or collapsed: it floats on top of `<main>` instead of sharing the row with it. The frame's own padding is what makes it read as nested inside the content's page margin rather than floating flush against the raw outer edge.

<demo-sidebar-galactik-floating></demo-sidebar-galactik-floating>

```html
<div class="relative flex p-4">
  @if (collapsed()) {
    <button sidebarTrigger [sidebar]="sidebar" type="button" aria-label="Expand navigation" class="absolute top-4 left-4 z-10">
      <PanelLeftIcon />
    </button>
  }
  <!-- Sidebar's slot reserves 0 width — it must still come BEFORE <main> in DOM order so the
       absolutely-positioned panel renders at the frame's left edge, where <main> also starts. -->
  <Sidebar #sidebar="sidebar" variant="floating" [(collapsed)]="collapsed" aria-label="Navigation principale">
    <div sidebarHeader>
      Sinequa
      <button sidebarTrigger type="button" aria-label="Collapse navigation">
        <PanelLeftIcon />
      </button>
    </div>
    <nav sidebarContent aria-label="Navigation principale">
      <div sidebarGroup>
        <a sidebarItem routerLink="/home">
          <HouseIcon />
          <span sidebarItemLabel>Home</span>
        </a>
      </div>
    </nav>
  </Sidebar>
  <main>App content</main>
</div>
```

### floating, before it became an overlay (comparison)

For comparison, here is what this component's `floating` looked like before it became an overlay: a detached, rounded, shadowed card that still reserved its width (pushing `<main>` over) AND slid fully off-screen when collapsed. That combination — reserves space, slides away entirely — is exactly what `variant="inset"` already does; only its bare, no-fill/no-border look differs. Reproduced here through `variant="inset"` + plain `class` putting a fill, a border and a shadow back — a real, supported combination, not a separate mode:

<demo-sidebar-galactik-floating-legacy></demo-sidebar-galactik-floating-legacy>

```html
<div class="relative flex gap-4 p-4">
  @if (collapsed()) {
    <button sidebarTrigger [sidebar]="sidebar" type="button" aria-label="Expand navigation" class="absolute top-4 left-4 z-10">
      <PanelLeftIcon />
    </button>
  }
  <Sidebar #sidebar="sidebar" variant="inset" [(collapsed)]="collapsed" class="m-2 rounded-lg border bg-(--layer-page-layer) shadow-lg" aria-label="Navigation principale">
    <div sidebarHeader>
      Sinequa
      <button sidebarTrigger type="button" aria-label="Collapse navigation">
        <PanelLeftIcon />
      </button>
    </div>
    <nav sidebarContent aria-label="Navigation principale">
      <div sidebarGroup>
        <a sidebarItem routerLink="/home">
          <HouseIcon />
          <span sidebarItemLabel>Home</span>
        </a>
      </div>
    </nav>
  </Sidebar>
  <main>App content</main>
</div>
```

### side="right"

Anchors the panel — and the mobile drawer — to the opposite edge. Shown here on the default `variant="sidebar"`, which is the only one of the three where it makes a visible difference on its own (an icon rail collapses on the right instead of the left); `inset`/`floating` accept it identically.

<demo-sidebar-galactik-right></demo-sidebar-galactik-right>

```html
<div class="flex">
  <main>App content</main>
  <Sidebar side="right" aria-label="Navigation principale">
    <div sidebarHeader>Sinequa</div>
    <nav sidebarContent aria-label="Navigation principale">
      <div sidebarGroup>
        <a sidebarItem routerLink="/home">
          <HouseIcon />
          <span sidebarItemLabel>Home</span>
        </a>
      </div>
    </nav>
  </Sidebar>
</div>
```

## Theming

Every colour the panel renders — and its corner rounding — reads through a CSS custom property with a fallback to the galactik token it defaults to — declare the variable (on `<Sidebar>` itself, or any ancestor) to override just that one aspect of the rendering; leave it undeclared and nothing changes. Below, a brand palette that has nothing to do with any galactik token, plus a much larger radius on both the panel and its items — 13 custom properties set directly as an inline style on `<Sidebar>`, nothing else touched:

<demo-sidebar-galactik-custom-theme></demo-sidebar-galactik-custom-theme>

```html
<Sidebar
  variant="floating"
  style="
    --sidebar: #f5f3ff;
    --sidebar-foreground: #4c1d95;
    --sidebar-border: #ddd6fe;
    --sidebar-accent: #ede9fe;
    --sidebar-accent-foreground: #4c1d95;
    --sidebar-accent-pressed: #ddd6fe;
    --sidebar-active: #7c3aed;
    --sidebar-active-foreground: #ffffff;
    --sidebar-ring: #7c3aed;
    --sidebar-radius: 1.5rem;
    --sidebar-item-radius: 9999px;
    --sidebar-group-label: #a78bfa;
    --sidebar-disabled: #c4b5fd;
  ">
  ...
</Sidebar>
```

`variant="floating"` is what actually gives the panel a visible outer corner for `--sidebar-radius` to round — `sidebar`/`inset` sit flush against the edge, nothing there to shape.

| Variable | Default | Styles |
| --- | --- | --- |
| `--sidebar-width` | `16rem` | Panel width, expanded |
| `--sidebar-width-icon` | `3.5rem` | Panel width, collapsed (`variant="sidebar"` icon rail) |
| `--sidebar-radius` | `--radius-lg` | Corner rounding — `variant="floating"` panel, and `sidebarInset` |
| `--sidebar-item-radius` | `--radius-sm` | Corner rounding of an item row |
| `--sidebar` | `--layer-page-layer` | Panel background |
| `--sidebar-foreground` | `--layer-page-font` (panel), `--font-neutral-base` (item) | Panel and item text colour |
| `--sidebar-border` | `--layer-page-edge` | Panel border (`side`, `floating`), footer border |
| `--sidebar-accent` | `--bg-primary-lighter` | Item background on hover |
| `--sidebar-accent-foreground` | `--font-neutral-base` | Item text on hover/press |
| `--sidebar-accent-pressed` | `--bg-primary-light` | Item background on press (mousedown) |
| `--sidebar-active` | `--bg-primary-light` | Current-page item background (`aria-current="page"`) |
| `--sidebar-active-foreground` | `--font-primary-base` | Current-page item text |
| `--sidebar-ring` | `--stroke-focus` | Item focus ring |
| `--sidebar-group-label` | `--font-neutral-muted` | `sidebarGroupLabel` text colour |
| `--sidebar-disabled` | `--font-neutral-disabled` | Disabled item text colour (`aria-disabled`) |

Override any of them on `<Sidebar>` (or an ancestor) to restyle it without touching galactik's own tokens. A few are worth knowing about:

- `--sidebar-accent-pressed`. Hover and press are two separate variables: a lighter hover (`--sidebar-accent`) and a slightly stronger press. Overriding the hover colour alone therefore leaves the press colour untouched, so override both for a consistent theme.
- `--sidebar-radius`/`--sidebar-item-radius`. `--sidebar-radius` drives BOTH `variant="floating"`'s own rounding and `sidebarInset`'s — one variable for what reads as one visual corner. `--sidebar-item-radius` is deliberately separate: a value that looks right on the whole panel would round a compact item row into more of a pill than a rectangle, so items get their own, smaller default.
- `--sidebar-group-label`. A dedicated colour for `sidebarGroupLabel`, not a percentage of `--sidebar-foreground`: the label's default (`--font-neutral-muted`) and the panel's text default are two different colours, so each stays independently overridable.
- `--sidebar-disabled`. The text colour of a disabled item (`aria-disabled`). Without it, a custom brand palette overriding every other `--sidebar-*` variable would still leave a disabled item in a plain galactik grey unrelated to the rest of the theme.

## Reading the collapsed state from a child component

A component projected inside `sidebarHeader`/`sidebarContent`/`sidebarFooter` — the status widget in the footer below, in this case — can read whether the panel it lives in is collapsed or expanded by injecting `SIDEBAR_REF` (optional: a component built to be reusable shouldn't throw just because someone drops it outside a `<Sidebar>` by mistake). It exposes the same `collapsed`/`isMobile`/`expanded` signals and `toggle()`/`open()`/`close()` methods `SidebarTriggerDirective` itself resolves through — no explicit binding needed, as long as the component sits somewhere inside the `<Sidebar>` it belongs to:

<demo-sidebar-galactik-state-aware></demo-sidebar-galactik-state-aware>

```ts
import { Component, computed, inject } from "@angular/core";
import { SIDEBAR_REF } from "@sinequa/galactik";

@Component({
  selector: "app-sidebar-status",
  template: `
    <span [class]="dotClass()" aria-hidden="true" [title]="label()"></span>
    <span class="group-data-[collapsed=true]:sr-only">{{ label() }}</span>
  `
})
export class SidebarStatusComponent {
  private readonly sidebar = inject(SIDEBAR_REF, { optional: true });

  protected readonly label = computed(() => {
    const sidebar = this.sidebar;
    if (!sidebar) return "";
    if (sidebar.isMobile()) return sidebar.expanded() ? "Drawer open" : "Drawer closed";
    return sidebar.collapsed() ? "Collapsed" : "Expanded";
  });

  protected readonly dotClass = computed(() => {
    const sidebar = this.sidebar;
    if (!sidebar) return "size-2 rounded-full bg-(--bg-neutral-muted)";
    if (sidebar.isMobile()) return sidebar.expanded() ? "size-2 rounded-full bg-(--bg-info-base)" : "size-2 rounded-full bg-(--bg-neutral-muted)";
    return sidebar.collapsed() ? "size-2 rounded-full bg-(--bg-neutral-muted)" : "size-2 rounded-full bg-(--bg-success-base)";
  });
}
```

Two things render, on purpose, rather than one — each covers what the other can't:

- The **dot never disappears**, collapsed or not: it's icon-sized, so unlike a line of text it costs nothing to keep visible in a 56px rail. Its color is what genuinely needs DI rather than CSS: it has three states (desktop expanded, desktop collapsed, mobile drawer open), and a pure-CSS `group-data-[…]` selector only ever has one boolean to react to — `data-collapsed` doesn't exist at all once the panel renders as the mobile drawer instead of the desktop `<aside>`.
- The **label goes `sr-only` once collapsed** — pure CSS this time (`group-data-[collapsed=true]:sr-only`), the exact same convention `sidebarItemLabel`/`sidebarGroupLabel` already use: a screen-reader user still hears the full sentence; a sighted one only sees the dot's color once there's no room left for one next to it.

`collapsed()` alone only ever answers the desktop question — `isMobile()`/`expanded()` are what let the same component also report the drawer's own open/closed state below the mobile breakpoint.

## API Reference

### SidebarComponent

Selector: `Sidebar`.

| Input                      | Type                                 | Default     | Description                                                                                                                                                                                        |
| -------------------------- | ------------------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `collapsed`                | `boolean` (model)                    | `false`     | Collapsed/expanded, two-way bound. No persistence of its own — bind it to whatever the app already uses (cookie, `localStorage`…).                                                                 |
| `side`                     | `"left" \| "right"`                  | `"left"`    | Edge the panel is anchored to, on desktop and for the mobile drawer.                                                                                                                               |
| `variant`                  | `"sidebar" \| "floating" \| "inset"` | `"sidebar"` | `sidebar` sits flush against the edge; `floating` detaches with a margin and a shadow; `inset` draws no border of its own — pair it with `sidebarInset` on the app's main content wrapper.         |
| `ariaLabel` (`aria-label`) | `string \| undefined`                | —           | Accessible name of the panel — the `<aside>`'s, and the only name of the mobile `<dialog>`. No default: an unset name leaves the panel without an accessible name, so set it. |
| `class`                    | `string`                             | —           | Extra classes merged into the host.                                                                                                                                                                |

Also exposes `expanded` (readonly signal — visible right now, in either mode) and `toggle()` / `open()` / `close()`, which branch on the current breakpoint automatically.

### SidebarTriggerDirective

Selector: `button[sidebarTrigger]`. No baked icon — project whatever fits. Resolves its `<Sidebar>` through DI (`SIDEBAR_REF`) when projected inside it, or through `[sidebar]` otherwise (see [Mobile drawer](#mobile-drawer)); does nothing if neither applies.

| Input                      | Type                      | Default | Description                                                                                                                      |
| -------------------------- | ------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel` (`aria-label`) | `string \| undefined`     | —       | Accessible name of the button — usually its only one, being icon-only. No default, same reasoning as `Sidebar.ariaLabel`.        |
| `sidebar`                  | `SidebarRef \| undefined` | —       | The `<Sidebar>` to control, when this button isn't projected inside one. Falls back to the DI-injected `SIDEBAR_REF` when unset. |

### Layout slots

`SidebarHeaderDirective` (`[sidebarHeader]`), `SidebarContentDirective` (`[sidebarContent]`, pose it on a `<nav>`), `SidebarFooterDirective` (`[sidebarFooter]`), `SidebarGroupDirective` (`[sidebarGroup]`), `SidebarGroupLabelDirective` (`[sidebarGroupLabel]`) — plain marker directives, `class` input only, styled centrally.

### SidebarItemDirective / SidebarItemLabelDirective

Selectors: `a[sidebarItem], button[sidebarItem]`, `[sidebarItemLabel]`.

| Input      | Type      | Default | Description                                               |
| ---------- | --------- | ------- | --------------------------------------------------------- |
| `disabled` | `boolean` | `false` | Reflects `aria-disabled="true"` and sets `tabindex="-1"`. |
| `class`    | `string`  | —       | Extra classes merged into the host.                       |

Current-page styling targets the native `aria-current="page"` attribute directly — set it yourself, or let `routerLinkActive` + `[ariaCurrentWhenActive]="'page'"` manage it, same as `LinkComponent`. A leading icon is just the first projected element; a trailing `<badge>` (galactik's own, projected as-is) is pinned to the end.

`button[sidebarItem]` is for a row that's an action rather than a navigation destination — opening a menu, a popover, a dialog. Same visual language and `disabled` handling as the `<a>` form; nothing here is link-specific, so `routerLink`/`aria-current` simply don't apply, and `type="button"`/`(click)`/`[popovertarget]`/`[menuTrigger]` stay the consumer's own responsibility (same as `sidebarTrigger` never sets `type` either):

```html
<button type="button" sidebarItem (click)="openSettings()">
  <GearIcon />
  <span sidebarItemLabel>Réglages</span>
</button>
```

### SidebarInsetDirective

Selector: `[sidebarInset]`. Pose it on the app's main content wrapper next to a `<Sidebar variant="inset">`. Supplies only the surface (background, rounding, shadow) — the margin that creates the inset look is the app's own layout.

## Notes

- Persistence of `collapsed` is deliberately left to the consuming app — galactik is presentation-only.
- The mobile drawer reuses `Sheet` as-is: focus trap, `Escape`-to-close and focus restoration all come from the platform (`<dialog>` + `showModal()`), nothing hand-rolled.
- No roving-tabindex widget semantics on the item list: a vertical nav of links is not an ARIA composite widget, and the native `Tab` order is what a keyboard user already expects here.
- **Gotcha worth generalizing**: `--sidebar-width`/`--sidebar-width-icon` live on `Sidebar`'s own host, not on the `<aside>` that actually needs them — because the slot `<div>` that reserves the panel's width in the layout is `<aside>`'s PARENT, and a custom property declared on a child is never visible to that child's own ancestor (custom properties only inherit downward). Declaring it on `<aside>` alone left the slot's own `width: var(--sidebar-width)` unresolved, and since `<aside>` is `position: absolute` (out of flow, so it doesn't contribute to the slot's shrink-to-fit size either), the slot silently collapsed to `0px` — the panel kept rendering at its own explicit width regardless, painting over whatever content had just inherited the space its sibling stopped reserving. Easy to miss in a small sandbox demo (an opaque panel background can hide the overlap by coincidence); very visible once wired into a real page. Before reading a custom property with `var()` on some element, confirm it's declared on that element or a genuine ancestor of it — never assume a sibling's or a child's declaration will reach it.

  ```html
  <!-- ❌ Broken: the PARENT ("slot") reads a variable declared on its own CHILD ("aside") -->
  <div style="width: var(--panel-width)">
    <!--     ^ parent — --panel-width was never declared here, nor above it, so this is
         invalid at computed-value time and falls back to width's initial value, `auto`. -->
    <aside class="[--panel-width:16rem]" style="width: var(--panel-width)">
      <!-- ^ child — sees its OWN declaration fine, but that never reaches the parent above -->
    </aside>
  </div>

  <!-- ✅ Fixed: declare it once, on a shared ANCESTOR of every element that reads it -->
  <div class="[--panel-width:16rem]">
    <!-- ^ ancestor — inherits downward to both elements below, `display: contents` included -->
    <div style="width: var(--panel-width)">
      <aside style="width: var(--panel-width)"></aside>
    </div>
  </div>
  ```

  This is exactly `sidebar.ts`/`sidebar.cva.ts`'s own shape: `SIDEBAR_HOST_CLASS` (the outer
  `class="[--panel-width:16rem]"` above) sits on `SidebarComponent`'s host, the slot `<div>` and the
  `<aside>` are both descendants reading the same `var()`.

- **`transform: translateX(0)` is NOT the same as no transform at all.** `<aside>` used to carry an
  ALWAYS-ACTIVE `translateX(0)` (a real bug, since fixed: `translateStyle()` now resolves to the CSS
  keyword `none` whenever no slide is actually in progress — `variant="sidebar"`, the default,
  always; any variant while expanded). Per the CSS Transforms spec, ANY `transform` value other than
  `none` establishes a NEW CONTAINING BLOCK for `position: fixed`/`absolute` descendants — even a
  value that moves nothing. A consuming app routinely projects exactly that kind of descendant
  inside `sidebarContent`/`sidebarFooter`: a `Menu`, a `Popover`, a `Dialog` (all `position: fixed`,
  positioned by floating-ui under the assumption that "fixed" means "relative to the real
  viewport"). With the old, permanent `translateX(0)`, any such element ended up positioned relative
  to the SIDEBAR'S OWN box instead — floating-ui still measures the real viewport for its
  `flip`/`shift` decisions, so the placement it computes gets applied against the wrong containing
  block and can render anywhere, commonly looking like it "flipped" to the wrong side no matter
  which `placement` was requested, with no amount of re-requesting a different `placement` fixing
  it — the actual bug was one containing-block level up, not in whatever was doing the requesting.
  Found via a `Menu`/`SubMenu` (user menu, its theme/language submenus) projected into a real app's
  sidebar footer: the submenu insisted on opening toward the sidebar's own edge, where there was no
  room, instead of out into the page.
