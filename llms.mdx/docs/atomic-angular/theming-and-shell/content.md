# Theming & app shell (/docs/atomic-angular/theming-and-shell)

Register and switch color themes per scope, and the small components an application shell is built from — tabs, a dimming backdrop, error and loading states.



Two loosely related concerns share this section: theming (registering color themes at bootstrap, switching a
scope between them and between light/dark), and the handful of components that make up an application's outer
shell rather than any one search feature.

## What's next [#whats-next]

<Cards>
  <Card title="Theme" href="./theme.mdx">
    Register themes at bootstrap and switch a scope's active theme and dark mode.
  </Card>

  <Card title="ThemeProvider" href="./theme-provider.mdx">
    Apply a scope's theme to one element and everything under it — nestable.
  </Card>

  <Card title="ThemeSelector" href="./theme-selector.mdx">
    A menu listing every registered theme for a scope.
  </Card>

  <Card title="ThemeToggle" href="./theme-toggle.mdx">
    A light/dark switch for a scope.
  </Card>

  <Card title="Navbar Tabs" href="./navbar-tabs.mdx">
    A tab bar generated straight from the router's child-route configuration.
  </Card>

  <Card title="Backdrop" href="./backdrop.mdx">
    A full-screen dimming overlay, shown and hidden through a service.
  </Card>

  <Card title="Error" href="./error.mdx">
    A full-page error state with an optional detail message.
  </Card>

  <Card title="Loading (deprecated)" href="./loading.mdx">
    The spinner route bootstrap-time authentication replaced.
  </Card>
</Cards>
