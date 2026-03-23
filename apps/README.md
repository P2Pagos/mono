# apps

Standalone Nuxt applications live under `apps/*`.

An app is the assembly point: it declares which rails, flows, and packages to load in its `nuxt.config.js` and adds them as workspace dependencies in `package.json`. The app itself contains no business logic — everything is delegated to the modules.

## Available apps

| Package | Description |
|---------|-------------|
| `@p2payto/mono-app` (`apps/mono`) | Root development app — loads all workspace modules for local testing |

## Running the app

```bash
cd apps/mono
npx nuxi dev
```
