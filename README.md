# p2pay/mono skeleton (Nuxt dual-mode)

This workspace contains:

- `apps/mono` — standalone Nuxt app that **uses** the mono module and a template rail.
- `packages/mono` — Nuxt module: exposes an API endpoint and injects a page.
- `rails/p2pay-template` — Nuxt module (rail template): exposes an API endpoint and injects a page.
- Empty placeholders: `flows/`, `utils/`, `apps/`

## Quick start

```bash
pnpm install
pnpm dev
```

Open:
- `http://localhost:3000/` (standalone app)
- `http://localhost:3000/mono` (page injected by `@p2pay/mono`)
- `http://localhost:3000/rails/template` (page injected by `@p2pay/template`)

## Reference

[ChatGPT chat](https://chatgpt.com/share/699d9b1d-f820-8013-bffb-7d4e85bfc576)
