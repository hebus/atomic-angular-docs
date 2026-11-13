# Preview Header (/docs/atomic-angular/preview/preview-header)

The header of a document preview — a title (a link when it has an href), the document's actions, always-visible metadata lines and a More details section — you provide the content, the component owns the layout.



`<preview-header>` is the header of a document preview: the title (a link when you give it an `href`), the
document's actions next to it, a few always-visible lines of metadata, and the rest behind a **More details**
toggle. It owns only the layout — which metadata fields to show, and what renders them, is entirely up to the
consuming app.

| Slot                  | What goes there                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `[slot='icon']`       | The document-type icon, before the title.                                                                                |
| `[slot='actions']`    | The buttons at the end of the title row (bookmark, close, a menu…). Each icon-only button needs its own accessible name. |
| `<tr slot="summary">` | The lines that are always visible, under the title.                                                                      |
| any other `<tr>`      | The lines behind **More details**, which is not there when there are none.                                               |

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
        <preview-header [title]="article().title" [href]="article().url1" (titleClick)="open($event)">
          <tr slot="summary">
            <th>Date</th>
            <td>{{ article().modified }}</td>
          </tr>
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
or app-specific ones — without forking the component. A conditional row is an `@if` around a single `<tr>`: the
block is projected by that root element, so a conditional `<tr slot="summary">` stays in the summary.

On a header 40rem wide or more, the summary lines sit side by side instead of stacking, and the last one — a breadcrumb,
which shortens itself to the room it has — takes the remaining width. The rows behind **More details** stay a column.

The title is a link only with an `href` (it opens in a new tab); without one it is plain text. `titleClick` fires
with the click event: call `preventDefault()` to open the document your own way (an audit event, a custom viewer).
The open icon at the end of the title shows on hover and on keyboard focus.

## Options [#options]

<TypeTable
  type="{
  title: { type: &#x22;string&#x22;, description: &#x22;Required. The document's title.&#x22; },
  href: { type: &#x22;string | undefined&#x22;, description: &#x22;Where the title links to. Without one the title is plain text.&#x22; },
}"
/>

Output: `titleClick` (`OutputEmitterRef<MouseEvent>`), fired when the title is clicked. The **More details** section
manages its own state internally (closed by default).

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
