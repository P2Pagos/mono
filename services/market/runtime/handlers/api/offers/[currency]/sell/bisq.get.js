import { defineEventHandler, getRouterParam } from 'h3'
import { fetchBisqSell } from '../../../../../utils/fetchBisq.js'

export default defineEventHandler(async (event) => {
  const currency = getRouterParam(event, 'currency')
  return fetchBisqSell(currency)
})
