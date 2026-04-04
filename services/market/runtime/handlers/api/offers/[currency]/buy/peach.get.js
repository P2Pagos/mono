import { defineEventHandler, getRouterParam } from 'h3'
import { fetchPeachBuy } from '../../../../../utils/fetchPeach.js'

export default defineEventHandler(async (event) => {
  const currency = getRouterParam(event, 'currency')
  return fetchPeachBuy(currency)
})
