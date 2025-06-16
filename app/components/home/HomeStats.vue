<script setup lang="ts">
import { useCachedFetch } from '~/composables/useCachedFetch';

const { data: users } = await useCachedFetch('/users');
const { data: colleges } = await useCachedFetch('/colleges');
const { data: majors } = await useCachedFetch('/majors');
const { data: groups } = await useCachedFetch('/groups');
const { data: subjects } = await useCachedFetch('/subjects');

const stats = [
  {
    title: 'المستخدمين',
    icon: 'i-lucide-users',
    value: users.value?.meta?.total ?? users.value?.data?.length,
    to: '/users',
  },
  {
    title: 'الكليات',
    icon: 'i-lucide-university',
    value: colleges.value?.meta?.total ?? colleges.value?.data?.length,
    to: '/colleges',
  },
  {
    title: 'التخصصات',
    icon: 'i-lucide-square-library',
    value: majors.value?.meta?.total ?? majors.value?.data?.length,
    to: '/majors',
  },
  {
    title: 'المجموعات',
    icon: 'i-lucide-graduation-cap',
    value: groups.value?.meta?.total ?? groups.value?.data?.length,
    to: '/groups',
  },
  {
    title: 'المواد',
    icon: 'i-lucide-book-open',
    value: subjects.value?.meta?.total ?? subjects.value?.data?.length,
    to: '/subjects',
  },
];

definePageMeta({
  title: 'الرئيسية',
});
</script>

<template>
  <div dir="rtl">
    <UPageGrid class="lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-px">
      <UPageCard
        v-for="(stat, index) in stats"
        :key="index"
        :icon="stat.icon"
        :title="stat.title"
        :to="stat.to"
        variant="subtle"
        :ui="{
          container: 'gap-y-1.5',
          wrapper: 'items-start',
          leading:
            'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
          title: 'font-normal text-muted text-xs uppercase',
        }"
        class="lg:rounded-none first:rounded-r-lg last:rounded-l-lg hover:z-1 text-right">
        <div class="flex items-center gap-2">
          <span class="text-2xl font-semibold text-highlighted">
            {{ stat.value }}
          </span>
        </div>
      </UPageCard>
    </UPageGrid>
  </div>
</template>
