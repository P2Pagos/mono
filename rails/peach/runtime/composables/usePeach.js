export const usePeach = () => {
  const getMe = () =>
    $fetch('/api/rails/peach/me')

  const postOffer = (currency, method, amount) =>
    $fetch('/api/rails/peach/offer', {
      method: 'POST',
      body: { currency, method, amount },
    })

  // Returns trade requests (potential sellers) for a given offerId
  const getTradeRequests = (offerId) =>
    $fetch('/api/rails/peach/trade-requests', { query: { offerId } })

  // Accepts a seller's trade request and shares encrypted fiat payment details
  // sellerPgpPublicKey comes from the trade request object
  const acceptTradeRequest = (offerId, sellerPgpPublicKey) =>
    $fetch('/api/rails/peach/trade-request/accept', {
      method: 'POST',
      body: { offerId, sellerPgpPublicKey },
    })

  // Poll this to check escrow funding status and contract progress
  const getContract = (contractId) =>
    $fetch('/api/rails/peach/contract', { query: { contractId } })

  // Call once fiat has been sent to the seller
  const confirmPayment = (contractId) =>
    $fetch('/api/rails/peach/contract/confirm-payment', {
      method: 'POST',
      body: { contractId },
    })

  return { getMe, postOffer, getTradeRequests, acceptTradeRequest, getContract, confirmPayment }
}
