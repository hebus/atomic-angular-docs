# Keyboard shortcuts (/docs/atomic-angular/reference/keyboard-shortcuts)

Register a global or page-scoped keyboard shortcut that works on every layout, with a self-documenting help dialog and no manual cleanup.



A keyboard shortcut usually means three things to get right at once: comparing the right kind of key across
keyboard layouts, not stealing a keystroke a text field or another component needs, and keeping a help list
that does not drift from what is actually registered. `KeyboardShortcutsService` is one `keydown` listener, one
registry, and a `[keyShortcut]` directive for the common case — built to replace an older engine that could
not be made correct on a non-US layout.

<Callout title="Concept — physical vs. character key">
  `event.key` is the **character** a key produces — layout-dependent, so `"1"` unshifted is `&` on an AZERTY
  keyboard. `event.code` is the **physical position** — layout-independent. Digits are compared by `event.code`
  here specifically because a written `Alt+1` should reach the same physical key everywhere; every other key is
  compared by `event.key`, since a printed letter is what a person actually reads off their keyboard.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="keyboard-shortcuts-basic" title="A shortcut on a button, registered by the directive">
  <Lang value="angular">
    <Tabs items="[&#x22;app.config.ts&#x22;, &#x22;sample.component.ts&#x22;]">
      <Tab value="app.config.ts">
        ```ts title="app.config.ts"
        import type { ApplicationConfig } from "@angular/core";
        import { provideKeyboardShortcuts } from "@sinequa/atomic-angular";

        export const appConfig: ApplicationConfig = {
          providers: [provideKeyboardShortcuts()],
        };
        ```
      </Tab>

      <Tab value="sample.component.ts">
        ```ts title="sample.component.ts"
        import { Component } from "@angular/core";
        import { ShortcutDirective } from "@sinequa/atomic-angular";

        @Component({
          selector: "sample-component",
          imports: [ShortcutDirective],
          template: `
            <button keyShortcut="Alt+3" shortcutLabelKey="shortcuts.zones.filters" (click)="focusFilters()">
              Go to the filters
            </button>
          `,
        })
        export class SampleComponent {
          protected focusFilters() {
            /* ... */
          }
        }
        ```
      </Tab>
    </Tabs>
  </Lang>
</CodeSample>

`[keyShortcut]` registers the combination, writes `aria-keyshortcuts` on the host so assistive technology
announces it, and activates the host when the combination fires — the same `(click)` serves the mouse, the
Tab-and-Enter path, and the shortcut, in one code path. The registration disappears with the element, which is
what gives a page-scoped shortcut with nothing to clean up by hand.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    Key[&#x22;document keydown, capture phase&#x22;] --> Guard{&#x22;Typing guard, IME, AltGr, dead key, auto-repeat?&#x22;}
    Guard -->|yes| Ignore[&#x22;Ignored&#x22;]
    Guard -->|no| Canon[&#x22;canonicalize(event)&#x22;]
    Canon --> Stack{&#x22;Top of the matching combo's stack&#x22;}
    Stack -->|&#x22;element inside an open modal, or global: true&#x22;| Run[&#x22;run(event)&#x22;]
    Stack -->|&#x22;otherwise, a modal is open&#x22;| Ignore
    Run --> PreventDefault[&#x22;preventDefault / stopPropagation (default true)&#x22;]"
/>

Capture phase, deliberately: several components in this library stop propagation on `keydown` of their own
(`ngCombobox` on Enter and the arrows, a galactik `ListItem` on Delete, dialogs on Escape) — a bubble-phase
listener would be at their mercy. The service only ever consumes an event once a registration actually
matches, so it does not steal a key a component below it wants.

One stack per combination: the **last** registration wins, and the previous one comes back once it
unregisters — modeling what a panel opening over a page should do to the shortcuts underneath it.

## Recipes [#recipes]

### Registering without an element [#registering-without-an-element]

For a shortcut with no control behind it — a help dialog, a diagnostics panel.

<CodeSample id="keyboard-shortcuts-manual" title="A global help shortcut">
  <Lang value="angular">
    ```ts title="app-shell.component.ts"
    import { Component, DestroyRef, inject } from "@angular/core";
    import { KeyboardShortcutsDialog, KeyboardShortcutsService } from "@sinequa/atomic-angular";

    @Component({
      selector: "app-shell",
      template: ``,
    })
    export class AppShellComponent {
      private readonly keyboard = inject(KeyboardShortcutsService);

      constructor() {
        // destroyRef passed explicitly: a forgotten global shortcut is a mute bug,
        // so the lifetime it is tied to is made visible at the call site.
        this.keyboard.register(
          {
            combo: ["Alt+0", "Shift+?"],
            labelKey: "shortcuts.help",
            global: true,
            run: () => void KeyboardShortcutsDialog.call(),
          },
          { destroyRef: inject(DestroyRef) },
        );
      }
    }
    ```
  </Lang>
</CodeSample>

`KeyboardShortcutsDialog` lists whatever is currently registered, grouped by `categoryKey` — it observes the
live registry rather than a hand-written list, which is what keeps the help dialog from drifting away from
what actually works. Opened from a page that registers nothing, it lists nothing, deliberately, rather than a
list half of which does not apply.

## Options [#options]

<TypeTable
  type="{
  combo: { type: &#x22;string | readonly string[]&#x22;, description: &#x22;One or more written combinations, e.g. \&#x22;Alt+1\&#x22; or [\&#x22;Alt+0\&#x22;, \&#x22;Shift+?\&#x22;].&#x22; },
  labelKey: { type: &#x22;string&#x22;, description: &#x22;Transloco key of the help-dialog label. Without it, the shortcut is not listed there.&#x22; },
  categoryKey: { type: &#x22;string&#x22;, description: &#x22;Transloco key of the help dialog's group heading.&#x22; },
  hidden: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Keeps a registered shortcut out of the help dialog.&#x22; },
  global: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Stays active while a modal is open. Reserve it for tools like the help dialog itself.&#x22; },
  preventDefault: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22; },
  stopPropagation: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22; },
  run: { type: &#x22;(event: KeyboardEvent) => void&#x22;, description: &#x22;The action.&#x22; },
}"
/>

`[keyShortcut]` mirrors this as inputs: `keyShortcut` (the combo, required), `shortcutLabelKey`,
`shortcutCategoryKey`, `shortcutDisabled` (unregisters while `true`), `shortcutHidden`, `shortcutGlobal`.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Alt+1 does nothing on some users' keyboards">
    Confirm the combination compares by physical position for a digit — `Alt+1` does, automatically, since digits
    are always promoted to `event.code`. If a *letter* shortcut seems dead specifically on macOS, that is the next
    entry.
  </Accordion>

  <Accordion title="An Alt+letter shortcut is unreachable on macOS, and it breaks typing accented characters">
    `⌥`+`e`/`u`/`i`/`n` (and others) are dead keys on macOS, used to type `é`, `ü`, `ñ`. Registering `Alt+e` steals
    that combination system-wide for every app using this service. Prefer `Alt+`*digit* instead, which is free in
    every browser and compared by physical key.
  </Accordion>

  <Accordion title="Ctrl+Alt+<key> never fires">
    That combination is AltGr on Windows, used to compose characters — the service drops those events entirely,
    so a shortcut bound to it is unreachable. Registering it also logs a warning in development mode.
  </Accordion>

  <Accordion title="A shortcut with no modifier does nothing while a text field has focus">
    Expected: a bare-key shortcut is ignored while focus is in a text field, `contenteditable`, a `<select>` or an
    ARIA text role — the keystroke belongs to the field. Add a modifier other than Shift if the shortcut needs to
    fire while typing.
  </Accordion>

  <Accordion title="A route kept alive keeps its shortcuts registered after navigating away">
    A route held by a `RouteReuseStrategy` is not destroyed on navigation, so a `[keyShortcut]` on it stays
    registered even though the page is no longer visible. Bind `[shortcutDisabled]` to whether the route is
    currently active.
  </Accordion>

  <Accordion title="Two components register the same combination and only one seems to work">
    By design — the registry is one stack per combination, last registration wins, and a duplicate logs a warning
    in development mode. If both are meant to be reachable, use different combinations; if one is meant to
    temporarily override the other (a panel opening over a page), this is the intended behavior — the covered one
    comes back once the covering one unregisters.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Feature flags" href="./feature-flags.mdx">
    Every key of the app's general configuration, and which ones actually gate behavior.
  </Card>
</Cards>
