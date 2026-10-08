# Save to a workspace (/docs/atomic-angular/workspaces/save-to-workspace)

Let the user put documents into a workspace, or move them to another — a popover under your button, a sheet on a narrow screen — and tick workspaces to mention.



`PickWorkspace` opens the "Save to workspace" / "Move to workspace" picker. It offers only the workspaces the user can
write to, and can make a new one on the spot. `<workspace-mention-list>` is the other way in: the workspaces as rows to
tick, for a chat's "+" menu.

## Minimal example [#minimal-example]

<CodeSample id="save-to-workspace-basic" title="Save a document under the button that asked">
  <Lang value="angular">
    ```ts title="save.component.ts"
    import { Component } from "@angular/core";
    import { PickWorkspace, type WorkspacePickerResult } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "save-example",
      template: `<button #save (click)="pick(save)">Save to workspace…</button>`,
    })
    export class SaveExample {
      async pick(anchor: HTMLElement) {
        const result = await PickWorkspace.call({ mode: "save", anchor, documents: [{ name: "report.pdf" }] });
        if (typeof result === "object" && "workspace" in result) {
          console.log("saved to", (result as WorkspacePickerResult).workspace.name);
        }
      }
    }
    ```
  </Lang>
</CodeSample>

Without an injector, `call()` needs `provideCallable()` from `@sinequa/galactik` in the providers.

## How it works [#how-it-works]

On a wide window with an `anchor`, the picker is a popover hung under that element; the browser's light dismiss closes
it on an outside press or Escape, and it resolves with a plain `dialog-cancel`. On a narrow window — or without an
anchor — it is a modal sheet at the bottom of the screen instead. Which one is decided when it opens.

The picker does the work itself (`saveDocuments`, or `moveDocuments` from the store) and resolves once the check mark has
been seen, with `{ type: "dialog-confirm", workspace }`. When moving, the workspace the documents come from is left out
of the list. A new workspace needs a name that no other workspace has, whatever its case — the same name twice cannot
be told apart in a list.

## Recipes [#recipes]

### Move documents out of a workspace [#move-documents-out-of-a-workspace]

<CodeSample id="save-to-workspace-move" title="Move to workspace">
  <Lang value="angular">
    ```ts title="move.component.ts"
    import { Component } from "@angular/core";
    import { PickWorkspace } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "move-example",
      template: `<button #move (click)="pick(move)">Move to…</button>`,
    })
    export class MoveExample {
      async pick(anchor: HTMLElement) {
        await PickWorkspace.call({ mode: "move", anchor, fromWorkspaceId: "w1", documentIds: ["w1-d1"] });
      }
    }
    ```
  </Lang>
</CodeSample>

### Tick workspaces from a menu [#tick-workspaces-from-a-menu]

<CodeSample id="save-to-workspace-mention" title="WorkspaceMentionList">
  <Lang value="angular">
    ```ts title="mention.component.ts"
    import { Component } from "@angular/core";
    import { type MentionSelection, WorkspaceMentionList } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "mention-example",
      imports: [WorkspaceMentionList],
      template: `<workspace-mention-list (selectionChanged)="changed($event)" />`,
    })
    export class MentionExample {
      changed(selection: MentionSelection) {
        console.log(selection.ids, selection.count);
      }
    }
    ```
  </Lang>
</CodeSample>

The ticks live in `WorkspacesStore`, not in the component: however many lists are on screen, they show the same ones.
Every workspace is listed, the ones shared read-only too — mentioning one only reads it. `items()` gives a host that draws
its own menu the rows, and `select(id)` ticks one from outside.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="A workspace the user can read is missing from the picker">
    The picker is for *writing*: a workspace shared read-only stays out of it. It stays in the mention list, which only reads.
  </Accordion>

  <Accordion title="The picker opens as a sheet on a wide window">
    It had no `anchor`. Pass the element it should hang from — the button the user pressed.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Custom elements" href="./custom-elements.mdx">
    The picker and the mention list as `<lexiq-workspace-picker>` and `<lexiq-workspace-mention-list>`.
  </Card>
</Cards>
