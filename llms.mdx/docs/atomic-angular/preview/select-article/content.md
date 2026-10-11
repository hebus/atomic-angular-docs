# SelectArticle (/docs/atomic-angular/preview/select-article)

Select an article on click or Enter — replace it as the current selection, redirect to a preview route, or emit it — from a single directive.



`[selectArticle]` selects an article when its host element is clicked or receives an Enter keypress, using one
of three strategies.

## Minimal example [#minimal-example]

<CodeSample id="select-article-basic" title="Selecting a result row">
  <Lang value="angular">
    ```ts title="result-row.component.ts"
    import { Component, input } from "@angular/core";
    import { SelectArticleDirective } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "result-row",
      imports: [SelectArticleDirective],
      template: `<div [article]="article()" selectArticle class="cursor-pointer">{{ article().title }}</div>`,
    })
    export class ResultRowComponent {
      readonly article = input.required<Article>();
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  article: { type: &#x22;Partial<Article> | undefined&#x22;, description: &#x22;Required. The article to select on click or Enter.&#x22; },
  strategy: {
    type: '&#x22;replace&#x22; | &#x22;redirect&#x22; | &#x22;emit&#x22;',
    default: '&#x22;replace&#x22;',
    description: '&#x22;replace&#x22; makes the article the current selection, &#x22;redirect&#x22; navigates to a preview route, &#x22;emit&#x22; only fires `selected`.',
  },
  redirectUrl: { type: &#x22;string&#x22;, default: '&#x22;/preview&#x22;', description: 'The route to navigate to when strategy is &#x22;redirect&#x22; (appended with the article\'s id).' },
}"
/>

This directive has one output, `selected` (`OutputEmitterRef<void>`), emitted only when `strategy="emit"`.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="strategy=&#x22;redirect&#x22; replaces the current selection instead of navigating, for some articles">
    `"redirect"` only navigates when the article has an `id`. Without one, it falls back to `"replace"` — the same
    behavior as if no strategy were set at all. Make sure the `article` passed in actually carries an `id` before
    relying on the redirect.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="OpenArticleOnCtrlEnter" href="./open-article-on-ctrl-enter.mdx">
    Open an article in a new tab instead, on Ctrl+Enter.
  </Card>
</Cards>
