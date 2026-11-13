# Alerts (/docs/atomic-angular/notifications/alerts)

List a user's search alerts with their schedule, switch, reorder and delete them, and create or edit one through a callable Signal Forms dialog.



An alert is a saved query the server re-runs on a schedule — a frequency, the weekdays it repeats on, a time of
day. `<Alerts>` lists them (name and schedule on each row), switches them on or off, reorders and deletes them;
`AlertForm` opens the dialog that creates or edits one, and `<alert-form>` is the same form without the dialog, for
any other container.

<Callout title="Concept — alert">
  Unlike a saved search a user re-runs by hand, an alert is re-run **by the server** on a schedule, and (depending
  on how the deployment is configured) can notify the user out of band when new matches appear.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="alerts-basic" title="The list, and opening the create dialog">
  <Lang value="angular">
    <Tabs items="[&#x22;sample.component.ts&#x22;]">
      <Tab value="sample.component.ts">
        ```ts title="sample.component.ts"
        import { Component, inject, Injector } from "@angular/core";
        import { AlertForm, AlertsComponent } from "@sinequa/atomic-angular";

        @Component({
          selector: "sample-component",
          imports: [AlertsComponent],
          template: `
            <Alerts />
            <button type="button" (click)="createAlert()">New alert</button>
          `,
        })
        export class SampleComponent {
          private readonly injector = inject(Injector);

          protected async createAlert() {
            // Omit the index to create; pass one to edit UserSettingsStore.alerts()[index].
            await AlertForm.call(undefined, { injector: this.injector });
          }
        }
        ```
      </Tab>
    </Tabs>
  </Lang>
</CodeSample>

`AlertForm` is a callable, not a component — there is nothing to place in a template and no `opened` flag to
drive. The returned promise resolves with the `DialogEvent` that closed it: `"dialog-confirm"` when the alert
was saved, `"dialog-cancel"` otherwise. The dialog only hosts the form: the fields, the validation and the save
are those of `AlertFormComponent`, which you can place anywhere (see [Using the form outside a dialog](#using-the-form-outside-a-dialog)).

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    List[AlertsComponent] -- &#x22;click a row&#x22; --> Call[&#x22;AlertForm.call(index)&#x22;]
    List -- create --> CallNew[&#x22;AlertForm.call(undefined)&#x22;]
    Call --> Dialog[AlertDialog]
    CallNew --> Dialog
    Dialog --> Form[&#x22;alert-form, index&#x22;]
    Dialog --> Footer[&#x22;Cancel + Confirm, outside the form&#x22;]
    Footer -- &#x22;form attribute, submit&#x22; --> Form
    Form --> FormEl[&#x22;form formRoot=alertForm&#x22;]
    FormEl --> Name[&#x22;input formField=name&#x22;]
    FormEl --> Freq[&#x22;Select formField=frequency&#x22;]
    FormEl --> Time[&#x22;input type=time formField=time&#x22;]
    FormEl --> Days[&#x22;fieldset, 7 toggle chips formField=days.key&#x22;]
    FormEl --> Active[&#x22;Switch formField=active&#x22;]
    FormEl -- submit --> Action[&#x22;submission.action — create or update&#x22;]
    Action -- saved --> Dialog
    Form -- &#x22;execute&#x22; --> Replay[&#x22;replay the stored query, executed&#x22;]"
/>

<Mermaid
  chart="flowchart TD
    USS[UserSettingsStore] -- alerts --> List[AlertsComponent]
    USS -- &#x22;alerts index&#x22; --> Model[&#x22;alertModel seeded&#x22;]
    Model --> Tree[&#x22;form field tree&#x22;]
    Tree -- &#x22;submit, create mode&#x22; --> Create[&#x22;UserSettingsStore.createAlert&#x22;]
    Tree -- &#x22;submit, edit mode&#x22; --> Update[&#x22;UserSettingsStore.updateAlert&#x22;]
    QPS[QueryParamsStore] -- getQuery --> Tree
    QS[QueryService] -- &#x22;search, edit mode&#x22; --> CUQ[&#x22;canUpdateQuery&#x22;]
    List -- &#x22;drag and drop, Alt + arrows&#x22; --> UpdateAll[&#x22;UserSettingsStore.updateAlerts&#x22;]
    List -- &#x22;switch&#x22; --> Update
    List -- &#x22;delete, after the undo delay&#x22; --> Delete[&#x22;UserSettingsStore.deleteAlert&#x22;]"
/>

The whole form is one Signal Forms field tree (`[formRoot]`), and the Confirm button **is** the form's
`submit` — there is no separate click handler that reads the model and calls a service. The seven weekday
chips bind to plain booleans, one native checkbox each; `Alert.Days` (the bitfield the server actually stores)
only exists at the edges, folded by `flagsFromWeekdays()`/unfolded by `weekdaysFromFlags()`. Two shortcuts,
"Weekdays" and "Every day", check them in one click, and an `Immediate` alert does not show them at all.

When the alert already exists, a "Watched search" block summarises its query (text, tab, number of filters)
and offers to run it again or to replace it with the search on screen.

A save that fails never looks like it succeeded: the store only changes once the server has answered, the form
keeps what was typed and shows the reason **in the form** — a toast would sit behind a modal dialog, which is
in the top layer.

## Recipes [#recipes]

### Using the form outside a dialog [#using-the-form-outside-a-dialog]

<CodeSample id="alerts-form-panel" title="The same form in a side panel">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { AlertFormComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "alert-panel",
      imports: [AlertFormComponent],
      template: `
        <aside>
          <alert-form #form [index]="0" (saved)="close()" />
          <button type="button" (click)="close()">Cancel</button>
          <!-- Outside the form: it submits it through its id -->
          <button type="submit" [attr.form]="form.formId" [disabled]="form.saving()">Save</button>
        </aside>
      `,
    })
    export class AlertPanelComponent {
      protected close() {
        // hide the panel
      }
    }
    ```
  </Lang>
</CodeSample>

The form renders no Cancel or Confirm of its own: they belong to the container. It emits `saved` once the save has
succeeded, and `executed` once the user has run the watched search (the query parameters then hold it).

### Editing an existing alert [#editing-an-existing-alert]

<CodeSample id="alerts-edit" title="Opening the dialog on a specific alert">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, inject, Injector, input } from "@angular/core";
    import { AlertForm } from "@sinequa/atomic-angular";

    @Component({
      selector: "alert-row",
      template: `<button type="button" (click)="edit()">Edit</button>`,
    })
    export class AlertRowComponent {
      readonly index = input.required<number>();
      private readonly injector = inject(Injector);

      protected async edit() {
        const result = await AlertForm.call(this.index(), { injector: this.injector });
        if (result === "dialog-confirm") {
          // The row's own display already reflects the store — nothing else to do here.
        }
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  AlertFormModel: {
    type: &#x22;{ name: string; frequency: Alert.Frequency | null; days: Record<WeekdayKey, boolean>; time: string; active: boolean }&#x22;,
    description: 'The dialog\'s field-tree model. frequency includes null because that is the Select\'s empty state.',
  },
  &#x22;weekdaysFromFlags(mask)&#x22;: { type: &#x22;(mask: Alert.Days) => Record<WeekdayKey, boolean>&#x22;, description: &#x22;Splits the stored bitfield into the seven form booleans.&#x22; },
  &#x22;flagsFromWeekdays(days)&#x22;: { type: &#x22;(days: Record<WeekdayKey, boolean>) => Alert.Days&#x22;, description: &#x22;Folds the seven form booleans back into the bitfield the server stores.&#x22; },
}"
/>

`AlertsComponent` reads its list from `UserSettingsStore`. Its `dialog` input (default `true`) decides what a click on a row or on "Create" does: open the `AlertForm` dialog, or — with `[dialog]="false"` — open nothing and emit `editRequested` (the alert's index) or `createRequested`, so that you show `<alert-form>` wherever you like. The Settings dialog does that in its Alerts panel. `AlertDialog` receives its index
through the callable's props and reports only through the resolved promise. `AlertFormComponent` (`<alert-form>`):

<TypeTable
  type="{
  index: { type: &#x22;number | undefined&#x22;, default: &#x22;undefined&#x22;, description: &#x22;Index in UserSettingsStore.alerts() of the alert to edit. Leave it unset to create one.&#x22; },
  saved: { type: &#x22;OutputEmitterRef<void>&#x22;, description: &#x22;Emitted once the alert has been saved. Not emitted when the save fails.&#x22; },
  executed: { type: &#x22;OutputEmitterRef<void>&#x22;, description: &#x22;Emitted once the watched search has been put in the query parameters.&#x22; },
  formId: { type: &#x22;string&#x22;, description: &#x22;Id of the form element. A submit button outside the component points at it with its form attribute.&#x22; },
  saving: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;True while a submission is being saved.&#x22; },
}"
/>

### How the list behaves [#how-the-list-behaves]

* **Reordering** uses the browser's native drag and drop (`draggable`, no `@angular/cdk`) — and <kbd>Alt</kbd> +
  <kbd>↑</kbd> / <kbd>↓</kbd> on a focused row, which announces the new position. The order is shown at once and
  saved with `UserSettingsStore.updateAlerts`; if saving fails, the previous order comes back. A touch screen
  that does not start a native drag has no way to reorder.
* **Deleting** hides the row and offers "Undo" for six seconds; only then is `UserSettingsStore.deleteAlert`
  called. A second deletion, or the list going away (a popover closing), makes the pending one final.
* **The switch** writes `active` through `UserSettingsStore.updateAlert`, without opening the dialog.
* **A change that cannot be saved** is never left on screen: the switch goes back, the reorder is undone, the deleted row returns, and the reason is shown in a card above the list. It is not a toast — the list lives in popovers and modal dialogs, which are in the top layer, above any toast.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Setting frequency to Daily (value 0) behaves like nothing was selected">
    Not a bug: the model's empty state is `null`, never `undefined` — `undefined` would orphan the `Select` control
    under Signal Forms (`NG01902`) — and `required()` on the field correctly treats `null`, not `0`, as empty.
    `Alert.Frequency.Daily` being `0` is handled correctly precisely because the check is against `null`.
  </Accordion>

  <Accordion title="The Confirm button is clickable on an invalid form">
    Deliberate. A disabled `submit` never fires `submit()`, which is what marks every field touched and reveals
    validation messages — and the weekday `<fieldset>` has no other way to become touched, since its checkboxes
    cannot blur the group. Leaving Confirm enabled is what lets a user discover which field is missing. (It is
    disabled while a save is in progress, through `form.saving()`.)
  </Accordion>

  <Accordion title="A deleted alert is still on the server for a few seconds">
    Deliberate: the deletion is sent when the "Undo" notice goes away, not when the cross is clicked, nor when the row is
    dragged to the left on a touch screen (where the cross is out of sight, still there for a screen reader). Closing the
    popover that hosts the list sends it at once, so nothing is lost; only a closed tab or a crash in those six
    seconds keeps the alert.
  </Accordion>

  <Accordion title="My own Save button does nothing">
    The form does not contain its submit button. Put it anywhere and give it `[attr.form]="form.formId"` (with
    `#form` on `<alert-form>`): a button that is not inside the form and has no `form` attribute submits nothing.
    Inside the form's own markup, `ButtonComponent` does not set `type` for you — a button left untyped in a
    `<form>` submits it, so give every other button an explicit `type="button"`.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Cross-cutting interceptors" href="../integration/interceptors.mdx">
    Where a failed request's own error notifications come from.
  </Card>
</Cards>
