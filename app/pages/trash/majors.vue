<script setup lang="ts">
import { ref, computed } from 'vue';
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'التخصصات المحذوفة' });

// ——— Refs & State ———
const table = useTemplateRef('table');
const toast = useToast();
const degreeStore = useDegreeStore();

// Search
const searchTerm = ref('');

// ——— Fetch Trashed Majors ———
const {
  data: majorsResult,
  pending: loading,
  refresh,
} = await useCachedFetch<IPaginatedFetchResponse<IMajor>>('/majors/search', {
  method: 'POST',
  params: {
    only_trashed: true,
  },
  key: 'trashed-majors',
});

const { data: colleges } =
  await useCachedFetch<IPaginatedFetchResponse<ICollege>>('/colleges');

// ——— Restore Operation ———
const restorePending = ref<{ [key: number]: boolean }>({});
const restoreMajor = async (id: number) => {
  if (!id) return;
  restorePending.value[id] = true;
  const { error } = await useCachedFetch<IMajor>(`/majors/${id}/restore`, {
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
      description: `تمت استعادة التخصص.`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
    refresh();
  }
  restorePending.value[id] = false;
};

// ——— Client-side Filtered Data ———
const filteredMajors = computed(() => {
  if (!searchTerm.value) return majorsResult.value?.data || [];
  return (majorsResult.value?.data || []).filter(major =>
    major.name?.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const columns: TableColumn<IMajor>[] = [
  {
    accessorKey: 'id',
    header: 'المعرف',
    cell: ({ row }) => row.getValue('id'),
  },
  {
    accessorKey: 'name',
    header: 'اسم التخصص',
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'college_id',
    header: 'الكلية',
    cell: ({ row }) =>
      colleges.value?.data.find(
        college => college.id === row.getValue('college_id')
      )?.name,
  },
  {
    accessorKey: 'degree_id',
    header: 'الدرجة',
    cell: ({ row }) =>
      degreeStore.getDegree(row.getValue('degree_id') as number)?.name,
  },
  {
    accessorKey: 'years',
    header: 'عدد السنوات',
    cell: ({ row }) => row.getValue('years'),
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
        placeholder="بحث باسم التخصص"
        icon="i-lucide-search"
        class="w-full"
        clearable />
      <UButton
        icon="i-lucide-rotate-ccw"
        color="neutral"
        class="text-nowrap"
        variant="outline"
        @click="searchTerm = ''">
        تحديث
      </UButton>
    </div>
    <!-- 🗃️ Data Table -->
    <UTable
      ref="table"
      empty="لا يوجد بيانات"
      :loading="loading"
      :columns="columns as any"
      :data="filteredMajors"
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
          @click="restoreMajor(row.original.id)" />
      </template>
    </UTable>
  </div>
</template>
