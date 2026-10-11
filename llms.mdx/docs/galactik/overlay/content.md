# Overlay (/docs/galactik/overlay)

Components that float above the page — Dialog, Sheet, Menu, Popover, Tooltip — and the tokens and layering rules they share.



An overlay is anything that renders above the rest of the page and captures focus or dismissal on its own
terms: a modal dialog, an edge-anchored sheet, a dropdown menu, a floating popover. `@sinequa/galactik`'s
overlays share the same scrim tokens (`--scrim-base`, `--blur-xs`) and, wherever the platform allows it, the
native top layer — so none of them need an application-level `z-index` to stack correctly above ordinary
content.

## What's next [#whats-next]

<Cards>
  <Card title="Dialog" href="./dialog.mdx">
    Modal and non-modal windows, six composable layout slots, and the imperative call/result API every
    stacked overlay in this library builds on.
  </Card>

  <Card title="Sheet" href="./sheet.mdx">
    A modal panel anchored to one edge of the viewport — the drawer pattern — sharing Dialog's tokens.
  </Card>

  <Card title="Menu" href="./menu.mdx">
    An accessible dropdown/contextual menu with nested submenus and checkable items.
  </Card>

  <Card title="Popover" href="./popover.mdx">
    The positioning primitive Menu is built on, for any floating content that isn't a list of actions.
  </Card>

  <Card title="Floating panel" href="./floating-panel.mdx">
    Keeps a popup under or beside an anchor — a combobox's list, a submenu — in the top layer on request.
  </Card>

  <Card title="Tooltip" href="./tooltip.mdx">
    A short description on hover and keyboard focus, in the top layer, with the same selector as the @sinequa/ui one.
  </Card>
</Cards>
