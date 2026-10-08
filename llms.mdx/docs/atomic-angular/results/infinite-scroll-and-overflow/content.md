# Infinite Scroll & Overflow (/docs/atomic-angular/results/infinite-scroll-and-overflow)

Two small layout directives with no visual output of their own — load more when an element enters the viewport, and count how many items actually fit before a "more" trigger.



Neither directive renders anything: `InfinityScrollDirective` fires an event when its host becomes visible,
and the `overflowManager` family hides whichever items do not fit and reports how many do.

## Infinite scroll [#infinite-scroll]

<CodeSample id="infinite-scroll-basic" title="Loading more results near the bottom">
  <Lang value="angular">
    ```ts title="results-list.component.ts"
    import { Component } from "@angular/core";
    import { InfinityScrollDirective } from "@sinequa/atomic-angular";

    @Component({
      selector: "results-list",
      imports: [InfinityScrollDirective],
      template: `<div infinity-scroll (onScroll)="loadMore()"></div>`,
    })
    export class ResultsListComponent {
      protected loadMore() {
        /* ... */
      }
    }
    ```
  </Lang>
</CodeSample>

Built on `IntersectionObserver`: `onScroll` fires once the host element enters the viewport, typically a thin
sentinel `<div>` placed at the end of a list.

<TypeTable
  type="{
  onScroll: { type: &#x22;OutputEmitterRef<void>&#x22;, description: &#x22;Emitted when the host becomes visible in the viewport.&#x22; },
}"
/>

## Overflow manager [#overflow-manager]

Three directives working together: `overflowManager` on the container, `overflowItem` on each candidate item,
and `overflowStop` on the trigger whose space must always stay clear (a "+N more" button, typically).

<CodeSample id="overflow-manager-basic" title="Counting how many tags fit">
  <Lang value="angular">
    ```ts title="tag-row.component.ts"
    import { Component } from "@angular/core";
    import { OverflowItemDirective, OverflowManagerDirective, OverflowStopDirective } from "@sinequa/atomic-angular";

    @Component({
      selector: "tag-row",
      imports: [OverflowManagerDirective, OverflowItemDirective, OverflowStopDirective],
      template: `
        <div class="flex gap-2" overflowManager (count)="onCount($event)">
          <ul>
            @for (item of tags; track item) {
              <li overflowItem>{{ item }}</li>
            }
          </ul>
          <div overflowStop>more…</div>
        </div>
      `,
    })
    export class TagRowComponent {
      protected readonly tags = ["alpha", "beta", "gamma", "delta", "epsilon"];

      protected onCount(count: number) {
        console.log(`${count} tag(s) fit`);
      }
    }
    ```
  </Lang>
</CodeSample>

The boundary measured is the container's own content edge, not the stop element's position — which keeps the
measurement correct even inside a flex layout, since nothing depends on a sibling staying where expected. The
stop element's *size* is reserved only once not every item fits (unless `reserveStop` forces it to always be
reserved), so the last visible item never overlaps the trigger.

<TypeTable
  type="{
  target: { type: &#x22;ElementRef | undefined&#x22;, description: &#x22;Element to observe for resize. Defaults to the host itself.&#x22; },
  margin: { type: &#x22;number&#x22;, default: &#x22;4&#x22;, description: &#x22;Slack subtracted from the container's content edge, in pixels — not a CSS length string.&#x22; },
  direction: { type: '&#x22;horizontal&#x22; | &#x22;vertical&#x22;', default: '&#x22;horizontal&#x22;' },
  reserveStop: {
    type: &#x22;boolean&#x22;,
    default: &#x22;false&#x22;,
    description: &#x22;Always reserve the stop element's space, even when every item fits — for a trigger that stays permanently visible.&#x22;,
  },
  count: { type: &#x22;OutputEmitterRef<number>&#x22;, description: &#x22;Number of items that fit, debounced.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="infinityScroll doesn't register in the template">
    The selector is the kebab-case attribute `[infinity-scroll]` (and the class is `InfinityScrollDirective&#x60;,
    spelled with &#x2A;*"Infinity"**, not "Infinite") — `<div infinity-scroll (onScroll)="...">`, not a camelCase
    `infinityScroll` binding.
  </Accordion>

  <Accordion title="margin=&#x22;4px&#x22; fails to compile, or has no visible effect">
    `margin` is a plain `number` of pixels, consumed directly in a `getBoundingClientRect()`-based calculation —
    not a CSS length string. Pass `[margin]="8"`, never `margin="8px"`.
  </Accordion>

  <Accordion title="Items don't recount after the container is resized, when overflowManager is a host directive">
    `overflowManager` needs direct DOM access and cannot be used through `hostDirectives` — wrap it in an
    `ng-container` with an explicit `[target]` pointing at the real container element instead.
  </Accordion>

  <Accordion title="Every item stays visible after translations load, ignoring their new (wider) text">
    `overflowManager` recounts when the container resizes or an individual item's size changes, but a Transloco
    translation load does not itself resize anything if it fires before layout — debounce
    `TranslocoService.events$` and call the directive's own `countItems()` (via `viewChild`) once the language
    actually finishes loading.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Getting started" href="../start.mdx">
    Back to the beginning, if you have not read it yet.
  </Card>
</Cards>
