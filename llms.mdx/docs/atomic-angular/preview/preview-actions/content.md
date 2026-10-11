# Preview Actions (/docs/atomic-angular/preview/preview-actions)

The toolbar overlaid on a document preview — a converter dropdown, zoom controls, search-in-document, and a highlights popover — plus a slot for app-specific actions.



`<preview-actions>` is the floating toolbar `<preview-content>` overlays on its iframe: a converter dropdown,
zoom fit/in/out, a search-in-document popover, and a highlights popover — everything a zoomable, searchable
`PreviewService` needs, collapsed behind a `<floating-toolbar>` trigger.

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

## Recipes [#recipes]

### Add an app-specific action [#add-an-app-specific-action]

The built-in actions (converter, zoom, search, highlights) are generic to any preview — anything app-specific,
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
              <button variant="tertiary" [iconOnly]="true" size="sm" (click)="toggleAIDescription()">AI</button>
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
    description: &#x22;false hides the search-in-document trigger/popover entirely. Zoom and highlights stay unaffected.&#x22;,
  },
}"
/>

This component has one output, `onConversionSelect` (`OutputEmitterRef<CConverter | undefined>`), forwarding
the converter dropdown's pick.

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
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Preview Content" href="./preview-content.mdx">
    The full preview surface this toolbar is normally nested inside.
  </Card>

  <Card title="Preview service" href="./preview.mdx">
    The service every action here delegates to.
  </Card>
</Cards>
