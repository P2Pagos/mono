import { ofetch } from 'ofetch'
import { capitalize } from './capitalize.js'

export const fetchPeachBuy = async (currency) => {
  try {
    const size = 50
    const { price: basePrice } = await ofetch(`https://api.peachbitcoin.com/v1/market/price/BTC${currency}`)
    const first = await ofetch(`https://api.peachbitcoin.com/v1/offer/search/buy?sortBy=lowestPremium&size=${size}&page=0`)
    const total = Number(first?.total ?? 0)

    if (!Number.isFinite(total) || total <= 0) return { data: [] }

    const lastPage = Math.floor((total - 1) / size)
    const last = await ofetch(`https://api.peachbitcoin.com/v1/offer/search/buy?sortBy=lowestPremium&size=${size}&page=${lastPage}`)
    const offers = Array.isArray(last?.offers) ? last.offers.slice().reverse() : []

    const data = []
    offers.forEach(offer => {
      if (offer?.meansOfPayment?.[currency]) {
        offer.meansOfPayment[currency].forEach(method => {
          data.push({
            service: 'Peach Bitcoin',
            url: 'https://peachbitcoin.com/referral?code=PR41CA',
            features: ['on-chain', 'p2p'],
            method: method.startsWith('cash.') ? 'Cash' : capitalize(method),
            price: basePrice * (offer.premium / 100 + 1) * 1.02
          })
        })
      }
    })

    return { data }
  } catch (error) {
    console.log('peachbitcoin buy api error', error)
    return { error: 'peach bitcoin', data: [] }
  }
}

export const fetchPeachSell = async (currency) => {
  try {
    const { price: basePrice } = await ofetch(`https://api.peachbitcoin.com/v1/market/price/BTC${currency}`)
    const { offers } = await ofetch(`https://api.peachbitcoin.com/v1/offer/search/sell?sortBy=lowestPremium&size=50`)

    const data = []
    offers.forEach(offer => {
      if (offer.meansOfPayment[currency]) {
        offer.meansOfPayment[currency].forEach(method => {
          data.push({
            service: 'Peach Bitcoin',
            url: 'https://peachbitcoin.com/referral?code=PR41CA',
            features: ['on-chain', 'p2p'],
            method: method.startsWith('cash.') ? 'Cash' : capitalize(method),
            price: basePrice * (offer.premium / 100 + 1) * 1.02
          })
        })
      }
    })

    return { data }
  } catch (error) {
    console.log('peachbitcoin sell api error', error)
    return { error: 'peach bitcoin', data: [] }
  }
}
