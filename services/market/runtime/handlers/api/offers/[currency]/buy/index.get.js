import { defineEventHandler, getRouterParam, setResponseStatus } from 'h3'
import sortBy from 'lodash.sortby'
import { getCurrencies } from '../../../../../utils/getCurrencies.js'
import { fetchBisqBuy } from '../../../../../utils/fetchBisq.js'
import { fetchRoboSatsBuy } from '../../../../../utils/fetchRobosats.js'
import { fetchPeachBuy } from '../../../../../utils/fetchPeach.js'

export default defineEventHandler(async (event) => {
  try {
    const currency = getRouterParam(event, 'currency')

    if (!Object.keys(getCurrencies()).includes(currency)) {
      setResponseStatus(event, 404)
      return { error: { statusCode: 404 } }
    }

    const [bisq, roboSats, peach] = await Promise.all([
      fetchBisqBuy(currency),
      fetchRoboSatsBuy(currency),
      fetchPeachBuy(currency)
    ])

    const data = sortBy([...bisq.data, ...roboSats.data, ...peach.data], 'price').reverse()
    const errors = [bisq.error, roboSats.error, peach.error].filter(e => e !== undefined)

    return { data, errors }
  } catch (error) {
    console.log('buy offers api error', error)
    setResponseStatus(event, 500)
    return { error: true, data: false }
  }
})
