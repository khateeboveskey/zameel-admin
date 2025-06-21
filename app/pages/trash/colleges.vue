<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'الكليات المحذوفة' });

// ——— Refs & State ———
const table = useTemplateRef('table');
const toast = useToast();

// Search
const searchTerm = ref('');
const restorePending = reactive<{ [key: number]: boolean }>({});

// ——— Fetch Colleges (Search Endpoint Only) ———
const {
  data: collegesResult,
  pending: loading,
  refresh,
} = await useCachedFetch<IPaginatedFetchResponse<ICollege>>(
  '/colleges/search',
  {
    method: 'POST',
    params: {
      only_trashed: true,
    },
    key: 'trashed',
  }
);

// ——— Client-side Filtered Data ———
const filteredColleges = computed(() => {
  if (!collegesResult.value?.data) return [];
  if (!searchTerm.value) return collegesResult.value.data;
  return collegesResult.value.data.filter(college =>
    college.name?.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// ——— Restore Operation ———
const restoreCollege = async (id: number) => {
  if (!id) return;

  restorePending[id] = true;

  const { error } = await useCachedFetch<ICollege>(`/colleges/${id}/restore`, {
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
      description: `تمت استعادة الكلية.`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
    refresh();
  }
  restorePending[id] = false;
};

const columns: TableColumn<ICollege>[] = [
  {
    accessorKey: 'id',
    header: 'المعرف',
    cell: ({ row }) => row.getValue('id'),
  },
  {
    accessorKey: 'name',
    header: 'اسم الكلية',
    cell: ({ row }) => row.getValue('name'),
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
        placeholder="بحث باسم الكلية"
        icon="i-lucide-search"
        class="w-full"
        clearable>
        <template v-if="searchTerm.length > 0" #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            icon="i-lucide-circle-x"
            aria-label="Clear input"
            @click="searchTerm = ''" />
        </template>
      </UInput>

      <UButton
        icon="i-lucide-rotate-ccw"
        color="neutral"
        class="text-nowrap"
        variant="outline"
        @click="
          () => {
            searchTerm = '';
            refresh();
          }
        ">
        تحديث
      </UButton>
    </div>

    <!-- 🗃️ Data Table -->
    <UTable
      ref="table"
      empty="لا يوجد بيانات"
      :sticky="true"
      :loading="loading"
      :columns="columns as any"
      :data="filteredColleges"
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
          @click="restoreCollege(row.original.id)" />
      </template>
    </UTable>
  </div>
</template>
