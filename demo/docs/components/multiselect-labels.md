# Multi-select Labels

Input + suggestion popover to add/remove labels on an article, with the applied labels shown as chips. Rendered inline via `<multiselect-labels>`. The input uses the galactik `input-group`.

## Example

Type a few letters (e.g. "co", "le", "ma") to see mocked suggestions — click one to add it as a chip, then use the chip's remove icon to take it back off.

<demo-multiselect-labels></demo-multiselect-labels>

```html
<multiselect-labels
  [(article)]="article"
  [isPublic]="false"
  [allowModification]="true"
  labelsField="labels" />
```

## Error

When the backend refuses an add or a remove, the applied labels stay as they were and a banner says so (`role="alert"`, so assistive technology announces it); the next attempt takes it away. Press **Backend: working** under the demo above to make the mocked backend *fail*, then try to add or remove a label.

## Notes

- Suggestions come from `fetchLabels` (`api/v1/labels`) — this demo mocks that backend call so typing, adding and removing labels all work offline.
- The suggestions popover only opens once at least 2 characters are typed, and stays open after each pick so several suggestions can be added in a row without retyping.
- `allowModification` shows the remove icon on each chip.
- Adding/removing a label requires a bound `article` with a matching `labelsField` — without both, clicking a suggestion is a no-op.
