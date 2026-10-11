# Source

Small icon identifying where a document comes from (a web site, SharePoint, a feed...). Given a document's `collection` and `connector`, it resolves the icon configured in the application's `sources` custom JSON and renders it: an `<img>` when the configuration provides an `iconPath`, otherwise a `FaIcon` built from `iconClass`.

## Imports

```ts
import { SourceComponent } from "@sinequa/atomic-angular";
```

## Resolution order

The first match wins. Lookups are case-insensitive:

1. **collection** — the exact collection path (`/Web/Intranet/`)
2. **source** — the first segment of the collection (`Web` in `/Web/Intranet/`)
3. **connector** — the document's connector name
4. otherwise the default `far fa-file` icon

In the demo each card shows the sample collection and connector, and which rule resolved its icon.

<demo-source-basic></demo-source-basic>

```html
<Source [collection]="doc.collection" [connector]="doc.connector" />
```

```json
{
  "collection": { "/web/intranet/": { "iconClass": "fas fa-globe" } },
  "source": { "sharepoint": { "iconClass": "fas fa-folder-open" } },
  "connector": { "rss": { "iconClass": "fas fa-bell" } }
}
```

## Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `collection` | `string[]` | — | Collections of the document; only the first one is used. Nothing is rendered when empty. |
| `connector` | `string` | `""` | Connector name of the document. |

## Notes

- The selector is `source` (or `Source`). `<source>` is a void HTML element, so write it self-closing: `<Source ... />`.
- `iconClass` goes through `FaIcon`, so it must be a FontAwesome class string that has a galactik SVG mapping to be visible (see the FA Icon page).
- The icon is announced with the translated "Source icon" label; an `<img>` falls back to the collection name as its `alt`.
- The demo replaces `AppStore` with a stand-in exposing only `sources`; in an application the configuration comes from the backend's `sources` custom JSON.
