# Document workspaces (/docs/atomic-angular/workspaces)

A user-managed set of documents — listed, opened, uploaded into, shared and previewed — as Angular components, with a custom-element build for pages that are not Angular.



A *workspace* is a named set of documents that a user creates, fills by uploading files, shares with other
people and previews. The container API of `@sinequa/atomic` calls it a **container**; that word stays inside the
library, and everything you touch here says workspace.

<Callout title="Two entry points">
  The components ship from `@sinequa/atomic-angular/document-workspaces`. The custom elements built on them
  (`<lexiq-workspaces>`, `<lexiq-workspace-picker>`, `<lexiq-workspace-mention-list>`) ship from
  `@sinequa/atomic-angular/workspace-elements`, whose `@angular/elements` peer is optional — an Angular application
  never needs it.
</Callout>

## How the parts fit [#how-the-parts-fit]

`WorkspacesShell` is the whole view in one component. Every part it is made of is exported too, for a host that
wants its own layout. None of the parts navigates or opens a dialog it does not own: each one *says* what the user
asked for, and whoever hosts it decides.

<Mermaid
  chart="flowchart TD
  Shell[&#x22;WorkspacesShell&#x22;] --> List[&#x22;WorkspaceList&#x22;]
  Shell --> Detail[&#x22;WorkspaceDetail&#x22;]
  Shell --> Tracker[&#x22;UploadTracker&#x22;]
  Detail --> Preview[&#x22;DocumentPreviewPanel&#x22;]
  Detail --> Dialogs[&#x22;Dialogs: EditWorkspace, ShareWorkspace, UploadDocuments, ConfirmAction&#x22;]
  List --> Dialogs
  Store[&#x22;WorkspacesStore&#x22;] --> List
  Store --> Detail
  Uploads[&#x22;UploadService and UploadTrackerStore&#x22;] --> Tracker
  Picker[&#x22;PickWorkspace and WorkspaceMentionList&#x22;] --> Store"
/>

All of them read the same `WorkspacesStore`, so a change made in one — a role changed from "Manage access", a
status patched by the upload flow — shows in the others without anything being pushed.

## Prerequisites [#prerequisites]

* `@sinequa/atomic` 2.7 or later, which carries the container API the store calls, and a configured client
  (`setGlobalConfig`, or the application's own bootstrap).
* Transloco, with the `document-workspaces` translation scope the package ships, and `provideTranslocoMessageformat()`:
  the plurals ("3 people have access") are written in ICU.
* The styles: the components are styled with galactik tokens and Tailwind utilities, so the application's Tailwind
  build scans the library, as it does for the rest of `@sinequa/atomic-angular`.

## What's next [#whats-next]

<Cards>
  <Card title="WorkspacesShell" href="./workspaces-shell.mdx">
    The whole view in one component.
  </Card>

  <Card title="List and detail" href="./list-and-detail.mdx">
    The parts the shell is made of, to lay out yourself.
  </Card>

  <Card title="Upload documents" href="./upload-documents.mdx">
    Staging files, sending them as one batch, and following their progress.
  </Card>

  <Card title="Custom elements" href="./custom-elements.mdx">
    The same view for a page that is not Angular.
  </Card>
</Cards>
