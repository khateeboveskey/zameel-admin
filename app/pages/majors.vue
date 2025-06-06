<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue';
import { getPaginationRowModel } from '@tanstack/vue-table';
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui';

// ——— Refs & State ———
const table = useTemplateRef('table');
const currentPage = ref(1);
const toast = useToast();
const degreeStore = useDegreeStore();

// Search & Debounce
const searchTerm = ref('');
const debouncedSearchTerm = debouncedRef(searchTerm, 1000);

// New / Edit Modal State
const newMajor = reactive({
  name: '',
  college_id: undefined as number | undefined,
  degree_id: undefined as number | undefined,
  years: null as number | null,
  pending: false,
});
const editMajor = reactive<{
  id: number | null;
  name: string;
  pending: boolean;
}>({
  id: null,
  name: '',
  pending: false,
});

// Delete State
const deletedMajorId = ref<number | null>(null);
const addModalOpen = ref(false);
const editModalOpen = ref(false);
const deleteModalOpen = ref(false);

// ——— Computed Filters ———
const filters = computed(() => {
  if (!debouncedSearchTerm.value) return [];
  return [
    {
      type: 'and',
      nested: [
        {
          type: 'or',
          field: 'name',
          operator: 'like',
          value: `%${debouncedSearchTerm.value}%`,
        },
      ],
    },
  ];
});

// ——— Fetch Majors (Search Endpoint Only) ———
const {
  data: majorsResult,
  pending: loading,
  refresh,
} = await useCachedFetch<IPaginatedFetchResponse<IMajor>>('/majors');

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

// ——— CRUD Operations ———

// **Add Major**
const addMajor = async () => {
  if (
    !newMajor.name.trim() ||
    !newMajor.college_id ||
    !newMajor.degree_id ||
    !newMajor.years
  )
    return;

  newMajor.pending = true;
  const { error } = await useCachedFetch<IMajor>('/majors', {
    method: 'POST',
    body: {
      name: newMajor.name.trim(),
      college_id: newMajor.college_id,
      degree_id: newMajor.degree_id,
      years: newMajor.years,
    },
  });

  if (error.value) {
    toast.add({
      title: 'خطأ عند إضافة تخصص',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    });
  } else {
    toast.add({
      title: 'تمت إضافة تخصص',
      description: `تمت إضافة "${newMajor.name.trim()}".`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
    currentPage.value = 1;
    pagination.pageIndex = 0;
    refresh();
  }

  newMajor.name = '';
  newMajor.college_id = undefined;
  newMajor.degree_id = undefined;
  newMajor.years = null;
  newMajor.pending = false;
  addModalOpen.value = false;
};

// **Update Major (Fixed)**
const updateMajor = async () => {
  if (!editMajor.id || !editMajor.name.trim()) return;

  editMajor.pending = true;
  const { error } = await useCachedFetch<IMajor>(`/majors/${editMajor.id}`, {
    method: 'PATCH',
    body: { name: editMajor.name.trim() },
  });

  if (error.value) {
    toast.add({
      title: 'خطأ عند تعديل تخصص',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    });
  } else {
    toast.add({
      title: 'تم تعديل تخصص',
      description: `تم تحديث "${editMajor.name.trim()}".`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
    refresh();
  }

  editMajor.id = null;
  editMajor.name = '';
  editMajor.pending = false;
  editModalOpen.value = false;
};

// **Delete Major (Fixed)**
const deleteMajor = async () => {
  if (!deletedMajorId.value) return;

  const { data: deleted, error } = await useCachedFetch<IFetchResponse<IMajor>>(
    `/majors/${deletedMajorId.value}`,
    { method: 'DELETE' }
  );

  if (error.value) {
    toast.add({
      title: 'خطأ عند حذف تخصص',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    });
  } else {
    toast.add({
      title: 'تم حذف تخصص',
      description: `تم حذف "${deleted.value?.data.name}".`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
    const remainingOnPage = majorsResult.value?.data.length ?? 0;
    if (remainingOnPage === 1 && currentPage.value > 1) {
      currentPage.value -= 1;
      pagination.pageIndex = currentPage.value - 1;
    }
    refresh();
  }

  deletedMajorId.value = null;
  deleteModalOpen.value = false;
};

// ——— Table Columns & Actions ———
const actionsList: DropdownMenuItem[] = [
  {
    label: 'تعديل',
    icon: 'i-lucide-pencil',
    slot: 'edit' as const,
  },
  {
    label: 'حذف',
    icon: 'i-lucide-trash',
    color: 'error',
    slot: 'delete' as const,
  },
];

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
// ——— Helper to Open Modals ———

function openEditModal(major: IMajor) {
  editMajor.id = major.id;
  editMajor.name = major.name;
  editModalOpen.value = true;
}

function openDeleteModal(id: number) {
  deletedMajorId.value = id;
  deleteModalOpen.value = true;
}

// ——— Page Meta ———
definePageMeta({ title: 'الكليات' });
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

      <UButton
        icon="i-lucide-plus"
        color="primary"
        class="text-nowrap"
        @click="addModalOpen = true">
        إضافة تخصص
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
        <UDropdownMenu
          :items="actionsList"
          :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-lucide-more-vertical"
            color="neutral"
            variant="ghost" />
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

    <!-- ➕ Add Modal -->
    <UModal
      v-model:open="addModalOpen"
      title="إضافة تخصص جديدة"
      description="أدخل بيانات التخصص الجديدة">
      <template #body>
        <UFormField label="الاسم" name="name">
          <UInput v-model="newMajor.name" class="w-full" />
        </UFormField>
        <UFormField label="عدد السنوات" name="years" class="mt-2">
          <UInput
            v-model="newMajor.years"
            type="number"
            min="1"
            class="w-full" />
        </UFormField>
        <UFormField label="الكلية" name="college_id" class="mt-2">
          <USelect
            v-model="newMajor.college_id"
            :items="colleges?.data.map(c => ({ label: c.name, value: c.id }))"
            placeholder="اختر الكلية"
            class="w-full" />
        </UFormField>
        <UFormField label="الدرجة" name="degree_id" class="mt-2">
          <USelect
            v-model="newMajor.degree_id"
            :items="
              degreeStore.degrees.map(d => ({ label: d.name, value: d.id }))
            "
            placeholder="اختر الدرجة"
            class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2 mt-4">
          <UButton
            label="إلغاء"
            color="neutral"
            variant="outline"
            @click="addModalOpen = false" />
          <UButton
            label="حفظ"
            icon="i-lucide-save"
            color="primary"
            :loading="newMajor.pending"
            @click="addMajor" />
        </div>
      </template>
    </UModal>

    <!-- ✏️ Edit Modal -->
    <UModal
      v-model:open="editModalOpen"
      title="تعديل التخصص"
      description="قم بتعديل بيانات التخصص">
      <template #body>
        <UFormField label="الاسم" name="name">
          <UInput v-model="editMajor.name" class="w-full" />
        </UFormField>
        <div class="flex justify-end gap-2 mt-4">
          <UButton
            label="إلغاء"
            color="neutral"
            variant="outline"
            @click="editModalOpen = false" />
          <UButton
            label="حفظ"
            icon="i-lucide-save"
            color="primary"
            :loading="editMajor.pending"
            @click="updateMajor" />
        </div>
      </template>
    </UModal>

    <!-- 🗑️ Delete Modal -->
    <UModal
      v-model:open="deleteModalOpen"
      title="حذف التخصص"
      description="هل أنت متأكد من حذف هذه التخصص؟"
      :ui="{ header: 'border-b-0' }">
      <template #body>
        <div class="flex justify-end gap-2 mt-4">
          <UButton
            label="إلغاء"
            color="neutral"
            variant="outline"
            @click="deleteModalOpen = false" />
          <UButton
            label="حذف"
            icon="i-lucide-trash"
            color="error"
            @click="deleteMajor" />
        </div>
      </template>
    </UModal>
  </div>
</template>
