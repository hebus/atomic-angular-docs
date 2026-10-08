# Autocomplete (/docs/galactik/form/autocomplete)

An editable combobox for debounced backend search with multi-selection — labels, filter facets, people pickers — where picked values render as removable chips inside the field.



`Autocomplete` fills the gap [`SelectMenu`](./select.mdx) deliberately doesn't cover: `SelectMenu` is a
fixed/synchronous options list behind a non-editable trigger, while `Autocomplete` is always multi-selection
and always backed by an async `loader`. Visually the two are the same component family — both wear the same
`selectWrapVariants` wrap, so label, field, popup, rows and hint come from one design-system source of truth.
It is the one component behind every "type, pick from a list" field of the library, and it replaces `SearchSelect`.

<Callout title="Concept — never owns persistence">
  `Autocomplete` never mutates its own applied values. `selected` is input-only, and `picked`/`removed` only
  report the user's intent — the host calls its own backend (with error handling) before reflecting the change
  back into `selected`. This mirrors a real "add labels to a document" flow.
</Callout>

## When to use it [#when-to-use-it]

<Cards>
  <Card title="Use it when">
    The options come from an async source and are too many to list (labels, filter facets, people, tags with
    suggestions), the user builds a **multiple** selection shown as removable chips, and the host runs its own call
    before the pick lands.
  </Card>

  <Card title="Don't use it when">
    The options are a fixed synchronous list ([`SelectMenu`](./select.mdx)), the value is free text with no
    suggestions ([`TagInput`](./tag-input.mdx)), the field is a search box that filters a page
    ([`SearchInput`](./search-input.mdx), [`SearchBar`](./search-bar.mdx)), or it is a facet with counters or a tree.
  </Card>
</Cards>

It is multi-selection by design — `picked` appends. A single value out of a search is possible with `closeOnPick` and
a host that replaces `selected` with one entry, but if that becomes the common case it deserves its own contract.

## Minimal example [#minimal-example]

<CodeSample id="autocomplete-basic" title="Debounced backend search with tag-based applied values">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component, signal } from "@angular/core";
    import { AutocompleteComponent } from "@sinequa/galactik";

    interface Fruit {
      id: string;
      name: string;
    }

    const ALL_FRUITS: Fruit[] = [
      { id: "apple", name: "Apple" },
      { id: "banana", name: "Banana" },
      { id: "cherry", name: "Cherry" },
    ];

    @Component({
      selector: "sample-component",
      imports: [AutocompleteComponent],
      template: `
        <Autocomplete
          [selected]="selectedFruits()"
          [loader]="search"
          [key]="keyOf"
          [label]="labelOf"
          fieldLabel="Fruits"
          placeholder="Search fruits…"
          (picked)="onPicked($event)"
          (removed)="onRemoved($event)" />
      `,
    })
    export class SampleComponent {
      selectedFruits = signal<Fruit[]>([]);

      keyOf = (fruit: Fruit) => fruit.id;
      labelOf = (fruit: Fruit) => fruit.name;

      search = (query: string, { signal }: { signal: AbortSignal }): Promise<Fruit[]> =>
        Promise.resolve(ALL_FRUITS.filter((f) => f.name.toLowerCase().includes(query.toLowerCase())));

      onPicked(fruit: Fruit) {
        this.selectedFruits.update((fruits) => [...fruits, fruit]);
      }

      onRemoved(fruit: Fruit) {
        this.selectedFruits.update((fruits) => fruits.filter((f) => f.id !== fruit.id));
      }
    }
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    User -- types, debounced --> AutocompleteComponent
    AutocompleteComponent -- &#x22;loader(query)&#x22; --> Backend[(&#x22;host-provided loader&#x22;)]
    Backend -- suggestions --> AutocompleteComponent
    User -- picks suggestion / presses Enter --> AutocompleteComponent
    AutocompleteComponent -- picked.emit --> Host[[&#x22;host component&#x22;]]
    Host -- backend call + error handling --> Backend
    Host -- updates --> Selected[[&#x22;selected input&#x22;]]
    Selected -- re-render tags, exclude from suggestions --> AutocompleteComponent
    User -- clicks tag remove --> AutocompleteComponent
    AutocompleteComponent -- removed.emit --> Host"
/>

A search fires once the typed query, debounced, reaches `minLength` characters. While it is in flight the field's
chevron gives way to a spinner and the rows of the previous search stay on screen — replacing them with a
"Searching…" line made the list blink on every keystroke — so `searchingText` only shows when there is nothing
to keep. Only a search that has come back (empty) may claim there is nothing, and a failed one says so in an
alert row (`errorText`). The `loader` receives an `AbortSignal`: a newer query aborts the request of the older
one — hand it to `fetch`. The popup is a manual popover in the top layer, so a dialog's edges don't clip it.

The suggestion under the mouse becomes the active row (`activateOnHover`), so only one row is highlighted and the arrow
keys resume from it; <kbd>Enter</kbd> without any arrow or hover still picks the first one.

## Recipes [#recipes]

### Persisting the pick before reflecting it [#persisting-the-pick-before-reflecting-it]

`picked`/`removed` only report intent — the host is responsible for the backend call and for updating
`selected` only on success.

<CodeSample id="autocomplete-persist" title="Attaching and detaching labels with error handling">
  <Lang value="angular">
    ```ts title="label-picker.component.ts"
    import { Component, signal } from "@angular/core";
    import { AutocompleteComponent } from "@sinequa/galactik";

    interface Label {
      id: string;
      name: string;
    }

    @Component({
      selector: "label-picker",
      imports: [AutocompleteComponent],
      template: `
        <Autocomplete
          [selected]="appliedLabels()"
          [loader]="searchLabels"
          [minLength]="2"
          [debounceMs]="250"
          [key]="keyOf"
          [label]="labelOf"
          fieldLabel="Labels"
          placeholder="Search labels…"
          noResultsText="No matching labels"
          (picked)="onPicked($event)"
          (removed)="onRemoved($event)" />
      `,
    })
    export class LabelPickerComponent {
      appliedLabels = signal<Label[]>([]);

      keyOf = (label: Label) => label.id;
      labelOf = (label: Label) => label.name;

      searchLabels = (query: string): Promise<Label[]> => this.fetchLabels(query);

      async onPicked(label: Label) {
        try {
          await this.attachLabel(label.id);
          this.appliedLabels.update((labels) => [...labels, label]);
        } catch {
          // keep appliedLabels untouched — the pick is not reflected on failure
        }
      }

      async onRemoved(label: Label) {
        try {
          await this.detachLabel(label.id);
          this.appliedLabels.update((labels) => labels.filter((l) => l.id !== label.id));
        } catch {
          // keep appliedLabels untouched — the removal is not reflected on failure
        }
      }

      // Stand-ins for the host application's own backend calls.
      private fetchLabels(query: string): Promise<Label[]> {
        return Promise.resolve([]);
      }
      private attachLabel(id: string): Promise<void> {
        return Promise.resolve();
      }
      private detachLabel(id: string): Promise<void> {
        return Promise.resolve();
      }
    }
    ```
  </Lang>
</CodeSample>

### A people picker [#a-people-picker]

When the applied values aren't shaped like the suggestions (a person found in a directory becomes an entry with
a role), `selectedKey` and `selectedLabel` tell the component how to read them. `excludeKeys` keeps out
people who already have access, `closeOnPick` closes the list and clears the text after a pick — a chat's
mention box — and an element marked `autocompleteSuffix` is projected inside the field, after the text.

<CodeSample id="autocomplete-people" title="Picking people, each with a role">
  <Lang value="angular">
    ```ts title="people-picker.component.ts"
    import { Component, signal } from "@angular/core";
    import { AutocompleteComponent } from "@sinequa/galactik";

    interface Person {
      userId: string;
      name: string;
      email: string;
    }
    interface Entry {
      id: string;
      name: string;
      role: "reader" | "owner";
    }

    @Component({
      selector: "people-picker",
      imports: [AutocompleteComponent],
      template: `
        <Autocomplete
          [selected]="entries()"
          [loader]="search"
          [key]="personKey"
          [label]="personName"
          [selectedKey]="entryKey"
          [selectedLabel]="entryName"
          [excludeKeys]="alreadyHaveAccess"
          [indicator]="false"
          [closeOnPick]="true"
          placeholder="Search people…"
          ariaLabel="Search people"
          (picked)="pick($event)"
          (removed)="remove($event)">
          <ng-template #autocompleteOption let-person>
            <span class="flex flex-col">
              <span>{{ person.name }}</span>
              <span class="text-xs">{{ person.email }}</span>
            </span>
          </ng-template>
          <button autocompleteSuffix type="button" (click)="nextRole.set(nextRole() === 'reader' ? 'owner' : 'reader')">
            as {{ nextRole() }}
          </button>
        </Autocomplete>
      `,
    })
    export class PeoplePickerComponent {
      entries = signal<Entry[]>([]);
      nextRole = signal<"reader" | "owner">("reader");
      alreadyHaveAccess = ["domain|grace"];

      personKey = (p: Person) => p.userId;
      personName = (p: Person) => p.name;
      entryKey = (e: Entry) => e.id;
      entryName = (e: Entry) => e.name;

      search = (query: string, { signal }: { signal: AbortSignal }): Promise<Person[]> =>
        fetch(`/api/people?q=${encodeURIComponent(query)}`, { signal }).then((r) => r.json());

      pick(person: Person) {
        this.entries.update((entries) => [...entries, { id: person.userId, name: person.name, role: this.nextRole() }]);
      }

      remove(entry: Entry) {
        this.entries.update((entries) => entries.filter((e) => e.id !== entry.id));
      }
    }
    ```
  </Lang>
</CodeSample>

### Free-text creation [#free-text-creation]

Setting `createFromText` lets pressing <kbd>Enter</kbd> with no suggestions shown create a new option straight
from the typed text.

<CodeSample id="autocomplete-create" title="Creating a tag that doesn't exist yet">
  <Lang value="angular">
    ```ts title="tag-creator.component.ts"
    import { Component, signal } from "@angular/core";
    import { AutocompleteComponent } from "@sinequa/galactik";

    interface Tag {
      id: string;
      name: string;
    }

    @Component({
      selector: "tag-creator",
      imports: [AutocompleteComponent],
      template: `
        <Autocomplete
          [selected]="tags()"
          [loader]="searchTags"
          [createFromText]="createTag"
          [key]="keyOf"
          [label]="labelOf"
          placeholder="Search or create a tag…"
          (picked)="onPicked($event)"
          (removed)="onRemoved($event)" />
      `,
    })
    export class TagCreatorComponent {
      tags = signal<Tag[]>([]);

      keyOf = (tag: Tag) => tag.id;
      labelOf = (tag: Tag) => tag.name;

      searchTags = (query: string): Promise<Tag[]> => Promise.resolve([]);

      createTag = (text: string): Tag => ({ id: crypto.randomUUID(), name: text });

      onPicked(tag: Tag) {
        this.tags.update((tags) => [...tags, tag]);
      }

      onRemoved(tag: Tag) {
        this.tags.update((tags) => tags.filter((t) => t.id !== tag.id));
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  selected: { type: &#x22;readonly TSelected[]&#x22;, description: &#x22;Currently-applied values — display only. Drives chip rendering and suggestion exclusion. The host owns and persists them.&#x22; },
  loader: {
    type: &#x22;(query: string, context: { signal: AbortSignal }) => Promise<TOption[]>&#x22;,
    description: &#x22;Backend search function. The signal is aborted when a newer query supersedes this one. A signal read only inside the closure body won't reactively re-trigger the fetch — call reload() if that's needed.&#x22;,
  },
  minLength: { type: &#x22;number&#x22;, default: &#x22;1&#x22;, description: &#x22;Minimum typed length before a search is triggered.&#x22; },
  debounceMs: { type: &#x22;number&#x22;, default: &#x22;300&#x22;, description: &#x22;Debounce delay (ms) applied to the typed query.&#x22; },
  key: { type: &#x22;(option: TOption) => unknown&#x22;, default: &#x22;identity&#x22;, description: &#x22;Identity of a suggestion, for exclusion.&#x22; },
  label: { type: &#x22;(option: TOption) => string&#x22;, default: &#x22;String(option)&#x22;, description: &#x22;Text of a suggestion row.&#x22; },
  selectedKey: { type: &#x22;(selected: TSelected) => unknown&#x22;, default: &#x22;key&#x22;, description: &#x22;Identity of an applied value, when it isn't shaped like a suggestion.&#x22; },
  selectedLabel: { type: &#x22;(selected: TSelected) => string&#x22;, default: &#x22;label&#x22;, description: &#x22;Text of an applied value, in its chip.&#x22; },
  excludeKeys: { type: &#x22;readonly unknown[]&#x22;, default: &#x22;[]&#x22;, description: &#x22;Identities kept out of the suggestions, besides the applied values.&#x22; },
  createFromText: { type: &#x22;(text: string) => TOption&#x22;, description: &#x22;When set, Enter with no suggestions shown creates a free-text option from the typed query.&#x22; },
  closeOnPick: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Picking closes the list and clears the text, like a chat's mention box. Off: the list stays open to pick several in a row.&#x22; },
  chips: { type: '&#x22;inline&#x22; | &#x22;below&#x22; | &#x22;none&#x22;', default: '&#x22;inline&#x22;', description: &#x22;Where the applied values are shown: inside the field, before the text being typed (the field grows with them, and Backspace in an empty field removes the last one), in a row under it, or not drawn — the host shows them.&#x22; },
  popup: { type: '&#x22;top-layer&#x22; | &#x22;inline&#x22;', default: '&#x22;top-layer&#x22;', description: &#x22;The popup as a manual popover in the top layer (above a dialog), or a plain fixed panel.&#x22; },
  indicator: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Shows the chevron. The spinner still shows while a search runs.&#x22; },
  ariaLabel: { type: &#x22;string&#x22;, description: &#x22;Accessible name of the field when there is no fieldLabel. Default: the placeholder.&#x22; },
  noResultsText: { type: &#x22;string&#x22;, default: '&#x22;No results&#x22;', description: &#x22;Row shown once a search has answered with nothing. Never while pending.&#x22; },
  searchingText: { type: &#x22;string&#x22;, default: '&#x22;Searching…&#x22;', description: &#x22;Row shown while a search runs and there is no row of a previous search to keep.&#x22; },
  errorText: { type: &#x22;string&#x22;, default: '&#x22;Search failed&#x22;', description: &#x22;Alert row shown when the search failed.&#x22; },
  allowRemove: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Shows/hides the remove (×) button on the default chip, and Backspace removal.&#x22; },
  removeLabel: { type: &#x22;string&#x22;, default: '&#x22;Remove {label}&#x22;', description: &#x22;Accessible name of a chip's remove button; {label} is replaced by its label. Nothing in the library translates: pass it translated.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The &#x22;no results&#x22; row flashes before the search has even started">
    `@angular/aria`'s Combobox opens the popover on every keystroke, long before the debounce elapses and the fetch
    starts. `Autocomplete` takes the popup back (`expanded` follows its own "a search is on screen" state, put back
    in a microtask), so the row only ever appears once a search has genuinely come back empty.
  </Accordion>

  <Accordion title="A failing loader takes the whole component down">
    `resource.value()` throws in the error state. `Autocomplete` reads it behind `hasValue()`, so a failing `loader`
    shows an alert row (`errorText`) instead of crashing — nothing to guard on the consumer side.
  </Accordion>

  <Accordion title="Typing the text I just picked opens nothing">
    Cleared by a pick (`closeOnPick`) or by Enter on `createFromText`, the typed text settles at once instead of
    after the debounce: with a settled value that lagged behind, typing the same text again found the search already
    "done" for it. Nothing to do on the consumer side.
  </Accordion>

  <Accordion title="A closure-captured filter changes, but the suggestions don't refresh">
    The resource backing `loader` only tracks `query` as its reactive parameter — a signal read only inside the
    closure body (an extra filter flag, say) does not reactively re-trigger the fetch. Call the component's public
    `reload()` method when that value changes.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Select" href="./select.mdx">
    The synchronous sibling for a fixed options list — same look, non-editable trigger, single or multiple.
  </Card>
</Cards>
