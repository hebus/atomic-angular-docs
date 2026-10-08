# Resizable (/docs/galactik/layout/resizable)

Lay a row or column of panels out and let the user move the boundary between two of them, by dragging or by arrowing the handle.



`ResizablePanelGroup` lays a row (or column) of panels out and lets the user move the boundary between two of
them, by dragging the handle or by arrowing it. Three components work together: `ResizablePanelGroup` (the
flex container and single owner of the sizes), `ResizablePanel` (one region, sized as a share of the group)
and `ResizableHandle` (the divider, focusable and draggable).

<Callout title="Concept — percentages, not pixels">
  Sizes are percentages of the group, never pixels — that is what makes a layout survive a window resize. The
  group normalizes whatever `defaultSize`s you give so they sum to 100.
</Callout>

## Minimal example [#minimal-example]

The group takes the full size of its parent (`size-full`), so it needs a parent with a height — one in a
plain `<div>` with no height collapses.

<CodeSample id="resizable-basic" title="Two panels, side by side">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { ResizableHandleComponent, ResizablePanelComponent, ResizablePanelGroupComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [ResizablePanelGroupComponent, ResizablePanelComponent, ResizableHandleComponent],
      template: `
        <div class="h-96">
          <resizable-panel-group direction="horizontal">
            <resizable-panel [defaultSize]="30" [minSize]="20">Filters</resizable-panel>
            <resizable-handle [withHandle]="true" aria-label="Resize the filters panel" />
            <resizable-panel [defaultSize]="70">Results</resizable-panel>
          </resizable-panel-group>
        </div>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`minSize`/`maxSize` per panel are honoured by both the pointer and the keyboard — what one panel refuses to
take, its neighbour keeps, so the total always stays at 100%. The handle implements the ARIA
[window-splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/) pattern: `role="separator"`,
`aria-orientation` (the orientation of the *line*, not of the group — a separator between side-by-side panels
is vertical), and `aria-valuenow`/`valuemin`/`valuemax` bounded by the panel before it. Arrow keys move the
focused handle by 10% of the group, along the axis the group's `direction` implies — a resize is therefore
fully reachable without a pointer (WCAG 2.1.1). Dragging uses pointer events with pointer capture, so the drag
follows the pointer far outside the handle with no window-level listener, and a full-page overlay during the
drag keeps an `<iframe>` in a panel from swallowing the pointer.

## Recipes [#recipes]

### Remembering the layout [#remembering-the-layout]

Give the group an `autoSaveId` and the layout is remembered in `localStorage`, under the key
`resizable-panel:<autoSaveId>` — restored on the next visit, but only if the group still has the same number
of panels; otherwise the panels' own `defaultSize`s are the better answer.

```html
<resizable-panel-group direction="horizontal" autoSaveId="search-results">…</resizable-panel-group>
```

### Driving the layout from the outside [#driving-the-layout-from-the-outside]

<CodeSample id="resizable-external" title="Reading and resetting the layout from a button">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { ResizableHandleComponent, ResizablePanelComponent, ResizablePanelGroupComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [ResizablePanelGroupComponent, ResizablePanelComponent, ResizableHandleComponent],
      template: `
        <resizable-panel-group #group="resizablePanelGroup" direction="horizontal" (layout)="sizes.set($event)">
          <resizable-panel [defaultSize]="50">Left</resizable-panel>
          <resizable-handle [withHandle]="true" aria-label="Resize panels" />
          <resizable-panel [defaultSize]="50">Right</resizable-panel>
        </resizable-panel-group>
        <button type="button" (click)="group.setLayout([50, 50])">Reset</button>
      `,
    })
    export class SampleComponent {
      readonly sizes = signal<number[]>([]);
    }
    ```
  </Lang>
</CodeSample>

`setLayout()` is ignored unless the array covers exactly the panels present — a partial layout would leave the
group summing to something other than 100%.

## Options [#options]

<TypeTable
  type="{
  direction: { type: '&#x22;horizontal&#x22; | &#x22;vertical&#x22;', default: '&#x22;horizontal&#x22;', description: &#x22;Axis the panels are laid out along.&#x22; },
  autoSaveId: { type: &#x22;string | undefined&#x22;, description: &#x22;Key the layout is persisted under. Without it, nothing is stored.&#x22; },
}"
/>

### `ResizablePanel` [#resizablepanel]

<TypeTable
  type="{
  id: { type: &#x22;string&#x22;, default: '&#x22;resizable-panel-<n>&#x22;', description: &#x22;Written to the DOM — what the handle points at with aria-controls.&#x22; },
  defaultSize: { type: &#x22;number&#x22;, default: &#x22;50&#x22;, description: &#x22;Share before any resize, in percent. Normalized across siblings.&#x22; },
  minSize: { type: &#x22;number&#x22;, default: &#x22;0&#x22;, description: &#x22;Lower bound, in percent.&#x22; },
  maxSize: { type: &#x22;number&#x22;, default: &#x22;100&#x22;, description: &#x22;Upper bound, in percent.&#x22; },
}"
/>

### `ResizableHandle` [#resizablehandle]

<TypeTable
  type="{
  withHandle: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Shows the grip pill on the line.&#x22; },
  &#x22;aria-label&#x22;: { type: &#x22;string&#x22;, default: '&#x22;Resize panels&#x22;', description: &#x22;Accessible name of the separator. Override per handle when a group has several.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Dragging a handle does nothing">
    A group with no measurable size (a hidden route, `display: none`) cannot turn a pointer move into a
    percentage, and the drag is simply ignored until the group has a size again. Check that the group's parent
    actually has a height — a bare `<div>` with no height collapses the whole group to zero.
  </Accordion>

  <Accordion title="Two adjacent handles seem to control the wrong panels">
    One handle sits between every two panels, in document order — the group pairs the handle at index *i* with
    the panels at index *i* and *i+1*. A handle placed elsewhere in the projected content resizes nothing.
  </Accordion>

  <Accordion title="A screen-reader user hears the same 'Resize panels' announced twice">
    That is the default `aria-label`, shared by every handle. Give each handle its own `aria-label` whenever a
    group has more than one.
  </Accordion>

  <Accordion title="layout fires far more often than expected, and a heavy handler stutters the drag">
    `layout` fires on every pointer move during a drag, not only when it settles. Persist through `autoSaveId`
    instead of a manual handler, or debounce anything expensive you attach to it directly.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Sidebar" href="../navigation/sidebar.mdx">
    Another panel-composition component, collapsible rather than resizable.
  </Card>
</Cards>
