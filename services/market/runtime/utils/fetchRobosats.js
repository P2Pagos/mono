import groupBy from 'lodash.groupby'
import minBy from 'lodash.minby'
import got from 'got'
import { SocksProxyAgent } from 'socks-proxy-agent'
import { capitalize } from './capitalize.js'
import { getCurrencies } from './getCurrencies.js'

const ROBOSATS_ONION = 'http://otmoonrndnrddqdlhu6b36heunmbyw3cgvadqo2oqeau3656wfv7fwad.onion'
const SOCKS_URL = 'socks5h://127.0.0.1:9050'

const FILTER_WORDS = new Set(['&', 'Friends', 'Family', 'Monero', 'USDT', 'L-USDt', 'IT', 'it', 'It'])

const fetchRoboSatsBook = async (currency, type) => {
  const currencyIndex = getCurrencies()[currency]
  const url = `${ROBOSATS_ONION}/api/book/?format=json&currency=${currencyIndex}&type=${type}`
  const agent = new SocksProxyAgent(SOCKS_URL)

  const res = await got(url, {
    agent: { http: agent, https: agent },
    timeout: { request: 20000 },
    retry: { limit: 0 },
    throwHttpErrors: false,
    headers: {
      accept: 'application/json',
      'user-agent': 'kyc-free-bitcoin-price/1.0'
    }
  })

  let json
  try {
    json = JSON.parse(res.body)
  } catch (e) {
    return null
  }

  if (json && typeof json === 'object' && !Array.isArray(json) && json.not_found) return []
  if (res.statusCode < 200 || res.statusCode >= 300) return null
  if (!Array.isArray(json)) return null

  return json
}

const parseRoboSatsOffers = (json) => {
  if (!json || json.length === 0) return { data: [] }

  const methods = groupBy(json, 'payment_method')

  const data = Object.keys(methods).reduce((arr, method) => {
    const offer = parseFloat(minBy(methods[method], 'price').price)
    const fee = offer * 0.175 / 100

    method.split(' ')
      .filter(m => !FILTER_WORDS.has(m))
      .forEach(normalizedMethod => {
        arr.push({
          service: 'RoboSats',
          url: 'https://unsafe.robosats.com/',
          features: ['lightning', 'p2p', 'open-source'],
          method: capitalize(normalizedMethod).replace('Instant', 'Sepa Instant'),
          price: parseFloat(offer + fee)
        })
      })

    return arr
  }, [])

  return { data }
}

export const fetchRoboSatsBuy = async (currency) => {
  try {
    const json = await fetchRoboSatsBook(currency, 2)
    if (json === null) return { data: [], error: 'robosats' }
    return parseRoboSatsOffers(json)
  } catch (error) {
    console.log('robosats buy api error', error?.message || error)
    return { data: [], error: 'robosats' }
  }
}

export const fetchRoboSatsSell = async (currency) => {
  try {
    const json = await fetchRoboSatsBook(currency, 1)
    if (json === null) return { data: [], error: 'robosats' }
    return parseRoboSatsOffers(json)
  } catch (error) {
    console.log('robosats sell api error', error?.message || error)
    return { data: [], error: 'robosats' }
  }
}
