import { defineNuxtModule, addServerHandler, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@p2pay/mono',
    configKey: 'p2payMono'
  },
  defaults: {
    enabled: true,
    routeBase: '/mono'
  },
  setup (options, nuxt) {
    if (options.enabled === false) return

    const resolver = createResolver(import.meta.url)

    // 1) Inject a page at /mono
    nuxt.hook('pages:extend', (pages) => {
      pages.push({
        name: 'p2pay-mono',
        path: options.routeBase,
        file: resolver.resolve('./runtime/pages/mono.vue')
      })
    })

    // 2) Add an API endpoint at /api/mono
    addServerHandler({
      route: '/api/mono',
      handler: resolver.resolve('./runtime/server/api/mono.get.js')
    })
  }
})
