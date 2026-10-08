# Bookmarks (/docs/atomic-angular/bookmarks-and-searches/bookmarks)

A starred toggle button on any document, and a paginated list of the user's bookmarks — reopening one re-runs the query it came from to land back on the exact record.



Bookmarking marks a single document for later, independently of any collection or label. `<bookmark-button>`
is the toggle a result row or a preview header shows; `<bookmarks>` is the paginated list of everything the
user has bookmarked.

## Minimal example [#minimal-example]

<CodeSample id="bookmarks-basic" title="A bookmark toggle on a result row">
  <Lang value="angular">
    ```ts title="result-row.component.ts"
    import { Component, input } from "@angular/core";
    import { BookmarkButtonComponent } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "result-row",
      imports: [BookmarkButtonComponent],
      template: `<bookmark-button [article]="article()" />`,
    })
    export class ResultRowComponent {
      readonly article = input.required<Article>();
    }
    ```
  </Lang>
</CodeSample>

The button reads its own pressed state from `UserSettingsStore.isBookmarked(article)` — there is nothing else
to wire for the toggle itself to reflect reality after a bookmark is added elsewhere in the app.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Button[&#x22;BookmarkButtonComponent&#x22;] -- &#x22;isBookmarked(article)&#x22; --> Store[&#x22;UserSettingsStore&#x22;]
    User -- click --> Button
    Button -- &#x22;bookmark()/unbookmark()&#x22; --> Store
    Store -- persists --> Backend

    List[&#x22;BookmarksComponent&#x22;] -- &#x22;reads bookmarks()&#x22; --> Store
    List -- &#x22;itemClick(bookmark)&#x22; --> Search[&#x22;re-run bookmark.queryName, filter on id&#x22;]
    Search -- &#x22;no record found&#x22; --> Fallback[&#x22;re-run the app's default query instead&#x22;]"
/>

Opening a bookmark from the list is a **search**, not a direct navigation to a stored document: `<bookmarks>`
re-runs the query the bookmark was made from (`bookmark.queryName`), filtered to that document's id, and makes
the first matching record the current article (`SelectionService.setCurrentArticle`). When that query no longer returns the record — the source query was
removed from the app, say — it falls back to the app's default query before giving up and warning the user the
bookmark looks outdated.

## Options [#options]

<TypeTable
  type="{
  article: { type: &#x22;Article&#x22;, description: &#x22;BookmarkButtonComponent, required. The document the toggle bookmarks.&#x22; },
  variant: { type: &#x22;ButtonVariants[\&#x22;variant\&#x22;]&#x22;, default: '&#x22;tertiary&#x22;', description: &#x22;BookmarkButtonComponent.&#x22; },
  size: { type: &#x22;ButtonVariants[\&#x22;size\&#x22;]&#x22;, default: '&#x22;md&#x22;', description: &#x22;BookmarkButtonComponent.&#x22; },
  tabIndex: {
    type: &#x22;number | undefined&#x22;,
    description:
      &#x22;BookmarkButtonComponent. Forwarded to the inner native button — needed when a caller manages focus itself (a roving tabindex, an @angular/aria grid cell), since the host custom element itself is never focusable.&#x22;,
  },
  options: {
    type: &#x22;BookmarksConfig&#x22;,
    description: &#x22;BookmarksComponent. { itemsPerPage?, showLoadMore?, routerLink? }, merged over BOOKMARKS_CONFIG's default (10 items, load-more shown, /bookmarks).&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A roving-tabindex list of bookmark buttons has an extra tab stop per card">
    `<bookmark-button>` is a custom element; only the native `<button>` inside it is focusable, and a caller that
    manages focus itself (an `@angular/aria` grid, a manual roving tabindex) can move focus onto it but not remove
    it from the natural tab order on top of that. Set `[tabIndex]="-1"` (or whatever the roving pattern expects)
    explicitly rather than assuming the host element's own absence from the DOM tabindex chain is enough.
  </Accordion>

  <Accordion title="Opening an old bookmark shows a &#x22;this bookmark looks outdated&#x22; warning">
    Expected once the record it points to is genuinely gone from both the original query and the app's default
    query — not a bug in the list itself. The warning is the fallback path's own signal that neither search found
    the document, distinct from a bookmark that simply has not loaded yet.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Saved searches" href="./saved-searches.mdx">
    Name and reopen a whole search — text, filters and all — rather than a single document.
  </Card>

  <Card title="Recent searches" href="./recent-searches.mdx">
    The same list, populated automatically from search history.
  </Card>
</Cards>
