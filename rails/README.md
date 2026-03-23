# rails

Payment rail modules live under `rails/*`.

Each rail is a Nuxt 4 module (`defineNuxtModule`) that injects exactly one page and one API server handler into the host app. Rails are stateless and side-effect-free on their own — they become active only when listed in the host app's `nuxt.config.js`.

## Available rails

| Package | Page | API |
|---------|------|-----|
| `@p2payto/template` | `/rails/template` | `/api/rails/template` |
| `@p2payto/peach` | `/rails/peach` | `/api/rails/peach` |

## Adding a new rail

1. Copy `rails/template` to `rails/<name>`
2. Rename the package in `package.json` to `@p2payto/<name>`
3. Update `module.js` defaults (`routeBase`, `configKey`)
4. Add `"@p2payto/<name>": "workspace:*"` to the app's `package.json`
5. Add `'@p2payto/<name>'` to the app's `nuxt.config.js` modules array
6. Run `pnpm install`
