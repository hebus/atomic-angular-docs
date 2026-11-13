# AI agent skills (/docs/atomic-angular/ai-agent-skills)

Install the atomic-angular and galactik skills so your AI coding agent (Claude Code, Cursor, etc.) uses both libraries correctly.



Agent skills are packaged instructions that an AI coding agent loads on demand. Two skills ship with this
repository and target **consumers** of the libraries, not contributors: they teach the agent the public API,
conventions and pitfalls of `@sinequa/atomic-angular` and `@sinequa/galactik`.

Install them from your application's root:

```bash
npx skills add sinequa/sba-mint --skill atomic-angular
npx skills add sinequa/sba-mint --skill galactik
```

<Callout type="warn">
  The skills are hosted in the public Sinequa Mint repository
  ([`sinequa/sba-mint`](https://github.com/sinequa/sba-mint)), not in the npm packages. The command clones it from
  GitHub, so no extra access is needed.
</Callout>
