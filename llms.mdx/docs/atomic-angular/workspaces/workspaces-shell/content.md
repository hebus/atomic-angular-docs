# WorkspacesShell (/docs/atomic-angular/workspaces/workspaces-shell)

Show the whole workspaces view — the list, a workspace with its documents and preview, the dialogs they open and the upload tracker — from one component.



`<workspaces-shell>` is the piece that decides where things go: choosing a workspace opens it, "Add workspace"
opens the dialog and then the new workspace, leaving a workspace goes back to the list.

## Minimal example [#minimal-example]

<CodeSample id="workspaces-shell-basic" title="The workspaces view in a page">
  <Lang value="angular">
    ```ts title="workspaces.page.ts"
    import { Component } from "@angular/core";
    import { WorkspacesShell } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "workspaces-page",
      imports: [WorkspacesShell],
      template: `<workspaces-shell class="h-[40rem]" uploadEndpoint="/tus" />`,
    })
    export class WorkspacesPage {}
    ```
  </Lang>
</CodeSample>

The shell fills its parent (`h-full`), so give it a height — and let it scroll itself: the list and the document
area scroll inside it, the title and the toolbar stay in place.

## How it works [#how-it-works]

`workspaceId` is what is shown. `null` is the list; an id is that workspace, with its documents. It is a two-way
model, so a host can open a workspace and is told which one is open.

<Mermaid
  chart="stateDiagram-v2
  [*] --> List
  List --> Detail: a workspace is chosen
  List --> Detail: Add workspace, once saved
  Detail --> List: back, or the workspace is deleted"
/>

## Recipes [#recipes]

### Open on a workspace, and follow the route [#open-on-a-workspace-and-follow-the-route]

<CodeSample id="workspaces-shell-route" title="A workspace id in the URL">
  <Lang value="angular">
    ```ts title="workspaces.page.ts"
    import { Component, inject, input } from "@angular/core";
    import { Router } from "@angular/router";
    import { WorkspacesShell } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "workspaces-page",
      imports: [WorkspacesShell],
      template: `<workspaces-shell class="h-[40rem]" uploadEndpoint="/tus" [workspaceId]="id() ?? null" (workspaceIdChange)="open($event)" />`,
    })
    export class WorkspacesPage {
      /** From the route, e.g. `withComponentInputBinding()` and a `:id` segment. */
      readonly id = input<string>();
      private readonly router = inject(Router);

      open(id: string | null) {
        void this.router.navigate(id ? ["/workspaces", id] : ["/workspaces"]);
      }
    }
    ```
  </Lang>
</CodeSample>

### Hand a previewed document to a chat [#hand-a-previewed-document-to-a-chat]

<CodeSample id="workspaces-shell-follow-up" title="Ask follow-up">
  <Lang value="angular">
    ```ts title="workspaces.page.ts"
    import { Component } from "@angular/core";
    import { AskFollowUp, WorkspacesShell } from "@sinequa/atomic-angular/document-workspaces";

    @Component({
      selector: "workspaces-page",
      imports: [WorkspacesShell],
      template: `<workspaces-shell class="h-[40rem]" uploadEndpoint="/tus" (askFollowUp)="ask($event)" />`,
    })
    export class WorkspacesPage {
      ask(followUp: AskFollowUp) {
        // The title and type of the document, a placeholder and three suggestions, already translated.
        console.log(followUp.title, followUp.suggestions);
      }
    }
    ```
  </Lang>
</CodeSample>

## Options [#options]

<TypeTable
  type="{
  workspaceId: { type: &#x22;string | null&#x22;, default: &#x22;null&#x22;, description: &#x22;The workspace shown; null is the list. A two-way model (workspaceIdChange).&#x22; },
  uploadEndpoint: { type: &#x22;string&#x22;, default: '&#x22;&#x22;', description: &#x22;The tus endpoint uploads go to. A relative path resolves against the configured backend.&#x22; },
  queryName: { type: &#x22;string&#x22;, default: '&#x22;_query&#x22;', description: &#x22;The query the preview web service renders a document for.&#x22; },
  theme: { type: '&#x22;light&#x22; | &#x22;dark&#x22; | null', default: &#x22;null&#x22;, description: &#x22;dark turns the dark tokens on for the shell; otherwise it follows the page.&#x22; },
}"
/>

Outputs: `workspaceCreated` and `workspaceUpdated` (the `Workspace` as the server now has it) and `askFollowUp`
(`AskFollowUp`). `addWorkspace()` opens the "Add workspace" dialog from code.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Uploads fail at once, or never start">
    `uploadEndpoint` defaults to an empty string, which is no endpoint. Give the tus endpoint of your backend — a
    relative path is resolved against the configured `backendUrl`.
  </Accordion>

  <Accordion title="Counts show a raw plural message instead of a number">
    The catalogs write plurals in ICU. Without `provideTranslocoMessageformat()` Transloco prints the message
    untouched. Add the provider next to `provideTransloco()`.
  </Accordion>

  <Accordion title="The view is blank, with no error">
    The shell has no height of its own. A parent with `height: auto` collapses it to nothing — give it one
    (`h-[40rem]`, or a flex parent with `min-h-0 flex-1`).
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="List and detail" href="./list-and-detail.mdx">
    Lay the parts out yourself instead.
  </Card>

  <Card title="Custom elements" href="./custom-elements.mdx">
    The shell as `<lexiq-workspaces>`.
  </Card>
</Cards>
