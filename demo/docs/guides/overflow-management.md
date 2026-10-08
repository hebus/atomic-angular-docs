# Overflow management in the Demo app

## Layout chain

```
html (overflow-x: hidden)
  body
    root
      sidebar-provider   ← height anchor: h-svh
        sidebar          ← independent scroll (sidebar-content has overflow-auto)
        sidebar-inset    ← flex col, min-h-0, overflow-hidden
          header         ← h-16 shrink-0  (never scrolls)
          <router-outlet>
          <route-component :host>  ← flex child, must declare its own scroll
```

## The three rules that make it work

### 1. The height anchor — `sidebar-provider`

`sidebar-provider` base class now uses `h-svh` (fixed at exactly one viewport unit).

The previous default `min-h-svh` allowed the provider to grow beyond the viewport,
which caused every ancestor to grow with the content and pushed the scroll onto `body`.

### 2. The intermediate constraint — `sidebar-inset`

```html
<sidebar-inset class="min-h-0">
```

`sidebar-inset` is a flex item inside `sidebar-provider` (`flex-1` in its base class).
Flex items have `min-height: auto` by default, which lets them overflow their container
regardless of its fixed height.

Setting `min-height: 0` removes that implicit minimum and ensures `sidebar-inset` stays
within the `h-svh` boundary.

### 3. The scroll owner — the route component `:host`

```css
:host {
  display: block;
  width: 100%;
  flex: 1;           /* fill remaining space below the header */
  min-height: 0;     /* same rule as sidebar-inset: prevent auto min-height */
  overflow-y: auto;  /* own the scroll */
}
```

Because Angular renders the routed component as a **sibling after `<router-outlet>`**
in the DOM, `:host` is a direct flex child of `sidebar-inset`. It must declare:
- `flex: 1` to absorb the space left by the fixed header
- `min-height: 0` to be bounded by the parent (critical, often forgotten)
- `overflow-y: auto` to scroll internally


## Key concept: `min-height: 0` in flex containers

In a `flex-direction: column` container with a fixed height, a flex child with
`flex: 1` will try to fill the available space — but the browser will never make it
*shorter* than its content unless `min-height: 0` is set.

| Situation | Behaviour |
|---|---|
| `flex: 1` alone | item grows, but can still overflow the container |
| `flex: 1` + `min-height: 0` | item is truly bounded, `overflow-y: auto` works |

This rule applies to **every level** of a nested flex-column chain.


## Adding a new route that needs to scroll

Copy the `:host` block from `markdown-page.ts` into the new component:

```typescript
styles: [`:host { display: block; width: 100%; flex: 1; min-height: 0; overflow-y: auto; }`]
```

That is sufficient — the chain above is already in place.


## Adding a new route with its own inner layout (e.g. a resizable panel)

If the route component has its own flex/grid children that also need to scroll, apply
the same two rules at each level:

```css
/* route :host */
:host {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;   /* let children own their scroll */
}

/* scrollable child inside the route */
.content-area {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
```


## What NOT to do

| Anti-pattern | Why it breaks |
|---|---|
| `height: 100%` on `:host` | Requires every ancestor to have an explicit height — fragile |
| `overflow-y: scroll` on `body` | Moves the scrollbar to the outermost level, sidebar scrolls with content |
| `min-h-svh` on `sidebar-provider` | Allows the layout to grow beyond the viewport |
| Forgetting `min-height: 0` | The flex item ignores `overflow-y: auto` because it never gets bounded |
