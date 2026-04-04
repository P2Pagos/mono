import { defineEventHandler, getRouterParam } from 'h3'
import { fetchRoboSatsBuy } from '../../../../../utils/fetchRobosats.js'

export default defineEventHandler(async (event) => {
  const currency = getRouterParam(event, 'currency')
  return fetchRoboSatsBuy(currency)
})
