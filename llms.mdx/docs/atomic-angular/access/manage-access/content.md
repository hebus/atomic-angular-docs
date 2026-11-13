# Manage access (/docs/atomic-angular/access/manage-access)

Let users add people and groups as owners or readers of any item, with a make-public switch, custom switches and principals the application keeps in place.



`<manage-access>` edits two lists of principal ids, `owners` and `readers`, that your component owns. It shows
the people and groups who have access, a search to add more, a role menu and a remove button per row, and the
switches that make the item public.

## Minimal example [#minimal-example]

<CodeSample id="manage-access-basic" title="Owners and readers of an item">
  <Lang value="angular">
    ```ts title="access.component.ts"
    import { Component, signal } from "@angular/core";
    import { ManageAccess } from "@sinequa/atomic-angular";

    @Component({
      selector: "access-example",
      imports: [ManageAccess],
      template: `<manage-access [(owners)]="owners" [(readers)]="readers" [creator]="['sinequa|jdoe']" />`,
    })
    export class AccessExample {
      owners = signal(["sinequa|jdoe"]);
      readers = signal<string[]>([]);
    }
    ```
  </Lang>
</CodeSample>

Selecting a suggestion adds the person as a **Reader**; the role menu of the row promotes them to **Owner**.
The search suggests users and groups (8 at most, 500 ms after the last keystroke).

## How it works [#how-it-works]

The component never talks to your item: it writes `owners` and `readers` and nothing else, so saving is up to
you. A few ids are handled apart from the rows:

* **The creator** (`creator`, optional) comes first with the Owner badge and has no menu and no remove button.
* **The public value** (`publicValue`, `*` by default) and the value of each custom switch are reader values:
  the switch adds or removes them, and they never show up as rows.
* **Injected principals** are always in the emitted lists — see below.
* The current user's row reads "(You)".

## Recipes [#recipes]

### Choose the role while adding [#choose-the-role-while-adding]

By default a person picked in the search joins the readers. `roleSelector` puts the Owner / Reader selector in the
search box, as the workspaces' share dialog does: whoever is picked gets the role chosen there.

<CodeSample id="manage-access-role-selector" title="Owner or Reader at the time of adding">
  <Lang value="angular">
    ```ts title="access.component.ts"
    import { Component, signal } from "@angular/core";
    import { ManageAccess } from "@sinequa/atomic-angular";

    @Component({
      selector: "access-role-example",
      imports: [ManageAccess],
      template: `<manage-access [(owners)]="owners" [(readers)]="readers" [roleSelector]="true" />`,
    })
    export class AccessRoleExample {
      owners = signal<string[]>([]);
      readers = signal<string[]>([]);
    }
    ```
  </Lang>
</CodeSample>

### Make public, or not [#make-public-or-not]

`canMakePublic` (default `true`) shows the switch; `publicValue` changes the reader value it controls. While the
item is public, or a custom switch is on, a notice says that owners will still be the only ones who can modify it.

<CodeSample id="manage-access-public" title="A company-wide public value">
  <Lang value="angular">
    ```ts title="access.component.ts"
    import { Component, signal } from "@angular/core";
    import { ManageAccess } from "@sinequa/atomic-angular";

    @Component({
      selector: "access-public-example",
      imports: [ManageAccess],
      template: `<manage-access [(owners)]="owners" [(readers)]="readers" publicValue="chapsvision|*" />`,
    })
    export class AccessPublicExample {
      owners = signal<string[]>([]);
      readers = signal<string[]>([]);
    }
    ```
  </Lang>
</CodeSample>

### Custom switches [#custom-switches]

`provideAccessSwitch()` adds a switch that adds or removes one reader value. `visible` is a boolean, or a
predicate that receives the logged-in user. `label` and `description` go through Transloco: a translation key is
translated, a literal text is shown as is.

Given a function instead of an object, the switch is built in the injection context of the provider and read again
whenever a signal it reads changes — handy when it depends on the user's rights. If the `value` it returns changes, the
previous one stays in the readers, hidden.

<CodeSample id="manage-access-switch" title="A switch for admins">
  <Lang value="angular">
    ```ts title="access.component.ts"
    import { Component, signal } from "@angular/core";
    import { ManageAccess, provideAccessSwitch } from "@sinequa/atomic-angular";

    @Component({
      selector: "access-switch-example",
      imports: [ManageAccess],
      providers: [
        provideAccessSwitch({
          value: "chapsvision|*",
          label: "Share with the whole company",
          description: "Everybody at the company can read it.",
          visible: user => user?.id === "sinequa|admin",
        }),
      ],
      template: `<manage-access [(owners)]="owners" [(readers)]="readers" [canMakePublic]="false" />`,
    })
    export class AccessSwitchExample {
      owners = signal<string[]>([]);
      readers = signal<string[]>([]);
    }
    ```
  </Lang>
</CodeSample>

### Principals the application keeps in place [#principals-the-application-keeps-in-place]

`injected` (or `provideAccessPrincipal()`, for the providers way) forces users or groups into `owners` or
`readers`. They are in the emitted lists from the start, and no action — add, remove, change a role — can drop
them; picking one in the search adds nothing twice. `mode` decides how they look:

| `mode`   | In the list                                    |
| -------- | ---------------------------------------------- |
| `hidden` | Not shown: the user never knows it is there.   |
| `locked` | Shown, without a role menu or a remove button. |

<CodeSample id="manage-access-injected" title="A hidden owner and a locked reader">
  <Lang value="angular">
    ```ts title="access.component.ts"
    import { Component, signal } from "@angular/core";
    import { ManageAccess, type InjectedPrincipal } from "@sinequa/atomic-angular";

    @Component({
      selector: "access-injected-example",
      imports: [ManageAccess],
      template: `<manage-access [(owners)]="owners" [(readers)]="readers" [injected]="injected" />`,
    })
    export class AccessInjectedExample {
      owners = signal<string[]>([]);
      readers = signal<string[]>([]);
      injected: InjectedPrincipal[] = [
        { value: "sinequa|admins", role: "owner", mode: "hidden" },
        { value: "sinequa|reviewers", role: "reader", mode: "locked" },
      ];
    }
    ```
  </Lang>
</CodeSample>

### Name the item [#name-the-item]

The texts say "this item" by default. `labels` replaces them. Each value goes through Transloco — a translation key
is translated, a literal text is shown as is — and `hasAccess`, what follows "N people and M groups", receives
`{ count }` for a plural: `[labels]="{ title: 'Skill access', hasAccess: 'have access to this skill' }"`.

### Narrow the search [#narrow-the-search]

`PRINCIPAL_SEARCH_FILTER` takes a predicate over the suggestions — for instance `p => !p.isGroup` for users only.

## Options [#options]

<TypeTable
  type="{
  owners: { description: &#x22;Ids of the owners. Two-way.&#x22;, type: &#x22;string[]&#x22;, default: &#x22;[]&#x22; },
  readers: { description: &#x22;Ids of the readers, and the reader values behind the switches. Two-way.&#x22;, type: &#x22;string[]&#x22;, default: &#x22;[]&#x22; },
  creator: { description: &#x22;Ids shown first with the Owner badge, not editable.&#x22;, type: &#x22;readonly string[]&#x22;, default: &#x22;[]&#x22; },
  roleSelector: { description: &#x22;Puts the Owner / Reader selector in the search box.&#x22;, type: &#x22;boolean&#x22;, default: &#x22;false&#x22; },
  canMakePublic: { description: &#x22;Offers the make-public switch.&#x22;, type: &#x22;boolean&#x22;, default: &#x22;true&#x22; },
  publicValue: { description: &#x22;The reader value that means everybody.&#x22;, type: &#x22;string&#x22;, default: '&#x22;*&#x22;' },
  disabled: { description: &#x22;Read-only: every control stays in place, disabled.&#x22;, type: &#x22;boolean&#x22;, default: &#x22;false&#x22; },
  labels: { description: &#x22;Replaces the neutral texts.&#x22;, type: &#x22;ManageAccessLabels&#x22;, default: &#x22;{}&#x22; },
  injected: { description: &#x22;Principals kept in the lists whatever the user does.&#x22;, type: &#x22;readonly InjectedPrincipal[]&#x22;, default: &#x22;[]&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A person disappears from the list but is still in the readers">
    The id is the value of a switch (`*` or a `provideAccessSwitch` value): those never show up as rows. Check
    `publicValue` and the switches you registered.
  </Accordion>

  <Accordion title="The rows show raw ids for a moment">
    Names come from the directory after the first paint, and are cached in `sessionStorage` for the tab. An id the
    directory cannot resolve (a deleted account) keeps showing as the raw id, and stays in the list.
  </Accordion>
</Accordions>
