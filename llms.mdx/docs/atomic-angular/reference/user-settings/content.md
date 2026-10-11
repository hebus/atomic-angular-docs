# User settings (/docs/atomic-angular/reference/user-settings)

The signal store that persists a signed-in user's preferences — language, theme, bookmarks, recent and saved searches, baskets, alerts — to the backend.



`UserSettingsStore` holds the parts of a user's experience that outlive one session — recent searches,
bookmarks, saved searches, baskets, alerts, language and assistant preferences — and keeps them synced with the
backend on every mutation.

## Minimal example [#minimal-example]

<CodeSample id="user-settings-basic" title="Initialize once, read a preference">
  <Lang value="angular">
    ```ts title="app.component.ts"
    import { Component, inject, OnInit } from "@angular/core";
    import { UserSettingsStore } from "@sinequa/atomic-angular";

    @Component({
      selector: "app-root",
      template: `<p>{{ userSettings.language() }}</p>`,
    })
    export class AppComponent implements OnInit {
      protected readonly userSettings = inject(UserSettingsStore);

      async ngOnInit() {
        await this.userSettings.initialize();
      }
    }
    ```
  </Lang>
</CodeSample>

Every mutation method (`bookmark()`, `createAlert()`, `updateLanguage()`, …) both patches the store and
persists the change to the backend API in the same call — there is no separate "save" step, and a signal read
anywhere in the app reflects the change immediately.

## Options [#options]

<TypeTable
  type="{
  &#x22;initialize()&#x22;: { type: &#x22;(): Promise<void>&#x22;, description: &#x22;Fetches user settings from the backend and patches the store. Call once, typically at bootstrap.&#x22; },
  &#x22;reset()&#x22;: { type: &#x22;(): Promise<void>&#x22;, description: &#x22;Resets the store to its initial (empty) state.&#x22; },
  &#x22;bookmark(article, queryName?)&#x22;: { type: &#x22;(article: Article, queryName?: string): Promise<void>&#x22;, description: &#x22;Adds an article to bookmarks, if not already bookmarked.&#x22; },
  &#x22;unbookmark(id)&#x22;: { type: &#x22;(id: string): Promise<void>&#x22; },
  &#x22;isBookmarked(article)&#x22;: { type: &#x22;(article: Partial<Article>): boolean&#x22; },
  &#x22;toggleBookmark(article)&#x22;: { type: &#x22;(article: Article): Promise<void>&#x22; },
  &#x22;addCurrentSearch(queryParams)&#x22;: { type: &#x22;(queryParams: QueryParams): Promise<void>&#x22;, description: &#x22;Adds the current search to recent searches.&#x22; },
  &#x22;deleteRecentSearch(index)&#x22;: { type: &#x22;(index: number): Promise<void>&#x22; },
  &#x22;updateSavedSearches(list)&#x22;: { type: &#x22;(list: UserSettings['savedSearches']): Promise<void>&#x22; },
  &#x22;deleteSavedSearch(index)&#x22;: { type: &#x22;(index: number): Promise<void>&#x22; },
  &#x22;createBasket(basket)&#x22;: { type: &#x22;(basket: Basket): Promise<void>&#x22; },
  &#x22;updateBasket(basket, index)&#x22;: { type: &#x22;(basket: Basket, index: number): Promise<void>&#x22; },
  &#x22;addToBasket(name, ids)&#x22;: { type: &#x22;(name: string, ids: string | string[]): Promise<void>&#x22; },
  &#x22;removeFromBasket(name, ids)&#x22;: { type: &#x22;(name: string, ids: string | string[]): Promise<void>&#x22; },
  &#x22;deleteBasket(index)&#x22;: { type: &#x22;(index: number): Promise<void>&#x22; },
  &#x22;createAlert(alert)&#x22;: { type: &#x22;(alert: Alert): Promise<void>&#x22; },
  &#x22;updateAlert(alert, index)&#x22;: { type: &#x22;(alert: Alert, index: number): Promise<void>&#x22; },
  &#x22;deleteAlert(index)&#x22;: { type: &#x22;(index: number): Promise<void>&#x22; },
  &#x22;updateLanguage(language)&#x22;: { type: &#x22;(language: UserSettings['language']): Promise<void>&#x22;, description: &#x22;Also applied through Transloco by the callers that expose a language picker — see User profile.&#x22; },
  &#x22;updateAssistantSettings(settings)&#x22;: { type: &#x22;(settings: UserSettings['assistants']): Promise<void>&#x22; },
  &#x22;updateAssistantCollapsed(collapsed)&#x22;: { type: &#x22;(collapsed: UserSettings['collapseAssistant']): Promise<void>&#x22; },
}"
/>

Every mutator that logs activity also accepts an optional `auditEvents` parameter, forwarded to the audit
interceptor.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A newly-created basket or alert doesn't show up until a manual refresh">
    It should not need one — every mutation both patches the store and awaits the backend `PATCH`. If a UI reads a
    **different** signal store than the one just mutated (a component-local copy, or a stale `getState()` snapshot
    taken before the `await`), it will not see the update. Read the mutated slice directly off `UserSettingsStore`.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="User profile" href="./user-profile.mdx">
    The current user's profile data, editable one property at a time.
  </Card>
</Cards>
