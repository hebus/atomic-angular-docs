# Aggregation Tree — Hierarchical selection cascade

This page demonstrates a feature specific to `aggregation-tree`, isolated on its own page: it needs sole ownership of `appStore`'s `filterLinkChildren` feature flag, and sharing a page with another demo that also drives feature flags would make the two interfere with each other.

With the `filterLinkChildren` feature flag enabled, selecting a parent node in a tree **visually** checks all of its children too — but only the parent's own path is sent in the applied filter (`/Sources/*`, never `/Sources/Child/*`). Unselecting a specific child while the parent stays checked works as expected. Toggle the flag off and the checkbox no longer cascades: only the node you click reflects a check.

<demo-aggregation-link-children></demo-aggregation-link-children>

```html
<!-- appStore.general()?.features?.filterLinkChildren drives the cascade -->
<aggregation-tree name="Sources" column="source" [expandedLevel]="2" [showFiltersCount]="true" />
```

```typescript
appStore = inject(AppStore);

constructor() {
  this.appStore.update({ data: { general: { features: { filterLinkChildren: true } } } });
}
```
