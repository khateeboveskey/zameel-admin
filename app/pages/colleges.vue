<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'الكليات' });

// ——— Composables ———
const { createResource, updateResource, deleteResource } = 
  useResourceManager<ICollege>('الكلية', {
    create: '/colleges',
    update: (id) => `/colleges/${id}`,
    delete: (id) => `/colleges/${id}`,
  });

const { searchTerm } = useSearchAndFilter(1000, { filterFields: ['name'] });
const { 
  addModalOpen, editModalOpen, deleteModalOpen,
  openAddModal, closeAddModal, openEditModal, closeEditModal,
  openDeleteModal, closeDeleteModal
} = useModalState();

// ——— Form State ———
const newCollege = reactive({ name: '', pending: false });
const editCollege = reactive<{
  id: number | null;
  name: string;
  pending: boolean;
}>({
  id: null,
  name: '',
  pending: false,
});
const deletedCollegeId = ref<number | null>(null);

// ——— Fetch Colleges ———
const {
  data: collegesResult,
  pending: loading,
  refresh,
} = await useCachedFetch<IPaginatedFetchResponse<ICollege>>(
  '/colleges/search',
  {
    method: 'POST',
    body: {},
  }
);

// ——— Client-side Filtered Data ———
const filteredColleges = computed(() => {
  if (!searchTerm.value) return collegesResult.value?.data || [];
  return (collegesResult.value?.data || []).filter(college =>
    college.name?.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// ——— CRUD Operations ———
const addCollege = async () => {
  if (!newCollege.name.trim()) return;

  newCollege.pending = true;
  const result = await createResource({ name: newCollege.name.trim() }, refresh);
  
  if (result.success) {
    newCollege.name = '';
    closeAddModal();
  }
  newCollege.pending = false;
};

const updateCollege = async () => {
  if (!editCollege.id || !editCollege.name.trim()) return;

  editCollege.pending = true;
  const result = await updateResource(editCollege.id, { name: editCollege.name.trim() }, refresh);
  
  if (result.success) {
    editCollege.id = null;
    editCollege.name = '';
    closeEditModal();
  }
  editCollege.pending = false;
};

const deleteCollegeConfirm = async () => {
  if (!deletedCollegeId.value) return;

  const collegeToDelete = filteredColleges.value.find(
    college => college.id === deletedCollegeId.value
  );
  if (!collegeToDelete) return;

  const result = await deleteResource(deletedCollegeId.value, collegeToDelete.name, refresh);
  
  if (result.success) {
    deletedCollegeId.value = null;
    closeDeleteModal();
  }
};

// ——— Table Columns ———
const columns: TableColumn[] = [
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

// ——— Modal Handlers ———
const handleEditModal = (college: ICollege) => {
  openEditModal(() => {
    editCollege.id = college.id;
    editCollege.name = college.name;
  });
};

const handleDeleteModal = (id: number) => {
  openDeleteModal(() => {
    deletedCollegeId.value = id;
  });
};

// ——— Page Meta ———
definePageMeta({
  title: 'الكليات',
  description: 'عرض وتعديل وحذف وإضافة كليات الجامعة',
});
</script>

<template>
  <div class="space-y-4 pb-4">
    <!-- Search & Controls -->
    <SearchBar 
      v-model="searchTerm" 
      placeholder="بحث باسم الكلية"
      @refresh="refresh">
      <template #actions>
        <UButton
          icon="i-lucide-plus"
          color="primary"
          class="text-nowrap"
          @click="openAddModal">
          إضافة كلية
        </UButton>
      </template>
    </SearchBar>

    <!-- Data Table -->
    <DataTable
      :data="filteredColleges"
      :columns="columns"
      :loading="loading"
      :show-pagination="false"
      @edit="handleEditModal"
      @delete="handleDeleteModal" />

    <!-- Add Modal -->
    <FormModal
      v-model:open="addModalOpen"
      title="إضافة كلية جديدة"
      description="أدخل اسم الكلية الجديدة"
      :is-pending="newCollege.pending"
      @submit="addCollege"
      @cancel="closeAddModal">
      <template #default>
        <UFormField label="اسم الكلية" name="name">
          <UInput v-model="newCollege.name" class="w-full" />
        </UFormField>
      </template>
    </FormModal>

    <!-- Edit Modal -->
    <FormModal
      v-model:open="editModalOpen"
      title="تعديل الكلية"
      description="قم بتعديل اسم الكلية"
      :is-pending="editCollege.pending"
      @submit="updateCollege"
      @cancel="closeEditModal">
      <template #default>
        <UFormField label="اسم الكلية" name="name">
          <UInput v-model="editCollege.name" class="w-full" />
        </UFormField>
      </template>
    </FormModal>

    <!-- Delete Modal -->
    <DeleteModal
      v-model:open="deleteModalOpen"
      resource-name="الكلية"
      @confirm="deleteCollegeConfirm"
      @cancel="closeDeleteModal" />
  </div>
</template>