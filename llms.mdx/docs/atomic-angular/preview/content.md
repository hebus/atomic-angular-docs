# Preview (/docs/atomic-angular/preview)

Rendering a document's converted preview — the iframe surface, its action bar, a metadata header, and the directives that open or select an article into it.



Everything involved in showing a document once it has been selected: the preview surface itself (an iframe, or
a Markdown fallback), the action bar above it (find, zoom, pages, highlights, converter choice), a
projectable metadata header, and the small directives that turn a click or a keypress into a selection.

## What's next [#whats-next]

<Cards>
  <Card title="Preview Content" href="./preview-content.mdx">
    The full preview surface — load, render, zoom, page, and fall back to Markdown when needed.
  </Card>

  <Card title="Preview Actions" href="./preview-actions.mdx">
    The action bar above it, usable standalone for a custom preview surface.
  </Card>

  <Card title="Preview Header" href="./preview-header.mdx">
    A collapsible metadata panel with caller-projected rows.
  </Card>

  <Card title="Overflow Actions" href="./overflow-actions.mdx">
    The row of secondary actions of a document: bookmark, copy link, expand, with a "..." menu for the overflow.
  </Card>

  <Card title="Loading Dots" href="./loading-dots.mdx">
    Three waving dots: the loader of the preview and of the Load more button of the facets.
  </Card>

  <Card title="Preview service" href="./preview.mdx">
    Fetch, close, zoom and paginate — the service every preview component delegates to.
  </Card>

  <Card title="Text Chunk" href="./text-chunk.mdx">
    Fetch surrounding-context text chunks for a set of highlight locations.
  </Card>

  <Card title="SelectArticle" href="./select-article.mdx">
    Select an article on click or Enter, with a choice of four strategies.
  </Card>

  <Card title="OpenArticleOnCtrlEnter" href="./open-article-on-ctrl-enter.mdx">
    Open an article in a new tab on Ctrl+Enter.
  </Card>

  <Card title="ChildMarker" href="./child-marker.mdx">
    Mark a projected template for parent-controlled, repeatable rendering.
  </Card>
</Cards>
