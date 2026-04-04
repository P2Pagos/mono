# @p2pay/peach

Dual-mode module for the [Peach](https://peachbitcoin.com) P2P Bitcoin rail. Handles offer creation, trade requests, contract management, and payment confirmation using BIP32 key derivation and PGP signing.

## API routes

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/rails/peach/me` | Fetch the authenticated Peach account |
| `POST` | `/api/rails/peach/offer` | Create a sell offer |
| `GET` | `/api/rails/peach/trade-requests` | List incoming trade requests |
| `POST` | `/api/rails/peach/trade-request/accept` | Accept a trade request |
| `GET` | `/api/rails/peach/contract` | Get the active contract |
| `POST` | `/api/rails/peach/contract/confirm-payment` | Confirm payment received |

## Environment variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PEACH_BASE_URL` | no | `https://api.peachbitcoin.com` | Peach API base URL |
| `PEACH_BITCOIN_MNEMONIC` | yes | — | BIP39 mnemonic for wallet key derivation |
| `PEACH_PGP_PRIVATE_KEY` | yes | — | Armored PGP private key |
| `PEACH_PGP_PUBLIC_KEY` | yes | — | Armored PGP public key |
| `PEACH_PGP_PASSPHRASE` | yes | — | PGP key passphrase |
| `PEACH_REFERRAL_CODE` | no | — | Peach referral code |
| `PEACH_FEE_RATE` | no | `hourFee` | Bitcoin fee rate strategy |
| `PEACH_MAX_PREMIUM` | no | `0` | Maximum accepted offer premium |

## Module mode (Nuxt app)

```json
// package.json
"dependencies": {
  "@p2pay/peach": "workspace:*"
}
```

```js
// nuxt.config.js
export default defineNuxtConfig({
  modules: ['@p2pay/peach'],
  p2payPeachRail: {
    enabled: true
  }
})
```

Env vars are picked up automatically as `NUXT_PEACH_*` by Nuxt's runtimeConfig resolution.

## Standalone mode (Nitro)

```bash
cp .env.example .env
pnpm dev
pnpm build
pnpm start
```
