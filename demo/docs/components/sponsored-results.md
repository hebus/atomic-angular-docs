# Sponsored Results

Displays sponsored links fetched from a Sinequa backend. Results are refreshed automatically via a `resource` whenever the active query changes.

## Demo

<demo-sponsored-results-basic></demo-sponsored-results-basic>

```html
<ul>
  <sponsored-results />
</ul>
```

## Limit results

Use `[slice]` to cap the number of displayed links. Default is `3`.

<demo-sponsored-results-slice></demo-sponsored-results-slice>

```html
<ul>
  <sponsored-results [slice]="2" />
</ul>
```

## Hide the "Promoted" badge

The badge appears on hover next to each link. Set `[displayPromoted]="false"` to remove it.

```html
<ul>
  <sponsored-results [displayPromoted]="false" />
</ul>
```

## Custom "Promoted" badge

Use `*childMarker` on an `<ng-template>` to replace the default pill with any template.

<demo-sponsored-results-custom-badge></demo-sponsored-results-custom-badge>

```html
<ul>
  <sponsored-results>
    <ng-template childMarker>
      <span class="text-xs font-semibold text-amber-600 uppercase">Ad</span>
    </ng-template>
  </sponsored-results>
</ul>
```

## Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `slice` | `number` | `3` | Maximum number of links to display |
| `displayPromoted` | `boolean` | `true` | Show the "PROMOTED" badge on hover |
