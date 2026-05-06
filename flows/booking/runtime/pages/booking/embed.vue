<script setup>
const route = useRoute()

const customMode = computed(() => {
  const raw = Array.isArray(route.query.customMode) ? route.query.customMode[0] : route.query.customMode
  if (raw === 'dark') return 'dark'
  if (raw === 'light') return 'light'
  return undefined
})

const customPrimary = computed(() => {
  const raw = Array.isArray(route.query.customPrimary) ? route.query.customPrimary[0] : route.query.customPrimary
  return normalizeThemeColor(raw, undefined)
})

const customBackground = computed(() => {
  const raw = Array.isArray(route.query.customBackground) ? route.query.customBackground[0] : route.query.customBackground
  return normalizeThemeColor(raw, undefined)
})

const pageBackground = computed(() => {
  if (customBackground.value) return customBackground.value
  if (customMode.value === 'light') return '#ffffff'
  if (customMode.value === 'dark') return '#0f172a'
  return undefined
})
</script>

<template>
  <div :style="{ minHeight: '100vh', backgroundColor: pageBackground }">
    <BookingFlowView :custom-mode="customMode" :custom-primary="customPrimary" :custom-background="customBackground" />
  </div>
</template>
