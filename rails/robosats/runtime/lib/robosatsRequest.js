export const robosatsRequest = async ({ authorization, method = 'GET', path, body, query }) => {
  const { robosatsCoordinatorUrl, torProxySecret, torProxyPrefix } = useRuntimeConfig()
  const prefix = (torProxyPrefix || '/api/tor').replace(/\/+$/, '')
  const cleanPath = String(path).replace(/^\//, '')

  const headers = {
    'x-tor-proxy-secret': torProxySecret,
    'x-tor-target': robosatsCoordinatorUrl,
    ...(authorization ? { authorization } : {})
  }

  try {
    return await $fetch(`${prefix}/${cleanPath}`, {
      method,
      headers,
      query,
      body: method !== 'GET' && method !== 'HEAD' ? body : undefined
    })
  } catch (error) {
    throw createError({
      statusCode: error.statusCode ?? 502,
      statusMessage: 'RoboSats API error',
      data: error.data ?? error.message
    })
  }
}
