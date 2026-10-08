# LexiQ Collections

Framework-agnostic Web Components for the LexiQ Collections experience — plain `HTMLElement` classes with their own Shadow DOM, **not** `@angular/elements`. They ship from the secondary entry point `@sinequa/atomic-angular/elements`, which leaves the main `@sinequa/atomic-angular` barrel untouched, and they talk to the Container Management v2 API directly through `@sinequa/atomic` rather than Angular's DI.

## Registration

Nothing is registered on import: the entry point is side-effect-free. Opt in with the Angular provider, register all three elements at once, or define just the one you need. Any component hosting the tags also needs `schemas: [CUSTOM_ELEMENTS_SCHEMA]`.

```typescript
import { setGlobalConfig } from "@sinequa/atomic";
import { provideLexiqCollectionsElements } from "@sinequa/atomic-angular/elements";

setGlobalConfig({ backendUrl: "/", app: "my-app" });

export const appConfig: ApplicationConfig = {
  providers: [provideLexiqCollectionsElements()]
};
```

```typescript
// Outside Angular, or to keep the bundle minimal:
import { registerLexiqCollectionsElements, defineLexiqCollectionPicker } from "@sinequa/atomic-angular/elements";

registerLexiqCollectionsElements(); // all three
defineLexiqCollectionPicker();      // just the picker — idempotent, SSR-safe
```

## Mention list

Store-synced collection rows, meant for a "+"/"@" mention menu. Toggling a row emits `selection-changed` with the current selection.

<demo-lexiq-collections-mention-list></demo-lexiq-collections-mention-list>

```html
<lexiq-collection-mention-list (selection-changed)="onSelection($event)"></lexiq-collection-mention-list>
```

## Picker

A standalone Save/Move-to-collection popover. The floating card renders inside the element's shadow root, but it anchors to a button living in the host page — which is precisely why it is a separate element from the full app. Emits `save`, `unsave` and `moved`.

<demo-lexiq-collections-picker></demo-lexiq-collections-picker>

```html
<button #anchor (click)="picker.openSaveCard(anchor)">Save to collection…</button>
<lexiq-collection-picker #picker (save)="onSave($event)" (moved)="onMoved()"></lexiq-collection-picker>
```

## Full application

The entire Collections app — grid and list views, detail panel, document preview, sharing and resumable uploads — behind a single tag.

<demo-lexiq-collections-app></demo-lexiq-collections-app>

```html
<lexiq-collections theme="light" upload-endpoint="/tus"></lexiq-collections>
```

## Attributes and events

| Element | Attributes | Events |
| --- | --- | --- |
| `<lexiq-collections>` | `theme`, `upload-endpoint` | — |
| `<lexiq-collection-picker>` | — | `save`, `unsave`, `moved` |
| `<lexiq-collection-mention-list>` | — | `selection-changed` |

The picker also exposes an imperative API mirroring the in-app hooks: `openSaveCard(anchor, opts?)`, `closeSaveCard(anchor?)`, `triggerSaveFeedback(anchor, opts?)`, `openMoveMenu(anchor, items, opts?)` and `closeMoveMenu()`.

## Notes

- Consuming this entry point requires `@sinequa/atomic >= 2.2.0` for the Container v2 API, and pulls in `tus-js-client` for resumable uploads.
- Styling is self-contained: the vendored design-system CSS is bundled as a single string and injected into each shadow root via `adoptedStyleSheets`, so host styles neither leak in nor need importing. Regenerate it with `elements/scripts/generate-css.mjs` after touching any file under `elements/vendor/` or `elements/styles/`.
- This page stubs the Container v2 endpoints in-page — collections, documents and the current principal are canned data. Writes echo a plausible response back instead of persisting, and uploads have no server to talk to.
- Do not confuse these with the Angular [Collections](/components/collections) component, which lists a user's saved *baskets* from user settings — a different concept sharing the same word.
