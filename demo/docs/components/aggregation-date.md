# Aggregation Date

A date aggregation component that renders a list of date range options (Today, This week, This month, etc.) with optional custom range picker.

## Demo

<demo-aggregation-date></demo-aggregation-date>

```html
<aggregation-date name="Modified" column="modified" />
```

```typescript
aggregationsStore = inject(AggregationsStore);
appStore = inject(AppStore);

constructor() {
  this.appStore.update({
    customJSONs: [{
      name: 'filters',
      data: [{ name: 'Modified', column: 'modified' }] as unknown as CJson,
      preLogin: false
    }]
  });
  this.aggregationsStore.update([{
    name: 'Modified',
    column: 'modified',
    items: [
      { display: 'Today',      value: 'today',       count: 12   },
      { display: 'This week',  value: 'this-week',   count: 87   },
      { display: 'This month', value: 'this-month',  count: 342  },
      { display: 'This year',  value: 'this-year',   count: 1205 },
    ]
  }]);
}
```
