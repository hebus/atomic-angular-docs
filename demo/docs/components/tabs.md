# Tabs

Tabs let users switch between sections of related content within the same view.

The implementation is a thin styling layer over [`@angular/aria/tabs`](https://angular.dev/api/aria/tabs) — accessibility (roles, ARIA attributes, keyboard navigation) is provided by Angular's official ARIA directives, while `galactik` adds the look and a few quality-of-life inputs.

## Anatomy

A `Tabs` block is always composed of three pieces:

| Element | Role | Purpose |
|---|---|---|
| `Tabs` | container (`tablist` wrapper) | Owns the layout (flex column for horizontal tabs, flex row for vertical) |
| `TabList` | `role="tablist"` | Holds the `Tab` triggers and the selection state |
| `Tab` | `role="tab"` | A clickable header. Must declare a unique `value` |
| `TabPanel` | `role="tabpanel"` | Content matched to a `Tab` by `value` |

```ts
import { TabsComponent, TabListComponent, TabComponent, TabPanelComponent } from "@sinequa/galactik";
```

## Default

The simplest usage. `selectedTab` on the `TabList` picks the initial active tab — selection then becomes user-driven. With no `variant` set, tabs use the `secondary` style (underlined active tab).

<demo-tabs-default></demo-tabs-default>

```html
<Tabs>
  <TabList selectedTab="overview">
    <Tab value="overview">Overview</Tab>
    <Tab value="activity">Activity</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>

  <div class="p-3 border border-t-0 rounded-b-md">
    <TabPanel value="overview">Overview panel — high-level summary.</TabPanel>
    <TabPanel value="activity">Activity panel — recent events.</TabPanel>
    <TabPanel value="settings">Settings panel — preferences.</TabPanel>
  </div>
</Tabs>
```

## Tab variant — `primary`

Use `variant="primary"` for a filled active tab — the active tab is highlighted with the primary background. Good for a prominent, segmented-control look.

<demo-tabs-variant-primary></demo-tabs-variant-primary>

```html
<Tabs>
  <TabList selectedTab="overview">
    <Tab variant="primary" value="overview">Overview</Tab>
    <Tab variant="primary" value="activity">Activity</Tab>
    <Tab variant="primary" value="settings">Settings</Tab>
    <Tab variant="primary" value="reports" disabled>Reports</Tab>
  </TabList>

  <div class="p-3">
    <TabPanel value="overview">Overview panel.</TabPanel>
    <TabPanel value="activity">Activity panel.</TabPanel>
    <TabPanel value="settings">Settings panel.</TabPanel>
    <TabPanel value="reports">Reports panel.</TabPanel>
  </div>
</Tabs>
```

## Tab variant — `secondary`

Use `variant="secondary"` on each `Tab` for an underlined active style — common in settings pages and detail views. This is the default variant.

<demo-tabs-variant-secondary></demo-tabs-variant-secondary>

```html
<Tabs>
  <TabList selectedTab="profile">
    <Tab variant="secondary" value="profile">Profile</Tab>
    <Tab variant="secondary" value="security">Security</Tab>
    <Tab variant="secondary" value="notifications">Notifications</Tab>
    <Tab variant="secondary" value="billing" disabled>Billing</Tab>
  </TabList>

  <div class="p-3">
    <TabPanel value="profile">Profile information.</TabPanel>
    <TabPanel value="security">Security & authentication.</TabPanel>
    <TabPanel value="notifications">Notification preferences.</TabPanel>
    <TabPanel value="billing">Billing details.</TabPanel>
  </div>
</Tabs>
```

## Tab variant — `inner`

A flatter, embedded look — the active tab blends into a surrounding container instead of standing out. Pair with a wrapping background to make the relationship explicit.

<demo-tabs-variant-inner></demo-tabs-variant-inner>

```html
<Tabs class="border rounded-md bg-sage-50">
  <TabList selectedTab="json">
    <Tab variant="inner" value="json">JSON</Tab>
    <Tab variant="inner" value="xml">XML</Tab>
    <Tab variant="inner" value="yaml">YAML</Tab>
  </TabList>

  <div class="p-3">
    <TabPanel value="json"><pre>...</pre></TabPanel>
    <TabPanel value="xml"><pre>...</pre></TabPanel>
    <TabPanel value="yaml"><pre>...</pre></TabPanel>
  </div>
</Tabs>
```

## TabList variant — `ghost`

Removes the default `TabList` background. Useful when the tabs sit on a coloured surface or when you want a minimal toolbar look.

<demo-tabs-list-ghost></demo-tabs-list-ghost>

```html
<Tabs>
  <TabList variant="tertiary" selectedTab="day">
    <Tab value="day">Day</Tab>
    <Tab value="week">Week</Tab>
    <Tab value="month">Month</Tab>
    <Tab value="year">Year</Tab>
  </TabList>
  <!-- panels -->
</Tabs>
```

## Vertical orientation

Set `orientation="vertical"` on the `TabList` to stack the tabs in a column. The list also reorganises its internal layout (`flex-col`), and arrow-key navigation switches to **Up/Down** as required by the ARIA spec.

> Switch the wrapping `<Tabs>` to `flex-row` (e.g. `class="flex-row"`) so the `TabList` and panels sit side-by-side. The base `Tabs` directive defaults to `flex-col`, optimised for horizontal tabs.

<demo-tabs-vertical></demo-tabs-vertical>

```html
<Tabs class="flex-row border rounded-md min-h-44">
  <TabList orientation="vertical"
           selectedTab="general"
           class="border-r min-w-40">
    <Tab variant="secondary" value="general">General</Tab>
    <Tab variant="secondary" value="appearance">Appearance</Tab>
    <Tab variant="secondary" value="advanced">Advanced</Tab>
    <Tab variant="secondary" value="experimental" disabled>Experimental</Tab>
  </TabList>

  <div class="grow p-3">
    <TabPanel value="general">General configuration.</TabPanel>
    <TabPanel value="appearance">Theme, density, accent color.</TabPanel>
    <TabPanel value="advanced">Cache, telemetry, developer options.</TabPanel>
    <TabPanel value="experimental">Feature flags (preview).</TabPanel>
  </div>
</Tabs>
```

## Selection mode — `follow` vs `explicit`

`selectionMode` controls how keyboard focus interacts with selection:

- `follow` (default) — moving focus also activates the tab. Best for stateless content (text, descriptions).
- `explicit` — moving focus only highlights the tab; users must press <kbd>Space</kbd> or <kbd>Enter</kbd> to activate. Best when activating a tab is expensive (network request, heavy render).

<demo-tabs-selection-manual></demo-tabs-selection-manual>

```html
<Tabs>
  <TabList selectionMode="explicit" selectedTab="one">
    <Tab value="one">One</Tab>
    <Tab value="two">Two</Tab>
    <Tab value="three">Three</Tab>
  </TabList>
  <!-- panels -->
</Tabs>
```

## Disabled tabs and `softDisabled`

Disabling an individual tab is done with the `disabled` attribute. The `softDisabled` input on `TabList` chooses what keyboard navigation does with those tabs:

- `softDisabled="true"` (default) — disabled tabs still receive focus, so screen-reader users can discover them.
- `[softDisabled]="false"` — keyboard navigation skips disabled tabs entirely.

<demo-tabs-soft-disabled></demo-tabs-soft-disabled>

```html
<Tabs>
  <TabList [softDisabled]="false" selectedTab="active1">
    <Tab value="active1">Active</Tab>
    <Tab value="disabled" disabled>Disabled (skipped by keyboard)</Tab>
    <Tab value="active2">Active</Tab>
  </TabList>
  <!-- panels -->
</Tabs>
```

## Preserve panel content

By default, only the active panel is rendered in the DOM. Set `preserveContent` on a `TabPanel` to keep it mounted when inactive — useful when the panel hosts:

- a form whose values must survive tab switches,
- a video/audio player you don't want to remount,
- a heavy chart you'd rather not re-render.

Inactive panels with `preserveContent` are hidden via the `invisible` class — they keep their layout space hidden but stay in the DOM.

<demo-tabs-preserve-content></demo-tabs-preserve-content>

```html
<Tabs>
  <TabList selectedTab="form">
    <Tab value="form">Form (preserved)</Tab>
    <Tab value="lazy">Lazy panel</Tab>
  </TabList>

  <div class="p-3">
    <TabPanel value="form" preserveContent>
      <input placeholder="Stateful input" />
    </TabPanel>
    <TabPanel value="lazy">
      Rendered only when active (default behavior).
    </TabPanel>
  </div>
</Tabs>
```

## Sizes — `sm` / `md`

Use the `size` input to switch the tab height: `md` (36px, the default) for standard layouts, `sm` (24px) for dense toolbars.

<demo-tabs-sizes></demo-tabs-sizes>

```html
<Tabs>
  <TabList selectedTab="sm-1">
    <Tab size="sm" value="sm-1">Small</Tab>
    <Tab size="sm" value="sm-2">Compact</Tab>
  </TabList>
  <!-- panels -->
</Tabs>

<Tabs>
  <TabList selectedTab="md-1">
    <Tab size="md" value="md-1">Medium</Tab>
    <Tab size="md" value="md-2">Comfortable</Tab>
  </TabList>
  <!-- panels -->
</Tabs>
```

## Disable truncation — `noTruncate`

`Tab` truncates labels with an ellipsis when the row is width-constrained. Set `noTruncate` to opt out — the label keeps its full width and the row will wrap or scroll depending on the parent's layout.

<demo-tabs-no-truncate></demo-tabs-no-truncate>

```html
<Tabs class="max-w-xs">
  <TabList selectedTab="t1">
    <Tab noTruncate value="t1">Short</Tab>
    <Tab noTruncate value="t2">A much longer label fully visible</Tab>
  </TabList>
  <!-- panels -->
</Tabs>
```

## Composition — icons, tags, badges

A `Tab` accepts any content. Wrap the textual label in a `<span>` if you want truncation; sibling elements (icons, counters) keep their natural width.

<demo-tabs-with-content></demo-tabs-with-content>

```html
<Tabs>
  <TabList selectedTab="inbox">
    <Tab value="inbox">
      <StarIcon class="size-4" />
      <span>Inbox</span>
      <tag size="sm" style="secondary" scheme="sage">12</tag>
    </Tab>
    <Tab value="archive">
      <span>Archive</span>
      <badge variant="number" style="secondary" scheme="sage" size="xs">2.3k</badge>
    </Tab>
    <Tab value="ai">
      <RobotIcon class="size-4" />
      <span>AI suggestions</span>
    </Tab>
  </TabList>
  <!-- panels -->
</Tabs>
```

## Accessibility

`Tabs`, `TabList`, `Tab` and `TabPanel` are powered by the `@angular/aria/tabs` primitives via `hostDirectives`. Out of the box you get:

- `role="tablist"`, `role="tab"`, `role="tabpanel"` and the matching `aria-controls` / `aria-labelledby` wiring.
- `aria-orientation` reflecting the `orientation` input.
- Arrow-key navigation (`Left`/`Right` for horizontal, `Up`/`Down` for vertical), `Home`/`End` jumps, and `Space`/`Enter` activation.
- A roving `tabindex` so only one tab is in the tab order at a time.

You don't need to add ARIA attributes manually — the directives manage them.

## API Reference

### Tabs

| Input | Type | Default | Description |
|---|---|---|---|
| `class` | `string` | — | Extra CSS classes on the container. The default class list is `flex flex-col overflow-hidden` — override with `flex-row` to compose horizontally with a vertical `TabList`. |

### TabList

Inputs from `@angular/aria/tabs` `TabList`:

| Input | Type | Default | Description |
|---|---|---|---|
| `selectedTab` | `string` | — | Value of the active tab. Drive selection from the parent component for full control. |
| `selectionMode` | `'follow' \| 'explicit'` | `'follow'` | Whether keyboard focus activates the tab automatically. |
| `softDisabled` | `boolean` | `true` | When `true`, disabled tabs are still reachable via keyboard navigation. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout & arrow-key direction. Sets `aria-orientation`. |

`galactik` styling inputs:

| Input | Type | Default | Description |
|---|---|---|---|
| `class` | `string` | — | Extra classes. |
| `variant` | `'default' \| 'ghost'` | `'default'` | `ghost` removes the background. |
| `size` | `'default'` | `'default'` | Reserved for future sizes. |

### Tab

Inputs from `@angular/aria/tabs` `Tab`:

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | **Required.** Identifier matching a `TabPanel`. |
| `disabled` | `boolean` | `false` | Disable interaction. |

`galactik` styling inputs:

| Input | Type | Default | Description |
|---|---|---|---|
| `class` | `string` | `""` | Extra classes. |
| `variant` | `'primary' \| 'secondary' \| 'inner'` | `'secondary'` | Visual style. |
| `size` | `'sm' \| 'md'` | `'md'` | Tab height — `sm` (24px) or `md` (36px). |
| `noTruncate` | `boolean` | `false` | Disable label truncation. |

### TabPanel

Inputs from `@angular/aria/tabs` `TabPanel`:

| Input | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | **Required.** Identifier matching a `Tab`. |

`galactik` inputs:

| Input | Type | Default | Description |
|---|---|---|---|
| `preserveContent` | `boolean` | `false` | Keep the panel in the DOM (hidden) when inactive. |
