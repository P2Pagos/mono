import { defineEventHandler, getRouterParam } from 'h3'
import { fetchPeachSell } from '../../../../../utils/fetchPeach.js'

export default defineEventHandler(async (event) => {
  const currency = getRouterParam(event, 'currency')
  return fetchPeachSell(currency)
})
