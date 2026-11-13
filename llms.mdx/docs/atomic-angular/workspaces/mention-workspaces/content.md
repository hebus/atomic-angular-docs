# Mention workspaces (/docs/atomic-angular/workspaces/mention-workspaces)

Let the user tick the workspaces to mention — in a chat's "+" menu or an agent's configuration — with search, select all, categories and a new-workspace button, as a ready-made menu or as pieces you lay out yourself.



`<workspace-mention>` is the workspaces as rows to tick. Empty, it is a ready-made menu; with your own content inside, it only
provides the state — search, category, ticks, "select all", "new workspace" — and you lay out the pieces and the rows as you like.

## Minimal example [#minimal-example]

<CodeSample id="mention-workspaces-basic" title="The ready-made menu">
  <Lang value="angular">
    ```ts title="mention-menu.component.ts"
    import { Component } from "@angular/core";
    import { type MentionSelection, WorkspaceMention } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "mention-menu-example",
      imports: [WorkspaceMention],
      template: `
        <workspace-mention
          searchable
          selectAll
          allowCreate
          (selectionChanged)="changed($event)"
          (workspaceCreated)="created($event.id)" />
      `,
    })
    export class MentionMenuExample {
      changed(selection: MentionSelection) {
        console.log(selection.ids, selection.count);
      }

      created(id: string) {
        console.log("created", id);
      }
    }
    ```
  </Lang>
</CodeSample>

The search box, "select all" and "new workspace" are each switched on by an input, all off by default: with none of them,
`<workspace-mention>` is just the rows (and `<workspace-mention-list>`, which predates it, is the same menu under its old
name, with the same inputs).

## How it works [#how-it-works]

`<workspace-mention>` owns the state, and everything inside it reads it. The state comes from `injectWorkspaceMention()`, so a
component that wants no markup of ours can call that directly.

<Mermaid
  chart="flowchart LR
  Root[&#x22;workspace-mention&#x22;] --> State[&#x22;injectWorkspaceMention&#x22;]
  Store[&#x22;WorkspacesStore ticks&#x22;] -. no selectedIds .-> State
  Host[&#x22;Your selectedIds&#x22;] -. selectedIds .-> State
  State --> Pieces[&#x22;search, select-all, new, tabs&#x22;]
  State --> Rows[&#x22;Your rows from items&#x22;]
  State --> Out[&#x22;selectionChanged and workspaceCreated&#x22;]"
/>

* **Where the ticks live.** Without `selectedIds` they are in `WorkspacesStore`, so every menu on screen shows the same ones. With
  `selectedIds` they are yours: the store is left alone, and you hear each change from `selectionChanged` and feed it back.
* **Select all** works on what is displayed — the current category and search — and unticks them all when they already are.
  What the search hides keeps its tick. It shows a mixed state when only some of the displayed rows are ticked.
* **New workspace** opens the dialog of the workspaces page. The workspace it makes is ticked and shown: the category goes back
  to "all" and the search is cleared, so it is not hidden.
* **Every workspace is offered**, the ones shared read-only too — mentioning one only reads it. A `predicate` narrows that.
* **With content inside**, the ready-made menu is not drawn: the element is only the provider of the state.

## Recipes [#recipes]

### Search the description too, or narrow what is offered [#search-the-description-too-or-narrow-what-is-offered]

<CodeSample id="mention-workspaces-search" title="searchFields and predicate">
  <Lang value="angular">
    ```ts title="mention-search.component.ts"
    import { Component, signal } from "@angular/core";
    import { WorkspaceMention, type Workspace } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "mention-search-example",
      imports: [WorkspaceMention],
      template: `
        <workspace-mention searchable searchFields="name+description" />
        <workspace-mention searchable selectAll [predicate]="writableOnly" [selectedIds]="ids()" (selectionChanged)="ids.set($event.ids)" />
      `,
    })
    export class MentionSearchExample {
      readonly ids = signal<readonly string[]>([]);
      readonly writableOnly = (workspace: Workspace) => workspace.currentUserRole !== "reader";
    }
    ```
  </Lang>
</CodeSample>

The search ignores case and accents. By default it matches the name only; `name+description` matches either.

### Lay the pieces out yourself, and keep the ticks in a configuration [#lay-the-pieces-out-yourself-and-keep-the-ticks-in-a-configuration]

Put content inside `<workspace-mention>` and take the state with a template reference. The ticks here belong to an agent's
configuration, not to the store.

<CodeSample id="mention-workspaces-pieces" title="Pieces and your own rows">
  <Lang value="angular">
    ```ts title="mention-pieces.component.ts"
    import { Component, signal } from "@angular/core";
    import {
      WorkspaceMention,
      WorkspaceMentionNew,
      WorkspaceMentionSearch,
      WorkspaceMentionSelectAll,
      WorkspaceMentionTabs,
    } from "@sinequa/atomic-angular/document-workspaces";
    import { CheckboxComponent } from "@sinequa/galactik";

    @Component({
      selector: "mention-pieces-example",
      imports: [WorkspaceMention, WorkspaceMentionNew, WorkspaceMentionSearch, WorkspaceMentionSelectAll, WorkspaceMentionTabs, CheckboxComponent],
      template: `
        <workspace-mention
          #ws="workspaceMention"
          searchFields="name+description"
          [selectedIds]="config().workspaces"
          (selectionChanged)="save($event.ids)">
          <workspace-mention-tabs />
          <div class="flex items-center gap-2">
            <workspace-mention-search class="min-w-0 flex-1" />
            <workspace-mention-new />
          </div>
          <workspace-mention-select-all />
          @for (w of ws.items(); track w.id) {
            <checkbox [checked]="w.selected" (checkedChange)="ws.toggle(w.id, $event)">
              <strong>{{ w.name }}</strong> — {{ w.description }} ({{ w.documentCount }} docs)
            </checkbox>
          }
        </workspace-mention>
      `,
    })
    export class MentionPiecesExample {
      readonly config = signal({ name: "My agent", workspaces: [] as string[] });

      save(ids: string[]) {
        this.config.update(config => ({ ...config, workspaces: ids }));
      }
    }
    ```
  </Lang>
</CodeSample>

`ws.items()` are the rows the search, the category and the predicate leave, each with its `id`, `name`, `description`, `color`,
`documentCount` and whether it is `selected`.

### Put the categories in a sidebar [#put-the-categories-in-a-sidebar]

`<workspace-mention-tabs>` draws the categories as tabs. To draw them another way, read `tabs`, `tab` and `counts()` from the
state: `all`, owned (`creator` or `owner`) and shared (`reader`).

<CodeSample id="mention-workspaces-sidebar" title="Categories in a sidebar">
  <Lang value="angular">
    ```ts title="mention-sidebar.component.ts"
    import { Component, signal } from "@angular/core";
    import { WorkspaceMention, WorkspaceMentionSearch, WorkspaceMentionSelectAll } from "@sinequa/atomic-angular/document-workspaces";
    import { CheckboxComponent } from "@sinequa/galactik";

    @Component({
      selector: "mention-sidebar-example",
      imports: [WorkspaceMention, WorkspaceMentionSearch, WorkspaceMentionSelectAll, CheckboxComponent],
      template: `
        <workspace-mention #side="workspaceMention" [selectedIds]="ids()" (selectionChanged)="ids.set($event.ids)">
          <nav aria-label="Categories">
            @for (t of side.tabs; track t.id) {
              <button type="button" [attr.aria-pressed]="side.tab() === t.id" (click)="side.tab.set(t.id)">
                {{ labels[t.id] }} ({{ side.counts()[t.id] }})
              </button>
            }
          </nav>
          <workspace-mention-search />
          <workspace-mention-select-all />
          @for (w of side.items(); track w.id) {
            <checkbox [checked]="w.selected" (checkedChange)="side.toggle(w.id, $event)">{{ w.name }}</checkbox>
          } @empty {
            <p>Nothing here.</p>
          }
        </workspace-mention>
      `,
    })
    export class MentionSidebarExample {
      readonly ids = signal<readonly string[]>([]);
      readonly labels = { all: "All", editor: "Owned", reader: "Shared" };
    }
    ```
  </Lang>
</CodeSample>

A workspace has no "favorites" notion yet, so there is no such category. `predicate` is where one would plug in.

### Change the look of the search box and the button [#change-the-look-of-the-search-box-and-the-button]

`<workspace-mention-search>` takes `size`, `textSize`, `placeholder` and `aria-label`. `<workspace-mention-new>` takes the button's
own `variant`, `scheme` and `size`, and content placed inside replaces its icon and label.

<CodeSample id="mention-workspaces-look" title="Size, variant and label">
  <Lang value="angular">
    ```ts title="mention-look.component.ts"
    import { Component } from "@angular/core";
    import { WorkspaceMention, WorkspaceMentionNew, WorkspaceMentionSearch } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "mention-look-example",
      imports: [WorkspaceMention, WorkspaceMentionNew, WorkspaceMentionSearch],
      template: `
        <workspace-mention>
          <workspace-mention-search size="lg" placeholder="Find a workspace" aria-label="Workspaces" />
          <workspace-mention-new variant="primary" scheme="default" size="lg">Add a workspace</workspace-mention-new>
        </workspace-mention>
      `,
    })
    export class MentionLookExample {}
    ```
  </Lang>
</CodeSample>

### Use the state with no component of ours [#use-the-state-with-no-component-of-ours]

`injectWorkspaceMention()` gives the same state with no markup. Call it from a component's field initializer.

<CodeSample id="mention-workspaces-headless" title="injectWorkspaceMention">
  <Lang value="angular">
    ```ts title="mention-headless.component.ts"
    import { Component } from "@angular/core";
    import { injectWorkspaceMention } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "mention-headless-example",
      template: `
        <input #search placeholder="Filter…" [value]="mention.query()" (input)="mention.query.set(search.value)" />
        @for (w of mention.items(); track w.id) {
          <button type="button" [attr.aria-pressed]="w.selected" (click)="mention.toggle(w.id, !w.selected)">{{ w.name }}</button>
        }
        <button type="button" (click)="mention.toggleAll()">{{ mention.allSelected() ? "Unselect all" : "Select all" }}</button>
        <button type="button" (click)="mention.create()">New workspace…</button>
        <p>{{ mention.count() }} selected</p>
      `,
    })
    export class MentionHeadlessExample {
      protected readonly mention = injectWorkspaceMention({ searchFields: () => "name+description" });
    }
    ```
  </Lang>
</CodeSample>

Its options are read reactively, so they are functions: `searchFields`, `selectedIds`, `predicate`, and the callbacks `onSelectionChange`
and `onCreated`.

## Options [#options]

<TypeTable
  type="{
  searchFields: { type: '&#x22;name&#x22; | &#x22;name+description&#x22;', default: '&#x22;name&#x22;', description: &#x22;<workspace-mention>: what the search matches.&#x22; },
  selectedIds: { type: &#x22;readonly string[] | undefined&#x22;, default: &#x22;undefined&#x22;, description: &#x22;<workspace-mention>: the ticked ids when you own the selection. Left alone, the ticks live in WorkspacesStore, which is then not written to.&#x22; },
  predicate: { type: &#x22;(workspace: Workspace) => boolean&#x22;, default: &#x22;undefined&#x22;, description: &#x22;<workspace-mention>: an extra condition a workspace must meet to be offered, on top of the category and the search.&#x22; },
  searchable: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Empty <workspace-mention> only: shows the search box.&#x22; },
  selectAll: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Empty <workspace-mention> only: shows select all.&#x22; },
  allowCreate: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Empty <workspace-mention> only: shows new workspace.&#x22; },
  size: { type: &#x22;InputWrapVariants['size']&#x22;, default: '&#x22;md&#x22;', description: &#x22;<workspace-mention-search>: the size of the box. <workspace-mention-new>: the button's size, default sm.&#x22; },
  textSize: { type: &#x22;InputWrapVariants['textSize']&#x22;, description: &#x22;<workspace-mention-search>: the size of the text; follows size when absent.&#x22; },
  placeholder: { type: &#x22;string&#x22;, description: &#x22;<workspace-mention-search>: the hint in the empty box. The translated Search workspace when absent.&#x22; },
  variant: { type: &#x22;ButtonVariants['variant']&#x22;, default: '&#x22;tertiary&#x22;', description: &#x22;<workspace-mention-new>: the button's variant.&#x22; },
  scheme: { type: &#x22;ButtonVariants['scheme']&#x22;, default: '&#x22;neutral&#x22;', description: &#x22;<workspace-mention-new>: the button's colour scheme.&#x22; },
}"
/>

`<workspace-mention>` has two outputs: `selectionChanged` (`MentionSelection`: `ids` and `count`) and `workspaceCreated` (the `Workspace`).

What a template reference (`#ws="workspaceMention"`) or `injectWorkspaceMention()` gives:

<TypeTable
  type="{
  items: { type: &#x22;Signal<MentionItem[]>&#x22;, description: &#x22;What is offered: the category, the search and the predicate applied. Each row has id, name, description, color, documentCount, currentUserRole (to mark the read-only ones) and selected.&#x22; },
  query: { type: &#x22;WritableSignal<string>&#x22;, description: &#x22;The search text. Writable, so a text box can bind to it.&#x22; },
  tab: { type: &#x22;WritableSignal<'all' | 'editor' | 'reader'>&#x22;, description: &#x22;The category: all, owned (editor), shared (reader).&#x22; },
  tabs: { type: &#x22;{ id, labelKey }[]&#x22;, description: &#x22;The categories in order, with the translation key of each label.&#x22; },
  counts: { type: &#x22;Signal<{ all, editor, reader }>&#x22;, description: &#x22;The workspaces in each category — the whole list, not what the search left.&#x22; },
  count: { type: &#x22;Signal<number>&#x22;, description: &#x22;How many are ticked, displayed or not.&#x22; },
  ids: { type: &#x22;Signal<readonly string[]>&#x22;, description: &#x22;The ticked ids, displayed or not. With selectedIds, those of a workspace that no longer exists are dropped (once the whole list is loaded) and selectionChanged says so.&#x22; },
  allSelected: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;Every displayed workspace is ticked (never true when none is displayed).&#x22; },
  partiallySelected: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;Some, but not all, are ticked: the mixed state of a select-all checkbox.&#x22; },
  status: { type: &#x22;Signal<'loading' | 'ready' | 'error'>&#x22;, description: &#x22;Whether the first page was read. Read-only.&#x22; },
  hasMore: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;More workspaces than the loaded ones exist on the server.&#x22; },
  truncated: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;The loading cap is reached: the workspaces past it are never offered, search included.&#x22; },
  loadingMore: { type: &#x22;Signal<boolean>&#x22;, description: &#x22;A page is being fetched by loadMore().&#x22; },
  loadMore: { type: &#x22;() => Promise<void>&#x22;, description: &#x22;Loads the next page. The default menu does not call it: a host that expects many workspaces does.&#x22; },
  toggle: { type: &#x22;(id: string, checked: boolean) => void&#x22;, description: &#x22;Ticks or unticks one workspace.&#x22; },
  toggleAll: { type: &#x22;() => void&#x22;, description: &#x22;Ticks every displayed workspace, or unticks them all when they already are.&#x22; },
  select: { type: &#x22;(id: string) => void&#x22;, description: &#x22;Ticks one from outside.&#x22; },
  create: { type: &#x22;() => Promise<Workspace | null>&#x22;, description: &#x22;Opens the new-workspace dialog. Resolves with the workspace it made, ticked, or null when dismissed.&#x22; },
}"
/>

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The ticks of one menu show in another">
    Both read `WorkspacesStore`. Give each menu its own `selectedIds` to keep them apart: the store is then left alone.
  </Accordion>

  <Accordion title="Ticking does nothing once selectedIds is set">
    The ticks are then yours: the menu only says what changed, through `selectionChanged`. Write `$event.ids` back into the signal you
    pass as `selectedIds`, or the rows keep showing the ticks you gave.
  </Accordion>

  <Accordion title="A piece throws “must be placed inside a <workspace-mention>”">
    `<workspace-mention-search>`, `-select-all`, `-new` and `-tabs` read the state of the nearest `<workspace-mention>` above them; there is none.
  </Accordion>

  <Accordion title="The ready-made menu is not drawn">
    The `<workspace-mention>` has content. Any projected content makes it a container for your own pieces; remove it to get the default menu back.
  </Accordion>

  <Accordion title="The search misses a workspace I know exists">
    The search runs on the workspaces loaded, one page of 100 at first. Call `loadMore()` while `hasMore()` is true to bring in the next pages; once `truncated()`
    is true the rest is out of reach.
  </Accordion>

  <Accordion title="I need the rows or the state in my own component">
    `WorkspaceMentionRows` (the default rows), `WORKSPACE_MENTION` and `injectWorkspaceMentionScope()` are exported: a host can provide the scope itself
    or reuse the rows. The rows fill the height they are given; `--workspace-mention-rows-max-height` (18rem by default) caps them.
  </Accordion>

  <Accordion title="A workspace I just made is not in the list">
    The new-workspace button resets the category and the search so it shows. A `predicate` is not reset: if it rules the workspace out, it stays hidden.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Save to a workspace" href="./save-to-workspace.mdx">
    The picker that puts documents into a workspace, or moves them.
  </Card>

  <Card title="Custom elements" href="./custom-elements.mdx">
    The mention list as `<lexiq-workspace-mention-list>`, for a page that is not Angular.
  </Card>
</Cards>
