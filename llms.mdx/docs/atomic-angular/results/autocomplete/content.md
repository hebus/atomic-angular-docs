# Autocomplete (/docs/atomic-angular/results/autocomplete)

Suggestions as the user types — from configured suggest queries on the server, and from the user's own recent/saved searches and bookmarks.



Two independent sources feed a search box's suggestions: `AutocompleteService` asks the server's configured
suggest queries, and separately reads the user's own history (recent/saved searches, bookmarks) client-side.

## Minimal example [#minimal-example]

<CodeSample id="autocomplete-basic" title="Server suggestions, as the user types">
  <Lang value="angular">
    ```ts title="search-box.component.ts"
    import { Component, inject, signal } from "@angular/core";
    import { AutocompleteService } from "@sinequa/atomic-angular";

    @Component({
      selector: "search-box",
      template: `<input (input)="onInput($any($event.target).value)" aria-label="Search" />`,
    })
    export class SearchBoxComponent {
      private readonly autocomplete = inject(AutocompleteService);
      protected readonly suggestions = signal<string[]>([]);

      protected async onInput(text: string) {
        // One array per configured suggest query; flatten for a single list.
        const groups = await this.autocomplete.getFromSuggestQueriesForText(text);
        this.suggestions.set(groups.flat().map((suggestion) => suggestion.display ?? suggestion.normalized));
      }
    }
    ```
  </Lang>
</CodeSample>

## Recipes [#recipes]

### Mixing in the user's own history [#mixing-in-the-users-own-history]

<CodeSample id="autocomplete-history" title="Recent searches, saved searches and bookmarks, client-side">
  <Lang value="angular">
    ```ts title="search-box.component.ts"
    import { Component, inject } from "@angular/core";
    import { AutocompleteService } from "@sinequa/atomic-angular";

    @Component({
      selector: "search-box",
      template: ``,
    })
    export class SearchBoxComponent {
      private readonly autocomplete = inject(AutocompleteService);

      protected onInput(text: string) {
        // Synchronous — no request, since the source is already in memory.
        const fromHistory = this.autocomplete.getFromUserSettingsForText(text, 5);
        console.log(fromHistory);
      }
    }
    ```
  </Lang>
</CodeSample>

`getFromUserSettingsForText` groups its results by `recent-searches`, `saved-searches` and `bookmarks` — enough
to render each group under its own heading, or to merge and cap them, as the caller prefers.

## Options [#options]

<TypeTable
  type="{
  &#x22;getFromSuggestQueriesForText(text)&#x22;: {
    type: &#x22;(text: string): Promise<Suggestion[][]>&#x22;,
    description: &#x22;One array per configured suggest query — flatten to merge them, or keep them grouped.&#x22;,
  },
  &#x22;getFromUserSettingsForText(text, maxCount)&#x22;: {
    type: &#x22;(text: string, maxCount: number | Autocomplete): Suggestion[]&#x22;,
    description: &#x22;Synchronous. Grouped by recent-searches, saved-searches, bookmarks.&#x22;,
  },
}"
/>

## What's next [#whats-next]

<Cards>
  <Card title="Did You Mean" href="./did-you-mean.mdx">
    Once a search actually runs, turn its spelling correction into the right message.
  </Card>
</Cards>
