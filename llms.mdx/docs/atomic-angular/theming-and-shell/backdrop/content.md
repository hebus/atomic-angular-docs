# Backdrop (/docs/atomic-angular/theming-and-shell/backdrop)

A full-screen dimming overlay, shown and hidden through BackdropService — not a settable input.



`<backdrop>` renders nothing but a dimmed, full-screen overlay, and shows or hides itself in response to
`BackdropService.show()`/`hide()`. It is meant to sit once near the root of the application, behind whatever
overlay (a custom stacked panel, say) needs a scrim.

## Minimal example [#minimal-example]

<CodeSample id="backdrop-basic" title="Mounted once at the application root">
  <Lang value="angular">
    ```ts title="app.component.ts"
    import { Component, inject } from "@angular/core";
    import { BackdropComponent, BackdropService } from "@sinequa/atomic-angular";

    @Component({
      selector: "app-root",
      imports: [BackdropComponent],
      template: `
        <router-outlet />
        <backdrop />
      `,
    })
    export class AppComponent {
      private readonly backdrop = inject(BackdropService);

      openSomethingWithAScrim() {
        this.backdrop.show();
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  &#x22;show()&#x22;: { type: &#x22;() => void&#x22;, description: &#x22;BackdropService — makes the backdrop visible.&#x22; },
  &#x22;hide()&#x22;: { type: &#x22;() => void&#x22;, description: &#x22;BackdropService — hides it.&#x22; },
  isVisible: { type: &#x22;BehaviorSubject<boolean>&#x22;, description: &#x22;BackdropService — the component's own only source of visibility.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Binding [backdropVisible] on <backdrop> has no effect">
    `backdropVisible` is not an `@Input()` — it is a `@HostBinding` the component sets itself, subscribed to
    `BackdropService.isVisible`. The only way to show or hide the backdrop is through the service's `show()`/`hide()`,
    never a template binding on the component.
  </Accordion>
</Accordions>
