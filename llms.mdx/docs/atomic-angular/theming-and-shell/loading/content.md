# Loading (/docs/atomic-angular/theming-and-shell/loading)

Deprecated — a spinner shown while the application initialized at a dedicated /loading route. Authentication now happens at bootstrap instead.



<Callout title="Deprecated" type="warn">
  `LoadingComponent` and the `/loading` route pattern it was built for are no longer used. Authentication now
  happens at bootstrap (`withBootstrapApp`/`signIn`), and `AuthGuard` redirects an unauthenticated user straight
  to the sign-in page — there is no longer an intermediate loading route to wait through. This component will be
  removed in a future major release; do not use it in new code.
</Callout>

If you still have an existing `/loading` route relying on it, see [Authentication
flows](../auth/authentication-flows.mdx) for the bootstrap sequence that replaces it.
