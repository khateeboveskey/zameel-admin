<script setup lang="ts">
import { ar } from '@nuxt/ui-pro/locale'
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="var(--color-indigo-500)" />
    <UApp :locale="ar">
      <NuxtPage />
    </UApp>
  </NuxtLayout>
</template>
