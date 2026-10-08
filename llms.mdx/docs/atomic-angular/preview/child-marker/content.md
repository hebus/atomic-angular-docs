# ChildMarker (/docs/atomic-angular/preview/child-marker)

Mark a projected <ng-template> so a parent component can discover and render it dynamically, for structural composition patterns like a @for loop over projected children.



`[childMarker]` marks a projected `<ng-template>` and exposes its `TemplateRef` publicly, so the parent
component that receives it (typically through `contentChildren`) can render it wherever and however many times
it needs to — a `@for` loop being the common case.

## Minimal example [#minimal-example]

<CodeSample id="child-marker-basic" title="Projecting a repeatable template into a parent-controlled list">
  <Lang value="angular">
    ```ts title="sponsored-links.component.ts"
    import { Component, contentChild } from "@angular/core";
    import { ChildMarkerDirective } from "@sinequa/atomic-angular";

    @Component({
      selector: "sponsored-links",
      template: `
        @if (marked(); as marker) {
          @for (link of links; track link) {
            <ng-container [ngTemplateOutlet]="marker.template" [ngTemplateOutletContext]="{ $implicit: link }" />
          }
        }
      `,
    })
    export class SponsoredLinksComponent {
      protected readonly marked = contentChild(ChildMarkerDirective);
      protected readonly links = ["/a", "/b", "/c"];
    }
    ```
  </Lang>
</CodeSample>

```html title="usage.html" partial
<sponsored-links>
  <span *childMarker>Sponsored</span>
</sponsored-links>
```

## Options [#options]

<TypeTable
  type="{
  template: { type: &#x22;TemplateRef<unknown>&#x22;, description: &#x22;The marked element's TemplateRef, injected and exposed for the parent to render.&#x22; },
}"
/>

This directive has no inputs of its own and no outputs — it exists purely to expose `template` to a querying
parent.
