# Did You Mean

Displays a spelling-correction message from `Result.didYouMean`, with wording that matches what the engine actually searched: a term it replaced, a term it searched alongside the original, or a term it merely suggests.

## Demo

Pick a case to see both the backend response shape (`result.didYouMean`) and the resulting message side by side.

<demo-did-you-mean-cases></demo-did-you-mean-cases>

```html
<did-you-mean [result]="result()" />
```

## Backend response shape

```json
{
  "didYouMean": {
    "spellingCorrectionMode": "Smart",
    "text": {
      "original": "katalon",
      "corrected": "Catalon",
      "appliedChanges": [
        { "form": "katalon", "correction": "Catalon", "action": "correction" }
      ]
    }
  }
}
```

- `text.original` / `text.corrected` — the full query text, before and after correction.
- `text.appliedChanges` — one entry per corrected term (`form`/`correction`/`action`), reported by the engine ≥ 11.14 ([ES-28698](https://chapsvisiondev.atlassian.net/browse/ES-28698)). Absent on older engines.
- `action` per term is `"correction"` (term replaced), `"expansion"` (both terms searched), or `"suggestion"` (only the original was searched).

## Inputs

| Input | Type | Description |
| --- | --- | --- |
| `result` | `Result` | The query result, read via `result().didYouMean` |

## Notes

- The displayed message pivots on a resolved `action`, not directly on `spellingCorrectionMode`:
  - if `appliedChanges` is present and every entry agrees on the same `action`, that action is used;
  - if entries disagree, falls back to `"suggestion"` — the only message that doesn't assert a search behavior that may not actually have happened;
  - if `appliedChanges` is absent (engine < 11.14), falls back to inferring the action from `spellingCorrectionMode`: `"Correct"` → `correction`, `"Smart"` → `expansion`, anything else → `suggestion`.
- Clicking the corrected/original term re-runs the search with `spellingCorrectionMode: "dymonly"` and the clicked term.
