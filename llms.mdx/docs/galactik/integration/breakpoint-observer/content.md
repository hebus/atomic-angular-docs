# BreakpointObserverService (/docs/galactik/integration/breakpoint-observer)

Answer one question as a signal — is the viewport narrower than the md breakpoint? — for structural choices CSS cannot express.



`BreakpointObserverService` answers one question as a signal: is the viewport narrower than the `md`
breakpoint (768px)? It exists for the cases CSS cannot express — choosing a component (a sheet instead of a
side panel), a placement (`bottom-start` instead of `left-start`), a size input.

<Callout title="Prefer a Tailwind md: variant when you can">
  Anything that is purely a matter of layout belongs in a Tailwind `md:` variant instead: the CSS costs nothing
  at runtime, needs no injection, and cannot fall out of sync with the service.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="breakpoint-observer-basic" title="Choosing a component based on viewport width">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, computed, inject } from "@angular/core";
    import { BreakpointObserverService } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      template: `
        @if (breakpoints.isMobile()) {
          <sheet-previewer [record]="record()" />
        } @else {
          <preview-column [record]="record()" />
        }
      `,
    })
    export class SampleComponent {
      protected readonly breakpoints = inject(BreakpointObserverService);
      protected readonly menuPlacement = computed(() => (this.breakpoints.isMobile() ? "bottom-start" : "left-start"));
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

The service is backed by `matchMedia`, observing `(width < 768px)` — the exact negation of Tailwind's `md`, so
the signal and the CSS always agree at every width. It reacts to a resize with no `resize` listener of its
own, removes its listener when the injector is destroyed, and is inert under server-side rendering (no
`window` access — the signal stays `false`).

The viewport is measured in the constructor, not in an `afterNextRender` callback, so a consumer that injects
the service and reads `isMobile()` during change detection — a `computed`, a template expression — gets the
real answer straight away, with no render needed first.

## Options [#options]

<TypeTable
  type="{
  isMobile: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;true while the viewport is narrower than 768px.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A unit test depending on the breakpoint can't be driven to the mobile state">
    `matchMedia` is not driveable in JSDOM — it matches nothing and cannot be told to change. Provide the service
    instead of trying to steer the real one:

    ```ts title="sample.spec.ts" partial
    TestBed.configureTestingModule({
      providers: [{ provide: BreakpointObserverService, useValue: { isMobile: signal(true) } }],
    });
    ```
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Sidebar" href="../navigation/sidebar.mdx">
    The component that reaches for this service to decide when to become a mobile drawer.
  </Card>
</Cards>
