<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const links = [
  [
    {
      label: 'الكليات',
      to: '/trash/colleges',
      icon: 'i-lucide-university',
    },
    {
      label: 'التخصصات',
      to: '/trash/majors',
      icon: 'i-lucide-square-library',
    },
    {
      label: 'الأكاديميين',
      to: '/trash/academics',
      icon: 'i-lucide-book-user',
    },
    {
      label: 'المواد',
      to: '/trash/subjects',
      icon: 'i-lucide-book-open',
    },
  ],
] satisfies NavigationMenuItem[][]
</script>

<template>
  <UDashboardPanel id="settings" :ui="{ body: 'lg:py-12' }">
    <template #header>
      <UPageHeader
        :title="'سلة المحذوفات'"
        :description="'يمكنك استعادة الملفات التي تم حذفها من هنا'"
        class="border-b-0"
        :ui="{
          title: 'mb-4',
        }"
      />
      <UDashboardToolbar>
        <!-- NOTE: The `-mx-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
        <UNavigationMenu :items="links" highlight class="flex-1" />
      </UDashboardToolbar>
    </template>

    <template #body>
      <NuxtPage />
    </template>
  </UDashboardPanel>
</template>
