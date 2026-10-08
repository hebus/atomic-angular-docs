# Feedback

Compact menu trigger that lets users send a thumbs-up / thumbs-down or a typed feedback message about the current search. Like and dislike events are audited via `AuditService`; the other categories open a `feedback-dialog`.

## Imports

```ts
import { SearchFeedbackComponent } from "@sinequa/atomic-angular";
```

## Demo

`pages` is the list of result pages currently displayed. The component pulls record ids out of each page so the audit payload knows which documents were on screen when the user submitted feedback.

<demo-feedback-basic></demo-feedback-basic>

```html
<feedback [pages]="pages" />
```

## Variants

The trigger renders a `button` from `@sinequa/galactik` — both `variant` and `solid` are forwarded.

<demo-feedback-variants></demo-feedback-variants>

```html
<feedback [pages]="pages" variant="primary" />
<feedback [pages]="pages" variant="secondary" />
<feedback [pages]="pages" variant="outline" />
<feedback [pages]="pages" variant="tertiary" />
```

### Solid

<demo-feedback-solid></demo-feedback-solid>

```html
<feedback [pages]="pages" variant="primary" [solid]="true" />
<feedback [pages]="pages" variant="secondary" [solid]="true" />
```

## API Reference

### Inputs

| Name      | Type                       | Default       | Description                                                            |
| --------- | -------------------------- | ------------- | ---------------------------------------------------------------------- |
| `pages`   | `Result[]`                 | —             | Result pages currently shown — their record ids are sent in the audit. |
| `variant` | `ButtonVariants["variant"]` | `"secondary"` | Visual variant of the trigger button.                                  |
| `solid`   | `ButtonVariants["solid"]`   | `false`       | Whether the trigger is rendered with a solid fill.                     |

### Outputs

| Name      | Payload | Description                                                                              |
| --------- | ------- | ---------------------------------------------------------------------------------------- |
| `onClose` | `void`  | Emitted when the user clicks the close (×) icon on the trigger — host should hide it. |

## Notes

- Liking and disliking are mutually exclusive — once the user clicks one, the opposite menu entry is hidden.
- The four extra menu items (`content`, `ui`, `lang`, `other`) all open the same `<feedback-dialog>` with the matching `type` so the user can type a free-form message.
- Audit events sent: `Search_Like`, `Search_Disike` (sic — current API name) and `UserFeedback_UserFeedback` (from the dialog).
