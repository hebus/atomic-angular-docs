# Textarea (/docs/galactik/form/textarea)

A native textarea wrapped like Input, with three height strategies and a rows-independent min/max bound for content-driven auto-sizing.



`TextareaGroup` is the multi-line sibling of [`InputGroup`](./input.mdx) — same state model, same scheme
palette, same counter typography — plus a `resize` strategy for how its height behaves.

## Minimal example [#minimal-example]

<CodeSample id="textarea-basic" title="A plain multi-line field">
  <Lang value="angular">
    ```ts title="comment-field.component.ts"
    import { Component, signal } from "@angular/core";
    import { FormsModule } from "@angular/forms";
    import { TextareaComponent, TextareaControlDirective } from "@sinequa/galactik";

    @Component({
      selector: "comment-field",
      imports: [FormsModule, TextareaComponent, TextareaControlDirective],
      template: `
        <textarea-group>
          <textarea textarea-control rows="4" placeholder="Your message…" [(ngModel)]="comment"></textarea>
        </textarea-group>
      `,
    })
    export class CommentFieldComponent {
      readonly comment = signal("");
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Resize{&#x22;resize&#x22;} -- vertical --> Rows[&#x22;height seeded by rows, user drags the handle&#x22;]
    Resize -- none --> Locked[&#x22;height locked to rows&#x22;]
    Resize -- auto --> Supports{&#x22;supports field-sizing content?&#x22;}
    Supports -- supported --> Content[&#x22;field-sizing: content, handle removed, rows ignored&#x22;]
    Supports -- &#x22;not supported (Firefox)&#x22; --> Fallback[&#x22;falls back to rows + drag handle&#x22;]
    Content --> Bounds[&#x22;min-height / max-height from minRows / maxRows&#x22;]
    Fallback --> Bounds
    Rows --> Bounds
    Locked --> Bounds"
/>

`resize="auto"` is a progressive enhancement: the CSS `field-sizing: content` property ships in Chrome/Edge
123+ and Safari 17.4+, but not in Firefox, so the drag handle is only removed inside an `@supports` guard —
applying it unconditionally would leave Firefox with a box that neither grows nor can be dragged.

## Recipes [#recipes]

### Auto-sizing bounded by minRows/maxRows [#auto-sizing-bounded-by-minrowsmaxrows]

`rows` has no effect once `field-sizing: content` applies, so `minRows`/`maxRows` exist precisely to bound an
auto-sizing field — the sizing API that survives where `rows` no longer does.

<CodeSample id="textarea-autosize" title="One line by default, three at most, then scrolls">
  <Lang value="angular">
    ```html title="auto-sizing.html"
    <textarea-group resize="auto" [maxRows]="3">
      <textarea textarea-control rows="1" placeholder="Your message…"></textarea>
    </textarea-group>
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  size: { type: '&#x22;lg&#x22; | &#x22;md&#x22; | &#x22;sm&#x22;', default: '&#x22;md&#x22;', description: &#x22;Padding, radius and type scale — never a fixed height.&#x22; },
  scheme: { type: '&#x22;default&#x22; | &#x22;success&#x22; | &#x22;error&#x22;', default: '&#x22;default&#x22;', description: &#x22;Tints border, focus ring and text.&#x22; },
  resize: {
    type: '&#x22;vertical&#x22; | &#x22;none&#x22; | &#x22;auto&#x22;',
    default: '&#x22;vertical&#x22;',
    description: &#x22;vertical: native drag handle. none: locked to rows. auto: grows with content (field-sizing).&#x22;,
  },
  minRows: { type: &#x22;number | undefined&#x22;, description: &#x22;Height floor in lines of text. Applied as min-height.&#x22; },
  maxRows: { type: &#x22;number | undefined&#x22;, description: &#x22;Height ceiling in lines of text; the control scrolls past it. Applied as max-height.&#x22; },
  filled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Tinted background, no border.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="An auto-sizing field always starts at one line, ignoring rows">
    Expected: per the `field-sizing` spec, `rows`/`cols` have no effect once `field-sizing: content` applies. Use
    `minRows`/`maxRows` to bound the height instead — they compile to `min-height`/`max-height`, the only sizing
    `field-sizing` honours. Keep writing `rows` anyway: it is what the unsupported-engine (Firefox) fallback uses.
  </Accordion>

  <Accordion title="A fixed height class on the control breaks auto-sizing">
    A `height` utility on the control cancels `field-sizing` outright. Bound the height with `minRows`/`maxRows` on
    the wrapper instead of a fixed `h-*` class on the control in `auto` mode.
  </Accordion>

  <Accordion title="Toggling read-only dynamically leaves the field looking editable">
    Bind `[attr.readonly]`, never `[readonly]`. The read-only look keys off `has-[[readonly]]`, an **attribute**
    selector — Angular's `[readonly]` binding sets the `readOnly` DOM *property* and reflects nothing into the
    markup, so the field behaves as read-only while still looking editable:

    ```html title="fix" partial
    <textarea textarea-control [attr.readonly]="editing() ? null : ''"></textarea>
    ```

    The same applies to `[attr.disabled]` if toggled dynamically outside a form control.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Input" href="./input.mdx">
    The single-line sibling — same state model, scheme palette and counter.
  </Card>
</Cards>
