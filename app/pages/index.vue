<script setup lang="ts">
import { sub } from 'date-fns';
import type { Period, Range } from '~/types';

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>('يومي');

useHead({
  title: 'الرئيسية',
  meta: [
    {
      name: 'description',
      content: 'لوحة التحكم الرئيسية لعرض الإحصائيات والرسوم البيانية.',
    },
  ],
});

definePageMeta({
  title: 'الرئيسية',
});
</script>

<template>
  <UDashboardPanel class="mb-0" id="home">
    <template #header>
      <UDashboardToolbar class="-mt-4">
        <HomeDateRangePicker v-model="range" />
        <HomePeriodSelect v-model="period" :range="range" />
      </UDashboardToolbar>
    </template>

    <template #body>
      <HomeStats :period="period" :range="range" />
      <HomeChart :period="period" :range="range" />
    </template>
  </UDashboardPanel>
</template>
