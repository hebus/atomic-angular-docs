# Preview Header (/docs/atomic-angular/preview/preview-header)

A collapsible metadata panel for a document preview — you provide the rows, the component owns only the collapsible shell and their two-column (key | value) layout.



`<preview-header>` is a collapsible container for document-preview details: a title, a toggle chevron, and a
two-column table (key | value) whose rows are entirely projected by the caller. It owns only the shell — which metadata fields to
show, and what renders them, is entirely up to the consuming app.

## Minimal example [#minimal-example]

<CodeSample id="preview-header-basic" title="Two metadata rows above a preview">
  <Lang value="angular">
    ```ts title="my-preview.component.ts"
    import { Component, input } from "@angular/core";
    import { PreviewHeaderComponent } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "my-preview",
      imports: [PreviewHeaderComponent],
      template: `
        <preview-header [title]="article().title">
          <tr>
            <th>Type</th>
            <td>{{ article().docformat }}</td>
          </tr>
          @if (article().authors?.length) {
            <tr>
              <th>Author</th>
              <td>{{ article().authors?.join(", ") }}</td>
            </tr>
          }
        </preview-header>
      `,
    })
    export class MyPreviewComponent {
      readonly article = input.required<Article>();
    }
    ```
  </Lang>
</CodeSample>

Two different host apps can project entirely different rows into the same `<preview-header>` — fewer fields,
or app-specific ones — without forking the component. A conditional row is written with a plain `@if` around
the `<tr>`, same as any other content projection.

## Options [#options]

<TypeTable
  type="{
  title: { type: &#x22;string&#x22;, description: &#x22;Required. The document's title, shown in the always-visible summary.&#x22; },
}"
/>

This component has no outputs — it manages its own open/collapsed state internally (open by default).

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A row shows a third column, or its value is misaligned">
    The table is a native two-column table: every projected `<tr>` must contain exactly one `<th>` (the key) and
    one `<td>` (the value). A cell given a non-table `display` (for example `inline-flex` on the `<td>`) leaves the
    table layout and is rendered as an extra anonymous cell. Put the layout on a `<div>` inside the `<td>` instead.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Preview Content" href="./preview-content.mdx">
    Where this header typically sits, above the iframe or Markdown fallback.
  </Card>
</Cards>
