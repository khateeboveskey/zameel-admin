<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { getPaginationRowModel } from '@tanstack/vue-table';
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'التخصصات المحذوفة' });

// ——— Refs & State ———
const table = useTemplateRef('table');
const currentPage = ref(1);
const toast = useToast();
const degreeStore = useDegreeStore();

// Search & Debounce
const searchTerm = ref('');
const debouncedSearchTerm = debouncedRef(searchTerm, 1000);
const restorePending = reactive<{ [key: number]: boolean }>({});

// ——— Fetch Trashed Majors ———
const {
  data: majorsResult,
  pending: loading,
  refresh,
} = await useCachedFetch<IPaginatedFetchResponse<IMajor>>('/majors/search', {
  method: 'POST',
  params: {
    only_trashed: true,
    page: computed(() => currentPage.value),
  },
  key: 'trashed-majors',
});

const { data: colleges } =
  await useCachedFetch<IPaginatedFetchResponse<ICollege>>('/colleges');

// ——— Pagination Setup ———
const pagination = reactive({
  pageIndex: 0,
  pageSize: computed(() => majorsResult.value?.meta?.per_page ?? 15),
});

// ——— Watchers ———
watch(debouncedSearchTerm, () => {
  currentPage.value = 1;
  pagination.pageIndex = 0;
  refresh();
});

watch(
  () => pagination.pageIndex,
  newIndex => {
    currentPage.value = newIndex + 1;
    refresh();
  }
);

// ——— Restore Operation ———
const restoreMajor = async (id: number) => {
  if (!id) return;

  restorePending[id] = true;

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
  restorePending[id] = false;
};

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
            currentPage = 1;
            pagination.pageIndex = 0;
            refresh();
          }
        ">
        إعادة تعيين الفلاتر
      </UButton>
    </div>

    <!-- 🗃️ Data Table -->
    <UTable
      ref="table"
      empty="لا يوجد بيانات"
      v-model:pagination="pagination"
      :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
      :sticky="true"
      :loading="loading"
      :columns="columns as any"
      :data="majorsResult?.data"
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

    <!-- 🔢 Pagination Controls -->
    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="
          (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
        "
        :items-per-page="table?.tableApi.getState().pagination.pageSize"
        :total="majorsResult?.meta?.total ?? 0"
        @update:page="
          p => {
            currentPage = p;
            pagination.pageIndex = p - 1;
          }
        "
        :ui="{
          last: 'rotate-180 aspect-square h-10 grid place-items-center',
          next: 'rotate-180 aspect-square h-10 grid place-items-center',
          first: 'rotate-180 aspect-square h-10 grid place-items-center',
          prev: 'rotate-180 aspect-square h-10 grid place-items-center',
          item: 'aspect-square h-10 grid place-items-center',
        }" />
    </div>
  </div>
</template>
