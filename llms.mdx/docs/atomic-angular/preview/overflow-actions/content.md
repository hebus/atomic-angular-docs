# Overflow Actions (/docs/atomic-angular/preview/overflow-actions)

The row of secondary actions of a document — bookmark, copy the link, expand — as aligned icon buttons, with a "…" menu for the ones that do not fit.



`<overflow-actions>` is the row of secondary actions next to the title of a document, in a preview header or a result
card: the bookmark toggle, a button that copies the link of the document and a button that expands the view. They are
aligned 24px icon buttons; once there are more than `maxInline` of them, the extra ones go into a "…" menu that closes
the row.

```html
<overflow-actions [article]="article()" [canExpand]="canExpand()" [expanded]="expanded()" (expandToggle)="toggle()" />
```

The component only reports what was asked: `expandToggle` says the expand button was pressed, and the host does the
expanding (it is the host that knows what a bigger view is). The labels, the tooltips and the "Link copied" toast are
translated by the component, in its own `overflow-actions` scope (English, French and German).

## Minimal example [#minimal-example]

<CodeSample id="overflow-actions-basic" title="The default row in the header of a preview">
  <Lang value="angular">
    ```ts title="my-preview-header.component.ts"
    import { Component, input, signal } from "@angular/core";
    import { OverflowActionsComponent } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";

    @Component({
      selector: "my-preview-header",
      imports: [OverflowActionsComponent],
      template: `
        <h2>{{ article().title }}</h2>
        <overflow-actions [article]="article()" [expanded]="expanded()" (expandToggle)="expanded.set(!expanded())" />
      `,
    })
    export class MyPreviewHeaderComponent {
      readonly article = input.required<Article>();
      readonly expanded = signal(false);
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

The built-in buttons come first, in this order, then the `actions` of the host:

1. **Bookmark** (`<bookmark-button>`), when there is an `article`. It is a stateful button of its own, so it always stays
   in the row, and it counts in `maxInline`.
2. **Copy link**, when the article has an `http:` or `https:` `url1`. It copies the link, shows a check for two seconds
   and announces "Link copied to clipboard".
3. **Expand**, unless `canExpand` is `false`. It turns into **Back to the page** while `expanded` is `true`; the
   two states have their own icons (`ExpandIcon` and `CollapseIcon` of `@sinequa/galactik`).
4. The `actions` of the host.

The first `maxInline` places of the row (3 by default) are filled in that order and the rest goes into the "…" menu:
with the three built-in buttons, the menu only appears once the host adds an action. Content projected into the
component is never counted: it follows the buttons in the row, as it is.

<Mermaid
  chart="flowchart LR
  A[Built-in buttons that apply] --> B[actions of the host]
  B --> C{More than maxInline?}
  C -->|no| D[All in the row]
  C -->|yes| E[First ones in the row, the rest in the menu]"
/>

## Recipes [#recipes]

### Switch a built-in button off [#switch-a-built-in-button-off]

Per component with `config`, or once for the application with the `OVERFLOW_ACTIONS_CONFIG` token. A partial value is
merged over the defaults (all three on), and the `config` input is merged over the token.

<CodeSample id="overflow-actions-config" title="No copy-link button anywhere in the application">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import type { ApplicationConfig } from "@angular/core";
    import { OVERFLOW_ACTIONS_CONFIG } from "@sinequa/atomic-angular";

    export const appConfig: ApplicationConfig = {
      providers: [{ provide: OVERFLOW_ACTIONS_CONFIG, useValue: { copyLink: false } }],
    };
    ```
  </Lang>
</CodeSample>

### Add actions that may overflow [#add-actions-that-may-overflow]

Give `actions` a list of `OverflowAction` (an `id`, an already translated `label` and an icon component). They follow the
built-in buttons and move into the menu once the row is full. `selected` emits the `id` of the one that was chosen, from
its button or from the menu.

<CodeSample id="overflow-actions-actions" title="Download and share, which overflow into the menu">
  <Lang value="angular">
    ```ts title="my-actions.component.ts"
    import { Component, input } from "@angular/core";
    import { OverflowActionsComponent, type OverflowAction } from "@sinequa/atomic-angular";
    import type { Article } from "@sinequa/atomic";
    import { DownloadIcon, SendIcon } from "@sinequa/galactik";

    @Component({
      selector: "my-actions",
      imports: [OverflowActionsComponent],
      template: `<overflow-actions [article]="article()" [actions]="actions" (selected)="run($event)" />`,
    })
    export class MyActionsComponent {
      readonly article = input.required<Article>();

      protected readonly actions: OverflowAction[] = [
        { id: "download", label: "Download", icon: DownloadIcon },
        { id: "share", label: "Share", icon: SendIcon },
      ];

      protected run(id: string): void {
        console.log("chosen:", id);
      }
    }
    ```
  </Lang>
</CodeSample>

### Add a button that never goes into the menu [#add-a-button-that-never-goes-into-the-menu]

Project it. It sits in the row after the built-in buttons, as it is: give it an accessible name and the look of the
others (`variant="tertiary" scheme="neutral" size="sm" [iconOnly]="true"`).

```html
<overflow-actions [article]="article()">
  <button type="button" variant="tertiary" scheme="neutral" size="sm" [iconOnly]="true" aria-label="Print" (click)="print()">
    <printer-icon />
  </button>
</overflow-actions>
```

## Options [#options]

<TypeTable
  type="{
  article: { type: &#x22;Article | undefined&#x22;, description: &#x22;The document the actions are about. Without one there is no bookmark and no link to copy.&#x22; },
  bookmarkTarget: { type: '&#x22;bookmarks&#x22; | &#x22;collections&#x22;', default: '&#x22;bookmarks&#x22;', description: &#x22;Where the bookmark button files the document: the user's bookmarks, or the collections (a click opens the add-to-collection panel). Same as the target input of the bookmark button.&#x22; },
  config: { type: &#x22;Partial<OverflowActionsConfig>&#x22;, default: &#x22;{}&#x22;, description: &#x22;Which built-in buttons to bring (`bookmark`, `copyLink`, `expand`), merged over OVERFLOW_ACTIONS_CONFIG and the defaults (all on).&#x22; },
  canExpand: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;false where there is no bigger container to grow into (a full-screen sheet): the expand button goes.&#x22; },
  expanded: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;The view is expanded: the expand button turns into its counterpart.&#x22; },
  actions: { type: &#x22;readonly OverflowAction[]&#x22;, default: &#x22;[]&#x22;, description: &#x22;Actions of the host that follow the built-in ones, and overflow into the menu with them.&#x22; },
  maxInline: { type: &#x22;number&#x22;, default: &#x22;3&#x22;, description: &#x22;How many actions stay in the row, the bookmark included. The others go into the menu.&#x22; },
}"
/>

Outputs: `expandToggle` (`OutputEmitterRef<void>`), fired when the expand or back button is pressed, and `selected`
(`OutputEmitterRef<string>`), fired with the `id` of the host action that was chosen.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The expand button does nothing">
    The component does not expand anything: it emits `expandToggle` and the host flips its own state (and passes it back in
    `expanded`, which only changes the label and the icon). Without a listener on `expandToggle` the button is inert.
  </Accordion>

  <Accordion title="The copy-link button is missing">
    It needs an `article` whose `url1` is an `http:` or `https:` link: a missing, relative or `javascript:` url leaves the
    button out on purpose, because it is not something to share.
  </Accordion>

  <Accordion title="My projected buttons do not go into the menu">
    Projected content is never counted in `maxInline`: it stays in the row after the built-in buttons. Use `actions` for
    what may overflow.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Preview Header" href="./preview-header.mdx">
    The title row these actions usually go into, through its actions slot.
  </Card>

  <Card title="Preview Content" href="./preview-content.mdx">
    The preview surface the expanded view is made for.
  </Card>
</Cards>
