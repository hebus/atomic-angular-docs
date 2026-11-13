# Access and people (/docs/atomic-angular/access)

Pick users and groups, and manage who owns or reads an item — standalone components, not tied to any feature.



Two components of `@sinequa/atomic-angular` deal with people. `<principal-picker>` searches the directory and
hands back the people picked. `<manage-access>` builds on it: a whole "Manage access" block — owners, readers, a
public switch — that edits two plain lists of ids. Neither knows what it is attached to: a workspace, an agent, a
skill or an upload can use them the same way.

<Mermaid
  chart="flowchart TD
  MA[&#x22;manage-access&#x22;] --> PP[&#x22;principal-picker&#x22;]
  MA --> RM[&#x22;role-menu&#x22;]
  PP --> PD[&#x22;PrincipalDirectory&#x22;]
  PD --> API[&#x22;searchPrincipals / fetchPrincipalsByIds&#x22;]"
/>

<Cards>
  <Card title="Manage access" href="./manage-access.mdx">
    Owners, readers, make public, custom switches, injected principals.
  </Card>
</Cards>
