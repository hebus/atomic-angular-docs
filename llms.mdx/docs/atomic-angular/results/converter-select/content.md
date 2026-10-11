# Converter Select (/docs/atomic-angular/results/converter-select)

The dropdown that lets a user pick which converted format previews a document, built from the app's configured converters and hidden entirely when only one applies.



`<converter-select>` renders only when `previewMultiConversion` is on **and** more than one configured
converter matches the currently loaded preview's available conversions — otherwise the host hides itself
entirely, so it can be dropped into a toolbar without leaving a gap when there is nothing to choose between.

## Minimal example [#minimal-example]

`<preview-content>` already embeds this dropdown internally (through `<preview-actions>`) and owns the
resulting conversion itself — reach for `<converter-select>` directly only when building a **custom** preview
surface that does not use `<preview-content>`.

<CodeSample id="converter-select-basic" title="Standalone, next to a custom preview surface">
  <Lang value="angular">
    ```ts title="custom-preview.component.ts"
    import { Component, signal } from "@angular/core";
    import { ConverterSelectComponent } from "@sinequa/atomic-angular";
    import type { CConverter } from "@sinequa/atomic-angular";
    import type { PreviewData } from "@sinequa/atomic";

    @Component({
      selector: "custom-preview",
      imports: [ConverterSelectComponent],
      template: `<converter-select [previewData]="previewData()" (onConversionSelect)="conversion.set($event)" />`,
    })
    export class CustomPreviewComponent {
      protected readonly previewData = signal<PreviewData | undefined>(undefined);
      protected readonly conversion = signal<CConverter | undefined>(undefined);
    }
    ```
  </Lang>
</CodeSample>

Defaults to the converter marked `default` in configuration, then the one marked `primary`, when several
match.

## Options [#options]

<TypeTable
  type="{
  previewData: { type: &#x22;PreviewData | undefined&#x22;, description: &#x22;Loaded preview data; its conversions are matched against general.converters.&#x22; },
  activeConversion: {
    type: &#x22;CConverter | undefined&#x22;,
    description: &#x22;Optional. Re-syncs the dropdown's selection on (re)mount to whatever the host already has selected, instead of resetting to the first option.&#x22;,
  },
}"
/>

`onConversionSelect` emits the selected `CConverter`, or `undefined` when none applies.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The dropdown silently resets to the first option after an unrelated re-render">
    This component works standalone with no `activeConversion`, defaulting to the first/primary option every time
    it (re)mounts — which is exactly what happens if it sits inside a conditionally-rendered branch that gets torn
    down and rebuilt by an unrelated reactive change (nested inside `<preview-actions>` inside
    `<preview-content>`'s own conditional branch, for instance). Pass the host's current conversion back as
    `[activeConversion]` so the dropdown re-syncs instead of resetting.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Preview" href="../preview/index.mdx">
    Where the loaded PreviewData this component reads conversions from comes from.
  </Card>
</Cards>
