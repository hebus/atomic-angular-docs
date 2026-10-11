# @sinequa/galactik (/docs/galactik)

A pure Angular presentation library of tokens-only components — buttons, forms, overlays, navigation — for building Sinequa search UIs.



`@sinequa/galactik` is a library of Angular presentation components: buttons, form controls, overlays
(dialogs, menus, popovers), navigation (tabs, sidebar) and display primitives (badges, tags, avatars). It has
no knowledge of search, of a Sinequa backend, or of any business concept — every component takes plain inputs
and emits plain outputs, and every visual choice comes from a fixed set of design tokens.

<Callout title="Concept — galactik tokens">
  A **token** is a CSS custom property published by the design system — `--bg-primary-base`,
  `--font-primary-muted`, `--row-height-xs` — rather than a raw Tailwind utility or a literal colour. Every
  `galactik` component is styled exclusively through these tokens, so an application that declares them gets a
  consistent look with zero component-level configuration.
</Callout>

## What this library is not [#what-this-library-is-not]

`@sinequa/galactik` never imports `@sinequa/ui` (the library it replaces, still named "atomic-ui" in some
places) and never imports `@sinequa/atomic-angular` (the business layer that composes search features on top
of both). If you are looking for a search results list, a query builder, or anything that talks to a Sinequa
server, that lives in `@sinequa/atomic-angular` instead — this library only supplies the visual building
blocks it is composed from.

## What's next [#whats-next]

<Cards>
  <Card title="Getting started" href="./start.mdx">
    Install the library, declare the tokens your application needs, and render a first component.
  </Card>

  <Card title="Dialog" href="./overlay/dialog.mdx">
    The richest component in the library, and the reference page every other one follows.
  </Card>
</Cards>
