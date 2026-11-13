# Integration (/docs/atomic-angular/integration)

Wiring the client, bootstrap, and cross-cutting interceptors, pipes, services and utilities into a host application.



The pieces every application wires in once, regardless of which search features it uses: the client
connecting to the backend, the bootstrap sequence that signs the user in, and the interceptors, pipes,
services and utilities that cut across every feature rather than belonging to one.

## What's next [#whats-next]

<Cards>
  <Card title="Provide a client" href="./atomic-client.mdx">
    Give the application its own Sinequa client instead of the default one.
  </Card>

  <Card title="Serve a second backend" href="./atomic-scope.mdx">
    A route or component subtree with its own client, stores and services.
  </Card>

  <Card title="Notify failed requests as toasts" href="./atomic-notifications.mdx">
    Surface a failed request without wrapping HttpClient.
  </Card>

  <Card title="Bootstrap the application" href="./bootstrap-app.mdx">
    Sign the user in and initialize the application's stores.
  </Card>

  <Card title="Cross-cutting interceptors" href="./interceptors.mdx">
    The interface language, audit metadata and 401 recovery, on the HttpClient channel.
  </Card>

  <Card title="Cross-cutting pipes" href="./pipes.mdx">
    Legacy filter display, translated system strings, locale-aware dates, file sizes, highlighting.
  </Card>

  <Card title="Cross-cutting utilities" href="./utils.mdx">
    Building a query from the route, a Web Worker wrapper, a baseline fetch wrapper.
  </Card>

  <Card title="Cross-cutting services" href="./services.mdx">
    Registering route components, custom audit events, JsonMethod plugin calls.
  </Card>

  <Card title="Default query name resolver" href="./query-name-resolver.mdx">
    Supplies the application's default query name to a route with no explicit one.
  </Card>
</Cards>
