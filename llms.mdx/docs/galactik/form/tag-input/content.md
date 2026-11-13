# Tag Input (/docs/galactik/form/tag-input)

A free-text field that turns what is typed into removable tags — comma or Enter adds one, Backspace removes the last, duplicates are ignored.



`TagInput` collects a list of short free-text labels — keywords, categories, e-mail addresses — in one field. The tags
sit inside the field, before the text being typed. It reuses [`InputGroup`](./input.mdx)'s visual system (border,
focus, disabled and error states) and shows each tag as a [`Tag`](../display/tag.mdx) with a remove button.

For a choice among known options, with suggestions, use [`Autocomplete`](./autocomplete.mdx) instead: `TagInput`
never proposes anything and accepts any text.

## Minimal example [#minimal-example]

<CodeSample id="tag-input-basic" title="A field of tags">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { TagInputComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [TagInputComponent],
      template: `<TagInput aria-label="Tags" placeholder="Type a tag and press comma…" [(value)]="tags" />`,
    })
    export class SampleComponent {
      tags = signal<string[]>(["design", "angular"]);
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

`TagInput` is a signal forms `FormValueControl<string[]>`: bind it with `[(value)]`, or as a form field.

<CodeSample id="tag-input-form" title="As a signal forms field">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { form, FormField, required } from "@angular/forms/signals";
    import { TagInputComponent } from "@sinequa/galactik";

    @Component({
      selector: "sample-component",
      imports: [TagInputComponent, FormField],
      template: `
        <form>
          <TagInput
            aria-label="Keywords"
            [scheme]="keywords().touched() && keywords().invalid() ? 'error' : 'default'"
            [formField]="keywordsForm.keywords" />
        </form>
      `,
    })
    export class SampleComponent {
      private readonly model = signal({ keywords: [] as string[] });
      protected readonly keywordsForm = form(this.model, path => required(path.keywords));
      protected readonly keywords = this.keywordsForm.keywords;
    }
    ```
  </Lang>
</CodeSample>

What typing does:

* **The separator** (`,` by default; `separator=",;"` gives several) and **Enter** add the tag being typed. Enter never
  submits the surrounding form.
* A tag is trimmed. An empty one is ignored, and so is a duplicate **whatever its case** — the first spelling stays.
* **Backspace** in an empty field removes the last tag. The remove button of a tag removes that one.
* **Pasting** `a, b, c` (or one tag per line) adds three tags.
* **Leaving the field** adds what is typed (`addOnBlur`, on by default), so a Save button never loses the last word.

## Options [#options]

<TypeTable
  type="{
  value: { type: &#x22;string[]&#x22;, default: &#x22;[]&#x22;, description: &#x22;The tags, in the order they were added (two-way binding). Also the FormValueControl<string[]> contract member.&#x22; },
  placeholder: { type: &#x22;string&#x22;, default: '&#x22;Add a tag…&#x22;', description: &#x22;Shown only while there is no tag.&#x22; },
  separator: { type: &#x22;string&#x22;, default: '&#x22;,&#x22;', description: &#x22;The character(s) that add the tag being typed, besides Enter.&#x22; },
  addOnBlur: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Adds what is typed when the field loses focus.&#x22; },
  disabled: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Disables the field and every remove button; dims the host.&#x22; },
  readonly: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;The tags stay visible but cannot be changed.&#x22; },
  scheme: { type: '&#x22;default&#x22; | &#x22;success&#x22; | &#x22;error&#x22;', default: '&#x22;default&#x22;', description: &#x22;The InputGroup colour scheme; error also sets aria-invalid on the field.&#x22; },
  size: { type: '&#x22;sm&#x22; | &#x22;md&#x22; | &#x22;lg&#x22;', default: '&#x22;md&#x22;', description: &#x22;The InputGroup size; the field grows past it when the tags wrap.&#x22; },
  &#x22;aria-label&#x22;: { type: &#x22;string&#x22;, description: &#x22;The accessible name of the group — what the tags are. Written on the element, as for SearchInput.&#x22; },
  addLabel: { type: &#x22;string&#x22;, default: '&#x22;Add a tag&#x22;', description: &#x22;The accessible name of the typing field.&#x22; },
  removeLabel: { type: &#x22;string&#x22;, default: '&#x22;Remove {tag}&#x22;', description: &#x22;The accessible name of a remove button; {tag} is replaced.&#x22; },
  addedLabel: { type: &#x22;string&#x22;, default: '&#x22;{tag} added&#x22;', description: &#x22;Announced politely after an addition; {tag} is replaced.&#x22; },
  removedLabel: { type: &#x22;string&#x22;, default: '&#x22;{tag} removed&#x22;', description: &#x22;Announced politely after a removal; {tag} is replaced.&#x22; },
}"
/>

Methods: `commit()` adds what is typed and clears the field, `add(text)` and `remove(tag)` do what the keyboard does,
and `focus()` moves the focus into the field.

Nothing in the library translates: pass the five labels translated.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The last word typed is lost when the form is submitted">
    `addOnBlur` covers a click on a Save button, which takes the focus first. A form that submits with the field still
    focused — Enter in *another* field, or a programmatic `submit()` — has to call `commit()` first:
    `viewChild(TagInputComponent).commit()`.
  </Accordion>

  <Accordion title="A label with a for attribute does not name the field">
    `[formField]` rewrites the `id` of the inner input, and the host is a group, not a control. Name the field with
    `aria-label` (and show the visible label next to it), as the examples do.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Autocomplete" href="./autocomplete.mdx">
    The async, backend-searched sibling, always tag-based.
  </Card>

  <Card title="Tag" href="../display/tag.mdx">
    The chip each tag is drawn with.
  </Card>
</Cards>
