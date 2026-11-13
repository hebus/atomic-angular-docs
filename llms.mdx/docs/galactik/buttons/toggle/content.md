# Toggle (/docs/galactik/buttons/toggle)

A pill-shaped pressed/unpressed button, standalone or grouped into a segmented control built on @angular/aria/toolbar.



`Toggle` is a pill-shaped pressed/unpressed button. Used alone it is a self-contained two-way `[(pressed)]`
control; nested inside a `ToggleGroup` it becomes an item of a segmented control — `single` (exclusive, like a
radio group) or `multi` (independent selections).

## Minimal example [#minimal-example]

<CodeSample id="toggle-basic" title="A standalone favourite toggle">
  <Lang value="angular">
    ```ts title="favorite-toggle.component.ts"
    import { Component, signal } from "@angular/core";
    import { ToggleComponent, TOGGLE_ICON_CLASS, TOGGLE_LABEL_CLASS } from "@sinequa/galactik";

    @Component({
      selector: "favorite-toggle",
      imports: [ToggleComponent],
      template: `
        <Toggle variant="multi" [(pressed)]="bookmarked">
          <span [class]="iconClass">★</span>
          <span [class]="labelClass">Favorite</span>
        </Toggle>
      `,
    })
    export class FavoriteToggleComponent {
      bookmarked = signal(false);
      protected readonly iconClass = TOGGLE_ICON_CLASS;
      protected readonly labelClass = TOGGLE_LABEL_CLASS;
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`Toggle` (standalone) and `Toggle[value]` (grouped item) are two distinct components sharing the `Toggle`/
`toggle` tag name, discriminated by the presence of the `value` attribute. Grouped items require an ancestor
`<ToggleGroup>` — its selection model comes entirely from `@angular/aria/toolbar` (roving tabindex, arrow keys,
typeahead, all free).

<Mermaid
  chart="flowchart TD
    User -- click / arrow keys --> ToggleItem[&#x22;Toggle[value] item&#x22;]
    ToggleItem -- ToolbarWidget selection --> ToggleGroup
    ToggleGroup -- &#x22;[(value)] / valueChange&#x22; --> Host[[&#x22;Host component state&#x22;]]
    ToggleGroup -- itemVariant --> ToggleItem"
/>

## Recipes [#recipes]

### A single-selection segmented control [#a-single-selection-segmented-control]

The group's `value` model is always a `string[]`, even in single-selection mode — bind an array signal.

<CodeSample id="toggle-group" title="An exclusive status filter">
  <Lang value="angular">
    ```ts title="status-filter.component.ts"
    import { Component, signal } from "@angular/core";
    import { ToggleGroupComponent, ToggleItemComponent } from "@sinequa/galactik";

    @Component({
      selector: "status-filter",
      imports: [ToggleGroupComponent, ToggleItemComponent],
      template: `
        <ToggleGroup [(value)]="selected">
          <Toggle value="all">All</Toggle>
          <Toggle value="open">Open</Toggle>
          <Toggle value="closed">Closed</Toggle>
        </ToggleGroup>
      `,
    })
    export class StatusFilterComponent {
      selected = signal<string[]>(["all"]);
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  variant: { type: '&#x22;unique&#x22; | &#x22;multi&#x22;', default: '&#x22;unique&#x22;', description: &#x22;Color palette. A grouped item inherits its parent ToggleGroup's palette unless it sets its own.&#x22; },
  size: { type: '&#x22;sm&#x22; | &#x22;md&#x22;', default: '&#x22;sm&#x22;', description: '&#x22;small&#x22;/&#x22;medium&#x22; accepted as legacy aliases.' },
  iconOnly: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Renders a square, icon-only pill.&#x22; },
  pressed: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Standalone Toggle only — two-way bindable pressed state.&#x22; },
  value: { type: &#x22;string&#x22;, description: &#x22;Grouped item only. Required — the widget's identity within the parent ToggleGroup's selection.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Re-clicking the active item in a single-selection group empties the whole selection">
    Standard `@angular/aria/toolbar` selection-group behavior, not a bug: in single-selection mode, re-activating
    the currently selected item deselects it. If a view must always have exactly one active item (a view-mode
    switcher, say), bind the group with a one-way `[value]` + `(valueChange)` pair and reject empty emissions in
    the handler, rather than `[(value)]`.
  </Accordion>

  <Accordion title="A grouped Toggle[value] throws or reports a violation with no ancestor group">
    A grouped item requires an ancestor `<ToggleGroup>` (or any `ngToolbar`) — `ToolbarWidget` resolves
    `inject(Toolbar)` through the regular element-injector hierarchy, so `<Toggle value>` items must be light-DOM
    descendants of `<ToggleGroup>`, not children of some other wrapping component.
  </Accordion>
</Accordions>
