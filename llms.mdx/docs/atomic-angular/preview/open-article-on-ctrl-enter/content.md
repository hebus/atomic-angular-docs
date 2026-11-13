# OpenArticleOnCtrlEnter (/docs/atomic-angular/preview/open-article-on-ctrl-enter)

Open an article in a new browser tab when the user presses Ctrl+Enter while the host element is focused.



`[openArticleOnCtrlEnter]` opens an article's preview in a new browser tab when the user presses **Ctrl+Enter**
while the host element is focused — the same "open in background tab" gesture browsers already give search
result links.

## Minimal example [#minimal-example]

<CodeSample id="open-article-ctrl-enter-basic" title="A result row that opens externally on Ctrl+Enter">
  <Lang value="angular">
    ```ts title="result-row.component.ts"
    import { Component, input } from "@angular/core";
    import { OpenArticleOnCtrlEnterDirective } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "result-row",
      imports: [OpenArticleOnCtrlEnterDirective],
      template: `<div tabindex="0" [article]="article()" openArticleOnCtrlEnter>{{ article().title }}</div>`,
    })
    export class ResultRowComponent {
      readonly article = input.required<Article>();
    }
    ```
  </Lang>
</CodeSample>

The host element needs to be focusable (a `tabindex`, or a naturally focusable element) for the keydown to
ever reach it.

## Options [#options]

<TypeTable
  type="{
  article: { type: &#x22;Article | undefined&#x22;, description: &#x22;Required. The article to open externally on Ctrl+Enter.&#x22; },
}"
/>

This directive has no outputs — opening happens as a side effect through the injected `PreviewService`.

## What's next [#whats-next]

<Cards>
  <Card title="SelectArticle" href="./select-article.mdx">
    The plain-click/Enter counterpart, for selecting rather than opening externally.
  </Card>
</Cards>
