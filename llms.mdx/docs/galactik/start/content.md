# Getting started (/docs/galactik/start)

Install @sinequa/galactik, wire up its design tokens, and render a first form that opens a confirmation dialog.



Four steps take you from an empty Angular 22 workspace to a form built entirely from `@sinequa/galactik`
components, styled by its design tokens.

<Steps>
  <Step>
    ## Prerequisites [#prerequisites]

    An Angular 22 workspace with Tailwind CSS v4 already set up. `@sinequa/galactik` declares three peer
    dependencies — install them alongside it:

    <TypeTable
      type="{
  &#x22;@angular/core&#x22;: { type: &#x22;^22.0.0&#x22;, description: &#x22;The library's own version.&#x22; },
  &#x22;@angular/aria&#x22;: { type: &#x22;^22.0.0&#x22;, description: &#x22;Accessible interaction primitives several components build on (List, Tabs, Toolbar…).&#x22; },
  cn: { type: &#x22;^0.2.5&#x22;, description: &#x22;The class-merging helper every component's `class` input goes through.&#x22; },
}"
    />
  </Step>

  <Step>
    ## Install [#install]

    ```bash title="terminal"
    npm install @sinequa/galactik @angular/aria cn
    ```
  </Step>

  <Step>
    ## Configure the design tokens [#configure-the-design-tokens]

    <Callout title="Concept — galactik tokens">
      Every component reads its colors, spacing and radii exclusively from CSS custom properties —
      `--bg-primary-base`, `--font-primary-muted`, `--radius-2xl` — never a raw Tailwind color or a shadcn utility
      class. `@sinequa/galactik` ships **no CSS of its own**: an application declares these tokens itself, once.
    </Callout>

    Import Tailwind, then a stylesheet that declares the tokens under `:root`. This repository's own demo app
    keeps that stylesheet at `projects/demo/src/css/galactik-tokens.css` — copy it (or your design system's own
    export of the same token set) into your application and import it right after Tailwind:

    ```css title="styles.css"
    @import "tailwindcss";
    @import "./galactik-tokens.css";
    ```

    Every galactik component now renders with the correct look — there is nothing to configure per component.
    A dark variant is optional: the demo app keeps its dark-mode token overrides in a second file
    (`galactik-tokens-dark.css`), scoped under a `.dark` class, imported after the light one.
  </Step>

  <Step>
    ## Render a first component [#render-a-first-component]

    A small form: an `Input` bound to a signal, and a `Button` that opens a confirmation `Dialog` before
    "submitting" — the same `createCallable`/`injectCallRef` pattern the [Dialog](./overlay/dialog.mdx) page
    teaches in full.

    <CodeSample id="start-first-render" title="A name field, confirmed before it is saved">
      <Lang value="angular">
        <Tabs items="[&#x22;confirm-save-dialog.ts&#x22;, &#x22;name-form.component.ts&#x22;]">
          <Tab value="confirm-save-dialog.ts">
            ```ts title="confirm-save-dialog.ts"
            import { afterNextRender, Component, viewChild } from "@angular/core";
            import {
              ButtonComponent,
              createCallable,
              DialogBodyComponent,
              DialogComponent,
              DialogContentComponent,
              DialogDescriptionComponent,
              DialogFooterComponent,
              DialogHeaderComponent,
              DialogTitleComponent,
              injectCallRef,
            } from "@sinequa/galactik";

            @Component({
              selector: "confirm-save-dialog",
              imports: [
                DialogComponent,
                DialogContentComponent,
                DialogHeaderComponent,
                DialogTitleComponent,
                DialogBodyComponent,
                DialogDescriptionComponent,
                DialogFooterComponent,
                ButtonComponent,
              ],
              template: `
                <dialog #dialog="dialog" (closed)="call.end($event === 'dialog-confirm')">
                  <DialogContent size="sm">
                    <DialogHeader>
                      <DialogTitle>Save changes?</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                      <DialogDescription>Save "{{ call.props().name }}" as the new name?</DialogDescription>
                    </DialogBody>
                    <DialogFooter>
                      <button variant="secondary" size="md" (click)="dialog.close('dialog-cancel')">Cancel</button>
                      <button variant="primary" size="md" (click)="dialog.close('dialog-confirm')">Save</button>
                    </DialogFooter>
                  </DialogContent>
                </dialog>
              `,
            })
            export class ConfirmSaveDialog {
              protected readonly call = injectCallRef<{ name: string }, boolean>();
              private readonly dialog = viewChild.required(DialogComponent);

              constructor() {
                afterNextRender(() => this.dialog().showModal());
              }
            }

            export const ConfirmSave = createCallable<{ name: string }, boolean>(ConfirmSaveDialog);
            ```
          </Tab>

          <Tab value="name-form.component.ts">
            ```ts title="name-form.component.ts"
            import { Component, signal } from "@angular/core";
            import { ButtonComponent, InputComponent, InputControlDirective } from "@sinequa/galactik";
            import { ConfirmSave } from "./confirm-save-dialog";

            @Component({
              selector: "name-form",
              imports: [InputComponent, InputControlDirective, ButtonComponent],
              template: `
                <div class="flex items-end gap-2">
                  <input-group>
                    <input
                      input-control
                      type="text"
                      placeholder="Your name"
                      [value]="name()"
                      (input)="name.set($any($event.target).value)"
                    />
                  </input-group>
                  <button variant="primary" size="md" [disabled]="!name().trim()" (click)="save()">Save</button>
                </div>
                @if (saved()) {
                  <p>Saved as "{{ saved() }}".</p>
                }
              `,
            })
            export class NameFormComponent {
              protected readonly name = signal("");
              protected readonly saved = signal("");

              protected async save() {
                const confirmed = await ConfirmSave.call({ name: this.name() });
                if (confirmed) this.saved.set(this.name());
              }
            }
            ```
          </Tab>
        </Tabs>
      </Lang>
    </CodeSample>

    `provideCallable()` must be registered once in your application's providers for `ConfirmSave.call(...)` to
    work without passing an explicit injector — see the [Dialog](./overlay/dialog.mdx#options) page's Options
    section.
  </Step>
</Steps>

## What's next [#whats-next]

<Cards>
  <Card title="Dialog" href="./overlay/dialog.mdx">
    The full imperative call/result API this page's example only introduces.
  </Card>

  <Card title="Select" href="./form/select.mdx">
    A single- or multiple-choice dropdown, the other half of most forms.
  </Card>

  <Card title="Sidebar" href="./navigation/sidebar.mdx">
    A collapsible app navigation panel, for the shell around pages like this one.
  </Card>
</Cards>
