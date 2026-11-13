# Feedback button (/docs/atomic-angular/notifications/feedback)

A menu button that lets the user like or dislike the current results, or send a typed message about content, interface, language or anything else, audited for the administrators.



`<feedback>` (`SearchFeedbackComponent`) is a compact menu trigger. Its entries send a thumbs-up or thumbs-down
for the results on screen, or open a dialog where the user types a free-form message. Everything goes through
the audit, nothing is stored client-side.

## Minimal example [#minimal-example]

<CodeSample id="feedback-basic" title="A dismissible feedback button above the results">
  <Lang value="angular">
    ```ts title="results.component.ts"
    import { Component, input } from "@angular/core";
    import { Result } from "@sinequa/atomic";
    import { SearchFeedbackComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "app-results",
      imports: [SearchFeedbackComponent],
      template: `
        @if (showFeedback) {
          <feedback [pages]="pages()" (onClose)="showFeedback = false" />
        }
      `,
    })
    export class ResultsComponent {
      pages = input.required<Result[]>();
      showFeedback = true;
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="sequenceDiagram
  participant U as User
  participant F as feedback
  participant D as Feedback dialog
  participant A as AuditService
  U->>F: opens the menu
  alt like or dislike
    F->>A: Search_Like or Search_Disike, with the query state and the record ids of pages
    F-->>U: success toast
  else content, ui, lang or other
    F->>D: opens it with the matching type
    U->>D: types a message and submits
    D->>A: UserFeedback_UserFeedback
  end"
/>

The record ids of every page in `pages` are included in the like/dislike audit payload, so the administrators
know which documents were on screen. Liking and disliking are mutually exclusive: once one is chosen, the
other entry is hidden.

Which entries appear comes from `general.feedback` in the application configuration — see
[Feature flags](../reference/feature-flags.mdx). Every switch defaults to on, and when all six are off the
button is not rendered at all.

## Recipes [#recipes]

### Inline in a row of options [#inline-in-a-row-of-options]

By default the button carries a close cross: it is a suggestion the user can dismiss, and `onClose` tells you to
hide it. When the button belongs to the page, remove the cross with `[dismissible]="false"`, and use `size="sm"`
to match compact neighbours.

<CodeSample id="feedback-inline" title="Not dismissible, compact size">
  <Lang value="angular">
    ```ts title="result-options.component.ts"
    import { Component } from "@angular/core";
    import { SearchFeedbackComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "app-result-options",
      imports: [SearchFeedbackComponent],
      template: `<feedback [pages]="[]" [dismissible]="false" size="sm" />`,
    })
    export class ResultOptionsComponent {}
    ```
  </Lang>
</CodeSample>

### Choosing a variant [#choosing-a-variant]

`variant` and `size` are forwarded to the underlying galactik button, so they accept its values.

<CodeSample id="feedback-variant" title="Primary variant, large size">
  <Lang value="angular">
    ```ts title="banner.component.ts"
    import { Component } from "@angular/core";
    import { SearchFeedbackComponent } from "@sinequa/atomic-angular";

    @Component({
      selector: "app-banner",
      imports: [SearchFeedbackComponent],
      template: `<feedback [pages]="[]" variant="primary" size="lg" />`,
    })
    export class BannerComponent {}
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  pages: { type: &#x22;Result[]&#x22;, description: &#x22;Required. The result pages currently shown, their record ids go into the audit payload.&#x22; },
  variant: { type: 'ButtonVariants[&#x22;variant&#x22;]', default: '&#x22;secondary&#x22;', description: &#x22;Variant of the trigger button.&#x22; },
  size: { type: 'ButtonVariants[&#x22;size&#x22;]', default: '&#x22;md&#x22;', description: &#x22;Size of the trigger button. sm fits a row of result options.&#x22; },
  dismissible: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Shows the close cross on the button. Turn it off where the button belongs to the page.&#x22; },
  onClose: { type: &#x22;EventEmitter<void>&#x22;, description: &#x22;Output, emitted when the user clicks the close cross. Never emitted when dismissible is false.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The button does not appear">
    Every key of `general.feedback` is off, so `showButton` is false and the component renders nothing. Check the
    configuration with the [feature flags editor](../reference/feature-flags.mdx).
  </Accordion>

  <Accordion title="The like/dislike audit event is named Search_Disike">
    The typo is the actual event type sent to the server, kept as is so existing audit reports keep matching. Filter
    on `Search_Disike`, not `Search_Dislike`.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Feature flags" href="../reference/feature-flags.mdx">
    The `general.feedback` switches that decide which entries the menu shows.
  </Card>

  <Card title="Alerts" href="./alerts.mdx">
    The other user-facing notification of this section.
  </Card>
</Cards>
