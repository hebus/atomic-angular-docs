# Alert

Dialog to create or edit a search alert (name, frequency, weekdays, time). Invoked via the `AlertForm` callable. The dialog only hosts `AlertFormComponent` (`<alert-form>`), a single [Signal Forms](https://angular.dev/guide/forms/signals) field tree inside a standard HTML `<form>` that can sit in any other container too.

## Example

<demo-alert></demo-alert>

```ts
import { AlertForm } from "@sinequa/atomic-angular";

// omit the index for "create" mode; pass an index to edit an existing alert
AlertForm.call(undefined, { injector });
```

## The form on its own

`<alert-form>` renders the fields, validates them and saves, but has no Cancel or Confirm button: the container provides them. A submit button outside the form points at it with its `form` attribute.

```html
<alert-form #form [index]="0" (saved)="close()" />
<button type="button" (click)="close()">Cancel</button>
<button type="submit" [attr.form]="form.formId" [disabled]="form.saving()">Save</button>
```

| Member | |
| --- | --- |
| `index` (input) | Index of the alert to edit; unset to create one. |
| `saved` (output) | The alert was saved. Not emitted when the save fails. |
| `executed` (output) | The watched search was put in the query parameters. |
| `formId`, `saving()` | For the container's submit button. |

Its layout follows its own width (a container query): frequency and time share a line from 24rem up and stack below. When a save fails, the form keeps what was typed and shows the reason in a card inside the form — a toast would sit behind a modal dialog.

<demo-alert-form></demo-alert-form>

On an existing alert, the form shows its stored values and a "Watched search" block — the text, tab and number of filters of the query — with the two buttons that run it again or replace it with the search on screen. Those buttons need a backend search, which this demo has none of, so they stay disabled.

<demo-alert-form-edit></demo-alert-form-edit>

The layout follows the width of the form, not of the window. At 20rem, frequency and time stack:

<demo-alert-form-narrow></demo-alert-form-narrow>

When the server cannot be reached, nothing is saved, what was typed stays, and the reason is shown in a card inside the form (here every save fails after a moment):

<demo-alert-form-offline></demo-alert-form-offline>

The same cases in the dialog. A toast would sit behind a modal dialog, which is in the top layer, so the card is the only place the failure can show:

<demo-alert-dialog-edit></demo-alert-dialog-edit>

<demo-alert-dialog-offline></demo-alert-dialog-offline>

## Form model

The `Alert.Days` bitfield is exposed as seven boolean fields — one per weekday chip (a native checkbox dressed as a toggle), since Signal Forms binds a checkbox to a boolean — and folded back into the mask on submission. "Weekdays" and "Every day" check them in one click; an `Immediate` alert does not show them.

```ts
interface AlertFormModel {
  name: string;
  frequency: Alert.Frequency | null; // null is the Select's empty state, never undefined
  days: Record<WeekdayKey, boolean>;
  time: string; // "HH:mm"
  active: boolean;
}
```

## Validation

- the name must not be blank, and the frequency and time are required
- at least one weekday must be checked — except for the `Immediate` frequency, which does not repeat

The Confirm button stays enabled: submitting is what marks the fields as touched and reveals the messages.

## Alerts list inside a popover

The `Alerts` component lists the user's alerts. Each row shows the name and, under it, when the alert fires (« Daily · 09:00 · Mon–Fri »), with an on/off switch. "Create" sits in the header. Hosted in a galactik popover (a native `popover` element handled by `PopoverDirective`), it shows its own floating title, and clicking a row or "Create" closes the popover before the `AlertForm` dialog opens. Outside a popover the title is omitted and nothing is closed.

There is no "manage" mode:

- **Reorder** by dragging a row (the browser's own drag and drop), or with <kbd>Alt</kbd> + <kbd>↑</kbd> / <kbd>↓</kbd> on a focused row. The new order is saved on drop, and the move is announced to screen readers.
- **Delete** with the cross shown on the row, or by dragging the row to the left on a touch screen. The row leaves the list at once and an "Undo" notice stays for a few seconds; the deletion is sent after that, or when the list closes.
- **Suspend** an alert with its switch: the row is dimmed and starts with « Paused ».

<demo-alerts-popover></demo-alerts-popover>

```html
<button popovertarget="alerts-popover" variant="secondary" size="md">Alerts</button>

<div popover id="alerts-popover" class="p-2" placement="bottom-start" [matchTriggerWidth]="false">
  <Alerts />
</div>
```

## When a change cannot be saved

The list never shows a change that was not saved: a switch goes back where it was, a reorder is undone, a deleted row comes back. The reason is shown in a card above the list — not as a toast, because the list lives in popovers and modal dialogs, which are in the top layer, above any toast. Here every save fails after a moment; flip a switch:

<demo-alerts-offline></demo-alerts-offline>

## Showing the form somewhere else

By default a click on a row, or on "Create", opens the `AlertForm` dialog. With `[dialog]="false"` the list opens nothing and reports the request instead, so that you can show `<alert-form>` where you want (the Settings dialog does, in its Alerts panel):

```html
<Alerts [dialog]="false" (editRequested)="edit($event)" (createRequested)="create()" />
```

## Empty state

With no alert, the list shows the bell icon on a pastel tile, its message, and "Create Alert" as the call to action (the header button is left out so there is only one).

<demo-alerts-empty></demo-alerts-empty>

```html
<Alerts />
```

## Long names

A name that does not fit is cut on one line; the schedule under it stays readable.

<demo-alerts-long-names></demo-alerts-long-names>

```html
<Alerts />
```

## A single alert

With one alert there is nothing to reorder: the drag handle and the reorder hint are not shown.

<demo-alerts-single></demo-alerts-single>

```html
<Alerts />
```

## Notes

- Backed by `QueryService`, `QueryParamsStore` and `UserSettingsStore` (all `providedIn: 'root'`).
- "Edit" mode (passing an index) triggers a search fetch, which has no backend in the demo: the "Watched search" buttons stay disabled there. The demos replace `UserSettingsStore` with an in-memory stand-in.
- In the popover demo, `UserSettingsStore` is replaced by a local stand-in (delete, the on/off switch and reorder work in memory). Clicking an existing alert opens the dialog in "edit" mode, which runs a search fetch that has no backend here.
