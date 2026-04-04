# apps

Standalone Nuxt applications live under `apps/*`.

An app is the assembly point: it declares which rails, flows, and services to load in `nuxt.config.js` and adds them as workspace dependencies in `package.json`. Apps contain no business logic — everything is delegated to modules.

## Available apps

| Package | Description |
|---------|-------------|
| `@p2pay/mono-app` (`apps/mono`) | Development app — loads all workspace modules for local testing |

## Running an app

```bash
# from mono/ root
pnpm dev           # apps/mono

# or directly
pnpm -C apps/mono dev
```
