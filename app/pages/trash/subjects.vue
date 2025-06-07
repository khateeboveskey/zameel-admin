<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'

// ——— Refs & State ———
const table = useTemplateRef('table')
const currentPage = ref(1)
const toast = useToast()

// Search & Debounce
const searchTerm = ref('')
const debouncedSearchTerm = debouncedRef(searchTerm, 1000)
const restorePending = reactive<{ [key: number]: boolean }>({})

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
      page: computed(() => currentPage.value),
    },
    key: 'trashed-subjects',
  }
)

// ——— Pagination Setup ———
const pagination = reactive({
  pageIndex: 0,
  pageSize: computed(() => subjectsResult.value?.meta?.per_page ?? 15),
})

// ——— Watchers ———
watch(debouncedSearchTerm, () => {
  currentPage.value = 1
  pagination.pageIndex = 0
  refresh()
})

watch(
  () => pagination.pageIndex,
  newIndex => {
    currentPage.value = newIndex + 1
    refresh()
  }
)

// ——— Restore Operation ———
const restoreSubject = async (id: number) => {
  if (!id) return

  restorePending[id] = true

  const { error } = await useCachedFetch<ISubject>(`/subjects/${id}/restore`, {
    method: 'POST',
  })

  if (error.value) {
    toast.add({
      title: 'خطأ عند الاستعادة',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    })
  } else {
    toast.add({
      title: 'تمت الاستعادة',
      description: `تمت استعادة المقرر.`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    })
    refresh()
  }
  restorePending[id] = false
}

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
]
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
        clearable
      >
        <template v-if="searchTerm.length > 0" #trailing>
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
        class="text-nowrap"
        variant="outline"
        @click="
          () => {
            searchTerm = ''
            currentPage = 1
            pagination.pageIndex = 0
            refresh()
          }
        "
      >
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
      :data="subjectsResult?.data"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e text-right',
      }"
    >
      <template #actions-cell="{ row }">
        <UButton
          label="استعادة"
          icon="i-lucide-rotate-ccw"
          color="primary"
          variant="outline"
          :loading="restorePending[row.original.id] === true"
          @click="restoreSubject(row.original.id)"
        />
      </template>
    </UTable>

    <!-- 🔢 Pagination Controls -->
    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="
          (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
        "
        :items-per-page="table?.tableApi.getState().pagination.pageSize"
        :total="subjectsResult?.meta?.total ?? 0"
        @update:page="
          p => {
            currentPage = p
            pagination.pageIndex = p - 1
          }
        "
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