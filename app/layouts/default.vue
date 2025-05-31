<template>
  <UDashboardGroup>
    <UDashboardSidebar
      :max-size="5"
      side="right"
      collapsible
      resizable
      :ui="{ footer: 'border-t border-default', header: 'h-28 pt-5 flex items-center justify-center', root: 'w-72 border border-default rounded-e-xl' }"
    >
      <template #header="{ collapsed }">
        <IconLogo
          v-if="!collapsed"
          class="text-9xl"
        />
        <!-- <UDashboardSidebarCollapse variant="subtle" class="rotate-180" size="sm" /> -->
      </template>

      <template #default="{ collapsed }">
        <UButton
          :label="collapsed ? undefined : 'بحث...'"
          icon="i-lucide-search"
          color="neutral"
          variant="outline"
          block
          :square="collapsed"
        >
          <template
            v-if="!collapsed"
            #trailing
          >
            <div class="flex items-center gap-0.5 ms-auto">
              <UKbd
                value="meta"
                variant="subtle"
              />
              <UKbd
                value="K"
                variant="subtle"
              />
            </div>
          </template>
        </UButton>

        <UNavigationMenu
          :external-icon="false"
          :collapsed="collapsed"
          :items="items[0]"
          orientation="vertical"
        />
        <UNavigationMenu
          :collapsed="collapsed"
          :items="items[1]"
          orientation="vertical"
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UUser
          :name="auth.user.name"
          :description="auth.user.email"
          :avatar="{
            src: 'https://i.pravatar.cc/150?u=john-doe',
            icon: 'i-lucide-image'
          }"
          :ui="{
            wrapper: 'mt-2',
            avatar: 'me-1',
            name: 'leading-4!'
          }"
        />
      </template>
    </UDashboardSidebar>
    <UDashboardPanel class="p-10 overflow-y-auto">
      <UPageHeader
        :title="$route.meta.title"
        :description="$route.meta.description"
        class="mb-8"
      />
      <slot />
    </UDashboardPanel>
  </UDashboardGroup>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const auth = useUserStore();

const items: NavigationMenuItem[][] = [
  [
    {
      label: 'الرئيسية',
      icon: 'i-lucide-house',
      to: '/',
      class: 'mb-4'
    },
    {
      label: 'المستخدمون',
      to: '/users',
      icon: 'i-lucide-users',
    },
    {
      label: 'الكليات',
      to: '/colleges',
      icon: 'i-lucide-university',
    },
    {
      label: 'التخصصات',
      to: '/majors',
      icon: 'i-lucide-square-library',
    },
    {
      label: 'الأكاديميين',
      to: '/academics',
      icon: 'i-lucide-book-user',
    },
    {
      label: 'المواد',
      to: '/subjects',
      icon: 'i-lucide-book-open',
    },
    {
      label: 'المجموعات',
      to: '/groups',
      icon: 'i-lucide-graduation-cap',
    },
    {
      label: 'سلة المحذوفات',
      to: '/trash',
      icon: 'i-lucide-trash',
      class: 'mt-4',
    },
    {
      label: 'الإعدادات',
      to: '/settings',
      icon: 'i-lucide-settings',
      defaultOpen: true,
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