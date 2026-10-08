# Dialog (/docs/galactik/overlay/dialog)

Open a modal or non-modal window on the native <dialog> element, and get a typed result back from an imperative call() without wiring a viewChild by hand.



A confirmation prompt, an edit form, a notice that needs an explicit dismissal — each of those is a window
that has to sit above the rest of the page, trap focus while it is open, and hand a result back to whoever
opened it. `Dialog` is that window, built on the native HTML `<dialog>` element (or a `[dialog]` attribute on
any other host), and `createCallable`/`injectCallRef` is the typed call/result API most of this page teaches.

<Callout title="Concept — native top layer">
  The browser's `<dialog>` element renders in the **top layer**, a stacking context above everything else in the
  document — no application `z-index` can cover it, and none is needed to keep it on top. `showModal()` also
  gives it a native `::backdrop` pseudo-element and traps focus inside it for free. `Dialog` prefers a real
  `<dialog>` tag for exactly this reason, and falls back to a `[dialog]` attribute (with a manual backdrop and
  `Escape` handling) only for hosts that cannot be a `<dialog>` tag.
</Callout>

## Minimal example [#minimal-example]

The recommended, imperative way to open a dialog: bind a component once with `createCallable`, then `await` it
from anywhere. `provideCallable()` must be registered once at bootstrap — see [Options](#options).

<CodeSample id="dialog-basic" title="A confirm dialog, called and awaited">
  <Lang value="angular">
    <Tabs items="[&#x22;confirm-dialog.ts&#x22;, &#x22;sample.component.ts&#x22;]">
      <Tab value="confirm-dialog.ts">
        ```ts title="confirm-dialog.ts"
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
          selector: "confirm-dialog",
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
                  <DialogTitle>Please confirm</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <DialogDescription>{{ call.props().message }}</DialogDescription>
                </DialogBody>
                <DialogFooter>
                  <button variant="secondary" size="md" (click)="dialog.close('dialog-cancel')">Cancel</button>
                  <button variant="primary" size="md" (click)="dialog.close('dialog-confirm')">Confirm</button>
                </DialogFooter>
              </DialogContent>
            </dialog>
          `,
        })
        export class ConfirmDialog {
          // Arguments + resolution handle, injected via CALL_REF (provided by DialogService.call()).
          protected readonly call = injectCallRef<{ message: string }, boolean>();
          private readonly dialog = viewChild.required(DialogComponent);

          constructor() {
            // The instance is mounted headless — open it once the view exists.
            afterNextRender(() => this.dialog().showModal());
          }
        }

        // Module-level singleton: bind ConfirmDialog once, call it from anywhere.
        export const Confirm = createCallable<{ message: string }, boolean>(ConfirmDialog);
        ```
      </Tab>

      <Tab value="sample.component.ts">
        ```ts title="sample.component.ts"
        import { Component, signal } from "@angular/core";
        import { ButtonComponent } from "@sinequa/galactik";
        import { Confirm } from "./confirm-dialog";

        @Component({
          selector: "sample-component",
          imports: [ButtonComponent],
          template: `
            <button variant="primary" size="md" (click)="deleteItem()">Delete item…</button>
            @if (deleted()) {
              <p>Item was deleted.</p>
            }
          `,
        })
        export class SampleComponent {
          protected readonly deleted = signal(false);

          protected async deleteItem() {
            const confirmed = await Confirm.call({ message: "Delete this item? This cannot be undone." });
            if (confirmed) this.deleted.set(true);
          }
        }
        ```
      </Tab>
    </Tabs>
  </Lang>
</CodeSample>

`(closed)="call.end($event === 'dialog-confirm')"` resolves the promise however the dialog closes — clicking
Confirm, clicking Cancel, or pressing `Escape` all reach the same handler, with no dedicated "Escape" branch
to write.

## How it works [#how-it-works]

Three things happen once, in order: the dialog opens through one of three methods, its content mounts, and
closing it resolves whatever awaited the call.

<Mermaid
  chart="flowchart TD
    Host[&#x22;Host app&#x22;] -- &#x22;#dialog attribute&#x22; --> Dialog[&#x22;DialogComponent (dialog, [dialog])&#x22;]
    Dialog -- &#x22;provides DIALOG_REF&#x22; --> DialogRefToken[[&#x22;DIALOG_REF&#x22;]]
    Dialog -- &#x22;@if(isOpen())&#x22; --> Content[&#x22;DialogContent (role=dialog, aria-modal)&#x22;]
    Content -- &#x22;provides MODAL_LABEL&#x22; --> LabelToken[[&#x22;MODAL_LABEL&#x22;]]
    Content --> Header[&#x22;DialogHeader&#x22;]
    Header -- &#x22;inject(DIALOG_REF, optional) -> close()&#x22; --> DialogRefToken
    Header --> Title[&#x22;DialogTitle&#x22;]
    Title -- &#x22;effect: label.titleId.set(id)&#x22; --> LabelToken
    LabelToken -- &#x22;titleId()&#x22; --> Content
    Content --> Body[&#x22;DialogBody&#x22;]
    Body --> Description[&#x22;DialogDescription&#x22;]
    Content --> Footer[&#x22;DialogFooter&#x22;]
    Dialog -- &#x22;closed (DialogEvent)&#x22; --> Host"
/>

`DialogContent` never needs a `for` or an explicit id to associate its title: `DialogTitle` publishes its own
id (generated, or set explicitly) into the `MODAL_LABEL` token it shares with `DialogContent`, which reads it
back for `aria-labelledby`. The same token pattern lets `DialogHeader`'s built-in close button — and any
custom sub-component you project — close the dialog by injecting `DIALOG_REF`, without ever depending on
`DialogComponent` itself (see [Pitfalls](#pitfalls)).

**Three open modes**, all on the same template reference:

* `show()` — non-modal. On a real `<dialog>` tag this has **no** backdrop.
* `showModal()` — modal, native `<dialog>` semantics (native focus trap, native `Escape`) when applied to a
  real `<dialog>` tag.
* `showPopover()` — the native Popover API, light-dismiss.

The imperative call itself goes through `DialogService`, which `createCallable` wraps:

<Mermaid
  chart="sequenceDiagram
    participant Caller
    participant Callable as Confirm
    participant Service as DialogService
    participant Instance as ConfirmDialog
    participant Ref as CallRef

    Caller->>Callable: Confirm.call(props, options?)
    Callable->>Service: dialogService.call(ConfirmDialog, props, options)
    Service->>Ref: new CallRef(), props.set(props)
    Service->>Instance: createComponent(), providing CALL_REF
    Instance->>Ref: injectCallRef() reads props()
    Instance->>Instance: afterNextRender(showModal)
    Caller-->>Instance: user confirms, cancels, or presses Escape
    Instance->>Ref: (closed) calls call.end(result)
    Ref->>Service: resolves the pending promise
    Service-->>Caller: Promise resolves with result
    Service->>Instance: after unmountDelay, destroyInstance()"
/>

Calling a callable more than once mounts independent, concurrently open instances rather than replacing the
previous one — `DialogService.call()` stacks by design, which is what lets `injectCallRef().index()` and
`.stackSize()` drive position-aware UI in a stacked notification (see [Recipes](#recipes)).

## Recipes [#recipes]

### Compose all six slots, and the three open modes [#compose-all-six-slots-and-the-three-open-modes]

A declarative (non-callable) dialog, using every layout slot plus the three ways to open the same `<dialog>`
reference.

<CodeSample id="dialog-full-composition" title="All six slots, three open modes">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import {
      BadgeComponent,
      ButtonComponent,
      DialogBodyComponent,
      DialogComponent,
      DialogContentComponent,
      DialogDescriptionComponent,
      DialogFooterComponent,
      DialogHeaderComponent,
      DialogTitleComponent,
    } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [
        DialogComponent,
        DialogContentComponent,
        DialogHeaderComponent,
        DialogTitleComponent,
        DialogBodyComponent,
        DialogDescriptionComponent,
        DialogFooterComponent,
        BadgeComponent,
        ButtonComponent,
      ],
      template: `
        <div class="flex gap-2">
          <button variant="secondary" size="md" (click)="dialog.show()">Open (non-modal)</button>
          <button variant="secondary" size="md" (click)="dialog.showModal()">Open (modal)</button>
          <button variant="secondary" size="md" (click)="dialog.showPopover()">Open (popover)</button>
        </div>

        <dialog #dialog="dialog" id="profileDialog">
          <DialogContent size="md">
            <DialogHeader>
              <badge variant="icon" scheme="info" size="md" aria-label="Information">i</badge>
              <DialogTitle>Edit profile</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogBody>
            <DialogFooter>
              <!-- Native Invoker Commands API — closes "profileDialog" without a click handler. -->
              <button variant="secondary" size="md" command="close" commandfor="profileDialog">Cancel</button>
              <button variant="primary" size="md" (click)="dialog.close('dialog-confirm')">Save changes</button>
            </DialogFooter>
          </DialogContent>
        </dialog>
      `,
    })
    export class SampleComponent {}
    ```
  </Lang>
</CodeSample>

### Typed payload in, typed result out [#typed-payload-in-typed-result-out]

`createCallable<P, R>` types both the arguments passed into `call(props)` and the value the promise resolves
with — here a `{ name: string } | null` result, `null` on cancel.

<CodeSample id="dialog-typed-form" title="Editing a name, with a typed result">
  <Lang value="angular">
    ```ts title="edit-name-dialog.ts"
    import { afterNextRender, Component, signal, viewChild } from "@angular/core";
    import {
      ButtonComponent,
      createCallable,
      DialogBodyComponent,
      DialogComponent,
      DialogContentComponent,
      DialogFooterComponent,
      DialogHeaderComponent,
      DialogTitleComponent,
      injectCallRef,
      InputComponent,
      InputControlDirective,
    } from "@sinequa/galactik";

    interface EditNameProps {
      currentName: string;
    }
    type EditNameResult = { name: string } | null;

    @Component({
      selector: "edit-name-dialog",
      imports: [
        DialogComponent,
        DialogContentComponent,
        DialogHeaderComponent,
        DialogTitleComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        InputComponent,
        InputControlDirective,
        ButtonComponent,
      ],
      template: `
        <dialog #dialog="dialog" (closed)="onClosed()">
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Edit name</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <input-group>
                <input
                  input-control
                  type="text"
                  [value]="name()"
                  (input)="name.set($any($event.target).value)"
                  aria-label="Name"
                />
              </input-group>
            </DialogBody>
            <DialogFooter>
              <button variant="secondary" size="md" (click)="dialog.cancel()">Cancel</button>
              <button variant="primary" size="md" [disabled]="!name().trim()" (click)="save()">Save</button>
            </DialogFooter>
          </DialogContent>
        </dialog>
      `,
    })
    export class EditNameDialog {
      protected readonly call = injectCallRef<EditNameProps, EditNameResult>();
      protected readonly name = signal("");
      private readonly dialog = viewChild.required(DialogComponent);
      private saved = false;

      constructor() {
        this.name.set(this.call.props().currentName);
        afterNextRender(() => this.dialog().showModal());
      }

      protected save() {
        this.saved = true;
        this.call.end({ name: this.name().trim() });
        this.dialog().close("dialog-confirm");
      }

      // Cancel / Escape / backdrop all land here without having gone through save().
      protected onClosed() {
        if (!this.saved) this.call.end(null);
      }
    }

    export const EditName = createCallable<EditNameProps, EditNameResult>(EditNameDialog);
    ```
  </Lang>
</CodeSample>

### Stacked, position-aware dialogs [#stacked-position-aware-dialogs]

Calling a callable several times in a row mounts independent, concurrently open instances rather than
replacing the previous one. `injectCallRef()` exposes `index()`/`stackSize()` for position-aware UI, and
`ended()` for driving an exit-animation state while teardown is pending. `call(props, options)` also accepts
an explicit `injector` — useful when `provideCallable()` was not registered, or from a lazily-loaded
subtree — and an `unmountDelay` that leaves time for a CSS exit transition before the component is destroyed.

<CodeSample id="dialog-stacked" title="A stacked, dismissible notice">
  <Lang value="angular">
    ```ts title="stacked-toast-dialog.ts"
    import { afterNextRender, Component, viewChild } from "@angular/core";
    import {
      ButtonComponent,
      createCallable,
      DialogBodyComponent,
      DialogComponent,
      DialogContentComponent,
      injectCallRef,
    } from "@sinequa/galactik";

    @Component({
      selector: "stacked-toast-dialog",
      imports: [DialogComponent, DialogContentComponent, DialogBodyComponent, ButtonComponent],
      template: `
        <!-- Plain "dialog" attribute, matching the "dialog, [dialog]" selector on any host element. -->
        <div dialog #dlg="dialog" [class.opacity-0]="call.ended()" (closed)="call.end()">
          <DialogContent size="sm">
            <DialogBody>
              <p>Notice {{ call.index() + 1 }} of {{ call.stackSize() }}</p>
              <p>{{ call.props().message }}</p>
              <button variant="primary" size="md" [disabled]="call.ended()" (click)="dlg.close()">Dismiss</button>
            </DialogBody>
          </DialogContent>
        </div>
      `,
    })
    export class StackedToastDialog {
      // R = void here: this dialog just needs to be dismissed, no result value.
      protected readonly call = injectCallRef<{ message: string }>();
      private readonly dlg = viewChild.required(DialogComponent);

      constructor() {
        afterNextRender(() => this.dlg().show());
      }
    }

    // unmountDelay: 200 — leaves time for the opacity transition to play before teardown.
    export const Notify = createCallable<{ message: string }>(StackedToastDialog, 200);
    ```
  </Lang>
</CodeSample>

### Close the parent dialog from a projected sub-component — `DIALOG_REF` [#close-the-parent-dialog-from-a-projected-sub-component--dialog_ref]

Content projected into a dialog — including your own reusable pieces, not just `DialogHeader`'s built-in
close button — closes the parent dialog by injecting `DIALOG_REF`. This is exactly the pattern
`DialogHeaderComponent`'s own close button uses internally.

<CodeSample id="dialog-ref-subcomponent" title="A reusable close button for projected content">
  <Lang value="angular">
    ```ts title="dialog-close-button.ts"
    import { Directive, inject } from "@angular/core";
    import { DIALOG_REF } from "@sinequa/galactik";

    @Directive({
      selector: "button[dialogClose]",
      host: { "(click)": "dialogRef?.close()" },
    })
    export class DialogCloseButtonDirective {
      // Optional — injecting DIALOG_REF works whether or not this button ends up inside a Dialog.
      private readonly dialogRef = inject(DIALOG_REF, { optional: true });
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  size: {
    type: '&#x22;sm&#x22; | &#x22;md&#x22; | &#x22;lg&#x22; | &#x22;xl&#x22;',
    default: '&#x22;sm&#x22;',
    description:
      &#x22;Nominal width: sm 400px · md 520px · lg 720px · xl 960px. Each size yields to a viewport narrower than it — the resolved width is capped at calc(100dvw - 2rem) — so nothing overflows on a phone-width screen.&#x22;,
  },
  labelledby: {
    type: &#x22;string&#x22;,
    description:
      &#x22;Explicit aria-labelledby override, on DialogContent. Without it, DialogContent falls back to the id published by a projected DialogTitle.&#x22;,
  },
  closeLabel: {
    type: &#x22;string&#x22;,
    default: '&#x22;Close&#x22;',
    description:
      &#x22;Accessible name of the built-in close button. Set on the <dialog>, it names the button of every DialogHeader inside — the default header included. Set on a DialogHeader, it wins over the dialog's. The icon is decorative, so this label is the button's only name — translate it.&#x22;,
  },
  class: {
    type: &#x22;string&#x22;,
    description: &#x22;Additional CSS classes, merged via cn(). Available on every slot.&#x22;,
  },
}"
/>

`provideCallable()` — registered once at bootstrap (`providers: [provideCallable()]`) — captures the root
`Injector` so `Callable.call(props)` works without passing `{ injector }` explicitly. Without it, and with no
`injector` passed in `options`, `call()` throws synchronously.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Crash: `ɵcmp undefined`, from a component projected into a dialog">
    You injected `DialogComponent` directly from a sub-component rendered inside the dialog — a custom footer
    button, a custom header action. `DialogComponent` renders the very content that would be importing it, so
    that is a circular dependency, not a plain DI mistake.

    Inject `DIALOG_REF` instead — see [Close the parent dialog from a projected sub-component](#close-the-parent-dialog-from-a-projected-sub-component--dialog_ref) above. It resolves to the same dialog without ever importing
    `DialogComponent`'s type.
  </Accordion>

  <Accordion title="A dialog opened with show() has no backdrop and Escape does nothing">
    Expected, and it depends on which host you used. On a real `<dialog>` tag, `show()` opens **non-modally** — no
    backdrop, no native `Escape` handling, by browser design; only `showModal()`/`openModal()` get those. On a
    `[dialog]` **attribute** host, there is no such distinction: the component cannot tell `show()` from
    `showModal()` there, so `show()` still gets the manual backdrop and the manual `document:keydown.escape`
    listener.

    Use a real `<dialog>` tag when you want a genuinely backdrop-less, `Escape`-inert non-modal window; use
    `openModal()` (which forces `isModal` unconditionally) when you want a `[dialog]` host to never close on a
    backdrop click.
  </Accordion>

  <Accordion title="A field inside the dialog forgets what the user typed on reopen">
    `DialogComponent`'s template wraps all projected content in `@if (isOpen())` — closing it fully **destroys**
    the projected tree rather than hiding it. Any local component state inside a declaratively-wired (non-callable)
    dialog body resets on every reopen.

    For state that should survive a close/reopen cycle, lift it above the dialog (a parent component field, a
    service) rather than holding it in a component that only exists while the dialog is open.
  </Accordion>

  <Accordion title="The close button is announced in English in a translated application">
    The built-in close button is named by `closeLabel`, which defaults to the English `"Close"` — the library
    translates nothing. Set it &#x2A;*once on the `<dialog>`** and every `DialogHeader` inside inherits it, including the
    default header a `<dialog>` renders when you project no `DialogContent`:
    `<dialog closeLabel="Fermer">`. A `DialogHeader` that sets its own `closeLabel` keeps it.

    (A dialog with no `DialogTitle` has no accessible name whichever header it uses: project a titled
    `DialogContent` rather than relying on the default one.)
  </Accordion>

  <Accordion title="I set an id on DialogDescription and aria-describedby is still missing">
    Only `aria-labelledby` is wired automatically, through the `MODAL_LABEL` token shared between `DialogTitle` and
    `DialogContent`. There is no equivalent auto-wiring for `DialogDescription` into `aria-describedby`.

    Set an explicit `id` directly on `<DialogDescription id="...">` — it is a bare `@Directive`, so native
    attributes pass through — and bind `[attr.aria-describedby]` on `<DialogContent>` yourself.
  </Accordion>

  <Accordion title="DialogContent's children don't behave like projected content">
    `DialogContent`, like `DialogBody`, `DialogFooter`, `DialogTitle` and `DialogDescription`, is a bare
    `@Directive`, not a `@Component` — it has no template of its own, so its children are the literal markup you
    wrote between the tags, not content projected through an `<ng-content>`. Only `DialogHeader` is a real
    `@Component`, with two `<ng-content select>` slots plus the built-in close button.
  </Accordion>

  <Accordion title="Stacked callable dialogs all dim the page at once">
    `DialogService.syncStack()` tags every instance except the bottom-most with an `atomic-dialog--behind` host
    class, meant to leave exactly one visible backdrop for a whole stack — but `@sinequa/galactik` ships no CSS for
    it. Nothing acts on that class unless your application defines the rule.

    ```css title="global stylesheet" partial
    .atomic-dialog--behind dialog::backdrop {
      background: transparent;
      backdrop-filter: none;
    }
    ```

    Add the equivalent for the manual backdrop `<div>` too, if you stack `[dialog]` attribute hosts.
  </Accordion>

  <Accordion title="Two different Dialog components, same vocabulary">
    `@sinequa/ui`'s `Dialog` (the library `@sinequa/galactik` is replacing) is a **different implementation** with
    an overlapping vocabulary — the same `createCallable`/`injectCallRef`/`DialogService` concept, even the same
    `DialogEvent`-shaped close events — but a distinct component tree (no separate `DialogBody`/`DialogDescription`
    split) and a separate module. Check the import path before assuming two dialog-related symbols are the same
    one; do not mix imports from `@sinequa/ui` and `@sinequa/galactik` in the same file.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="@sinequa/galactik overview" href="../index.mdx">
    What this library is, what it deliberately does not do, and how it relates to atomic-angular.
  </Card>

  <Card title="Getting started" href="../start.mdx">
    Install the library and set up the tokens every component, Dialog included, renders from.
  </Card>
</Cards>
