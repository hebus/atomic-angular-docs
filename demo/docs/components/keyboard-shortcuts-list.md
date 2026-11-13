# Keyboard Shortcuts List

The keyboard shortcuts currently registered, grouped by heading and rendered as key combinations.

## Imports

```ts
import { KeyboardShortcutsListComponent, KeyboardShortcutsService } from "@sinequa/atomic-angular";
```

## Example

The list **observes the registry** of `KeyboardShortcutsService` instead of holding a hand-written list, so the help can't drift away from what works. The consequence is deliberate: on a page that registers nothing, it lists nothing. Shortcuts without a `categoryKey` come first, under no heading; shortcuts with `hidden`, or without a `labelKey`, are not listed.

<demo-keyboard-shortcuts-list></demo-keyboard-shortcuts-list>

```html
<keyboard-shortcuts-list />
```

```ts
shortcuts.register(
  { combo: ["Alt+0", "Shift+?"], labelKey: "dialogs.keyboardShortcuts.title", categoryKey: "shortcuts.global", run: () => open() },
  { destroyRef }
);
```

## How it works

- `labelKey` and `categoryKey` are Transloco **keys**, translated at render time, never at registration, so the language can change without a reload. The demo uses plain words as keys: with no translation, Transloco shows the key itself.
- A shortcut may answer to several combinations. Each is rendered as a `kbd-group` named with the whole combination (`aria`), and the keys inside are hidden from assistive technology.
- Registrations made with a `destroyRef` leave the list when that scope is destroyed.

## API Reference

### KeyboardShortcutsListComponent

No input or output: the content comes from `KeyboardShortcutsService.shortcuts()`.

| Method                         | Description                                                           |
| ------------------------------ | --------------------------------------------------------------------- |
| `KeyboardShortcutsService.register(definition, options?)` | Registers a shortcut and returns `{ unregister() }`. Pass `{ destroyRef }` to unregister automatically. |
