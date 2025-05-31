<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'

const table = useTemplateRef('table')
const currentPage = ref(1)
const toast = useToast();

// Search state
const searchTerm = ref('');
const debouncedSearchTerm = debouncedRef(searchTerm, 1000);

const newCollege = ref({
  name: '',
  pending: false
})

// Fetch colleges
const { data: colleges, pending, refresh } = await useCachedFetch<IPaginatedFetchResponse<ICollege>>('/colleges', {
  params: { page: currentPage }
})

const addCollege = async (name: string) => {
  newCollege.value.pending = true;
  const { error } = await useCachedFetch<ICollege>('/colleges', {
    method: 'POST',
    body: {
      name: name
    }
  })
  if (error.value) {
    toast.add({
      title: 'حصل خطأ أثناء محاولة إضافة كلية',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    })
  } else {
    toast.add({
      title: 'تمت العملية بنجاح',
      description: `تمت إضافة ${name} ككلية جديدة.`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    })
    await refreshSearch()
    await refresh()
  }
  addModalOpen.value = false;
  newCollege.value.pending = false;
}

// Advanced search
const filters = computed(() => {
  const filterArr: any[] = []

  if (debouncedSearchTerm.value) {
    filterArr.push({
      type: 'or',
      field: 'name',
      operator: 'like',
      value: `%${debouncedSearchTerm.value}%`
    })
  }

  return filterArr.length ? [{ type: 'and', nested: filterArr }] : []
})

const { data: collegesSearchResult, refresh: refreshSearch, pending: searchPending } = await useCachedFetch<IPaginatedFetchResponse<ICollege>>('/colleges/search', {
  method: 'POST',
  body: {
    filters: filters,
    page: computed(() => currentPage.value)
  }
})

// Watch for filter changes and refresh search
watch([debouncedSearchTerm], () => {
  currentPage.value = 1
  refreshSearch()
})

// Columns
const columns: TableColumn<ICollege>[] = [
  { accessorKey: 'id', header: 'المعرف', cell: ({ row }) => row.getValue('id') },
  { accessorKey: 'name', header: 'اسم الكلية', cell: ({ row }) => row.getValue('name') },
  {
    accessorKey: 'created_at',
    header: 'تاريخ الإنشاء',
    cell: ({ row }) => toArabicDate(row.getValue('created_at'))
  },
  {
    accessorKey: 'updated_at',
    header: 'آخر تعديل',
    cell: ({ row }) => toArabicDate(row.getValue('updated_at'))
  },
  {
    accessorKey: 'actions',
    header: 'الإجراءات',
    cell: () => null
  }
]

// Pagination state
const pagination = ref({
  pageIndex: 0,
  pageSize: computed(() => {
    const perPageSearch = collegesSearchResult.value?.meta?.per_page;
    const perPageColleges = colleges.value?.meta?.per_page;
    return (typeof perPageSearch === 'number' && perPageSearch > 0)
      ? perPageSearch
      : (typeof perPageColleges === 'number' && perPageColleges > 0)
        ? perPageColleges
        : 15;
  }).value
})

// Watch for pagination changes and update currentPage
watch(() => pagination.value.pageIndex, (newPageIndex) => {
  currentPage.value = newPageIndex + 1
  refreshSearch()
})

const resetFilters = () => {
  searchTerm.value = ''
  currentPage.value = 1
  refreshSearch()
}

const addModalOpen = ref(false);

definePageMeta({
  title: 'الكليات'
})
</script>

<template>
  <div class="space-y-4 pb-4">
    <!-- Search -->
    <div class="flex flex-nowrap text-nowrap gap-4 items-center">
      <UInput
        v-model="searchTerm"
        placeholder="بحث باسم الكلية"
        icon="i-lucide-search"
        class="w-full"
        clearable
      >
        <template
          v-if="searchTerm.length > 0"
          #trailing
        >
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            icon="i-lucide-circle-x"
            aria-label="Clear input"
            @click="searchTerm = ''"
          />
        </template>
      </UInput>
      <UButton
        icon="i-lucide-rotate-ccw"
        color="neutral"
        variant="outline"
        @click="resetFilters"
      >
        إعادة تعيين الفلاتر
      </UButton>
      <UModal
        v-model:open="addModalOpen"
        title="إضافة كلية جديدة"
        description="قم بملء بيانات عملية إضافة كلية جديدة."
      >
        <UButton
          label="إضافة كلية"
          icon="i-lucide-plus"
        />
        <template #body>
          <UFormField
            label="الاسم"
            name="name"
          >
            <UInput
              v-model="newCollege.name"
              class="w-full"
            />
          </UFormField>
          <div class="flex justify-end gap-2 mt-4">
            <UButton
              label="إلغاء"
              color="neutral"
              variant="outline"
              @click="addModalOpen = false"
            />
            <UButton
              label="حفظ"
              icon="i-lucide-save"
              color="primary"
              type="submit"
              :loading="newCollege.pending"
              @click="addCollege(newCollege.name)"
            />
          </div>
        </template>
      </UModal>
    </div>

    <UTable
      ref="table"
      empty="لا يوجد بيانات"
      v-model:pagination="pagination"
      :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
      :sticky="true"
      :loading="pending || searchPending"
      :columns="columns as any"
      :data="collegesSearchResult?.data"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e text-right',
        td: 'border-b border-default'
      }"
    >
      <template #actions-cell="{ row }">
        <UDropdownMenu
          :items="[
            [
              {
                label: 'تعديل',
                icon: 'i-lucide-pencil',
              },
              {
                label: 'حذف',
                icon: 'i-lucide-trash',
                color: 'error'
              }
            ]
          ]"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            icon="i-lucide-more-vertical"
            color="neutral"
            variant="ghost"
          />
        </UDropdownMenu>
      </template>
    </UTable>

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi.getState().pagination.pageSize"
        :total="collegesSearchResult?.meta?.total ?? colleges?.meta?.total"
        @update:page="p => currentPage = p"
        :ui="{
          last: 'rotate-180 aspect-square h-10 grid place-items-center',
          next: 'rotate-180 aspect-square h-10 grid place-items-center',
          first: 'rotate-180 aspect-square h-10 grid place-items-center',
          prev: 'rotate-180 aspect-square h-10 grid place-items-center',
          item: 'aspect-square h-10 grid place-items-center',
        }"
      />
    </div>
  </div>
</template>
