# Tabs (/docs/galactik/navigation/tabs)

A thin Tailwind styling layer over Angular's official @angular/aria/tabs primitives — roles, focus and keyboard navigation come entirely from Angular.



`Tabs` is a thin styling layer over Angular's official ARIA tabs primitives (`@angular/aria/tabs`).
`TabsComponent`, `TabListComponent`, `TabComponent` and `TabPanelComponent` each apply the matching
`@angular/aria/tabs` directive as a host directive — roles, focus management, keyboard navigation and ARIA
attributes are entirely delegated to `@angular/aria`; galactik only contributes visual variants and classes.

## Minimal example [#minimal-example]

Unlike `atomic-ui`'s `Tabs`, `TabsComponent` ships **no default layout classes** — always add your own
(`flex flex-col` for stacked tabs above panels, `flex flex-row` for side-by-side vertical tabs).

<CodeSample id="tabs-basic" title="Three tabs, stacked above their panels">
  <Lang value="angular">
    ```ts title="sample.component.ts"
    import { Component } from "@angular/core";
    import { TabsComponent, TabListComponent, TabComponent, TabPanelComponent } from "@sinequa/galactik";

    @Component({
      selector: "app-tabs-example",
      imports: [TabsComponent, TabListComponent, TabComponent, TabPanelComponent],
      template: `
        <Tabs class="flex flex-col">
          <TabList selectedTab="overview" (selectedTabChange)="onTabChange($event)">
            <Tab value="overview">Overview</Tab>
            <Tab value="activity">Activity</Tab>
          </TabList>

          <div class="rounded-b-md border border-t-0 p-3">
            <TabPanel value="overview">Overview panel.</TabPanel>
            <TabPanel value="activity">Activity panel.</TabPanel>
          </div>
        </Tabs>
      `,
    })
    export class TabsExampleComponent {
      onTabChange(value: string) {
        console.log("Selected tab:", value);
      }
    }
    ```
  </Lang>
</CodeSample>

`selectedTab` on `TabList` sets the initially active tab; selection then becomes user-driven, or bind
`[(selectedTab)]` for full two-way control from the host.

## How it works [#how-it-works]

<Mermaid
  chart="flowchart TD
    User -- click / arrow keys --> Tab[Tab]
    Tab -- roving focus / selection --> TabList[TabList]
    TabList -- selectionMode follow/explicit --> Pattern[(&#x22;@angular/aria/tabs pattern&#x22;)]
    Pattern -- updates --> SelectedTab((&#x22;selectedTab model&#x22;))
    SelectedTab -- selectedTabChange --> Host[Host component]
    Tabs[Tabs container] --> TabList
    Tabs --> TabPanel1[TabPanel]
    SelectedTab -- matches value --> TabPanel1
    TabPanel1 -- visible() true/false --> Class[[&#x22;[class.hidden]&#x22;]]
    TabPanel1 -- preserveContent --> Deferred[(&#x22;DeferredContentAware&#x22;)]"
/>

`selectionMode="follow"` (default) activates a tab as soon as focus reaches it — best for stateless content.
`selectionMode="explicit"` only highlights the tab on focus; the user must press `Space`/`Enter` to activate
it — best when activation is expensive (a network fetch, a heavy render).

## Recipes [#recipes]

### Vertical orientation [#vertical-orientation]

Set `orientation="vertical"` on `TabList` and switch the wrapping `Tabs` to a row layout so the list and
panels sit side by side. Arrow-key navigation automatically switches to Up/Down.

<CodeSample id="tabs-vertical" title="Vertical tabs, side by side with their panels">
  <Lang value="angular">
    ```ts title="vertical-tabs.component.ts"
    import { Component } from "@angular/core";
    import { TabsComponent, TabListComponent, TabComponent, TabPanelComponent } from "@sinequa/galactik";

    @Component({
      selector: "app-vertical-tabs",
      imports: [TabsComponent, TabListComponent, TabComponent, TabPanelComponent],
      template: `
        <Tabs class="flex flex-row">
          <TabList orientation="vertical" variant="secondary" selectedTab="general" class="min-w-40 border-r">
            <Tab variant="secondary" value="general">General</Tab>
            <Tab variant="secondary" value="advanced">Advanced</Tab>
          </TabList>

          <div class="grow p-3">
            <TabPanel value="general">General settings.</TabPanel>
            <TabPanel value="advanced">Advanced settings.</TabPanel>
          </div>
        </Tabs>
      `,
    })
    export class VerticalTabsComponent {}
    ```
  </Lang>
</CodeSample>

### Preserving panel content, and disabled tabs [#preserving-panel-content-and-disabled-tabs]

Set `preserveContent` on a `TabPanel` to keep it mounted (merely hidden via `.hidden`) while inactive —
useful for forms that must retain user input. `softDisabled` on `TabList` (default `true`) keeps a
`disabled` tab reachable by keyboard even though it cannot be activated.

```html
<TabPanel value="form" preserveContent>
  <input placeholder="Stateful — survives tab switches" />
</TabPanel>

<Tab value="billing" disabled>Billing</Tab>
```

## Options [#options]

<TypeTable
  type="{
  &#x22;TabList.variant&#x22;: { type: '&#x22;primary&#x22; | &#x22;secondary&#x22; | &#x22;inner&#x22;', default: '&#x22;primary&#x22;', description: &#x22;Visual style, pairs with Tab's own variant.&#x22; },
  &#x22;TabList.selectionMode&#x22;: { type: '&#x22;follow&#x22; | &#x22;explicit&#x22;', default: '&#x22;follow&#x22;', description: &#x22;Whether keyboard focus auto-activates the tab.&#x22; },
  &#x22;TabList.selectedTab&#x22;: { type: &#x22;string | undefined&#x22;, description: &#x22;Model. Two-way bindable with [(selectedTab)].&#x22; },
  &#x22;TabList.softDisabled&#x22;: { type: &#x22;boolean&#x22;, default: &#x22;true&#x22;, description: &#x22;Disabled tabs remain keyboard-reachable when true.&#x22; },
  &#x22;TabList.orientation&#x22;: { type: '&#x22;horizontal&#x22; | &#x22;vertical&#x22;', default: '&#x22;horizontal&#x22;', description: &#x22;Layout direction and arrow-key axis.&#x22; },
  &#x22;Tab.value&#x22;: { type: &#x22;string&#x22;, description: &#x22;Required. Identifier matching a TabPanel.&#x22; },
  &#x22;Tab.noTruncate&#x22;: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Disables the default label truncation.&#x22; },
  &#x22;TabPanel.value&#x22;: { type: &#x22;string&#x22;, description: &#x22;Required. Identifier matching a Tab.&#x22; },
  &#x22;TabPanel.preserveContent&#x22;: { type: &#x22;boolean&#x22;, default: &#x22;false&#x22;, description: &#x22;Keeps the panel rendered (hidden via .hidden) while inactive.&#x22; },
}"
/>

`--tab-max-width` (fallback `100%`) caps a tab's label width on any ancestor; `noTruncate` exempts a single
tab from it.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Tabs render with no spacing between the list and the panels, or panels overlap the list">
    `TabsComponent` applies **no default layout classes at all** — unlike `atomic-ui`'s `Tabs`. Always add
    `class="flex flex-col"` (stacked) or `class="flex flex-row"` (side by side) yourself.
  </Accordion>

  <Accordion title="A second, differently-styled Tabs family exists under the same names">
    `@sinequa/ui` ships its own `Tabs`/`TabList`/`Tab`/`TabPanel`, also a thin layer over
    `@angular/aria/tabs`, with an almost identical input surface — but different tokens, and (unlike this one) a
    default `flex flex-col overflow-hidden` layout. Always verify the import path before assuming which
    implementation is in scope.
  </Accordion>

  <Accordion title="ARIA attributes set by hand on Tabs/TabList/Tab/TabPanel have no visible effect, or conflict">
    Don't add ARIA attributes manually on any of these — the underlying `@angular/aria/tabs` host directives
    already manage `role`, `aria-controls`, `aria-labelledby`, `aria-orientation` and the roving `tabindex`.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Sidebar" href="./sidebar.mdx">
    A navigation panel that composes many of the same accessibility patterns.
  </Card>

  <Card title="List" href="../display/list.mdx">
    Another @angular/aria-backed composite widget, for selecting rows instead of switching panels.
  </Card>
</Cards>
