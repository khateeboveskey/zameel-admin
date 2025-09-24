<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'المواد' });

// ——— Composables ———
const { createResource, updateResource, deleteResource } = 
  useResourceManager<ISubject>('المادة', {
    create: '/subjects',
    update: (id) => `/subjects/${id}`,
    delete: (id) => `/subjects/${id}`,
  });

const { searchTerm } = useSearchAndFilter(1000, { filterFields: ['name'] });
const { 
  addModalOpen, editModalOpen, deleteModalOpen,
  openAddModal, closeAddModal, openEditModal, closeEditModal,
  openDeleteModal, closeDeleteModal
} = useModalState();

// ——— Form State ———
const newSubject = reactive({ name: '', pending: false });
const editSubject = reactive<{
  id: number | null;
  name: string;
  pending: boolean;
}>({
  id: null,
  name: '',
  pending: false,
});
const deletedSubjectId = ref<number | null>(null);

// ——— Fetch Subjects ———
const {
  data: subjectsResult,
  pending: loading,
  refresh,
} = await useCachedFetch<IPaginatedFetchResponse<ISubject>>(
  '/subjects/search',
  {
    method: 'POST',
  }
);

// ——— Client-side Filtered Data ———
const filteredSubjects = computed(() => {
  if (!searchTerm.value) return subjectsResult.value?.data || [];
  return (subjectsResult.value?.data || []).filter(subject =>
    subject.name?.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// ——— CRUD Operations ———
const addSubject = async () => {
  if (!newSubject.name.trim()) return;

  newSubject.pending = true;
  const result = await createResource({ name: newSubject.name.trim() }, refresh);
  
  if (result.success) {
    newSubject.name = '';
    closeAddModal();
  }
  newSubject.pending = false;
};

const updateSubject = async () => {
  if (!editSubject.id || !editSubject.name.trim()) return;

  editSubject.pending = true;
  const result = await updateResource(editSubject.id, { name: editSubject.name.trim() }, refresh);
  
  if (result.success) {
    editSubject.id = null;
    editSubject.name = '';
    closeEditModal();
  }
  editSubject.pending = false;
};

const deleteSubjectConfirm = async () => {
  if (!deletedSubjectId.value) return;

  const subjectToDelete = filteredSubjects.value.find(
    subject => subject.id === deletedSubjectId.value
  );
  if (!subjectToDelete) return;

  const result = await deleteResource(deletedSubjectId.value, subjectToDelete.name, refresh);
  
  if (result.success) {
    deletedSubjectId.value = null;
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
    header: 'اسم المقرر',
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
const handleEditModal = (subject: ISubject) => {
  openEditModal(() => {
    editSubject.id = subject.id;
    editSubject.name = subject.name;
  });
};

const handleDeleteModal = (id: number) => {
  openDeleteModal(() => {
    deletedSubjectId.value = id;
  });
};

// ——— Page Meta ———
definePageMeta({
  title: 'المواد',
  description: 'عرض وإدارة المواد الدراسية في الجامعة كافة',
});
</script>

<template>
  <div class="space-y-4 pb-4">
    <!-- Search & Controls -->
    <SearchBar 
      v-model="searchTerm" 
      placeholder="بحث باسم المقرر"
      @refresh="refresh">
      <template #actions>
        <UButton
          icon="i-lucide-plus"
          color="primary"
          class="text-nowrap"
          @click="openAddModal">
          إضافة مادة
        </UButton>
      </template>
    </SearchBar>

    <!-- Data Table -->
    <DataTable
      :data="filteredSubjects"
      :columns="columns"
      :loading="loading"
      :show-pagination="false"
      @edit="handleEditModal"
      @delete="handleDeleteModal" />

    <!-- Add Modal -->
    <FormModal
      v-model:open="addModalOpen"
      title="إضافة مادة جديدة"
      description="أدخل اسم المادة الجديدة"
      :is-pending="newSubject.pending"
      @submit="addSubject"
      @cancel="closeAddModal">
      <template #default>
        <UFormField label="اسم المادة" name="name">
          <UInput v-model="newSubject.name" class="w-full" />
        </UFormField>
      </template>
    </FormModal>

    <!-- Edit Modal -->
    <FormModal
      v-model:open="editModalOpen"
      title="تعديل المادة"
      description="قم بتعديل اسم المادة"
      :is-pending="editSubject.pending"
      @submit="updateSubject"
      @cancel="closeEditModal">
      <template #default>
        <UFormField label="اسم المادة" name="name">
          <UInput v-model="editSubject.name" class="w-full" />
        </UFormField>
      </template>
    </FormModal>

    <!-- Delete Modal -->
    <DeleteModal
      v-model:open="deleteModalOpen"
      resource-name="المادة"
      @confirm="deleteSubjectConfirm"
      @cancel="closeDeleteModal" />
  </div>
</template>