# History panel (/docs/atomic-angular/bookmarks-and-searches/history-panel)

A side panel listing the user's recent searches, with a switch to show only the ones marked as favorite.



`<history-panel>` is the user's search history as a panel beside the application's sidebar: the recent searches
grouped by day, a **All / Favorites** switch, a star to mark a search as favorite and a button to delete one. It
reads and writes `UserSettingsStore` itself and re-runs a search through the router, so the only thing to wire is
whether it is open.

## Minimal example [#minimal-example]

<CodeSample id="history-panel-basic" title="A history panel next to a sidebar">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { HistoryPanelComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [HistoryPanelComponent],
      template: `
        <div class="flex h-svh">
          <nav><button type="button" (click)="open.set(!open())" [attr.aria-expanded]="open()">History</button></nav>
          <history-panel [(open)]="open" />
          <main class="flex-1">…</main>
        </div>
      `,
    })
    export class SampleComponent {
      readonly open = signal(false);
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Store[&#x22;UserSettingsStore&#x22;] -- &#x22;recentSearches(), favoriteSearches()&#x22; --> Panel[&#x22;HistoryPanelComponent&#x22;]
    Panel -- &#x22;click on a search&#x22; --> Nav[&#x22;navigateToSearch() then searchSelected&#x22;]
    Panel -- &#x22;star&#x22; --> Fav[&#x22;toggleFavoriteSearch()&#x22;]
    Panel -- &#x22;cross&#x22; --> Del[&#x22;deleteRecentSearch() — drops its favorite too&#x22;]"
/>

The panel is a flex child that grows from `0` to `--history-panel-width` (15.625rem by default) when `open` turns
true, so beside a sidebar it **pushes** the page content instead of covering it. Closed, it is `inert` and
`aria-hidden`. Under the mobile breakpoint it becomes a `Sheet` sliding from the left. `Escape` and the close
button write `open` back.

With nothing to list, each tab shows the usual empty state of the list features — a pastel icon tile (blue history icon under All, yellow star under Favorites), a short title and one hint line.

A favorite is a flag on a recent search, keyed by its query text: un-favoriting never deletes the search, and
deleting the search drops its favorite.

## Theming [#theming]

Every colour of the panel is a CSS variable with a semantic-token fallback. By default it is a plain card on the
page's layer colour; a host retints it — to sit beside a dark sidebar, say — by setting the variables on it or on an
ancestor: `--history-panel-bg`, `-fg`, `-muted` (header and day labels), `-icon`, `-hover`, `-active` (a row), `-group`,
`-toggle-active`, `-toggle-hover` (the All / Favorites switch), `-fav`, `-fav-hover-bg`, `-del-hover-bg`, `-del-hover-fg`,
plus `--history-panel-width` (15.625rem) and `--history-panel-gap` (the margin on its start side while open, 0 by default).

The row actions appear on hover or keyboard focus: the star adds the search to the favorites, the cross removes it from
the history. A title that is cut off scrolls while its row is hovered or focused, and a tooltip shows the whole text.

## Options [#options]

<TypeTable
  type="{
  open: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Whether the panel is shown. Two-way: [(open)].&#x22; },
  tab: { type: '&#x22;all&#x22; | &#x22;favorites&#x22;', default: '&#x22;all&#x22;', description: &#x22;Which list is shown. Two-way: [(tab)].&#x22; },
  class: { type: &#x22;string&#x22;, description: &#x22;Extra classes for the desktop aside, merged with cn.&#x22; },
  searchSelected: { type: &#x22;OutputEmitterRef<SearchItem>&#x22;, description: &#x22;Emitted once a search has been re-run from the panel — close an overlaying host there.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The panel opens but the page content does not move">
    The panel pushes its siblings only when it is a child of a flex row next to them: its width animates, it does not
    position itself. Put it in the same flex container as the sidebar and the content.
  </Accordion>

  <Accordion title="A search is not listed under Favorites after I starred it">
    Favorites are keyed by the query text, and only recent searches can be starred. A search that was deleted from the
    history loses its favorite; running it again creates a new, un-starred recent search.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Recent searches" href="./recent-searches.mdx">
    The same history as a plain paginated list.
  </Card>

  <Card title="Saved searches" href="./saved-searches.mdx">
    Searches the user keeps explicitly, with a name.
  </Card>
</Cards>
