# Navbar Tabs

A ready-made navigation component powered by the `injectRouteNavigation` composable. It reads the Angular router configuration and stays in sync automatically — clicking a tab updates the active route and the component reacts to it.

## Imports

```ts
import { NavbarTabsComponent, injectRouteNavigation } from "@sinequa/atomic-angular";
```

## Live demo

The fully-wired example — navbar + `<router-outlet />` driven by the Angular router — lives on its own page so it can host nested child routes without conflicting with the docs page. Open [**/demo-search**](/demo-search) to interact with it: clicking a tab updates the URL and the component reacts to the active route.

```html
<div class="flex flex-col">
  <navbar-tabs path="demo-search" />
  <router-outlet />
</div>
```

## How it works — shared composable

The component calls `injectRouteNavigation(path, showCount)` during its field initialization. Each call creates independent signal instances that read from the Angular router config and the `QueryParamsStore`, so the same composable can drive any other navigation container.

```typescript
// navbar-tabs.component.ts
export class NavbarTabsComponent {
  readonly path      = input("search");
  readonly showCount = input(true, { transform: booleanAttribute });

  readonly nav = injectRouteNavigation(this.path, this.showCount);
  // nav.tabs()        → NavRouteTab[]  — all tabs from router config
  // nav.currentPath() → string         — active child route segment
  // nav.searchText()  → string         — current query text
}

```

## Route configuration

Both components read their items from the Angular router. Each child route under the base `path` declares its display data in a `data` object.

```typescript
// app.routes.ts
{
  path: "search",
  loadComponent: () => import("./search-shell.component"),
  children: [
    {
      path: "all",
      component: SearchAllComponent,
      data: { display: "All", wsQueryTab: "all", icon: "far fa-globe" }
    },
    {
      path: "documents",
      component: SearchDocumentsComponent,
      data: { display: "Documents", wsQueryTab: "documents", icon: "far fa-file-alt", queryName: "documents-query" }
    },
    {
      path: "people",
      component: SearchPeopleComponent,
      data: { display: "People", wsQueryTab: "people", icon: "far fa-user" }
    },
    { path: "", redirectTo: "all", pathMatch: "full" },
    { path: "**", redirectTo: "all" }
  ]
}
```

## `navbar-tabs` inputs

Use `path` to point the component to the right route tree. Disable `showCount` if tab search is not configured in the administration panel.

```html
<!-- Basic usage — reads routes under path="search" (default) -->
<navbar-tabs />

<!-- Custom base path -->
<navbar-tabs path="my-search" />

<!-- Hide tab counts (when tabSearch is not enabled in the admin panel) -->
<navbar-tabs [showCount]="false" />

<!-- Custom host CSS class -->
<navbar-tabs class="bg-sage-50 px-2" />
```

## Overflow behavior

When the available width is insufficient to display all tabs, the overflowing ones collapse into an ellipsis (`⋮`) dropdown menu. Drag the slider to change the container width and watch the overflow directive collapse the tabs that no longer fit.

<demo-navbar-tabs-overflow></demo-navbar-tabs-overflow>

```html
<!-- Constrain the container width to trigger overflow collapse -->
<div [style.width.px]="width()">
  <navbar-tabs path="search" class="bg-sage-50 px-2" />
</div>
```

## Truncation

By default (`noTruncate` is `true`) tab labels are never clipped: tabs that do not fit move to the dropdown. Set `[noTruncate]="false"` to truncate overflowing labels with an ellipsis inside their slot instead. Drag the slider to compare both behaviors at the same width.

<demo-navbar-tabs-truncation></demo-navbar-tabs-truncation>

```html
<!-- Default: labels are never clipped — tabs move to the dropdown instead -->
<navbar-tabs />

<!-- Opt back into label truncation -->
<navbar-tabs [noTruncate]="false" />
```

## Tab min-width

In truncation mode (`[noTruncate]="false"`) each tab keeps a sensible minimum width so it never shrinks into an unusable sliver: its icon if it has one, otherwise a few characters plus the ellipsis. Use `minTabWidth` to override this minimum.

<demo-navbar-tabs-min-width></demo-navbar-tabs-min-width>

```html
<!-- Truncation mode: tabs shrink, but never below their minimum -->
<navbar-tabs [noTruncate]="false" />

<!-- Override the automatic minimum (icon width / a few characters + ellipsis) -->
<navbar-tabs [noTruncate]="false" minTabWidth="120px" />
```

## Custom navigation component

Import `injectRouteNavigation` directly to build any navigation UI without duplicating logic. The function accepts two signals and returns three computed signals.

```typescript
import { Component, input, booleanAttribute } from "@angular/core";
import { RouterLink } from "@angular/router";
import { injectRouteNavigation } from "@sinequa/atomic-angular";

@Component({
  selector: "my-nav",
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav>
      @for (tab of nav.tabs(); track tab.path) {
        <a
          [routerLink]="[tab.routerLink]"
          [queryParams]="{ q: nav.searchText(), t: tab.wsQueryTab }"
          [class.active]="nav.currentPath() === tab.path">
          {{ tab.display }}
        </a>
      }
    </nav>
  `
})
export class MyNavComponent {
  readonly path      = input("search");
  readonly showCount = input(false, { transform: booleanAttribute });

  readonly nav = injectRouteNavigation(this.path, this.showCount);
}
```

## API reference

### navbar-tabs

| Input         | Type      | Default     | Description                                                                   |
|---------------|-----------|-------------|-------------------------------------------------------------------------------|
| `path`        | `string`  | `"search"`  | Base route segment whose children are surfaced as tabs.                       |
| `showCount`   | `boolean` | `true`      | Display result counts next to each tab. Disable when tab search is not configured. |
| `noTruncate`  | `boolean` | `true`      | Keep full labels visible; overflowing tabs are moved to the ellipsis dropdown. Set to `false` to truncate labels inside their slot. |
| `minTabWidth` | `string`  | automatic   | Minimum tab width in truncation mode. Defaults to the icon width for icon tabs, or a few characters plus the ellipsis for text-only tabs. |

### injectRouteNavigation(path, showCount)

Returns a small read-only object with three signals:

| Signal           | Type            | Description                                                    |
|------------------|-----------------|----------------------------------------------------------------|
| `tabs()`         | `NavRouteTab[]` | All child routes under `path`, mapped to display metadata.     |
| `currentPath()`  | `string`        | Active child route segment.                                    |
| `searchText()`   | `string`        | Current query text from the `QueryParamsStore`.                |
