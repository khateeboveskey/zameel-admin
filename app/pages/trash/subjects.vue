<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'المواد المحذوفة' });

// ——— Refs & State ———
const table = useTemplateRef('table');
const toast = useToast();

// Search
const searchTerm = ref('');

// ——— Fetch Trashed Subjects ———
const {
  data: subjectsResult,
  pending: loading,
  refresh,
} = await useCachedFetch<IPaginatedFetchResponse<ISubject>>(
  '/subjects/search',
  {
    method: 'POST',
    params: {
      only_trashed: true,
    },
    key: 'trashed-subjects',
  }
);

// ——— Restore Operation ———
const restorePending = ref<{ [key: number]: boolean }>({});
const restoreSubject = async (id: number) => {
  if (!id) return;
  restorePending.value[id] = true;
  const { error } = await useCachedFetch<ISubject>(`/subjects/${id}/restore`, {
    method: 'POST',
  });
  if (error.value) {
    toast.add({
      title: 'خطأ عند الاستعادة',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    });
  } else {
    toast.add({
      title: 'تمت الاستعادة',
      description: `تمت استعادة المقرر.`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
    refresh();
  }
  restorePending.value[id] = false;
};

// ——— Client-side Filtered Data ———
const filteredSubjects = computed(() => {
  if (!searchTerm.value) return subjectsResult.value?.data || [];
  return (subjectsResult.value?.data || []).filter(subject =>
    subject.name?.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const columns: TableColumn<ISubject>[] = [
  {
    accessorKey: 'id',
    header: 'المعرف',
    cell: ({ row }) => row.getValue('id'),
  },
  {
    accessorKey: 'name',
    header: 'اسم المقرر',
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'code',
    header: 'رمز المقرر',
    cell: ({ row }) => row.getValue('code'),
  },
  {
    accessorKey: 'hours',
    header: 'عدد الساعات',
    cell: ({ row }) => row.getValue('hours'),
  },
  {
    accessorKey: 'created_at',
    header: 'تاريخ الإنشاء',
    cell: ({ row }) => toArabicDate(row.getValue('created_at')),
  },
  {
    accessorKey: 'updated_at',
    header: 'آخر تعديل',
    cell: ({ row }) => toArabicDate(row.getValue('updated_at')),
  },
  {
    accessorKey: 'actions',
    header: 'الإجراءات',
    cell: () => null,
  },
];
</script>

<template>
  <div class="space-y-4 pb-4">
    <!-- 📌 Search & Controls -->
    <div class="flex gap-4 items-center">
      <UInput
        v-model="searchTerm"
        placeholder="بحث باسم المقرر"
        icon="i-lucide-search"
        class="w-full"
        clearable />
      <UButton
        icon="i-lucide-rotate-ccw"
        color="neutral"
        class="text-nowrap"
        variant="outline"
        @click="searchTerm = ''">
        إعادة تعيين الفلاتر
      </UButton>
    </div>

    <!-- 🗃️ Data Table -->
    <UTable
      ref="table"
      empty="لا يوجد بيانات"
      :loading="loading"
      :columns="columns as any"
      :data="filteredSubjects"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e text-right',
      }">
      <template #actions-cell="{ row }">
        <UButton
          label="استعادة"
          icon="i-lucide-rotate-ccw"
          color="primary"
          variant="outline"
          :loading="restorePending[row.original.id] === true"
          @click="restoreSubject(row.original.id)" />
      </template>
    </UTable>
  </div>
</template>
