import { defineEventHandler, getRouterParam } from 'h3'
import { fetchBisqBuy } from '../../../../../utils/fetchBisq.js'

export default defineEventHandler(async (event) => {
  const currency = getRouterParam(event, 'currency')
  return fetchBisqBuy(currency)
})
