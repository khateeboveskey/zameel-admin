<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';

defineProps<{
  collapsed?: boolean;
}>();

const auth = useUserStore();
const colorMode = useColorMode();
const appConfig = useAppConfig();

const colors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];
const neutrals = ['slate', 'gray', 'zinc', 'neutral', 'stone'];

const user = ref({
  name: auth.user.name,
  avatar: {
    src: '',
    alt: auth.user.name,
  },
});

// Add "system" mode to color scheme options
const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      type: 'label',
      label: user.value.name,
      avatar: user.value.avatar,
    },
  ],
  [
    {
      label: 'الملف الشخصي',
      icon: 'i-lucide-user',
    },
    {
      label: 'الفواتير',
      icon: 'i-lucide-credit-card',
    },
    {
      label: 'الإعدادات',
      icon: 'i-lucide-settings',
      to: '/settings',
    },
  ],
  [
    {
      label: 'المظهر',
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: 'النظام',
          icon: 'i-lucide-monitor',
          type: 'checkbox',
          checked: colorMode.preference === 'system',
          onSelect(e: Event) {
            e.preventDefault();
            colorMode.preference = 'system';
          },
        },
        {
          label: 'فاتح',
          icon: 'i-lucide-sun',
          type: 'checkbox',
          checked: colorMode.preference === 'light',
          onSelect(e: Event) {
            e.preventDefault();
            colorMode.preference = 'light';
          },
        },
        {
          label: 'داكن',
          icon: 'i-lucide-moon',
          type: 'checkbox',
          checked: colorMode.preference === 'dark',
          onSelect(e: Event) {
            e.preventDefault();
            colorMode.preference = 'dark';
          },
        },
      ],
    },
  ],
  [
    {
      label: 'توثيق المشروع',
      icon: 'i-lucide-book-open',
      to: 'https://docs.google.com/document/d/1CXUoyNxmHZbYlneT5tszjqJDlY3c-qIIgadkDsRyFe4/edit?usp=drive_link',
      target: '_blank',
    },
    {
      label: 'توثيق الـ API',
      icon: 'i-lucide-book-open',
      to: 'https://api-docs.zameel.app/',
      target: '_blank',
    },
    {
      label: 'مستودع المشرف',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/khateeboveskey/zameel-admin',
      target: '_blank',
    },
    {
      label: 'مستودع الـ API',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/Mahmood-Ahmed-Alqirshy/zameel-rest-api',
      target: '_blank',
    },
    {
      label: 'واجهات التطبيق',
      icon: 'i-simple-icons-figma',
      to: 'https://www.figma.com/design/85fcDKQqLBgeowUTrlJOJI/UI?node-id=0-1&t=SqozInCiQRFSWOuy-1',
      target: '_blank',
    },
  ],
  [
    {
      label: 'تسجيل الخروج',
      icon: 'i-lucide-log-out',
      color: 'error',
      onSelect: () => {
        useAuth().logout();
      },
    },
  ],
]);
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{
      content: collapsed ? 'w-48' : 'w-(--reka-dropdown-menu-trigger-width)',
      itemTrailingIcon: 'rotate-180',
    }"
    checked-icon="i-lucide-check">
    <UButton
      v-bind="{
        ...user,
        label: collapsed ? undefined : user?.name,
        trailingIcon: collapsed ? undefined : 'i-lucide-chevrons-up-down',
      }"
      color="neutral"
      variant="ghost"
      block
      :square="collapsed"
      class="data-[state=open]:bg-elevated"
      :ui="{
        trailingIcon: 'text-dimmed',
      }" />

    <template #chip-leading="{ item }">
      <span
        :style="{
          '--chip-light': `var(--color-${(item as any).chip}-500)`,
          '--chip-dark': `var(--color-${(item as any).chip}-400)`,
        }"
        class="ms-0.5 size-2 rounded-full bg-(--chip-light) dark:bg-(--chip-dark)" />
    </template>
  </UDropdownMenu>
</template>

<style>
[aria-checked='true']:not(button) [class*='check'] {
  transform: rotate(180deg);
}
</style>
