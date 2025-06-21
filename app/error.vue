<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="var(--color-indigo-500)" />
    <UApp :locale="ar">
      <div class="h-screen flex items-center justify-center gap-5 flex-col">
        <h2 class="text-9xl font-black text-indigo-500">
          {{ error?.statusCode }}
        </h2>
        <ErrorLogo class="w-1/4 my-15" />
        <p class="text-left text-gray-500 -mt-5" dir="ltr">
          {{ error }}
        </p>
        <UButton icon="i-lucide-home" to="/"
          >العودة إلى الصفحة الرئيسية</UButton
        >
      </div>
    </UApp>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ar } from '@nuxt/ui-pro/locale';
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});

useHead({
  title: 'خطأ ' + props.error?.message,
});
</script>
