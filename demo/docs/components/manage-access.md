# Manage Access

Who owns and who can read an item: two lists of principal ids that the parent owns, a search over users and groups, a role menu and a remove button per row, a make-public switch and custom ones. The component knows nothing about what it manages, so a workspace, an agent, a skill or an upload can all use it. The demo answers from an in-memory directory; you are Alice.

## Basic

Alice is the creator: first, with the Owner badge, no menu and no remove button. Picking a suggestion adds a **Reader**; the menu of a row promotes to **Owner**. The two lines under the component are what the parent holds.

<demo-manage-access-basic></demo-manage-access-basic>

```html
<manage-access [(owners)]="owners" [(readers)]="readers" [creator]="['demo|alice']" />
```

```ts
import { ManageAccess } from "@sinequa/atomic-angular";

owners = signal(["demo|alice"]);
readers = signal<string[]>(["demo|bob", "demo|legal"]);
```

## Without a creator

`creator` is optional. Without it, every row can be edited or removed.

<demo-manage-access-no-creator></demo-manage-access-no-creator>

```html
<manage-access [(owners)]="owners" [(readers)]="readers" />
```

## Role selector

By default a person joins the readers. `roleSelector` puts the Owner / Reader selector in the search box, as in the workspaces' share dialog: whoever is picked gets the role chosen there.

<demo-manage-access-role-selector></demo-manage-access-role-selector>

```html
<manage-access [(owners)]="owners" [(readers)]="readers" [roleSelector]="true" />
```

## Make public

The switch adds `*` to the readers, or takes it out. `*` never shows up as a row, and while the item is public a notice says that owners will still be the only ones who can modify it.

<demo-manage-access-public></demo-manage-access-public>

```html
<manage-access [(owners)]="owners" [(readers)]="readers" [creator]="['demo|alice']" />
```

## Public value

`publicValue` changes the reader value the switch controls.

<demo-manage-access-public-value></demo-manage-access-public-value>

```html
<manage-access [(owners)]="owners" [(readers)]="readers" publicValue="demo|everyone" />
```

## Public not allowed

`canMakePublic` off removes the switch.

<demo-manage-access-no-public></demo-manage-access-no-public>

```html
<manage-access [(owners)]="owners" [(readers)]="readers" [canMakePublic]="false" />
```

## Custom switches

`provideAccessSwitch()` adds a switch that adds or removes one reader value. `visible` receives the logged-in user and decides who sees the switch.

<demo-manage-access-switches></demo-manage-access-switches>

```ts
@Component({
  providers: [
    provideAccessSwitch({ value: "demo|company", label: "Share with everyone at Demo Corp" }),
    provideAccessSwitch({ value: "demo|alice-only", label: "Seen by Alice only", visible: user => user?.id === "demo|alice" })
  ]
})
```

## Injected principals — hidden

A principal the application keeps in `owners` or `readers`, whatever the user does. `hidden` is not shown. Remove every other owner: the Admins group stays.

<demo-manage-access-injected-hidden></demo-manage-access-injected-hidden>

```html
<manage-access [(owners)]="owners" [(readers)]="readers" [injected]="injected" />
```

```ts
injected: InjectedPrincipal[] = [{ value: "demo|admins", role: "owner", mode: "hidden" }];
```

## Injected principals — locked

`locked` is shown, but nothing can be done to it. Picking it in the search adds nothing twice.

<demo-manage-access-injected-locked></demo-manage-access-injected-locked>

```ts
injected: InjectedPrincipal[] = [{ value: "demo|reviewers", role: "reader", mode: "locked" }];
```

## Injected principals — provider

`provideAccessPrincipal()` does the same for every `<manage-access>` below the provider.

<demo-manage-access-provided-principal></demo-manage-access-provided-principal>

```ts
@Component({
  providers: [
    provideAccessPrincipal({ value: "demo|legal", role: "reader", mode: "locked" }),
    provideAccessPrincipal({ value: "demo|admins", role: "owner", mode: "hidden" })
  ]
})
```

## Disabled

<demo-manage-access-disabled></demo-manage-access-disabled>

```html
<manage-access [(owners)]="owners" [(readers)]="readers" [creator]="['demo|alice']" [disabled]="true" />
```

## Labels

The texts say "this item" by default; `labels` names the item. Each value replaces one text and is given already translated.

<demo-manage-access-labels></demo-manage-access-labels>

```html
<manage-access [(owners)]="owners" [(readers)]="readers" [labels]="labels" />
```

```ts
labels: ManageAccessLabels = {
  title: "Skill access",
  hasAccess: "have access to this skill",
  makePublic: "Share the skill with everyone",
  makePublicDescription: "Anyone can use this skill.",
  ownersOnlyNotice: "Only owners can change who has access to this skill."
};
```

## Search filter

`PRINCIPAL_SEARCH_FILTER` narrows the suggestions — here, users only.

<demo-manage-access-search-filter></demo-manage-access-search-filter>

```ts
@Component({
  providers: [{ provide: PRINCIPAL_SEARCH_FILTER, useValue: (p: SecurityPrincipal) => p.isUser }]
})
```

## API Reference

### ManageAccess

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `owners` | `string[]` (model) | `[]` | Ids of the owners. Two-way. |
| `readers` | `string[]` (model) | `[]` | Ids of the readers, and the reader values behind the switches. Two-way. |
| `creator` | `readonly string[]` | `[]` | Ids shown first with the Owner badge, not editable, not removable. |
| `roleSelector` | `boolean` | `false` | Puts the Owner / Reader selector in the search box. |
| `canMakePublic` | `boolean` | `true` | Offers the make-public switch. |
| `publicValue` | `string` | `"*"` | The reader value that means everybody. |
| `disabled` | `boolean` | `false` | Read-only: every control stays in place, disabled. |
| `labels` | `ManageAccessLabels` | `{}` | Replaces the neutral texts: `title`, `hasAccess`, `makePublic`, `makePublicDescription`, `ownersOnlyNotice`. |
| `injected` | `readonly InjectedPrincipal[]` | `[]` | Principals kept in the lists whatever the user does; adds to those of `provideAccessPrincipal`. |

| Output | Payload | Description |
| --- | --- | --- |
| `ownersChange` | `string[]` | The owners changed (the `owners` model). |
| `readersChange` | `string[]` | The readers changed (the `readers` model). |

### Providers

| Method | Description |
| --- | --- |
| `provideAccessSwitch({ value, label, description?, visible? })` | Adds a custom switch for every `<manage-access>` below the provider. |
| `provideAccessPrincipal({ value, role, mode })` | Keeps a principal in `owners` or `readers`; `mode` is `"hidden"` or `"locked"`. |
