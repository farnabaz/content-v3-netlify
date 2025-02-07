<script setup lang="ts">
const route = useRoute()
const time = useState('time', () => [])

time.value.push(`${import.meta.client ? 'client' : 'server'} ${new Date().toISOString()}`)

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <div>
    <ContentRenderer
      v-if="page"
      :value="page"
    />
    <pre>{{ time }}</pre>
  </div>
</template>
