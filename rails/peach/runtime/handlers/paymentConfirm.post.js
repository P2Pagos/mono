import { getAccessToken } from '../lib/peachAuth.js'
import { peachFetch } from '../lib/peachRequest.js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { contractId } = await readBody(event)
  const token = await getAccessToken(config)
  // Buyer (merchant) signals that fiat payment has been sent.
  // Seller will then confirm receipt and release BTC to the releaseAddress.
  return peachFetch(`/v1/contract/${contractId}/payment/confirm`, {
    baseUrl: config.peachBaseUrl,
    token,
    method: 'POST',
    body: {},
  })
})
