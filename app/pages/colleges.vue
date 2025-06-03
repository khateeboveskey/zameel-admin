<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

// ——— Refs & State ———
const table = useTemplateRef('table')
const currentPage = ref(1)
const toast = useToast()

// Search & Debounce
const searchTerm = ref('')
const debouncedSearchTerm = debouncedRef(searchTerm, 1000)

// New / Edit Modal State
const newCollege = reactive({ name: '', pending: false })
const editCollege = reactive<{ id: number | null; name: string; pending: boolean }>({
  id: null,
  name: '',
  pending: false
})

// Delete State
const deletedCollegeId = ref<number | null>(null)
const addModalOpen = ref(false)
const editModalOpen = ref(false)
const deleteModalOpen = ref(false)

// ——— Computed Filters ———
const filters = computed(() => {
  if (!debouncedSearchTerm.value) return []
  return [
    {
      type: 'and',
      nested: [
        {
          type: 'or',
          field: 'name',
          operator: 'like',
          value: `%${debouncedSearchTerm.value}%`
        }
      ]
    }
  ]
})

// ——— Fetch Colleges (Search Endpoint Only) ———
const {
  data: collegesResult,
  pending: loading,
  refresh
} = await useCachedFetch<IPaginatedFetchResponse<ICollege>>(
  '/colleges/search',
  {
    method: 'POST',
    body: {
      filters,
      page: computed(() => currentPage.value)
    }
  }
)

// ——— Pagination Setup ———
const pagination = reactive({
  pageIndex: 0,
  // **Make pageSize reactive** so it updates when server-side `per_page` changes
  pageSize: computed(() => collegesResult.value?.meta?.per_page ?? 15)
})

// ——— Watchers ———
// 1. Reset to first page on new search term
watch(debouncedSearchTerm, () => {
  currentPage.value = 1
  pagination.pageIndex = 0
  refresh()
})

// 2. Sync pagination.pageIndex → currentPage
watch(
  () => pagination.pageIndex,
  (newIndex) => {
    currentPage.value = newIndex + 1
    refresh()
  }
)

// ——— CRUD Operations ———

// **Add College**
const addCollege = async () => {
  if (!newCollege.name.trim()) return

  newCollege.pending = true
  const { error } = await useCachedFetch<ICollege>('/colleges', {
    method: 'POST',
    body: { name: newCollege.name.trim() }
  })

  if (error.value) {
    toast.add({
      title: 'خطأ عند إضافة كلية',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle'
    })
  } else {
    toast.add({
      title: 'تمت إضافة كلية',
      description: `تمت إضافة "${newCollege.name.trim()}".`,
      color: 'success',
      icon: 'i-lucide-circle-check'
    })
    // Reset to page 1 and refresh
    currentPage.value = 1
    pagination.pageIndex = 0
    refresh()
  }

  newCollege.name = ''
  newCollege.pending = false
  addModalOpen.value = false
}

// **Update College (Fixed)**
const updateCollege = async () => {
  if (!editCollege.id || !editCollege.name.trim()) return

  editCollege.pending = true
  const { error } = await useCachedFetch<ICollege>(`/colleges/${editCollege.id}`, {
    method: 'PATCH',
    body: { name: editCollege.name.trim() }
  })

  if (error.value) {
    toast.add({
      title: 'خطأ عند تعديل كلية',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle'
    })
  } else {
    toast.add({
      title: 'تم تعديل كلية',
      description: `تم تحديث "${editCollege.name.trim()}".`,
      color: 'success',
      icon: 'i-lucide-circle-check'
    })
    // **Stay on the same page** and refresh
    refresh()
  }

  // **Reset edit state**
  editCollege.id = null
  editCollege.name = ''
  editCollege.pending = false
  editModalOpen.value = false
}

// **Delete College (Fixed)**
const deleteCollege = async () => {
  if (!deletedCollegeId.value) return

  const { data: deleted, error } = await useCachedFetch<IFetchResponse<ICollege>>(
    `/colleges/${deletedCollegeId.value}`,
    { method: 'DELETE' }
  )

  if (error.value) {
    toast.add({
      title: 'خطأ عند حذف كلية',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle'
    })
  } else {
    toast.add({
      title: 'تم حذف كلية',
      description: `تم حذف "${deleted.value?.data.name}".`,
      color: 'success',
      icon: 'i-lucide-circle-check'
    })
    // If last item on page was deleted and not on first page, go back one page
    const remainingOnPage = collegesResult.value?.data.length ?? 0
    if (remainingOnPage === 1 && currentPage.value > 1) {
      currentPage.value -= 1
      pagination.pageIndex = currentPage.value - 1
    }
    refresh()
  }

  // **Reset delete state**
  deletedCollegeId.value = null
  deleteModalOpen.value = false
}

// ——— Table Columns & Actions ———
const actionsList: DropdownMenuItem[] = [
  {
    label: 'تعديل',
    icon: 'i-lucide-pencil',
    slot: 'edit' as const
  },
  {
    label: 'حذف',
    icon: 'i-lucide-trash',
    color: 'error',
    slot: 'delete' as const
  }
]

const columns: TableColumn<ICollege>[] = [
  {
    accessorKey: 'id',
    header: 'المعرف',
    cell: ({ row }) => row.getValue('id')
  },
  {
    accessorKey: 'name',
    header: 'اسم الكلية',
    cell: ({ row }) => row.getValue('name')
  },
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

// ——— Helper to Open Modals ———
import { nextTick } from 'vue'

function openEditModal(college: ICollege) {
  editModalOpen.value = false
  nextTick(() => {
    editCollege.id = college.id
    editCollege.name = college.name
    editModalOpen.value = true
  })
}

function openDeleteModal(id: number) {
  deleteModalOpen.value = false
  nextTick(() => {
    deletedCollegeId.value = id
    deleteModalOpen.value = true
  })
}

// ——— Page Meta ———
definePageMeta({ title: 'الكليات' })
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
        class="text-nowrap"
        variant="outline"
        @click="() => { searchTerm = ''; currentPage = 1; pagination.pageIndex = 0; refresh() }"
      >
        إعادة تعيين الفلاتر
      </UButton>

      <UButton
        icon="i-lucide-plus"
        color="primary"
        class="text-nowrap"
        @click="addModalOpen = true"
      >
        إضافة كلية
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
      :data="collegesResult?.data"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e text-right'
      }"
    >
      <template #actions-cell="{ row }">
        <UDropdownMenu
          :items="actionsList"
          :popper="{ placement: 'bottom-start' }"
        >
          <UButton
            icon="i-lucide-more-vertical"
            color="neutral"
            variant="ghost"
          />
          <template #edit-label>
            <div @click="openEditModal(row.original)">تعديل</div>
          </template>
          <template #delete-label>
            <div @click="openDeleteModal(row.original.id)">حذف</div>
          </template>
        </UDropdownMenu>
      </template>
    </UTable>

    <!-- 🔢 Pagination Controls -->
    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi.getState().pagination.pageSize"
        :total="collegesResult?.meta?.total ?? 0"
        @update:page="(p) => { currentPage = p; pagination.pageIndex = p - 1 }"
        :ui="{
          last: 'rotate-180 aspect-square h-10 grid place-items-center',
          next: 'rotate-180 aspect-square h-10 grid place-items-center',
          first: 'rotate-180 aspect-square h-10 grid place-items-center',
          prev: 'rotate-180 aspect-square h-10 grid place-items-center',
          item: 'aspect-square h-10 grid place-items-center'
        }"
      />
    </div>

    <!-- ➕ Add Modal -->
    <UModal
      v-model:open="addModalOpen"
      title="إضافة كلية جديدة"
      description="أدخل اسم الكلية الجديدة"
    >
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
            :loading="newCollege.pending"
            @click="addCollege"
          />
        </div>
      </template>
    </UModal>

    <!-- ✏️ Edit Modal -->
    <UModal
      v-model:open="editModalOpen"
      title="تعديل الكلية"
      description="قم بتعديل بيانات الكلية"
    >
      <template #body>
        <UFormField
          label="الاسم"
          name="name"
        >
          <UInput
            v-model="editCollege.name"
            class="w-full"
          />
        </UFormField>
        <div class="flex justify-end gap-2 mt-4">
          <UButton
            label="إلغاء"
            color="neutral"
            variant="outline"
            @click="editModalOpen = false"
          />
          <UButton
            label="حفظ"
            icon="i-lucide-save"
            color="primary"
            :loading="editCollege.pending"
            @click="updateCollege"
          />
        </div>
      </template>
    </UModal>

    <!-- 🗑️ Delete Modal -->
    <UModal
      v-model:open="deleteModalOpen"
      title="حذف الكلية"
      description="هل أنت متأكد من حذف هذه الكلية؟"
      :ui="{ header: 'border-b-0' }"
    >
      <template #body>
        <div class="flex justify-end gap-2 mt-4">
          <UButton
            label="إلغاء"
            color="neutral"
            variant="outline"
            @click="deleteModalOpen = false"
          />
          <UButton
            label="حذف"
            icon="i-lucide-trash"
            color="error"
            @click="deleteCollege"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
