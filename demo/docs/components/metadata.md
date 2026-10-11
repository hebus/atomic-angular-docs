# Metadata

Renders every value of an `Article` metadata field (authors, labels, tags…) as a row of clickable tags. Built on the `@sinequa/galactik` `Tag`.

## Imports

```ts
import { MetadataComponent } from "@sinequa/atomic-angular";
```

## Basic usage

Each value returned by `getMetadata(article, metadata)` becomes its own tag.

<demo-metadata-basic></demo-metadata-basic>

```html
<metadata [article]="article" metadata="authors" />
```

```typescript
const article = {
  title: "Distributed Systems at Scale",
  authors: ["Alice Martin", "Bob Chen", "Carol Smith", "David Lee"]
};
```

## Variant

`variant` picks the tag's style — `"primary"` (soft fill, default) or `"secondary"` (outline).

<demo-metadata-variant></demo-metadata-variant>

```html
<metadata [article]="article" metadata="authors" variant="primary" />
<metadata [article]="article" metadata="authors" variant="secondary" />
```

## Scheme

`scheme` picks the tag's color scheme (the same 12 schemes as the `Tag` component).

<demo-metadata-scheme></demo-metadata-scheme>

```html
<metadata [article]="article" metadata="authors" scheme="sage" />
<metadata [article]="article" metadata="authors" scheme="indigo" />
<metadata [article]="article" metadata="authors" scheme="error" />
```

## Size

`size` picks the tag's size — `"xs"` (default), `"sm"` or `"md"`.

<demo-metadata-size></demo-metadata-size>

```html
<metadata [article]="article" metadata="authors" size="xs" />
<metadata [article]="article" metadata="authors" size="sm" />
<metadata [article]="article" metadata="authors" size="md" />
```

## Limit

`limit` caps the number of tags rendered — the rest of the values are simply not shown.

<demo-metadata-limit></demo-metadata-limit>

```html
<metadata [article]="article" metadata="authors" [limit]="2" />
```

## Click to filter

Every tag is clickable. `click` emits `{ filter, event }`, where `filter` is a `LegacyFilter` built from the metadata key (`field`) and the clicked value (`value`) — ready to hand to `QueryParamsStore.updateFilter` or similar.

<demo-metadata-click></demo-metadata-click>

```html
<metadata [article]="article" metadata="authors" variant="secondary" (click)="onClick($event)" />
```

```typescript
protected onClick(event: { filter: LegacyFilter; event: Event }): void {
  console.log(event.filter); // { field: "authors", value: "Alice Martin" }
}
```

## API Reference

### Inputs

| Name       | Type                       | Default     | Description                                                        |
| ---------- | -------------------------- | ----------- | -------------------------------------------------------------------|
| `article`  | `Partial<Article> \| string` | —         | The article (or raw value) to read metadata from.                  |
| `metadata` | `KeyOf<Article> \| string`   | —         | The metadata key to display (e.g. `"authors"`, `"labels"`).        |
| `limit`    | `string \| number \| undefined` | all values | Maximum number of tags rendered.                                |
| `variant`  | `"primary" \| "secondary"` | `"primary"` | Tag style — soft fill or outline.                                   |
| `scheme`   | `TagVariants["scheme"]`    | `"sage"`    | Tag color scheme (12 schemes — same as `Tag`).                      |
| `size`     | `"xs" \| "sm" \| "md"`     | `"xs"`      | Tag size.                                                            |

### Outputs

| Name    | Payload                                    | Description                                              |
| ------- | ------------------------------------------- | ---------------------------------------------------------|
| `click` | `{ filter: LegacyFilter; event: Event }`   | Emitted when a tag is clicked; `filter.field` is the metadata key, `filter.value` is the clicked value. |

## Notes

- If the article has no value for the given `metadata` key, `getMetadata` returns an empty array and the component renders nothing (`:host` gets `hidden` via `[class.hidden]="items().length === 0"`).
