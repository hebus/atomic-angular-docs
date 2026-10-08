# Cross-cutting pipes (/docs/atomic-angular/integration/pipes)

Six template pipes with no search-specific meaning of their own — legacy filter display, a translated system string, locale-aware dates, file sizes, and search-term highlighting.



None of these pipes know anything about a query or a result — they format a value for display, and are useful
anywhere in an application, not only in a search screen.

## `highlightWord` — mark a search term inside text [#highlightword--mark-a-search-term-inside-text]

<CodeSample id="pipes-highlight-word" title="Highlighting the current search text">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, input } from "@angular/core";
    import { HighlightWordPipe } from "@sinequa/atomic-angular";

    @Component({
      selector: "sample-component",
      imports: [HighlightWordPipe],
      template: `<span *ngFor="let chunk of text() | highlightWord: query()" [class.font-bold]="chunk.match">{{ chunk.text }}</span>`,
    })
    export class SampleComponent {
      readonly text = input.required<string>();
      readonly query = input.required<string>();
    }
    ```
  </Lang>
</CodeSample>

Returns an array of `HighlightWords.Chunk` (from the `highlight-words` package), not a string — render each
chunk yourself, styling the ones with `match: true`. Matching is accent-insensitive on both sides (`café`
highlights on a search for `cafe`), since both the text and the query are Unicode-normalized and stripped of
combining diacritics before comparing.

## `syslang` — a translated system string [#syslang--a-translated-system-string]

<CodeSample id="pipes-syslang" title="A label carrying its own translations">
  <Lang value="angular">
    ```ts title="sample.component.ts" partial
    import { SyslangPipe } from "@sinequa/atomic-angular";

    // template: {{ 'Hello[fr]Bonjour' | syslang }}
    // → "Bonjour" if the current interface language is "fr", "Hello" otherwise
    // {{ 'Hello[fr]Bonjour' | syslang: 'fr' }} forces "fr" regardless of the current language
    ```
  </Lang>
</CodeSample>

A compatibility bridge for a legacy `Text[lang]Translation` syntax that predates Angular i18n — most
applications never author strings in this format themselves, but the server still returns some. Impure by
design: it re-evaluates on every `TranslocoService.langChanges$` emission, not only on a new input value, so a
label already on screen updates when the user switches language without any component code reacting to it.

## `translocoDate` — a locale-aware `DatePipe` [#translocodate--a-locale-aware-datepipe]

<CodeSample id="pipes-transloco-date" title="A date formatted in the interface language">
  <Lang value="angular">
    ```ts title="sample.component.ts" partial
    import { TranslocoDateImpurePipe } from "@sinequa/atomic-angular";

    // template: {{ document.modified | translocoDate: 'mediumDate' }}
    ```
  </Lang>
</CodeSample>

Extends Angular's own `DatePipe`, passing `TranslocoService`'s current language as the `locale` argument on
every transform — the format string (`'mediumDate'`, `'short'`, …) is Angular's own, only the locale follows
the interface language automatically instead of the app's static `LOCALE_ID`.

## `fileSize` — bytes to a unit and a magnitude [#filesize--bytes-to-a-unit-and-a-magnitude]

<CodeSample id="pipes-file-size" title="A size in bytes, split for translation">
  <Lang value="angular">
    ```ts title="sample.component.ts" partial
    import { FileSizePipe } from "@sinequa/atomic-angular";

    // template: {{ (document.size | fileSize).value | number: '1.0-1' }} {{ (document.size | fileSize).key | transloco }}
    ```
  </Lang>
</CodeSample>

Returns `{ key: string; value: number }` — a translation key (`memorySize.kb`, `.mb`, `.gb`, `.tb`, `.pb`, or
`memorySize.bytes` below 1 KB) and the numeric magnitude in that unit, **not** a formatted string. Your
application's translation catalog must define those keys; pass `value` through a number pipe and `key` through
your own translation pipe separately.

## `operator` — a legacy filter as a comparison string [#operator--a-legacy-filter-as-a-comparison-string]

<CodeSample id="pipes-operator" title="Rendering a stored legacy filter">
  <Lang value="angular">
    ```ts title="sample.component.ts" partial
    import { OperatorPipe } from "@sinequa/atomic-angular";

    // template: {{ storedFilter | operator }}
    // → "≥ 2026-01-01 ≤ 2026-03-31" for a between/and-of-gte-lte range, "= pdf" for a plain comparison
    ```
  </Lang>
</CodeSample>

Takes a `LegacyFilter` (from `@sinequa/atomic`) and renders it as a human-readable comparison, using the
interface language's date formatting for any date-valued operand. `between` and an `and` of `gte`/`lte`
collapse into one range string; every other operator renders as its symbol (`=`, `≠`, `<`, `≤`, `>`, `≥`)
followed by the value.

## Options [#options]

<TypeTable
  type="{
  &#x22;highlightWord: (word: string, clipBy?: number)&#x22;: {
    type: &#x22;HighlightWords.Chunk[]&#x22;,
    description: &#x22;word to highlight, clipBy optionally limits the returned text's length.&#x22;,
  },
  &#x22;syslang: (lang?: string)&#x22;: {
    type: &#x22;string | null&#x22;,
    description: &#x22;lang forces a language regardless of the current interface language.&#x22;,
  },
  &#x22;translocoDate: (format?: string, timezone?: string)&#x22;: {
    type: &#x22;string | null&#x22;,
    description: &#x22;Same signature as Angular's DatePipe — format defaults to DatePipe's own default.&#x22;,
  },
  fileSize: {
    type: &#x22;{ key: string; value: number }&#x22;,
    description: &#x22;No arguments. key is one of memorySize.{bytes,kb,mb,gb,tb,pb} — your app must translate it.&#x22;,
  },
  operator: {
    type: &#x22;string&#x22;,
    description: &#x22;No arguments beyond the LegacyFilter itself.&#x22;,
  },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="fileSize renders '[object Object]' in the template">
    `{{ value | fileSize }}` alone stringifies the returned `{ key, value }` object. Read `.value` and `.key`
    separately — see the recipe above — and translate `.key` through your application's own translation pipe.
  </Accordion>

  <Accordion title="A label piped through highlightWord/syslang/operator/translocoDate doesn't update when the interface language changes">
    Check the pipe is not being called from a template expression Angular has cached as pure — these four are all
    declared `pure: false` specifically so they re-run on every change-detection pass and pick up
    `TranslocoService.langChanges$`. If the surrounding component uses `OnPush` and never triggers change detection
    on a language change on its own, nothing re-evaluates any pipe, pure or not; `bootstrapApp` and the request-body
    interceptor already trigger enough application-wide activity that this is rarely the actual cause in practice.
  </Accordion>

  <Accordion title="sourceIcon returns a Font Awesome class that renders nothing">
    `SourceIconPipe` is `@deprecated` and kept only for backward compatibility — it returns a `fa-*` class string
    looked up against `AppStore.sources()`, a workplace-search-only shape most applications' custom JSON does not
    populate, in which case it silently falls back to `"far fa-file"`. Do not reach for it in new code; prefer a
    source-specific icon resolved from the document's own metadata instead.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Cross-cutting interceptors" href="./interceptors.mdx">
    The request-side counterpart — the interface language sent with every request body.
  </Card>
</Cards>
