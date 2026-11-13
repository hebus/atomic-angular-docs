# Share a workspace (/docs/atomic-angular/workspaces/share-a-workspace)

Open the "Manage access" dialog to give people the owner or reader role on a workspace, change a role or take access away — each change is saved at once.



`ShareWorkspace` opens the "Manage access" dialog for one workspace. `<workspace-detail>` opens it from its
"Manage access" button; call it yourself from anywhere else.

## Minimal example [#minimal-example]

<CodeSample id="share-a-workspace-basic" title="A Manage access button">
  <Lang value="angular">
    ```ts title="share.component.ts"
    import { Component } from "@angular/core";
    import { ShareWorkspace } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "share-example",
      template: `<button (click)="share()">Manage access…</button>`,
    })
    export class ShareExample {
      share() {
        void ShareWorkspace.call({ workspaceId: "w1" });
      }
    }
    ```
  </Lang>
</CodeSample>

Without an injector, `call()` needs `provideCallable()` from `@sinequa/galactik` in the providers. The workspace has
to be known to `WorkspacesStore` — loaded by a list, a detail or `ensureLoaded()` — because the dialog reads it from there.

## How it works [#how-it-works]

Every change — a role, a removal, people added — is saved at once, with the arrays the workspace holds *now*. The list
reads the store, so it shows what the server answered, and follows a change made elsewhere. Names arrive after the
first paint (the directory is asked for them), so a row can read as a raw id for a moment.

* **Two rows never get a role menu**: the creator's, which the API treats as immutable, and your own — an owner who
  demotes or removes themselves loses the workspace with no way back.
* **Removing asks first**, inline in the row.
* **Groups are never offered** in the search: the API documents `owners` and `readers` as *user* ids, so staging a
  group would look like it worked and grant nobody anything.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The dialog opens with an empty list">
    The workspace is not in the store yet. Load the workspaces first (`WorkspacesStore.ensureLoaded()`), or open the
    dialog from a view that has.
  </Accordion>

  <Accordion title="A change is refused and the list stays as it was">
    The dialog shows the failure under the search box — a 403 reads "You don't have permission to do this." Only
    creators and owners can change access, and the list stays as the server last had it.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Save to a workspace" href="./save-to-workspace.mdx">
    Put documents from elsewhere into a workspace.
  </Card>
</Cards>
