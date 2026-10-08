# Export

Dialog to export the current query results (or a selection) to CSV / XLSX / JSON. Invoked via the `Export` callable. The output format uses the galactik `Select`, the columns use it in **multiple** mode, and the max-lines field is a plain number input — the whole dialog is a [signal form](https://angular.dev/guide/forms/signals) (no `ngModel`).

## Example

<demo-export></demo-export>

```ts
import { Export } from "@sinequa/atomic-angular";

// export the current query results…
Export.call(undefined, { injector });

// …or a selection (flips the "from" toggle to Selection)
Export.call(selectionIds, { injector });
```

## Notes

- Backed by `AppStore` (reads the `queryExport` web service for the exportable columns), `QueryParamsStore` and `ExportService` (all `providedIn: 'root'`).
- The form fields (`format`, `columns`, `maxCount`) live in a single `form()` — the selects are wired to the fields via `[value]`/`(valueChange)`, the number input is controlled on its field.
- *Download* is asynchronous: the button is disabled and shows an animated spinner with "Downloading…" while the request runs, and the dialog closes once the file has been saved. If the request fails, the dialog stays open with an error message so the user can retry; closing it meanwhile (Cancel, Escape) cancels the request.
- The demo seeds a sample `queryexport` web service and stubs `api/v1/query.export` with a 2.5 s delay (so the spinner is visible), then returns a small CSV that is saved locally.
