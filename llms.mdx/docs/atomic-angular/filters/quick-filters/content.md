# Quick filters (/docs/atomic-angular/filters/quick-filters)

A pill that opens the user's named sets of filters, to apply them again in one click.



`<quick-filters>` is a pill that opens the user's **quick filters**: named sets of filters (say "Recent PDFs" = PDF plus
the last 30 days) that one click applies again. It is made to lead a `<filters-bar appearance="pill">`, in its
`filtersBarStart` slot, and wears the same outline as the filters beside it.

## Minimal example [#minimal-example]

<CodeSample id="quick-filters-basic" title="Quick filters leading a bar of pills">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { FiltersBarComponent, QuickFiltersComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [FiltersBarComponent, QuickFiltersComponent],
      template: `
        <filters-bar appearance="pill" align="center">
          <quick-filters filtersBarStart appearance="pill" />
        </filters-bar>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## Behaviour [#behaviour]

* A click on a quick filter **replaces** the active filters by its own, closes the popover and announces it. The list is
  searchable and each row says how many filters it holds; hovering (or focusing) a row shows them as chips in a card under it, each as the icon the application gave the aggregation of the filter (the `icon` of the "filters" custom JSON, as on the filter button) and the value; an aggregation without an icon keeps its name.
* A handle on the top edge of the popover (and one on the bottom edge when there is room) resizes its height, with the mouse and with the arrow keys; the height is kept while the page is open, and the popover is placed again by Floating UI (flipped, shifted) each time it opens and each time the page scrolls under it.
* The cross at the end of a row (or `Del` when the row has the focus) deletes the quick filter, with a toast, without applying it. Quick filters are made from the filters of the results page; this pill is where they are applied and deleted.
* The list itself is `<quick-filters-list>` (`QuickFiltersListComponent`): the same rows, hover card, cross and empty state, with no container, to be placed inline as the "Quick Filters" view of `<filters-panel>` does. Inputs `searchable`, `deletable` (default `true`) and `emptyHint`, outputs `applied` and `deleted`.
* They are stored in the user settings (`UserSettingsStore.quickFilters`), so they follow the user from one page to the other.

## API [#api]

| Input        | Type                  | Default          | Description                                          |
| ------------ | --------------------- | ---------------- | ---------------------------------------------------- |
| `scheme`     | `FilterScheme`        | `"sage"`         | Colour family of the pill.                           |
| `appearance` | `"default" \| "pill"` | `"pill"`         | The look of the trigger.                             |
| `position`   | `Placement`           | `"bottom-start"` | Where the popover goes.                              |
| `offset`     | `number`              | `8`              | Distance in pixels between the pill and its popover. |

| Output    | Payload       | Description                            |
| --------- | ------------- | -------------------------------------- |
| `applied` | `QuickFilter` | A click has applied this quick filter. |

Translations come from the `quick-filters` scope (`en`, `fr`, `de`).
