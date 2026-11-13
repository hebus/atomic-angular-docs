# Preview Actions (/docs/atomic-angular/preview/preview-actions)

The action bar above a document preview — a find field with its results panel, a converter select, a highlights popover, zoom buttons and page navigation — plus a slot for app-specific actions.



`<preview-actions>` is the bar `<preview-content>` shows above its document: the "Find text…" field with its
results panel on the left; on the right the converter select, a highlights popover, the host's own actions, the
zoom buttons and the page navigation. It is everything a zoomable, searchable `PreviewService` needs, all in
view — when the room runs out, the right-hand group wraps under the field and stays right-aligned.

## Minimal example [#minimal-example]

<CodeSample id="preview-actions-basic" title="The toolbar over a custom preview surface">
  <Lang value="angular">
    ```ts title="custom-preview.component.ts"
    import { Component, signal } from "@angular/core";
    import { PreviewActionsComponent } from "@sinequa/atomic-angular";
    import type { CConverter } from "@sinequa/atomic-angular";
    import type { PreviewData } from "@sinequa/atomic";

    @Component({
      selector: "custom-preview",
      imports: [PreviewActionsComponent],
      template: `
        <preview-actions
          [previewData]="previewData()"
          [activeConversion]="activeConversion()"
          (onConversionSelect)="activeConversion.set($event)"
        />
      `,
    })
    export class CustomPreviewComponent {
      protected readonly previewData = signal<PreviewData | undefined>(undefined);
      protected readonly activeConversion = signal<CConverter | undefined>(undefined);
    }
    ```
  </Lang>
</CodeSample>

Every action here reads `previewData` and calls straight into the injected `PreviewService` — nothing about
zoom or highlights needs wiring beyond passing the loaded data in. `<preview-content>` already does this for
you; use `<preview-actions>` directly only when building a preview surface of your own.

### The find field [#the-find-field]

The field submits to `SelectionStore.queryText`: the preview reloads with the text highlighted in the document.
Its results panel — **Snippet** (where the text matches), **Extracts**, **Entities**, then Labels and Similar
documents when the document has them — opens under the field as soon as it takes the focus, and closes on

<kbd>Escape</kbd> or on a press anywhere else (a click inside the document's iframe included). Emptying the field
lifts the search.

### Zoom and pages [#zoom-and-pages]

The zoom buttons act on the iframe through `PreviewService`, and disable themselves at the bounds the iframe
announces. The page navigation shows only while the document has more than one page, follows the page being read
as the user scrolls, and takes the first and last page on <kbd>Home</kbd> and <kbd>End</kbd> in its field.

### The highlights popover [#the-highlights-popover]

The highlights button opens a list of the document's highlight categories (extracts, search terms, entities…). Each row
has a round mark in the category's colour when it is on and a bare ring when it is off, its name and its count. The previous
and next arrows, which walk through the occurrences of a category in the document, take the place of the count while the
row is hovered or focused. A name that does not fit — with the arrows or without them — is cut with an ellipsis and shown
in full in a tooltip. The **Show all** switch at the foot turns every category on or off at once, and reads "n of N shown"
when only some are on. The choice is kept in the user's settings.

## Recipes [#recipes]

### Add an app-specific action [#add-an-app-specific-action]

The built-in actions (find, converter, zoom, pages, highlights) are generic to any preview — anything app-specific,
like an AI-description toggle, is projected into the `extra-actions` slot instead of being hard-coded here.

<CodeSample id="preview-actions-extra" title="An AI-description toggle next to the built-in actions">
  <Lang value="angular">
    ```ts title="preview-with-ai-toggle.component.ts"
    import { Component, signal } from "@angular/core";
    import { PreviewActionsComponent } from "@sinequa/atomic-angular";
    import type { PreviewData } from "@sinequa/atomic";

    @Component({
      selector: "preview-with-ai-toggle",
      imports: [PreviewActionsComponent],
      template: `
        <preview-actions [previewData]="previewData()">
          @if (hasAIDescription()) {
            <ng-container slot="extra-actions">
              <button variant="tertiary" scheme="neutral" [iconOnly]="true" size="md" aria-label="Toggle the AI description" (click)="toggleAIDescription()">AI</button>
            </ng-container>
          }
        </preview-actions>
      `,
    })
    export class PreviewWithAiToggleComponent {
      protected readonly previewData = signal<PreviewData | undefined>(undefined);
      protected readonly hasAIDescription = signal(false);

      protected toggleAIDescription(): void {
        /* … */
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  previewData: { type: &#x22;PreviewData | undefined&#x22;, description: &#x22;Forwarded to the converter dropdown and the highlights popover.&#x22; },
  activeConversion: {
    type: &#x22;CConverter | undefined&#x22;,
    description: &#x22;The conversion already active upstream, so the dropdown re-syncs its selection on remount instead of resetting to the first option.&#x22;,
  },
  showSearch: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;false hides the find field and its results panel entirely. Zoom and highlights stay unaffected.&#x22;,
  },
  showHighlights: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;false hides the highlights popover — for a preview whose content is not the instrumented iframe.&#x22;,
  },
  showPages: {
    type: &#x22;boolean&#x22;,
    default: &#x22;true&#x22;,
    description: &#x22;false hides the page navigation. It is hidden anyway while the document has a single page or none.&#x22;,
  },
  zoomMode: {
    type: '&#x22;iframe&#x22; | &#x22;manual&#x22;',
    default: '&#x22;iframe&#x22;',
    description: '&#x22;iframe&#x22; zooms the iframe through PreviewService. &#x22;manual&#x22; is for a preview with no iframe: the buttons only emit zoomIn / zoomOut / zoomFit.',
  },
  findPanel: {
    type: '&#x22;popover&#x22; | &#x22;pinned&#x22;',
    default: '&#x22;popover&#x22;',
    description: '&#x22;pinned&#x22; is for a host that shows the results itself, beside the document: no popover, the field only submits, and a toggle at the end of the bar shows or hides the panel of the host.',
  },
  findPanelOpen: { type: &#x22;boolean (two-way)&#x22;, default: &#x22;true&#x22;, description: 'In &#x22;pinned&#x22; mode, whether the panel of the host is shown. The field opens it when it takes the focus.' },
  canZoomIn: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;In manual zoom mode, whether zooming in can still change anything.&#x22; },
  canZoomOut: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;In manual zoom mode, whether zooming out can still change anything.&#x22; },
}"
/>

Outputs: `onConversionSelect` (`OutputEmitterRef<CConverter | undefined>`) forwards the converter select's pick;
`zoomIn`, `zoomOut` and `zoomFit` (`OutputEmitterRef<void>`) fire in manual zoom mode only.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A conditionally-projected extra action never shows up">
    A bare `@if` around projected content does not carry the `slot` attribute the content projection matches on —
    wrap it in an `<ng-container slot="extra-actions">` (as in the recipe above), not a bare `@if` directly around
    the action.
  </Accordion>

  <Accordion title="The search or highlights popover closes on the first click inside it">
    Both popovers are opened with `{ closeOnClick: false }` deliberately — they host repeated interaction (typing
    a search, clicking prev/next through entity occurrences), and a popover that closed on its first inner click
    would make that unusable. If you build a similar popover yourself, remember the option; the default closes on
    any click inside.
  </Accordion>

  <Accordion title="The find panel is a manual popover, and does not light-dismiss">
    A native (auto) popover would close on a click into the field that owns it, and on a click on one of its own
    tabs, which takes the focus out of the field. The panel is `popover="manual"` instead: it opens on the field's
    focus, and the bar closes it on <kbd>Escape</kbd>, on a press outside the panel and the field, and when the
    window loses the focus (a press inside the iframe).
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Preview Content" href="./preview-content.mdx">
    The full preview surface this bar is normally nested inside.
  </Card>

  <Card title="Preview service" href="./preview.mdx">
    The service every action here delegates to.
  </Card>
</Cards>
