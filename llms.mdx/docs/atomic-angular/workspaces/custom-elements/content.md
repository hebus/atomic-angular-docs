# Custom elements (/docs/atomic-angular/workspaces/custom-elements)

Use the workspaces view, the save-to-workspace picker and the mention list from a page that is not Angular, as custom elements with a prebuilt stylesheet.



`@sinequa/atomic-angular/workspace-elements` wraps the components of `document-workspaces` with `@angular/elements`:
`<lexiq-workspaces>`, `<lexiq-workspace-picker>` and `<lexiq-workspace-mention-list>`. An Angular application should use
the components directly; the elements are for hosts that have no Angular component to put them in.

## Minimal example [#minimal-example]

<CodeSample id="custom-elements-basic" title="A page with no Angular of its own">
  <Lang value="angular">
    ```ts title="main.ts"
    import { bootstrapLexiqWorkspacesElements } from "@sinequa/atomic-angular/workspace-elements";

    // Transloco and the @sinequa/atomic configuration are the page's to provide: add their providers here.
    await bootstrapLexiqWorkspacesElements({ providers: [] });
    ```
  </Lang>
</CodeSample>

```html
<link rel="stylesheet" href="node_modules/@sinequa/atomic-angular/workspace-elements/styles/lexiq-workspaces.css" />
<lexiq-workspaces upload-endpoint="/tus" query-name="_query" theme="light"></lexiq-workspaces>
```

Importing the entry registers nothing: registration is explicit — `bootstrapLexiqWorkspacesElements()` for a page with no
Angular (it starts a zoneless application and registers the three tags on it), `provideLexiqWorkspacesElements()` among the
providers of an Angular application, or `defineLexiqWorkspacePicker(injector)` and its two siblings for one element only.

## How it works [#how-it-works]

The elements render in the page's own DOM, not in a shadow root, and through the application's injector: they share its
Transloco configuration, its `@sinequa/atomic` setup and its `WorkspacesStore` with the rest of the page.

Because they live in the page's DOM, the page provides their styles. Two ways:

* **A Tailwind build that scans the library**, as for the Angular components.
* **The prebuilt stylesheet**, `workspace-elements/styles/lexiq-workspaces.css`, for a page without a Tailwind build.
  It holds the galactik tokens as a *fallback* (a host that already defines them keeps its own), a small reset limited
  to the elements and the dialogs they open, and exactly the utilities the components use — unlayered, so a class beats
  the page's own `h3 { … }` or `p { … }`. The dark tokens apply under a `.dark` class: `theme="dark"` on
  `<lexiq-workspaces>` puts it on the element.

## Reference [#reference]

<TypeTable
  type="{
  &#x22;<lexiq-workspaces>&#x22;: {
    type: &#x22;attributes&#x22;,
    description: &#x22;upload-endpoint, query-name, theme (light or dark), workspace-id. Methods: showList(), showDetail(id), addWorkspace().&#x22;,
  },
  &#x22;<lexiq-workspace-picker>&#x22;: {
    type: &#x22;methods&#x22;,
    description: &#x22;openSaveCard(anchor, { documents }) and openMoveMenu(anchor, documentIds, { fromWorkspaceId }). Events: save (detail: { name }) and moved.&#x22;,
  },
  &#x22;<lexiq-workspace-mention-list>&#x22;: {
    type: &#x22;method and property&#x22;,
    description: &#x22;selectById(id), and items (the rows, for a host that draws its own menu). Event: selection-changed (detail: { ids, count }).&#x22;,
  },
}"
/>

`<lexiq-workspaces>` dispatches `lexiq-workspaces:workspace-created` and `lexiq-workspaces:workspace-updated` (detail:
`{ workspace }`), and `lexiq-workspaces:ask-followup`. All the events bubble and cross a shadow boundary, which
`@angular/elements` does not do by itself.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="The elements render unstyled">
    They take their styles from the page. Load `lexiq-workspaces.css`, or make the page's Tailwind build scan the library.
    The tokens in the stylesheet are only a fallback: a page that defines its own galactik tokens keeps them.
  </Accordion>

  <Accordion title="An element does nothing, and customElements.get() returns undefined">
    Nothing was registered: importing the entry does not register anything. Call `bootstrapLexiqWorkspacesElements()`,
    or add `provideLexiqWorkspacesElements()` to the providers.
  </Accordion>

  <Accordion title="A listener for lexiq-workspaces:workspace-created never fires in an Angular template">
    Event names with a colon cannot be bound as `(lexiq-workspaces:workspace-created)`. Add the listener with
    `addEventListener` on the element.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="WorkspacesShell" href="./workspaces-shell.mdx">
    The component `<lexiq-workspaces>` wraps.
  </Card>
</Cards>
