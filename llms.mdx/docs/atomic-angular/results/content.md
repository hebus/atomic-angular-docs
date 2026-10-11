# Results (/docs/atomic-angular/results)

Running a query and rendering what comes back — the query service, autocomplete, spelling correction, sorting, empty states, and the small display components a result list is built from.



Once a query has filters (see [Filtering results](../filters/index.mdx)), this section covers the rest of the
loop: issuing the request, telling a genuine zero-match apart from a failed one, correcting or expanding a
misspelled query, and the small components a result list and its rows are built from.

## What's next [#whats-next]

<Cards>
  <Card title="Query" href="./query.mdx">
    Search, tell a failed request apart from a genuine zero results, and page through a result.
  </Card>

  <Card title="Autocomplete" href="./autocomplete.mdx">
    Suggestions as the user types, from configured suggest queries or from their own history.
  </Card>

  <Card title="Did You Mean" href="./did-you-mean.mdx">
    Turn the engine's spelling correction into the right message — corrected, expanded, or merely suggested.
  </Card>

  <Card title="Sort Selector" href="./sort-selector.mdx">
    A dropdown of the sort choices a tab or query configuration actually offers.
  </Card>

  <Card title="No Result" href="./no-result.mdx">
    The zero-match message — and where pagination for a result list actually lives now.
  </Card>

  <Card title="Missing Terms" href="./missing-terms.mdx">
    Which query terms this particular document doesn't contain, each a link to search for them all.
  </Card>

  <Card title="Document Locator" href="./document-locator.mdx">
    A document's place in a hierarchy, as breadcrumbs that overflow into a dropdown.
  </Card>

  <Card title="Metadata & Source" href="./metadata-and-source.mdx">
    An article field as a row of tags, and the icon identifying which source or collection it came from.
  </Card>

  <Card title="Sponsored Results" href="./sponsored-results.mdx">
    Up to three promoted links relevant to the current query.
  </Card>

  <Card title="Converter Select" href="./converter-select.mdx">
    Pick which converted format previews a document, when more than one is configured.
  </Card>

  <Card title="Infinite Scroll & Overflow" href="./infinite-scroll-and-overflow.mdx">
    Two small layout directives: load more on scroll, and count how many items actually fit.
  </Card>
</Cards>
