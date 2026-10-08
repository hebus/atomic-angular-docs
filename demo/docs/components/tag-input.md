# Tag Input

A field that turns what is typed into removable tags — free text, no suggestions. Implements the signal forms `FormValueControl<string[]>` contract: bind it with `[(value)]` or as a form field (`[formField]`).

## Demo

The separator (`,` by default) and Enter add the tag being typed — Enter never submits the surrounding form. A duplicate is ignored whatever its case, Backspace in an empty field removes the last tag, and pasting `a, b, c` adds three.

<demo-tag-input></demo-tag-input>

```html
<TagInput aria-label="Tags" placeholder="Type a tag and press comma…" [(value)]="tags" />
```

## As a form field

<demo-tag-input-form></demo-tag-input-form>

```html
<TagInput aria-label="Keywords" [formField]="form.keywords" />
```

```typescript
protected readonly keywordsForm = form(this.model, path => required(path.keywords));
```

## States

<demo-tag-input-states></demo-tag-input-states>

```html
<TagInput aria-label="Disabled tags" [disabled]="true" [value]="['locked']" />
<TagInput aria-label="Read-only tags" [readonly]="true" [value]="['reviewed']" />
<TagInput aria-label="Separators" separator=",;" [addOnBlur]="false" />
```

## Notes

- Everything a user or a screen reader meets is an input with an English default: `placeholder`, `addLabel`, `removeLabel` (`{tag}` is replaced), `addedLabel`, `removedLabel`.
- `addOnBlur` (on by default) adds what is typed when the field loses focus. A form that can submit without that — Enter in another field — calls `commit()` on the component first.
