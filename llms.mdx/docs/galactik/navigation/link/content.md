# Link (/docs/galactik/navigation/link)

Style a native anchor as a navigation link, internal or external, while keeping every native and router semantic intact.



`Link` styles a native `<a>` as a navigation link while keeping every native and router semantic intact —
`href`, `routerLink`, `target`, `aria-current`, and so on. Hover, active and focus rely on native
pseudo-classes; the current-page and disabled looks react directly to the `aria-current="page"` and
`aria-disabled` attributes, however they got set.

## Minimal example [#minimal-example]

<CodeSample id="link-basic" title="A styled anchor">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { LinkComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [LinkComponent],
      template: `<a link href="/pricing">Pricing</a>`,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`Link` never touches `aria-current` itself — its styling only reacts to the attribute being present, however
it got there. That is what lets Angular Router own it entirely:

<Mermaid
  chart="flowchart TD
    Consumer -- host attribute --> LinkComponent[&#x22;a[link] / Link&#x22;]
    LinkComponent -- openWindow=true --> AutoIcon[&#x22;external-link icon (auto, linkIconRight)&#x22;]
    LinkComponent -- &#x22;attr.target / attr.rel&#x22; --> Browser[(&#x22;new tab/window&#x22;)]
    Router[&#x22;Angular Router (routerLink + routerLinkActive)&#x22;] -- sets --> AriaCurrent[&#x22;aria-current=page&#x22;]
    AriaCurrent -- matched by CVA selector --> LinkComponent"
/>

## Recipes [#recipes]

### Router integration [#router-integration]

Let `routerLinkActive` + `[ariaCurrentWhenActive]="'page'"` drive the current-page look — this is the
supported way, not comparing the current URL by hand.

<CodeSample id="link-router" title="A nav bar with an active-page indicator">
  <Lang value="angular">
    ```ts title="nav.component.ts"
    import { Component } from "@angular/core";
    import { RouterLink, RouterLinkActive } from "@angular/router";
    import { LinkComponent } from "@sinequa/galactik";

    @Component({
      selector: "app-nav",
      imports: [LinkComponent, RouterLink, RouterLinkActive],
      template: `
        <nav class="flex flex-wrap items-center gap-4">
          <a link [routerLink]="['/home']" routerLinkActive [ariaCurrentWhenActive]="'page'">Home</a>
          <a link [routerLink]="['/docs']" routerLinkActive [ariaCurrentWhenActive]="'page'">Docs</a>
        </nav>
      `,
    })
    export class NavComponent {}
    ```
  </Lang>
</CodeSample>

### External link [#external-link]

`openWindow` fully owns `target`/`rel` — the same way `disabled` owns `aria-disabled`/`tabindex` — and appends
the external-link icon automatically. Don't set `target`/`rel` manually on a link that binds it, and don't use
it if a custom `rel` is needed (use a manual `link-icon-right` in that case instead).

```html
<a link [openWindow]="true" href="https://docs.sinequa.com">Read the docs</a>
```

## Options [#options]

<TypeTable
  type="{
  size: { type: '&#x22;sm&#x22; | &#x22;md&#x22;', default: '&#x22;sm&#x22;', description: '12px / 14px (&#x22;small&#x22;/&#x22;medium&#x22; aliases also accepted).' },
  visited: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Adds the previously-visited bottom-border treatment.&#x22; },
  openWindow: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: 'Sets target=&#x22;_blank&#x22;, rel=&#x22;noopener noreferrer&#x22; and renders the trailing external-link icon.' },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: 'Sets aria-disabled=&#x22;true&#x22; and tabindex=&#x22;-1&#x22; — native anchors have no real disabled attribute.' },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A disabled link is still reachable by a direct URL, or via a search engine">
    `disabled` is a purely visual/semantic flag — native anchors have no real `disabled` attribute, so the link
    stays present in the DOM with its `href` intact unless you remove that separately. `aria-disabled` and
    `tabindex="-1"` only take it out of the tab order and suppress hover/active/click styling.
  </Accordion>

  <Accordion title="The current-page style never appears, even though the route matches">
    Check that something is actually setting `aria-current="page"` — `Link` never sets it itself. The supported
    path is `routerLinkActive` + `[ariaCurrentWhenActive]="'page'"`; setting it by hand elsewhere risks fighting
    the router for ownership of the same attribute.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Sidebar" href="./sidebar.mdx">
    Sidebar items follow the exact same aria-current contract as Link.
  </Card>
</Cards>
