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

The trigger renders a `button` from `@sinequa/galactik` — `variant` is forwarded to it and accepts any button variant.

<demo-feedback-variants></demo-feedback-variants>

```html
<feedback [pages]="pages" variant="primary" />
<feedback [pages]="pages" variant="secondary" />
```

## Size

`size` is forwarded to the button too (`md` by default). Use `sm` where the trigger sits in a row of compact options, such as the options of a result.

<demo-feedback-sizes></demo-feedback-sizes>

```html
<feedback [pages]="pages" size="sm" />
<feedback [pages]="pages" size="md" />
<feedback [pages]="pages" size="lg" />
```

## Inline, not dismissible

By default the trigger shows a close cross, as a suggestion the user can dismiss (`onClose`). When the button belongs to the page, for example in a row of options, set `[dismissible]="false"` to remove the cross.

<demo-feedback-inline></demo-feedback-inline>

```html
<!-- Dismissible suggestion (default) -->
<feedback [pages]="pages" (onClose)="hideFeedback()" />

<!-- Part of the page: no close cross -->
<feedback [pages]="pages" [dismissible]="false" />

<!-- Inline in a row of compact options -->
<feedback [pages]="pages" [dismissible]="false" size="sm" />
```

## API Reference

### Inputs

| Name      | Type                        | Default       | Description                                                            |
| --------- | --------------------------- | ------------- | ---------------------------------------------------------------------- |
| `pages`   | `Result[]`                  | —             | Result pages currently shown — their record ids are sent in the audit. |
| `variant` | `ButtonVariants["variant"]` | `"secondary"` | Visual variant of the trigger button.                                  |
| `size`        | `ButtonVariants["size"]`    | `"md"`        | Size of the trigger button. `sm` fits a row of result options.         |
| `dismissible` | `boolean`                   | `true`        | Shows the close cross on the button. Turn it off when the button belongs to the page. |

### Outputs

| Name      | Payload | Description                                                                           |
| --------- | ------- | ------------------------------------------------------------------------------------- |
| `onClose` | `void`  | Emitted when the user clicks the close (×) icon on the trigger — host should hide it. Never emitted when `dismissible` is `false`. |

## Notes

- Which entries appear is driven by `general.feedback` (`like`, `dislike`, `content`, `ui`, `lang`, `other`, all enabled by default). When all are off, the button is not rendered.
- Liking and disliking are mutually exclusive — once the user clicks one, the opposite menu entry is hidden.
- The four extra menu items (`content`, `ui`, `lang`, `other`) all open the same `<feedback-dialog>` with the matching `type` so the user can type a free-form message.
- Audit events sent: `Search_Like`, `Search_Disike` (sic — current API name) and `UserFeedback_UserFeedback` (from the dialog).
