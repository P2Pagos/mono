<template>
  <main style="padding: 24px; font-family: ui-sans-serif, system-ui;">
    <h1>@p2pay/mono injected page</h1>
    <p>API says: <strong>{{ data?.message }}</strong></p>
    <p><small>Source: <code>/api/mono</code></small></p>
  </main>
</template>

<script setup>
const { data } = await useFetch('/api/mono')
</script>
