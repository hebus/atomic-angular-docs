# Override User

Admin dialog to impersonate a user by username + domain. Invoked via the `OverrideUser` callable. Both fields use the galactik `input-group`.

## Example

<demo-override-user></demo-override-user>

```ts
import { OverrideUser } from "@sinequa/atomic-angular";

OverrideUser.call(undefined, { injector });
```

## Notes

- Backed by `UserOverrideService` (`providedIn: 'root'`).
- Confirming triggers the real override flow — in the demo, just open and cancel to inspect the form.
