import { getAccessToken } from '../lib/peachAuth.js'
import { encryptMessage } from '../lib/pgpSigner.js'
import { peachFetch } from '../lib/peachRequest.js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  // offerId: the offer to accept a trade request on
  // sellerPgpPublicKey: taken from the trade request object returned by tradeRequests.get
  const { offerId, sellerPgpPublicKey } = await readBody(event)

  const token = await getAccessToken(config)

  // Merchant fiat payment details (e.g. IBAN, beneficiary) shared with the seller
  // so they know who is sending fiat. Stored as JSON in NUXT_PEACH_PAYMENT_DETAILS.
  const paymentDetails = JSON.parse(config.peachPaymentDetails || '{}')

  const encryptedPaymentData = await encryptMessage(
    JSON.stringify(paymentDetails),
    sellerPgpPublicKey,
    config.peachPgpPrivateKey,
    config.peachPgpPublicKey,
    config.peachPgpPassphrase
  )

  return peachFetch(`/v1/offer/${offerId}/tradeRequest/accept`, {
    baseUrl: config.peachBaseUrl,
    token,
    method: 'POST',
    body: { paymentData: encryptedPaymentData },
  })
})
