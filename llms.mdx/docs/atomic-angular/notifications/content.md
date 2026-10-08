# Notifications & feedback (/docs/atomic-angular/notifications)

Saved search alerts the server re-runs on a schedule, and the toast interceptor that surfaces a failed HttpClient request to the user.



Two unrelated ways the application tells the user something happened outside the current screen: a scheduled
alert the user set up themselves, and an automatic toast when a request fails.

## What's next [#whats-next]

<Cards>
  <Card title="Alerts" href="./alerts.mdx">
    List, reorder, delete, create and edit scheduled search alerts.
  </Card>

  <Card title="Toast interceptor" href="./toast.mdx">
    Turn a failed HttpClient request into a toast, for the statuses worth telling the user about.
  </Card>
</Cards>
