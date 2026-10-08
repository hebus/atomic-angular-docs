# Alerts (/docs/atomic-angular/notifications/alerts)

List, reorder and delete a user's search alerts, and create or edit one through a callable Signal Forms dialog.



An alert is a saved query the server re-runs on a schedule — a frequency, the weekdays it repeats on, a time of
day. `<Alerts>` lists, reorders and deletes them; `AlertForm` opens the dialog that creates or edits one.

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
was saved, `"dialog-cancel"` otherwise.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    List[AlertsComponent] -- &#x22;click a row&#x22; --> Call[&#x22;AlertForm.call(index)&#x22;]
    List -- create --> CallNew[&#x22;AlertForm.call(undefined)&#x22;]
    Call --> Dialog[AlertDialog]
    CallNew --> Dialog
    Dialog --> FormEl[&#x22;form formRoot=alertForm&#x22;]
    FormEl --> Name[&#x22;input formField=name&#x22;]
    FormEl --> Freq[&#x22;Select formField=frequency&#x22;]
    FormEl --> Days[&#x22;fieldset, 7 checkbox formField=days.key&#x22;]
    FormEl --> Time[&#x22;input type=time formField=time&#x22;]
    FormEl --> Active[&#x22;checkbox formField=active&#x22;]
    FormEl -- submit --> Action[&#x22;submission.action — create or update&#x22;]
    Dialog -- execute --> Replay[replay the stored query]"
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
    List -- &#x22;drag and drop&#x22; --> UpdateAll[&#x22;UserSettingsStore.updateAlerts&#x22;]"
/>

The whole dialog is one Signal Forms field tree (`[formRoot]`), and the Confirm button **is** the form's
`submit` — there is no separate click handler that reads the model and calls a service. The seven weekday
checkboxes bind to plain booleans, one field each; `Alert.Days` (the bitfield the server actually stores) only
exists at the edges, folded by `flagsFromWeekdays()`/unfolded by `weekdaysFromFlags()`.

## Recipes [#recipes]

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

Neither component takes an input. `AlertsComponent` reads its list from `UserSettingsStore`; `AlertDialog`
receives its index through the callable's props and reports only through the resolved promise.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Setting frequency to Daily (value 0) behaves like nothing was selected">
    Not a bug: the model's empty state is `null`, never `undefined` — `undefined` would orphan the `Select` control
    under Signal Forms (`NG01902`) — and `required()` on the field correctly treats `null`, not `0`, as empty.
    `Alert.Frequency.Daily` being `0` is handled correctly precisely because the check is against `null`.
  </Accordion>

  <Accordion title="The Confirm button is clickable on an invalid form">
    Deliberate. A disabled `submit` never fires `submit()`, which is what marks every field touched and reveals
    validation messages — and the weekday `<fieldset>` has no other way to become touched, since the galactik
    `Checkbox` emits no `touch` output on its own. Leaving Confirm enabled is what lets a user discover which field
    is missing.
  </Accordion>

  <Accordion title="A plain <button> inside the dialog submits the form unexpectedly">
    `ButtonComponent` is a directive on the bare `button` selector and does not set `type` for you — a button left
    untyped inside a `<form>` submits it by default HTML behavior. Every button in this dialog other than Confirm
    needs an explicit `type="button"`.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Cross-cutting interceptors" href="../integration/interceptors.mdx">
    Where a failed request's own error notifications come from.
  </Card>
</Cards>
