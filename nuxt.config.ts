// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
  ],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  content: {
    database: {
      type: 'sqlite',
      filename: '/tmp/database.sqlite',
    }
  },
  routeRules: {
    '/deps.json': {
      prerender: true
    }
    
  }
})
