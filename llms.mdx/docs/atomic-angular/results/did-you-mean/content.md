# Did You Mean (/docs/atomic-angular/results/did-you-mean)

Turn a result's spelling correction into the right message — the engine corrected the query, expanded it, or only suggests a correction — and let the user switch between the two spellings.



When the engine corrects a misspelled query, three different things could actually have happened to the
search: the corrected term fully replaced the original, both spellings were searched together, or nothing was
searched yet and the engine only proposes a correction. `<did-you-mean>` reads which one from the result and
renders the matching message, with links to switch spellings.

<Callout title="Concept — applied changes">
  Since engine 11.14, a corrected result reports `didYouMean.text.appliedChanges` — one entry per corrected term,
  each naming the actual `action` the engine took (`correction`, `expansion`, or `suggestion`). Before 11.14 that
  field does not exist, and the component falls back to inferring the action from `spellingCorrectionMode`.
</Callout>

## Minimal example [#minimal-example]

<CodeSample id="did-you-mean-basic" title="Rendered next to a result list">
  <Lang value="angular">
    ```ts title="results.component.ts"
    import { Component, signal } from "@angular/core";
    import { DidYouMeanComponent } from "@sinequa/atomic-angular";
    import type { Result } from "@sinequa/atomic";

    @Component({
      selector: "results-component",
      imports: [DidYouMeanComponent],
      template: `
        @if (result(); as r) {
          <did-you-mean [result]="r" />
        }
      `,
    })
    export class ResultsComponent {
      protected readonly result = signal<Result | undefined>(undefined);
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

Which message renders depends entirely on the resolved `action` — a computed the component derives from the
result, never set directly:

<Mermaid
  chart="flowchart TD
    Result[&#x22;result().didYouMean.text&#x22;] --> Has{&#x22;corrected present?&#x22;}
    Has -->|no| None[&#x22;Nothing renders&#x22;]
    Has -->|yes| Changes{&#x22;appliedChanges reported (engine ≥ 11.14)?&#x22;}
    Changes -->|&#x22;yes, all same action&#x22;| UseAction[&#x22;Use that action&#x22;]
    Changes -->|&#x22;yes, actions differ&#x22;| Suggestion1[&#x22;suggestion (safest default)&#x22;]
    Changes -->|no| Mode{&#x22;spellingCorrectionMode&#x22;}
    Mode -->|Correct| Correction[&#x22;correction&#x22;]
    Mode -->|Smart| Expansion[&#x22;expansion&#x22;]
    Mode -->|other| Suggestion2[&#x22;suggestion&#x22;]"
/>

A mixed result — some terms corrected, others expanded — deliberately falls back to `suggestion`: it is the
only one of the three messages that does not assert a specific search behavior that may not actually have
happened for every term.

### The three messages [#the-three-messages]

| Action       | Meaning                               | Message                                                     |
| ------------ | ------------------------------------- | ----------------------------------------------------------- |
| `correction` | The original term was replaced        | Showing results for **Catalon**. Search instead for katalon |
| `expansion`  | Both spellings were searched together | Showing results for katalon and **Catalon**                 |
| `suggestion` | Only the original was searched        | Did you mean **Catalon**?                                   |

## Options [#options]

<TypeTable
  type="{
  result: { type: &#x22;Result | undefined&#x22;, description: &#x22;The query result to read didYouMean from. Nothing renders while undefined, or when there is no corrected text.&#x22; },
}"
/>

`selectCorrected()` and `selectOriginal()` are the two methods every message's links call — both patch
`QueryParamsStore` with `spellingCorrectionMode: "dymonly"` and navigate with the chosen text, so the engine
does not re-correct the choice the user just made.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Selecting the correction re-triggers the same correction message">
    Both `selectCorrected()` and `selectOriginal()` set `spellingCorrectionMode: "dymonly"` for exactly this
    reason — it tells the engine "the user already chose a spelling, stop correcting". If a custom flow bypasses
    these methods and re-runs the query without that mode, the same suggestion can resurface.
  </Accordion>

  <Accordion title="The message shown doesn't match what actually got searched">
    Confirm the engine version reports `appliedChanges` (11.14+) — on an older engine the action is inferred from
    `spellingCorrectionMode` alone, which is coarser: it describes the query-level setting, not what happened
    per-term, so a partially-corrected query can display a message that overstates or understates the correction.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Query" href="./query.mdx">
    Where the Result this component reads from comes from.
  </Card>

  <Card title="No Result" href="./no-result.mdx">
    The message for when correction still finds nothing.
  </Card>
</Cards>
