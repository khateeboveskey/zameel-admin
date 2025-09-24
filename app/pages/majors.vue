<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'التخصصات' });

// ——— Composables ———
const { createResource, updateResource, deleteResource } = 
  useResourceManager<IMajor>('التخصص', {
    create: '/majors',
    update: (id) => `/majors/${id}`,
    delete: (id) => `/majors/${id}`,
  });

const { searchTerm } = useSearchAndFilter(1000, { filterFields: ['name'] });
const { 
  addModalOpen, editModalOpen, deleteModalOpen,
  openAddModal, closeAddModal, openEditModal, closeEditModal,
  openDeleteModal, closeDeleteModal
} = useModalState();

// ——— Stores ———
const degreeStore = useDegreeStore();

// ——— Form State ———
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
const deletedMajorId = ref<number | null>(null);

// ——— Fetch Data ———
const {
  data: majorsResult,
  pending: loading,
  refresh,
} = await useCachedFetch<IPaginatedFetchResponse<IMajor>>('/majors');

const { data: colleges } =
  await useCachedFetch<IPaginatedFetchResponse<ICollege>>('/colleges');

// ——— Client-side Filtered Data ———
const filteredMajors = computed(() => {
  if (!searchTerm.value) return majorsResult.value?.data || [];
  const term = searchTerm.value.toLowerCase();
  return (majorsResult.value?.data || []).filter(major =>
    major.name.toLowerCase().includes(term)
  );
});

// ——— CRUD Operations ———
const addMajor = async () => {
  if (!newMajor.name.trim() || !newMajor.college_id || !newMajor.degree_id || !newMajor.years) {
    return;
  }

  newMajor.pending = true;
  const result = await createResource({
    name: newMajor.name.trim(),
    college_id: newMajor.college_id,
    degree_id: newMajor.degree_id,
    years: newMajor.years,
  }, refresh);
  
  if (result.success) {
    newMajor.name = '';
    newMajor.college_id = undefined;
    newMajor.degree_id = undefined;
    newMajor.years = null;
    closeAddModal();
  }
  newMajor.pending = false;
};

const updateMajor = async () => {
  if (!editMajor.id || !editMajor.name.trim()) return;

  editMajor.pending = true;
  const result = await updateResource(editMajor.id, { name: editMajor.name.trim() }, refresh);
  
  if (result.success) {
    editMajor.id = null;
    editMajor.name = '';
    closeEditModal();
  }
  editMajor.pending = false;
};

const deleteMajorConfirm = async () => {
  if (!deletedMajorId.value) return;

  const majorToDelete = filteredMajors.value.find(
    major => major.id === deletedMajorId.value
  );
  if (!majorToDelete) return;

  const result = await deleteResource(deletedMajorId.value, majorToDelete.name, refresh);
  
  if (result.success) {
    deletedMajorId.value = null;
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
    header: 'اسم التخصص',
    cell: ({ row }) => row.getValue('name'),
  },
  {
    accessorKey: 'college_id',
    header: 'الكلية',
    cell: ({ row }) => {
      const collegeId = row.getValue('college_id') as number;
      return colleges.value?.data.find(c => c.id === collegeId)?.name || 'غير محدد';
    },
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

// ——— Modal Handlers ———
const handleEditModal = (major: IMajor) => {
  openEditModal(() => {
    editMajor.id = major.id;
    editMajor.name = major.name;
  });
};

const handleDeleteModal = (id: number) => {
  openDeleteModal(() => {
    deletedMajorId.value = id;
  });
};

// ——— Page Meta ———
definePageMeta({ 
  title: 'التخصصات', 
  description: 'عرض وإدارة تخصصات الكليات' 
});
</script>

<template>
  <div class="space-y-4 pb-4">
    <!-- Search & Controls -->
    <SearchBar 
      v-model="searchTerm" 
      placeholder="بحث باسم التخصص"
      @refresh="refresh">
      <template #actions>
        <UButton
          icon="i-lucide-plus"
          color="primary"
          class="text-nowrap"
          @click="openAddModal">
          إضافة تخصص
        </UButton>
      </template>
    </SearchBar>

    <!-- Data Table -->
    <DataTable
      :data="filteredMajors"
      :columns="columns"
      :loading="loading"
      :show-pagination="false"
      @edit="handleEditModal"
      @delete="handleDeleteModal" />

    <!-- Add Modal -->
    <FormModal
      v-model:open="addModalOpen"
      title="إضافة تخصص جديد"
      description="أدخل بيانات التخصص الجديد"
      :is-pending="newMajor.pending"
      @submit="addMajor"
      @cancel="closeAddModal">
      <template #default>
        <div class="space-y-4">
          <UFormField label="اسم التخصص" name="name">
            <UInput v-model="newMajor.name" class="w-full" />
          </UFormField>
          
          <UFormField label="الكلية" name="college_id">
            <USelect
              v-model="newMajor.college_id"
              :items="colleges?.data.map(c => ({ label: c.name, value: c.id }))"
              placeholder="اختر الكلية"
              class="w-full" />
          </UFormField>

          <UFormField label="الدرجة" name="degree_id">
            <USelect
              v-model="newMajor.degree_id"
              :items="degreeStore.degrees.map(d => ({ label: d.name, value: d.id }))"
              placeholder="اختر الدرجة"
              class="w-full" />
          </UFormField>

          <UFormField label="عدد السنوات" name="years">
            <UInput
              v-model="newMajor.years"
              type="number"
              min="1"
              max="10"
              class="w-full" />
          </UFormField>
        </div>
      </template>
    </FormModal>

    <!-- Edit Modal -->
    <FormModal
      v-model:open="editModalOpen"
      title="تعديل التخصص"
      description="قم بتعديل بيانات التخصص"
      :is-pending="editMajor.pending"
      @submit="updateMajor"
      @cancel="closeEditModal">
      <template #default>
        <UFormField label="اسم التخصص" name="name">
          <UInput v-model="editMajor.name" class="w-full" />
        </UFormField>
      </template>
    </FormModal>

    <!-- Delete Modal -->
    <DeleteModal
      v-model:open="deleteModalOpen"
      resource-name="التخصص"
      @confirm="deleteMajorConfirm"
      @cancel="closeDeleteModal" />
  </div>
</template>