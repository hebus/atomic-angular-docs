# Kbd (/docs/galactik/display/kbd)

Render a single keyboard key, or a whole combination, as a visual hint — it shows the shortcut, it does not bind it.



`Kbd` renders a single keyboard key, and `KbdGroup` presents several of them as one combination. Both are bare
directives with no template — write them on the tag you want (`<kbd>` for a key, anything for the group). Use
them to *show* a shortcut; wiring the actual key listener stays the application's job.

## Minimal example [#minimal-example]

<CodeSample id="kbd-basic" title="A single key">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { KbdComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [KbdComponent],
      template: `Press <kbd>Esc</kbd> to close.`,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`KbdGroup` carries the accessible name of the whole combination, and the keys inside it are hidden from
assistive technology — without that, a screen reader announces "Control", "plus", "Shift" as three separate
items, separators included.

<CodeSample id="kbd-group" title="A combination">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { KbdComponent, KbdGroupComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [KbdComponent, KbdGroupComponent],
      template: `
        <KbdGroup aria-label="Control+Shift+F">
          <kbd aria-hidden="true">Ctrl</kbd>
          <span aria-hidden="true">+</span>
          <kbd aria-hidden="true">Shift</kbd>
          <span aria-hidden="true">+</span>
          <kbd aria-hidden="true">F</kbd>
        </KbdGroup>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

The name passed to `KbdGroup` should be the ARIA form of the combination (`Control+Shift+F`) — which is also
what belongs in [`aria-keyshortcuts`](https://www.w3.org/TR/wai-aria-1.2/#aria-keyshortcuts) on the control the
shortcut drives — while the visible keys can use the shorter labels a user reads on their own keyboard
(`Ctrl`, `⌥`). The visual and the announced form must agree.

## Options [#options]

<TypeTable
  type="{
  size: { type: '&#x22;sm&#x22; | &#x22;md&#x22;', default: '&#x22;sm&#x22;', description: &#x22;sm sits inside body text, md next to a md control.&#x22; },
}"
/>

`KbdGroup` takes no input — it only lays its keys out in a row.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A combination is announced as three unrelated words">
    Write the keys inside a real `<kbd>` element (the role comes from the tag; the directive only styles it), put
    the accessible name on `KbdGroup`, and mark every key and separator inside it `aria-hidden="true"` — see the
    combination example above. Without that split, a screen reader reads "Control", "plus", "Shift" as three
    separate items instead of one shortcut.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Tabs" href="../navigation/tabs.mdx">
    Another component driven entirely by keyboard interaction, this one via @angular/aria.
  </Card>
</Cards>
