# Notifications & feedback (/docs/atomic-angular/notifications)

Saved search alerts the server re-runs on a schedule, and the toast interceptor that surfaces a failed HttpClient request to the user.



Three unrelated ways the application and the user talk to each other outside the current screen: a scheduled
alert the user set up themselves, an automatic toast when a request fails, and a button for the user to send
feedback about the results.

## What's next [#whats-next]

<Cards>
  <Card title="Alerts" href="./alerts.mdx">
    List, reorder, delete, create and edit scheduled search alerts.
  </Card>

  <Card title="Toast interceptor" href="./toast.mdx">
    Turn a failed HttpClient request into a toast, for the statuses worth telling the user about.
  </Card>

  <Card title="Feedback button" href="./feedback.mdx">
    Like, dislike or send a typed message about the current results, with the inline and size options.
  </Card>
</Cards>
