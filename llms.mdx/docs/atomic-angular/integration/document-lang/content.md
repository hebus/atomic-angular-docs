# Document language (/docs/atomic-angular/integration/document-lang)

Keep the page's lang attribute on the language the interface is displayed in, so screen readers pronounce it correctly.



`provideDocumentLang()` keeps `<html lang>` on the active Transloco language (RGAA 8.4 / WCAG 3.1.1), whichever
control changed it — the user menus, the user-profile form, a host dialog.

## Minimal example [#minimal-example]

<CodeSample id="document-lang-basic" title="Registered next to Transloco">
  <Lang value="angular">
    ```ts title="app.config.ts"
    import { ApplicationConfig } from "@angular/core";
    import { provideTransloco } from "@jsverse/transloco";
    import { provideDocumentLang } from "@sinequa/atomic-angular";

    export const appConfig: ApplicationConfig = {
      providers: [
        provideTransloco({ config: { availableLangs: ["en", "fr"], defaultLang: "en" } }),
        provideDocumentLang(),
      ],
    };
    ```
  </Lang>
</CodeSample>

## How it works [#how-it-works]

The provider is an environment initializer that subscribes to `TranslocoService.langChanges$` and writes the
value to `document.documentElement.lang`. `langChanges$` replays the current language on subscription, so the
attribute is set at start-up too, then follows every change. The subscription ends with the injector.

It does nothing when Transloco is not provided, and ignores an empty language.

## Pitfalls [#pitfalls]

<Accordions>
  <Accordion title="Do not register it in an embedded application">
    It is opt-in on purpose and is not part of `bootstrapApp`. An embedded application (a web component) does not own
    the page: the host page owns its document language, and overwriting it would change how the whole page is read.
  </Accordion>
</Accordions>

## What's next [#whats-next]

<Cards>
  <Card title="Bootstrap the application" href="./bootstrap-app.mdx">
    The initializer most applications register, which also follows the interface language for the server.
  </Card>
</Cards>
