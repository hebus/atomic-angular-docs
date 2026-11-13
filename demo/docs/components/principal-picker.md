# Principal Picker

Search-as-you-type over the people (and, on request, the groups) of the Sinequa directory, with a chip per person. It is a standalone component of the main entry point: no workspace, no agent, just principal ids. The demo answers the search from an in-memory directory of seven people and four groups.

## Basic

People only, with the role selector next to the box. Type _a_, _b_ or _d_; the arrows move the highlight, Enter picks the highlighted row (the first one from the start), Escape closes the results, Backspace in an empty box removes the last chip.

<demo-principal-picker-basic></demo-principal-picker-basic>

```html
<principal-picker [(entries)]="entries" />
```

```ts
import { PrincipalPicker, type PickedPrincipal } from "@sinequa/atomic-angular";

entries = signal<PickedPrincipal[]>([]);
```

## Groups

Groups are left out by default: an API that documents `owners` / `readers` as _user_ ids would accept a group and grant nobody anything. `includeGroups` offers them.

<demo-principal-picker-groups></demo-principal-picker-groups>

```html
<principal-picker [(entries)]="entries" [includeGroups]="true" />
```

## Filter — input

`filter` is a predicate over the suggestions, applied after `includeGroups`.

<demo-principal-picker-filter></demo-principal-picker-filter>

```html
<principal-picker [(entries)]="entries" [includeGroups]="true" [filter]="beforeD" />
```

```ts
beforeD = (principal: SecurityPrincipal) => principal.name.toLowerCase() < "d";
```

## Filter — token

`PRINCIPAL_SEARCH_FILTER` applies the same predicate to every picker below the provider that has no `filter` of its own.

<demo-principal-picker-filter-token></demo-principal-picker-filter-token>

```ts
@Component({
  providers: [{ provide: PRINCIPAL_SEARCH_FILTER, useValue: (p: SecurityPrincipal) => p.isUser }]
})
```

## Roles

`showRole` hides the selector; everybody then gets `defaultRole`. `showChipRole` puts a toggle on each chip so a role can still be changed afterwards.

<demo-principal-picker-roles></demo-principal-picker-roles>

```html
<principal-picker [(entries)]="entries" [showRole]="false" defaultRole="owner" [showChipRole]="true" />
```

## Limit and debounce

`limit` is the number of principals asked of the directory, `debounceMs` the wait after the last keystroke.

<demo-principal-picker-limit></demo-principal-picker-limit>

```html
<principal-picker [(entries)]="entries" [limit]="3" [debounceMs]="100" />
```

## Exclude

`excludeIds` keeps out the people who already have access.

<demo-principal-picker-exclude></demo-principal-picker-exclude>

```html
<principal-picker [(entries)]="entries" [excludeIds]="alreadyThere" />
```

## Picked event

`retain` off leaves no chip: each pick is only reported through `picked`. This is how `<manage-access>` adds a person at once.

<demo-principal-picker-picked></demo-principal-picker-picked>

```html
<principal-picker [retain]="false" (picked)="onPicked($event)" />
```

## API Reference

### PrincipalPicker

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `entries` | `PickedPrincipal[]` (model) | `[]` | The people picked so far. Two-way. |
| `excludeIds` | `readonly string[]` | `[]` | Ids kept out of the results. |
| `includeGroups` | `boolean` | `false` | Suggests groups too. |
| `filter` | `(principal: SecurityPrincipal) => boolean` | — | Extra predicate on the suggestions; falls back to `PRINCIPAL_SEARCH_FILTER`. |
| `limit` | `number` | `20` | Most suggestions asked of the directory. |
| `debounceMs` | `number` | `300` | Wait after the last keystroke before searching. |
| `showRole` | `boolean` | `true` | Shows the selector of the role the next picked ones get. |
| `defaultRole` | `AssignableRole` | `"reader"` | The role given while the selector is hidden, or until it says otherwise. |
| `showChipRole` | `boolean` | `false` | Chips carry a toggle to switch their role. |
| `retain` | `boolean` | `true` | Keeps the people picked as chips in `entries`. |
| `disabled` | `boolean` | `false` | The box, and the buttons of the chips, are disabled. |
| `placeholder` | `string` | — | Placeholder of the box, already translated. |
| `aria-label` | `string` | — | Accessible name of the box, already translated. |

| Output | Payload | Description |
| --- | --- | --- |
| `picked` | `PickedPrincipal` | Each person picked, with the role they were given. |
| `entriesChange` | `PickedPrincipal[]` | The people picked changed (the `entries` model). |
