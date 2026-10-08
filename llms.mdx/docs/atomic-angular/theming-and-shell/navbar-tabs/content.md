# Navbar Tabs (/docs/atomic-angular/theming-and-shell/navbar-tabs)

A tab bar generated from the Angular Router's own child-route configuration, with automatic overflow into a dropdown and optional per-tab result counts.



`<navbar-tabs>` renders one tab per child route of a given router `path` — there is no tab list to pass in,
only a `data` object per route. The active tab tracks the current URL, and whatever doesn't fit collapses into
a "⋮" menu instead of clipping.

## Minimal example [#minimal-example]

<CodeSample id="navbar-tabs-basic" title="Tabs generated from a router config">
  <Lang value="angular">
    ```ts title="app.routes.ts"
    import { Routes } from "@angular/router";

    export const routes: Routes = [
      {
        path: "search",
        children: [
          { path: "all", data: { display: "All", wsQueryTab: "all", icon: "far fa-globe" } },
          { path: "documents", data: { display: "Documents", wsQueryTab: "documents", icon: "far fa-file-alt", queryName: "documents-query" } },
          { path: "people", data: { display: "People", wsQueryTab: "people", icon: "far fa-user" } },
        ],
      },
    ];
    ```

    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { NavbarTabsComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [NavbarTabsComponent],
      // Tabs come from the "search" route's children above — nothing else to pass.
      template: `<navbar-tabs path="search" [showCount]="true" />`,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

Renders nothing when `path` has no matching child routes in the router config.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    RouterConfig[&#x22;Router config children of path&#x22;] -- read by --> InjectNav[injectRouteNavigation]
    InjectNav -- &#x22;tabs / currentPath / searchText&#x22; --> NavbarTabsComponent
    NavbarTabsComponent -- renders --> TabList
    TabList -- &#x22;one Tab per entry, overflowItem&#x22; --> Overflow[OverflowManagerDirective]
    Overflow -- count --> VisibleCount[&#x22;visibleTabCount signal&#x22;]
    VisibleCount --> MoreTabs[&#x22;moreTabs computed&#x22;]
    TabList -- &#x22;last item, overflowStop&#x22; --> MoreButton[&#x22;ellipsis more button&#x22;]
    MoreButton -- opens --> MoreMenu[&#x22;Menu moreTabsMenu&#x22;]
    MoreMenu -- lists --> MoreTabs
    TabList -- selectedTabChange --> OnSelectTab[onSelectTab]
    MoreMenu -- MenuItem click --> NavigateToTab[navigateToTab]
    OnSelectTab -- &#x22;path changed?&#x22; --> NavigateToTab
    NavigateToTab --> RouterNav[&#x22;Router navigate&#x22;]
    RouterNav -- NavigationEnd --> InjectNav"
/>

Selection is a two-way `model` (`selectedTab`) kept in sync with `currentPath()` **one-way only** — an effect
pushes `currentPath()` into `selectedTab`, never the reverse — so a click (which updates `selectedTab` before
the URL actually changes) is not immediately overwritten by that same effect.

### Where the counts and the persisted-filters behavior come from [#where-the-counts-and-the-persisted-filters-behavior-come-from]

<Mermaid
  chart="flowchart TD
    QueryParamsStore -- &#x22;text, tab&#x22; --> InjectNav[injectRouteNavigation]
    ApplicationService -- routerConfig --> InjectNav
    QueryService -- &#x22;result tabs, per-tab count&#x22; --> InjectNav
    InjectNav -- &#x22;tabs with count&#x22; --> NavbarTabsComponent
    AppStore -- &#x22;general features persistFiltersAcrossTabs&#x22; --> Persist[&#x22;persistFiltersAcrossTabs computed&#x22;]
    Persist -- &#x22;merge vs replace&#x22; --> QueryParamsHandling[getQueryParamsHandling]
    NavbarTabsComponent -- &#x22;router navigate&#x22; --> Router
    Router -- &#x22;NavigationEnd&#x22; --> InjectNav"
/>

A tab shows no badge at all (not a `0` badge) unless its `queryName` matches the current result's query name;
it is disabled only once the matched count is exactly `0` — in the visible bar and in the overflow menu alike.

## Options [#options]

<TypeTable
  type="{
  path: {
    type: &#x22;string&#x22;,
    default: '&#x22;search&#x22;',
    description: &#x22;Router path segment whose child routes become tabs. Each child's data (display, wsQueryTab, icon, queryName) configures the tab.&#x22;,
  },
  showCount: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;Shows a result-count badge per tab, matched by queryName/wsQueryTab. A tab with a matched count of exactly 0 is disabled.&#x22;,
  },
  noTruncate: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;true: labels never clip, non-fitting tabs overflow into the menu. false: labels truncate with an ellipsis inside a fixed-width tab.&#x22;,
  },
  minTabWidth: {
    type: &#x22;string | undefined&#x22;,
    description: &#x22;Explicit minimum width in truncate mode (noTruncate=false), overriding the automatic minimum.&#x22;,
  },
  ariaLabel: {
    type: &#x22;string | undefined&#x22;,
    description: 'Accessible name of the tab list. Defaults to the translated &#x22;navbarTabs.tabs&#x22; — override when a page holds several tab lists.',
  },
}"
/>

No outputs — tab activation navigates through the Angular `Router` directly.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The overflow ('⋮') button doesn't respond to arrow keys the way the tabs do">
    Expected: `Tabs`/`TabList`/`Tab` (`@sinequa/galactik`) delegate ARIA roles, keyboard navigation and roving
    `tabindex` to `@angular/aria/tabs` via `hostDirectives` — but the "more" button is deliberately never
    registered as a `Tab`, so it does not participate in arrow-key navigation between tabs. It is still reachable:
    it is the last child of `TabList` (inside the same pill, not floating beside it) and opens its menu on click,
    Enter or Space.
  </Accordion>

  <Accordion title="A tab shows a '0' badge instead of no badge at all">
    That only happens when its `queryName`/`wsQueryTab` genuinely matches the current result and the matched count
    is `0` — which also disables it. If you expected no badge instead, check the tab's `data.queryName` against
    the query the result actually came from; a mismatch shows no badge (not a `0` one), so a `0` badge is never a
    false positive.
  </Accordion>

  <Accordion title="Filters/sort disappear after switching tabs">
    Depends on the app-wide `general.features.persistFiltersAcrossTabs` flag. When it is off (the default), tab
    navigation replaces the query params from scratch — filters, sort, selected id and page are explicitly cleared.
    Turn the flag on to merge instead, keeping those params across a tab change.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Theme" href="./theme.mdx">
    Register and apply a color theme, the other piece of the application shell.
  </Card>
</Cards>
