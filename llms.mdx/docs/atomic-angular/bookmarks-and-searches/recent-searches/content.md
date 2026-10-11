# Recent searches (/docs/atomic-angular/bookmarks-and-searches/recent-searches)

An automatically populated, paginated list of the user's past searches — the same shape as saved searches, with nothing to save explicitly.



`<recent-searches>` lists the searches a user has actually run, most recent first — populated automatically by
`UserSettingsStore` as the user searches, with no explicit "save" step. It shares its row shape (filter-count
badge, relative date) and its reopen mechanism with [saved searches](./saved-searches.mdx).

## Minimal example [#minimal-example]

<CodeSample id="recent-searches-basic" title="The recent-searches list">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { RecentSearchesComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [RecentSearchesComponent],
      template: `<recent-searches />`,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Store[&#x22;UserSettingsStore&#x22;] -- &#x22;records each run search&#x22; --> History[&#x22;recentSearches()&#x22;]
    List[&#x22;RecentSearchesComponent&#x22;] -- &#x22;reads recentSearches()&#x22; --> History
    List -- &#x22;itemClick(search)&#x22; --> Navigate[&#x22;navigateToSearch() — parses the stored URL&#x22;]
    List -- &#x22;delete({item, index})&#x22; --> Store"
/>

Reopening a recent search and deleting one both work exactly like their [saved
searches](./saved-searches.mdx#how-it-works) counterparts — the two components are effectively the same list
shape over two different backing arrays.

## Options [#options]

<TypeTable
  type="{
  options: {
    type: &#x22;SearchesConfig&#x22;,
    description: &#x22;{ itemsPerPage?, showLoadMore?, routerLink? }, merged over RECENT_SEARCHES_CONFIG's default (10 items, load-more shown, /recent-searches).&#x22;,
  },
}"
/>

## What's next [#whats-next]

<Cards>
  <Card title="Saved searches" href="./saved-searches.mdx">
    The explicitly-named counterpart — a starred toggle and a save dialog.
  </Card>
</Cards>
