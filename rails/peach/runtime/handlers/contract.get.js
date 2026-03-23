import { getAccessToken } from '../lib/peachAuth.js'
import { peachFetch } from '../lib/peachRequest.js'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { contractId } = getQuery(event)
  const token = await getAccessToken(config)
  return peachFetch(`/v1/contract/${contractId}`, { baseUrl: config.peachBaseUrl, token })
})
