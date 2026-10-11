# Alert

Dialog to create or edit a search alert (name, frequency, weekdays, time). Invoked via the `AlertForm` callable. The whole dialog is a single [Signal Forms](https://angular.dev/guide/forms/signals) field tree inside a standard HTML `<form>`.

## Example

<demo-alert></demo-alert>

```ts
import { AlertForm } from "@sinequa/atomic-angular";

// omit the index for "create" mode; pass an index to edit an existing alert
AlertForm.call(undefined, { injector });
```

## Form model

The `Alert.Days` bitfield is exposed as seven boolean fields — one per checkbox, since Signal Forms binds a checkbox to a boolean — and folded back into the mask on submission.

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

The `Alerts` component lists the user's alerts and offers "Manage" (reorder) and "Create alert". Hosted in a galactik popover (a native `popover` element handled by `PopoverDirective`), it shows its own floating title, and clicking a row or "Create alert" closes the popover before the `AlertForm` dialog opens. Outside a popover the title is omitted and nothing is closed.

<demo-alerts-popover></demo-alerts-popover>

```html
<button popovertarget="alerts-popover" variant="secondary" size="md">Alerts</button>

<div popover id="alerts-popover" class="p-2" placement="bottom-start" [matchTriggerWidth]="false">
  <Alerts />
</div>
```

## Notes

- Backed by `QueryService`, `QueryParamsStore` and `UserSettingsStore` (all `providedIn: 'root'`).
- "Edit" mode (passing an index) triggers a search fetch; the demo uses "create" mode.
- In the popover demo, `UserSettingsStore` is replaced by a local stand-in (delete and reorder work in memory). Clicking an existing alert opens the dialog in "edit" mode, which runs a search fetch that has no backend here.
