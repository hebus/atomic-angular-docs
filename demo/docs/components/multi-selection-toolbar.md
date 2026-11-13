# Multi Selection Toolbar

Floating toolbar shown at the bottom of the viewport once at least one result is multi-selected. It reads `SelectionStore.multiSelection` and offers:

- the **count**, which doubles as a button clearing the selection,
- **Collections**: opens the "Add to collection" dialog for the selected articles,
- **Export**: opens the export dialog for the selected ids,
- **Add to AI overview**: attaches the selected ids to the assistant. Only shown when the default assistant instance has `modeSettings.enabledUserInput`.

It slides in (opacity and translation) when the count goes above zero and slides out again when it returns to zero.

The `floating` variant swaps the bar for detached buttons in the bottom-right corner of the window: **Add to collection** (accent), **Export** and the optional AI action (secondary), with no count. **Add to collection** opens a popover panel anchored to the button instead of the dialog: one toggle per collection (`+` to add, a check when it already holds every selected document, which removes them), an inline "New collection" field, and an empty state. Once the selection is filed, the panel closes, the selection is emptied and `addedToCollection` fires.

## Imports

```ts
import { MultiSelectionToolbarComponent } from "@sinequa/atomic-angular";
```

## Demo

Select documents, switch variant, then try the toolbar buttons. The toolbar is `position: fixed`, so the demo wraps it in a frame with layout containment (`[contain:layout]`) to keep it inside the page; in an application, simply drop it anywhere.

<demo-multi-selection-toolbar-basic></demo-multi-selection-toolbar-basic>

```html
<multi-selection-toolbar variant="dark" (updatedCollections)="refreshCollections()" />
```

## Inputs

| Input     | Type                            | Default  | Description                                                        |
| --------- | ------------------------------- | -------- | ------------------------------------------------------------------ |
| `variant` | `"dark" \| "light" \| "glassy" \| "floating"` | `"dark"` | Visual style. `glassy` is translucent and blurs what is behind it. `floating` shows detached buttons in the bottom-right corner and files into collections through a popover panel. |
| `class`   | `string`                        | `""`     | Extra classes merged into the inner `<menu>`.                      |
| `allowAI` | `boolean`                       | `false`  | Shows "Add to the AI Overview" — only if the assistant is also allowed and has user input enabled. Set it only if the app embeds an assistant. |

| Output               | Payload | Description                                                                                                                          |
| -------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `updatedCollections` | `void`  | Emitted after the "Add to collection" dialog is closed with a change. When it closes with "no" (done), the selection is cleared too. |
| `addedToCollection`  | `string` | `floating` only: the selection has just been filed in a collection (its name). The panel has closed and the selection is empty (`cleared` fired first). |
| `cleared`            | `void`  | The selection was just emptied (count button, Escape). |

## Notes

- The component is driven by `SelectionStore` (selection), `AppStore` (assistant configuration) and the dialogs it opens (`UserSettingsStore`, `QueryParamsStore`, the export service). The demo provides its own `SelectionStore` and an in-memory `UserSettingsStore`, so selecting and the **Collections** dialog work offline.
- **Export** opens the real dialog, seeded with a `queryexport` web service so it shows its columns, but its **Download** button posts to the backend, which does not exist in the demo.
- **Add to AI overview** only writes `assistantIdsToAttach` in the store; the assistant that consumes it is not part of the demo.
- Selection is cleared by the count button.
