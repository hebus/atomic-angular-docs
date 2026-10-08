# Sidebar (/docs/galactik/navigation/sidebar)

An app navigation panel — collapsible to an icon rail on desktop, a native-dialog drawer below the mobile breakpoint — with no rail and no nested submenus.



`Sidebar` is an app navigation panel: collapsible to icons on desktop, a native `<dialog>` drawer
([`Sheet`](../overlay/sheet.mdx)) below the mobile breakpoint. It covers the common case — no rail, no nested
submenus, no skeleton loading — with a real focusable trigger, a genuinely modal mobile drawer, and item labels
that stay in the accessibility tree once the panel goes icon-only.

## Minimal example [#minimal-example]

<CodeSample id="sidebar-basic" title="An app shell with a collapsible sidebar">
  <Lang value="angular">
    ```ts title="app-shell.component.ts"
    import { Component, signal } from "@angular/core";
    import {
      SidebarComponent,
      SidebarHeaderDirective,
      SidebarContentDirective,
      SidebarGroupDirective,
      SidebarItemDirective,
      SidebarItemLabelDirective,
      SidebarTriggerDirective,
      PanelLeftIcon,
      HouseIcon,
      FileSearchIcon,
    } from "@sinequa/galactik";

    @Component({
      selector: "app-shell",
      imports: [
        SidebarComponent,
        SidebarHeaderDirective,
        SidebarContentDirective,
        SidebarGroupDirective,
        SidebarItemDirective,
        SidebarItemLabelDirective,
        SidebarTriggerDirective,
        PanelLeftIcon,
        HouseIcon,
        FileSearchIcon,
      ],
      template: `
        <div class="flex h-dvh">
          <Sidebar [(collapsed)]="collapsed" aria-label="Main navigation">
            <div sidebarHeader class="flex-row items-center justify-between">
              <span class="group-data-[collapsed=true]:sr-only">Sinequa</span>
              <button sidebarTrigger type="button" [attr.aria-label]="collapsed() ? 'Expand navigation' : 'Collapse navigation'">
                <PanelLeftIcon />
              </button>
            </div>
            <nav sidebarContent aria-label="Main navigation">
              <div sidebarGroup>
                <a sidebarItem routerLink="/home">
                  <HouseIcon />
                  <span sidebarItemLabel>Home</span>
                </a>
                <a sidebarItem routerLink="/search">
                  <FileSearchIcon />
                  <span sidebarItemLabel>Search</span>
                </a>
              </div>
            </nav>
          </Sidebar>
          <main class="flex-1 overflow-auto"><router-outlet /></main>
        </div>
      `,
    })
    export class AppShellComponent {
      collapsed = signal(false);
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`Sidebar` renders as a native `<aside>` on desktop, and swaps to a [`Sheet`](../overlay/sheet.mdx) anchored to
`side()` below the 768px breakpoint (via [`BreakpointObserverService`](../integration/breakpoint-observer.mdx))
— projecting the exact same `sidebarHeader`/`sidebarContent`/`sidebarFooter` content either way, nothing to
branch on in application code.

<Mermaid
  chart="flowchart TD
    Breakpoint[(&#x22;BreakpointObserverService&#x22;)] -- isMobile --> Sidebar[SidebarComponent]
    Sidebar -- provides --> Ref((&#x22;SIDEBAR_REF&#x22;))
    Trigger[SidebarTriggerDirective] -- injects --> Ref
    Trigger -- click --> Toggle[[&#x22;toggle()&#x22;]]
    Toggle -- isMobile true --> Sheet[[&#x22;Sheet.open()/close()&#x22;]]
    Toggle -- isMobile false --> Collapsed((&#x22;collapsed model&#x22;))
    Sidebar -- isMobile true --> SheetComp[Sheet]
    Sidebar -- isMobile false --> Aside[&#x22;&lt;aside&gt;&#x22;]
    SheetComp --> Content[[&#x22;sidebarHeader / sidebarContent / sidebarFooter&#x22;]]
    Aside --> Content
    Content --> Item[SidebarItemDirective]
    Item -- aria-current --> RouterLinkActive[(&#x22;routerLinkActive&#x22;)]"
/>

The mobile drawer starts closed, and its entire content — including a trigger placed inside `sidebarHeader` —
lives inside it. Below the breakpoint there is nothing on screen to open it from unless the app keeps a
**second** trigger outside the `<Sidebar>` (its own top bar, typically), passed the panel explicitly since it
cannot resolve `SIDEBAR_REF` through DI from outside:

<CodeSample id="sidebar-mobile-trigger" title="A second trigger outside the panel, for the mobile drawer">
  <Lang value="angular">
    ```html title="app-shell.component.html" partial
    <button sidebarTrigger [sidebar]="sidebar" type="button" aria-label="Open navigation">
      <BarsIcon />
    </button>

    <Sidebar #sidebar="sidebar" aria-label="Main navigation">
      <!-- sidebarHeader / sidebarContent / sidebarFooter -->
    </Sidebar>
    ```
  </Lang>
</CodeSample>

The mobile drawer reuses `Sheet` unmodified — focus trap, `Escape`-to-close, focus restoration and the
`::backdrop` all come from the native `<dialog>` + `showModal()` — sized to the full viewport width (a fixed
`Sheet` width can otherwise push the in-header trigger off-screen on a narrow phone) and painted with the same
`--sidebar`/`--sidebar-foreground` tokens as the desktop panel, so a themed app gets a matching drawer with no
extra work.

## Recipes [#recipes]

### Trailing badge and disabled item [#trailing-badge-and-disabled-item]

A trailing [`Badge`](../display/badge.mdx) is pinned to the end of an item and dropped automatically once the
sidebar is icon-only — there is no room next to a bare icon for a pill.

```html
<a sidebarItem routerLink="/notifications">
  <BellIcon />
  <span sidebarItemLabel>Notifications</span>
  <badge size="xs">3</badge>
</a>

<a sidebarItem href="#" disabled>
  <CogIcon />
  <span sidebarItemLabel>Locked setting</span>
</a>
```

`disabled` reflects `aria-disabled="true"` and sets `tabindex="-1"` — the same contract as
[`Link`](./link.mdx)'s own `disabled`.

### `inset` and `floating` variants [#inset-and-floating-variants]

`variant="inset"` draws no border or fill on `Sidebar` itself; the encased look comes from `sidebarInset` on
the app's main content wrapper instead, which supplies the surface. `variant="floating"` needs no companion
element — it detaches with a margin, border and shadow of its own, and reserves **no** layout space, ever,
floating on top of whatever sibling content follows it.

<CodeSample id="sidebar-inset" title="The inset variant, paired with sidebarInset">
  <Lang value="angular">
    ```html title="app-shell.component.html" partial
    <div class="flex gap-2 p-2">
      <Sidebar variant="inset" aria-label="Main navigation">
        <div sidebarHeader>Sinequa</div>
        <nav sidebarContent aria-label="Main navigation">
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
  </Lang>
</CodeSample>

`floating`/`inset` collapse differently from the default `sidebar` variant: instead of narrowing to an icon
rail, the *whole* panel slides off-screen (and is marked `inert` while hidden, so its own header trigger
cannot still be reached by keyboard). An app using either variant with collapse therefore needs a **third**
trigger placed outside the `<Sidebar>`, shown only while `collapsed()` is true.

### Reading the collapsed state from a projected component [#reading-the-collapsed-state-from-a-projected-component]

A component projected inside `sidebarHeader`/`sidebarContent`/`sidebarFooter` reads the panel's own state by
injecting `SIDEBAR_REF` — the same token `SidebarTriggerDirective` itself resolves through.

<CodeSample id="sidebar-status" title="A status dot reflecting collapsed / expanded / mobile-open">
  <Lang value="angular">
    ```ts title="sidebar-status.component.ts"
    import { Component, computed, inject } from "@angular/core";
    import { SIDEBAR_REF } from "@sinequa/galactik";

    @Component({
      selector: "app-sidebar-status",
      template: `<span [class]="dotClass()" aria-hidden="true" [title]="label()"></span>`,
    })
    export class SidebarStatusComponent {
      private readonly sidebar = inject(SIDEBAR_REF, { optional: true });

      protected readonly label = computed(() => {
        const sidebar = this.sidebar;
        if (!sidebar) return "";
        if (sidebar.isMobile()) return sidebar.expanded() ? "Drawer open" : "Drawer closed";
        return sidebar.collapsed() ? "Collapsed" : "Expanded";
      });

      protected readonly dotClass = computed(() => "size-2 rounded-full bg-(--bg-neutral-muted)");
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  collapsed: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Collapsed/expanded, two-way bindable. No persistence of its own.&#x22; },
  side: { type: '&#x22;left&#x22; | &#x22;right&#x22;', default: '&#x22;left&#x22;', description: &#x22;Edge the panel is anchored to, desktop and mobile alike.&#x22; },
  variant: { type: '&#x22;sidebar&#x22; | &#x22;floating&#x22; | &#x22;inset&#x22;', default: '&#x22;sidebar&#x22;', description: &#x22;Visual treatment — see Recipes above.&#x22; },
  &#x22;aria-label&#x22;: { type: &#x22;string | undefined&#x22;, description: &#x22;Accessible name of the panel — the <aside>'s, and the mobile <dialog>'s only name. No default.&#x22; },
}"
/>

### `SidebarTriggerDirective` [#sidebartriggerdirective]

<TypeTable
  type="{
  &#x22;aria-label&#x22;: { type: &#x22;string | undefined&#x22;, description: &#x22;Accessible name of the button — usually its only one, being icon-only. No default.&#x22; },
  sidebar: { type: &#x22;SidebarRef | undefined&#x22;, description: &#x22;The <Sidebar> to control, when this button isn't projected inside one.&#x22; },
}"
/>

`SidebarTriggerDirective` also reflects `aria-expanded` on its host, bound to the resolved sidebar's
`expanded()` signal — a screen reader announces whether activating it opens or closes the panel, whichever
viewport applies.

### `SIDEBAR_REF` [#sidebar_ref]

An `InjectionToken<SidebarRef>` a `<Sidebar>` provides for anything projected into it, exposing `collapsed`,
`isMobile`, `expanded` (all `Signal<boolean>`) and `toggle()`/`open()`/`close()` — the last three branch on
`isMobile()` automatically (desktop collapse vs. the mobile drawer).

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A Menu/Popover/Dialog projected into the sidebar opens toward the sidebar's own edge instead of out into the page">
    Fixed in the current component, but worth knowing why it happened: `<aside>` used to carry an
    always-active `translateX(0)`. Per the CSS Transforms spec, **any** transform value other than `none` —
    including one that moves nothing — establishes a new containing block for `position: fixed`/`absolute`
    descendants. A `Menu`/`Popover`/`Dialog` projected into `sidebarContent`/`sidebarFooter` is exactly such a
    descendant, and floating-ui still measures the *real* viewport for its placement decisions — so the
    computed placement gets applied against the wrong containing block, commonly looking like it "flipped" to
    the wrong side no matter which `placement` was requested. If you see this with a custom fork or an older
    version, check that the transform resolves to the literal keyword `none` whenever no slide is in progress.
  </Accordion>

  <Accordion title="A CSS custom property the panel reads through var() never resolves">
    `--sidebar-width`/`--sidebar-width-icon` must be declared on `SidebarComponent`'s own host (an ancestor of
    the reserved-width slot), never only on the `<aside>` it visually applies to — CSS custom properties only
    ever inherit downward, and the slot `<div>` is `<aside>`'s **parent**. Declaring a variable only on a
    descendant leaves an ancestor's own `var()` reference unresolved. The general rule: before reading a custom
    property through `var()` on element A, make sure it is declared on A itself or one of A's actual ancestors.
  </Accordion>

  <Accordion title="No lowercase/kebab-case alias for Sidebar itself">
    Unlike most galactik roots, `Sidebar` has no `sidebar`/`sidebar` lowercase alias — `@sinequa/ui` also exports a
    `SidebarComponent` whose selector is exactly `sidebar`, and two components matching the same element is a
    compile error. Use the exact `Sidebar` PascalCase tag.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Sheet" href="../overlay/sheet.mdx">
    The modal panel the mobile drawer reuses unmodified.
  </Card>

  <Card title="BreakpointObserverService" href="../integration/breakpoint-observer.mdx">
    The service that decides when Sidebar swaps to its mobile drawer.
  </Card>

  <Card title="Link" href="./link.mdx">
    The same native aria-current contract SidebarItem follows.
  </Card>
</Cards>
