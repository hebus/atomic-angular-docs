# @sinequa/atomic-angular (/docs/atomic-angular)

The business layer of Sinequa's Angular front-end stack — search features (auth, filters, preview, collections) composed from atomic and galactik.



`@sinequa/atomic-angular` composes Angular search features — sign-in, filtering and aggregations, document
preview, collections, saved searches, and more — on top of two lower-level libraries: `@sinequa/atomic` (the
framework-agnostic client that talks to a Sinequa server) and `@sinequa/galactik` (the presentation components
this library's UI is built from). It is the only layer in this stack allowed to depend on both a presentation
library and the backend client at once.

<Callout title="Concept — Sinequa search stack">
  A Sinequa application typically layers three things: a **backend** (the search engine and its REST API), a
  **client** (`@sinequa/atomic`, which turns REST calls into typed queries and results), and a **UI layer**
  (this library) that renders that data as sign-in screens, facets, result lists and previews. Nothing here talks
  to the backend directly — every network call goes through `@sinequa/atomic`.
</Callout>

## What this library is not [#what-this-library-is-not]

`@sinequa/atomic-angular` never renders raw presentation markup of its own where an equivalent already exists
in `@sinequa/galactik` — new code here composes `galactik` components rather than reinventing them. It no
longer depends on `@sinequa/ui`, the older presentation library `galactik` replaces; see this repository's
`ARCHITECTURE.md` for the state of that migration.

## What's next [#whats-next]

<Cards>
  <Card title="Getting started" href="./start.mdx">
    Install the library, connect a Sinequa client, and render a first authenticated search screen.
  </Card>

  <Card title="Filtering results" href="./filters/aggregation.mdx">
    The richest guide in this documentation, and the reference every other page follows.
  </Card>
</Cards>
