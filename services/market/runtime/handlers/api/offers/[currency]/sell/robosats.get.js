import { defineEventHandler, getRouterParam } from 'h3'
import { fetchRoboSatsSell } from '../../../../../utils/fetchRobosats.js'

export default defineEventHandler(async (event) => {
  const currency = getRouterParam(event, 'currency')
  return fetchRoboSatsSell(currency)
})
