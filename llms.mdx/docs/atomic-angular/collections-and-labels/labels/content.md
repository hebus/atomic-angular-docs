# Labels (/docs/atomic-angular/collections-and-labels/labels)

Public and private labels on a document — an autosuggest multi-select field, and a bulk-edit dialog that shows both fields side by side, gated by the labels web service's own configuration.



A **label** is a free-text tag attached to a document, either **public** (shared, visible to every user) or
**private** (visible only to the user who added it). `<multiselect-labels>` is the field that adds and removes
them on one article field; `EditLabels` is the dialog that shows the public and private fields together for a
single document.

<Callout title="Concept — labels web service">
  Whether labels are available at all — and which article fields hold the public/private lists — comes from the
  Sinequa server's **labels web service** configuration, read through `LabelService.getLabelsConfig()`. An app
  with no labels web service configured has no label fields to show; `EditLabels` renders nothing in that case
  rather than an empty dialog.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="labels-basic" title="A private-labels field on an article">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { MultiSelectLabelsComponent } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "sample-component",
      imports: [MultiSelectLabelsComponent],
      template: `
        <multiselect-labels [(article)]="article" labelsField="privatelabels1" [allowModification]="true" />
      `,
    })
    export class SampleComponent {
      // Article has no index signature of its own — a document's extra, app-specific
      // fields (like a labels field) need the double cast to bypass the overlap check.
      protected readonly article = signal<Article>({ id: "doc-1", privatelabels1: ["draft"] } as unknown as Article);
    }
    ```
  </Lang>
</CodeSample>

`labelsField` names the article property the picked/removed labels are read from and written back to — it has
to match the field the labels web service configuration actually uses for that visibility (public or private),
which is exactly what `EditLabels` resolves for you (see [Recipes](#recipes)).

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    User -- &#x22;types / picks / removes&#x22; --> Field[&#x22;MultiSelectLabelsComponent&#x22;]
    Field -- &#x22;loader(query)&#x22; --> Service[&#x22;LabelService.fetch()&#x22;]
    Service -- &#x22;client.api.labels.get()&#x22; --> Backend
    Field -- &#x22;add()/remove()&#x22; --> Backend
    Field -- &#x22;article[labelsField] = labels&#x22; --> Article[[&#x22;bound article, via [(article)]&#x22;]]"
/>

`MultiSelectLabelsComponent` wraps a `galactik` `<Autocomplete>` — suggestions come from
`client.api.labels.get(query, isPublic)`, and picking or removing a label calls
`client.api.labels.add`/`remove` directly (not through `LabelService`, which exists mainly for the bulk and
rights-checking operations used elsewhere).

## Recipes [#recipes]

### Editing both label fields for one document [#editing-both-label-fields-for-one-document]

`EditLabels` reads the labels web service configuration itself and renders a public field, a private field, or
both, depending on what the app actually exposes — the caller does not need to know the field names.

<CodeSample id="labels-edit-dialog" title="Opening the edit-labels dialog">
  <Lang value="angular">
    ```ts title="edit-labels-button.component.ts"
    import { Component, inject, Injector } from "@angular/core";
    import { EditLabels } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "edit-labels-button",
      template: `<button (click)="edit()">Edit labels…</button>`,
    })
    export class EditLabelsButtonComponent {
      private readonly injector = inject(Injector);

      protected async edit() {
        const article: Article = { id: "doc-1" } as Article;
        // Resolves with { type, article } once the dialog closes — the article carries whatever
        // label edits were made, ready to merge back into your own state if you're not re-fetching.
        const { article: edited } = await EditLabels.call(article, { injector: this.injector });
        console.log(edited);
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  article: {
    type: &#x22;ModelSignal<Article | undefined>&#x22;,
    description: &#x22;Two-way [(article)] binding — the document whose labelsField is read from and written back to.&#x22;,
  },
  labelsField: { type: &#x22;string | undefined&#x22;, description: &#x22;The article property holding this field's labels.&#x22; },
  isPublic: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Public vs. private labels — changes both the endpoint called and the field's own suggest scope.&#x22; },
  allowModification: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Whether the field lets the user add/remove labels, or only displays the current ones.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Picking a label does nothing, and a red error banner appears">
    `add()`/`remove()` call the labels web service directly and set an error flag on any rejection — most often
    the current user lacking the rights the server enforces for that visibility (public labels usually require an
    elevated right). Check `LabelService.canHandleLabels()` before assuming the field itself is broken.
  </Accordion>

  <Accordion title="EditLabels opens an empty dialog with no fields at all">
    The app has no labels web service configured, or `LabelService.getLabelsConfig()` resolved with no
    `publicLabelsField`/`privateLabelsField` at all — `EditLabels` renders nothing in that case rather than a
    misleading empty field. Confirm the server's labels web service is actually attached to the app.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Collections" href="./collections.mdx">
    Group documents into a user-managed, named collection.
  </Card>
</Cards>
