# Dialog

A modal dialog built on the native HTML `<dialog>` element and styled with the
design-system **modal** contract (`.modal` / `.modal-header` / `.modal-body` /
`.modal-footer`). Supports `show()`, `showModal()`, and `showPopover()` open modes.

Set the width with the `size` input on `DialogContent` (`sm` · `md` · `lg` · `xl`,
default `sm`). `aria-labelledby` is wired automatically from the `DialogTitle`.

## Basic

The dialog exposes three open modes on its template reference:

- **`show()`** — non-modal: no backdrop, and clicking outside closes it.
- **`showModal()`** — modal: dims the page with a backdrop; clicking outside does **not** close it (use a button or `Escape`).
- **`showPopover()`** — uses the native Popover API (light-dismiss).

<demo-dialogs-basic></demo-dialogs-basic>

```html
<div class="flex gap-2">
  <button variant="secondary" (click)="dialog.show()">Open Dialog</button>
  <button variant="secondary" (click)="dialog.showModal()">Open Dialog Modal</button>
  <button variant="secondary" (click)="dialog.showPopover()">Open Dialog Popover</button>
</div>

<dialog #dialog id="myDialog">
  <DialogContent size="md">
    <DialogHeader closeLabel="Close the profile editor">
      <!-- Optional leading <Badge> can be projected here, before the title -->
      <DialogTitle>Edit profile</DialogTitle>
    </DialogHeader>
    <DialogBody>
      <DialogDescription>Make changes to your profile here.</DialogDescription>
      <div class="grid gap-4">
        <label>Name</label>
        <input type="text" />
      </div>
    </DialogBody>
    <DialogFooter>
      <button variant="secondary" command="close" commandfor="myDialog">Cancel</button>
      <button variant="primary" type="submit">Save changes</button>
    </DialogFooter>
  </DialogContent>
</dialog>
```

## Sizes

Pick a width, then open the dialog to see the impact of the `size` input
(`sm` 400px · `md` 520px · `lg` 720px · `xl` 960px).

<demo-dialogs-sizes></demo-dialogs-sizes>

```html
<!-- `size` is bound to a signal driven by the button group -->
<div class="flex gap-2">
  @for (s of sizes; track s) {
    <button [variant]="size() === s ? 'primary' : 'secondary'" (click)="size.set(s)">{{ s }}</button>
  }
</div>

<button (click)="dialog.showModal()">Open "{{ size() }}" dialog</button>

<dialog #dialog id="sizeDialog">
  <DialogContent [size]="size()">
    <DialogHeader>
      <DialogTitle>Dialog — size "{{ size() }}"</DialogTitle>
    </DialogHeader>
    <DialogBody>
      <DialogDescription>The size input sets the modal width.</DialogDescription>
    </DialogBody>
    <DialogFooter>
      <button variant="secondary" command="close" commandfor="sizeDialog">Close</button>
    </DialogFooter>
  </DialogContent>
</dialog>
```

## Scrollable body

With a long body, the `.modal` caps its height and only `DialogBody` scrolls —
the header and footer stay pinned.

<demo-dialogs-scroll></demo-dialogs-scroll>

```html
<dialog #dialog id="scrollDialog">
  <DialogContent size="md">
    <DialogHeader>
      <DialogTitle>Terms of service</DialogTitle>
    </DialogHeader>
    <DialogBody>
      <!-- lots of content — this area scrolls, header/footer stay put -->
      <p>…</p>
    </DialogBody>
    <DialogFooter>
      <button variant="secondary" command="close" commandfor="scrollDialog">Decline</button>
      <button variant="primary" command="close" commandfor="scrollDialog">Accept</button>
    </DialogFooter>
  </DialogContent>
</dialog>
```

## Leading badge

Project an optional `<Badge>` into the header (`.modal-header-left`), before the
title — handy for status or severity indicators.

<demo-dialogs-badge></demo-dialogs-badge>

```html
<DialogHeader>
  <Badge variant="icon" scheme="info" size="md" aria-label="Information">
    <svg><!-- info icon --></svg>
  </Badge>
  <DialogTitle>Heads up</DialogTitle>
</DialogHeader>
```

## Callable dialog

Open a dialog imperatively and `await` its result with `createCallable` +
`injectCallRef` — no template wiring at the call site. Requires
`provideCallable()` in the app bootstrap.

<demo-dialogs-callable></demo-dialogs-callable>

```ts
// confirm.dialog.ts — Confirm shows a spinner while a slow "server call" runs
@Component({ /* … */ template: `
  <dialog #dialog (closed)="call.end($event)">
    <DialogContent size="sm">
      <DialogHeader><DialogTitle>Please confirm</DialogTitle></DialogHeader>
      <DialogBody><DialogDescription>{{ call.props().message }}</DialogDescription></DialogBody>
      <DialogFooter>
        <button variant="secondary" [disabled]="pending()" (click)="dialog.close('dialog-cancel')">Cancel</button>
        <button variant="primary" [disabled]="pending()" (click)="confirm()">
          @if (pending()) { <svg class="size-4 animate-spin">…</svg> Working… }
          @else { Confirm }
        </button>
      </DialogFooter>
    </DialogContent>
  </dialog>
` })
export class ConfirmDialog {
  protected readonly call = injectCallRef<{ message: string }, DialogEvent>();
  private readonly dialog = viewChild.required(DialogComponent);
  protected readonly pending = signal(false);
  constructor() { afterNextRender(() => this.dialog().showModal()); }

  protected async confirm() {
    this.pending.set(true);
    await new Promise((r) => setTimeout(r, 1500)); // simulate server call
    this.dialog().close("dialog-confirm");
  }
}
export const Confirm = createCallable<{ message: string }, DialogEvent>(ConfirmDialog);

// call site
const result = await Confirm.call({ message: "Delete this item?" });
```

## API Reference

### DialogComponent (`<dialog>` / [dialog])

No inputs.

| Output   | Payload                       | Description                                                                 |
| -------- | ------------------------------- | ------------------------------------------------------------------------------ |
| `closed` | `DialogEvent` (`"dialog-close" \| "dialog-cancel" \| "dialog-confirm" \| "dialog-no" \| "dialog-yes"`) | Emitted once the dialog is closed, with the eventType passed to `close()`/`cancel()`. |

| Method                          | Description                                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `open()`                        | Alias for `showModal()`.                                                                        |
| `show()`                        | Non-modal open — no backdrop, clicking outside closes it.                                       |
| `showModal()`                   | Modal open — dims the page with a backdrop; clicking outside does not close it.                 |
| `showPopover()`                  | Opens using the native Popover API (light-dismiss).                                              |
| `close(eventType?: DialogEvent)` | Closes the dialog and emits `closed` with `eventType` (defaults to `"dialog-close"`). Idempotent. |
| `cancel(eventType?: DialogEvent)`| Closes the dialog with `eventType` defaulting to `"dialog-cancel"`.                              |

### DialogContent

| Input        | Type                            | Default | Description                                                              |
| ------------- | ---------------------------------- | ------- | ----------------------------------------------------------------------------- |
| `size`       | `"sm" \| "md" \| "lg" \| "xl"`     | `"sm"`  | Modal width (400px · 520px · 720px · 960px).                            |
| `labelledby` | `string`                          | —       | Explicit `id` for `aria-labelledby`; falls back to the projected `DialogTitle`'s id. |
| `class`      | `string`                          | —       | Extra classes merged into the modal surface.                             |

### DialogHeader

| Input        | Type     | Default   | Description                                                                                  |
| ------------ | -------- | --------- | ----------------------------------------------------------------------------------------------- |
| `closeLabel` | `string` | `"Close"` | Accessible name of the built-in close button. Its icon is decorative, so this is its only name — translate it. |
| `class`      | `string` | —         | Extra classes merged into the header.                                                           |

Projects an optional leading `<Badge>` (`.modal-leading` slot) before `DialogTitle`, and renders a
built-in close button that calls `DIALOG_REF.close()`.

### DialogBody

| Input   | Type     | Default | Description                                             |
| ------- | -------- | ------- | ----------------------------------------------------------- |
| `class` | `string` | `""`    | Extra classes merged into the scrollable body region.  |

### DialogFooter

| Input   | Type     | Default | Description                            |
| ------- | -------- | ------- | ------------------------------------------ |
| `class` | `string` | `""`    | Extra classes merged into the footer.  |

### DialogTitle

| Input   | Type     | Default        | Description                                                          |
| ------- | -------- | --------------- | ------------------------------------------------------------------------ |
| `id`    | `string` | auto-generated | Explicit id override; otherwise an auto-generated `modal-title-N` id is used and registered for `aria-labelledby`. |
| `class` | `string` | —               | Extra classes merged into the title element.                        |

### DialogDescription

| Input   | Type     | Default | Description                                    |
| ------- | -------- | ------- | ---------------------------------------------------- |
| `class` | `string` | —       | Extra classes merged into the description text.  |
