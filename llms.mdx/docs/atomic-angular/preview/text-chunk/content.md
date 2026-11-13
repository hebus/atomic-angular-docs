# Text Chunk (/docs/atomic-angular/preview/text-chunk)

Fetch surrounding-context text chunks for a document's highlight locations, from the Sinequa backend.



`TextChunkService` retrieves text chunks — a highlight location plus a configurable number of sentences of
context on either side — for a given document. Used where a preview needs to show highlighted passages without
loading the whole converted document.

## Minimal example [#minimal-example]

<CodeSample id="text-chunk-basic" title="Fetching two chunks of context around a match">
  <Lang value="angular">
    ```ts title="passage-context.component.ts"
    import { Component, inject } from "@angular/core";
    import { TextChunkService } from "@sinequa/atomic-angular";
    import type { Query } from "@sinequa/atomic";

    @Component({
      selector: "passage-context",
      template: `<button (click)="load()">Load context</button>`,
    })
    export class PassageContextComponent {
      private readonly textChunkService = inject(TextChunkService);

      protected load() {
        const query: Query = { name: "my-query", text: "quarterly report" };

        this.textChunkService
          .getTextChunks("doc-42", [{ offset: 0, length: 100 }], ["extractslocations", "matchlocations"], query, 2, 2)
          .subscribe(chunks => console.log(chunks));
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  id: { type: &#x22;string&#x22;, description: &#x22;The document's record id.&#x22; },
  textChunks: { type: &#x22;TextLocation[]&#x22;, description: &#x22;The text locations to fetch chunks for.&#x22; },
  highlights: { type: &#x22;string[]&#x22;, description: &#x22;Highlight category names to apply within each chunk.&#x22; },
  query: { type: &#x22;Query&#x22;, description: &#x22;The query used to retrieve the chunks.&#x22; },
  leftSentencesCount: { type: &#x22;number&#x22;, description: &#x22;Sentences of context to include before each chunk.&#x22; },
  rightSentencesCount: { type: &#x22;number&#x22;, description: &#x22;Sentences of context to include after each chunk.&#x22; },
}"
/>

`getTextChunks(...)` returns `Observable<TextChunk[]>`.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="subscribe(chunks => ...) never runs after a backend error, with no error callback either">
    The service catches the request's error internally and returns a plain `[]` from that `catchError` handler —
    not `of([])`. RxJS treats a returned array as a source to flatten **element by element**, so an empty array
    means the resulting observable completes having emitted **nothing at all**: your `next` callback never fires,
    and neither does an `error` callback (the error was already caught). If you need to tell "the request failed"
    apart from "the request legitimately returned zero chunks", add your own `catchError`/`finalize` before
    subscribing rather than relying on this service's built-in one.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Preview service" href="./preview.mdx">
    The service driving the preview surface these chunks are shown alongside.
  </Card>
</Cards>
