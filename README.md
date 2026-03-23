# p2pay/mono

Monorepo pnpm workspace for the **p2pay** open-source multi-rail payment software.

W
Each workspace package is a self-contained Nuxt 4 module. The root app (`apps/mono`) assembles them by simply listing the packages in `nuxt.config.js` — no glue code required.

## Workspace layout

```
mono/
├── apps/          standalone Nuxt applications
├── packages/      core shared modules
├── rails/         payment rail modules
├── flows/         business flow modules
└── utils/         shared utilities
```
=======
- `apps/mono` — standalone Nuxt app that **uses** the mono module and a template rail.
- `packages/mono` — Nuxt module: exposes an API endpoint and injects a page.
- `rails/template` — Nuxt module (rail template): exposes an API endpoint and injects a page.
- `rails/peach` — Nuxt module (Peach rail): exposes an API endpoint and injects a page.
- `flows/booking` - Nuxt module with the booking view on calendar.

## Quick start

```bash
npx pnpm install
cd apps/mono && npx nuxi dev
```

## Apps

| Package | Description |
|---------|-------------|
| `@p2payto/mono-app` (`apps/mono`) | Root Nuxt 4 app — assembles all modules, rails and flows |

## Packages

| Package | Route | Description |
|---------|-------|-------------|
| `@p2payto/mono` (`packages/mono`) | `/mono` | Core module, injects base page and `/api/mono` endpoint |

## Rails

Rails are pluggable payment-rail modules. Each one injects a page and a server API handler into the host Nuxt app.

| Package | Page | API | Description |
|---------|------|-----|-------------|
| `@p2payto/template` (`rails/template`) | `/rails/template` | `/api/rails/template` | Reference rail — copy this to scaffold a new rail |
| `@p2payto/peach` (`rails/peach`) | `/rails/peach` | `/api/rails/peach` | [Peach](https://peachbitcoin.com) P2P Bitcoin rail |

## Flows

Flows are higher-level business-logic modules. They can include pages, components, composables, and server handlers.

| Package | Page | Description |
|---------|------|-------------|
| `@p2payto/booking` (`flows/booking`) | `/flows/booking`, `/flows/booking/embed` | Booking/scheduling UI with calendar, time slots, extras, and embeddable iframe variant |
| `@p2payto/robosats` (`flows/robosats`) | `/flows/robosats` | [RoboSats](https://robosats.com) P2P Bitcoin flow — client-side identity generation (token, PGP, Nostr) + server-side Tor proxy to the coordinator onion |

## Module anatomy

Every rail and flow follows the same pattern:

```
<type>/<name>/
├── package.json        name: @p2payto/<name>
├── module.js           defineNuxtModule — wires pages, handlers, composables
└── runtime/
    ├── pages/          injected via pages:extend hook
    ├── components/     injected via addComponentsDir (flows only)
    ├── composables/    injected via addImportsDir
    └── handlers/       registered via addServerHandler (rails + some flows)
```

The host app needs only two changes to add a module:

1. `package.json` — add `"@p2payto/<name>": "workspace:*"` to `dependencies`
2. `nuxt.config.js` — add `'@p2payto/<name>'` to the `modules` array

## Environment variables

| Variable | Default | Used by |
|----------|---------|---------|
| `NUXT_TOR_SOCKS_URL` | `socks5h://127.0.0.1:9050` | `@p2payto/robosats` |
| `NUXT_ROBOSATS_COORDINATOR_URL` | RoboSats onion address | `@p2payto/robosats` |

## License

MIT — [p2pay.to](https://p2pay.to)
