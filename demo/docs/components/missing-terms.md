# Missing Terms

The terms of the search that **a given document does not contain**, struck through, each one a link that re-runs the search requiring it.

A document can match a multi-term query without containing every term. `<missing-terms>` reads `article.termspresence`, keeps the entries whose presence is `missing` and lists them twice: struck through ("Missing terms"), then as links ("Must include").

## Imports

```ts
import { MissingTermsComponent } from "@sinequa/atomic-angular";
```

## Words of the query

Each missing word is a link. Clicking it removes the word from the query text and adds it back as a required concept, `+[word]`.

The links navigate to the search page, which this app does not have: the demos below show the query each link would run instead of following it.

<demo-missing-terms-basic></demo-missing-terms-basic>

```html
<missing-terms [article]="article()" />
```

## Concepts

The backend returns a multi-word term with the syntax it has in the query. A concept comes in square brackets, `[exit code]`: the component displays `exit code` and adds a single `+[exit code]`, never `+[[exit code]]`.

<demo-missing-terms-concept></demo-missing-terms-concept>

## Exact phrases

An exact phrase comes with its quotes, `"test sinequa"`. The component removes the whole phrase from the query, quotes included, and adds it back as one `+[test sinequa]` concept: the phrase is neither left in the query nor duplicated. The other concepts of the query are kept.

<demo-missing-terms-exact-phrase></demo-missing-terms-exact-phrase>

## API Reference

### MissingTermsComponent

| Input     | Type      | Default        | Description                                                              |
| --------- | --------- | -------------- | ------------------------------------------------------------------------ |
| `article` | `Article` | — _(required)_ | The article whose `termspresence` is read. Without it, nothing is shown. |

## Notes

- The current query text comes from `QueryParamsStore`; the links use `routerLink="search"` with a `q` query parameter.
- A term is matched in the query as a whole pattern first (`"test sinequa"`, `+[exit code]`, `(exit code)`, `/exit code/`), then as plain words. Matching ignores the case.
- The component renders nothing when no term is missing.
