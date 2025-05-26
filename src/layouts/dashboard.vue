<template>
  <UDashboardGroup>
    <UDashboardSidebar :max-size="5" side="right" collapsible resizable :ui="{ footer: 'border-t border-default', header: 'h-28 pt-5 flex items-center justify-center', root: 'w-60' }">
      <template #header="{ collapsed }">
        <IconLogo v-if="!collapsed" class="text-9xl" />
        <!-- <UDashboardSidebarCollapse variant="subtle" class="rotate-180" size="sm" /> -->
      </template>

      <template #default="{ collapsed }">
        <UButton :label="collapsed ? undefined : 'بحث...'" icon="i-lucide-search" color="neutral" variant="outline" block :square="collapsed">
          <template v-if="!collapsed" #trailing>
            <div class="flex items-center gap-0.5 ms-auto">
              <UKbd value="meta" variant="subtle" />
              <UKbd value="K" variant="subtle" />
            </div>
          </template>
        </UButton>

        <UNavigationMenu :external-icon="false" :collapsed="collapsed" :items="items[0]" orientation="vertical" />
        <UNavigationMenu :collapsed="collapsed" :items="items[1]" orientation="vertical" class="mt-auto" />
      </template>

      <template #footer="{ collapsed }">
        <UButton :avatar="{
          class: 'me-2',
          src: 'https://github.com/khateeboveskey.png'
        }" :label="collapsed ? undefined : 'عبدالرحمن الخطيب'" color="neutral" variant="ghost" class="w-full" :block="collapsed" />
      </template>
    </UDashboardSidebar>
    <slot />
  </UDashboardGroup>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'الرئيسية',
      icon: 'i-lucide-house',
      active: true,
      class: 'mb-4'
    },
    {
      label: 'المستخدمين',
      icon: 'i-lucide-users',
    },
    {
      label: 'الكليات',
      icon: 'i-lucide-university',
    },
    {
      label: 'التخصصات',
      icon: 'i-lucide-square-library',
    },
    {
      label: 'الأكاديميين',
      icon: 'i-lucide-book-user',
    },
    {
      label: 'المواد',
      icon: 'i-lucide-book-open',
    },
    {
      label: 'المجموعات',
      icon: 'i-lucide-graduation-cap',
    },
    {
      label: 'الإعدادات',
      icon: 'i-lucide-settings',
      defaultOpen: true,
      class: 'mt-4',
      children: [
        { label: 'عام' },
        { label: 'الأعضاء' },
        { label: 'الإشعارات' },
      ],
    },
  ],
  [
    {
      label: 'عن الفريق',
      icon: 'i-lucide-message-circle',
      to: 'https://github.com/nuxt-ui-pro/dashboard',
      target: '_blank',
      ui: {
        linkLabelExternalIcon: '-rotate-90 ms-2'
      }
    },
    {
      label: 'المساعدة والدعم',
      icon: 'i-lucide-info',
      to: 'https://github.com/nuxt/ui-pro',
      target: '_blank',
      ui: {
        linkLabelExternalIcon: '-rotate-90 ms-2'
      }
    },
  ],
];
</script>