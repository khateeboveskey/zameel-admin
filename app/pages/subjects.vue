<script setup lang="ts">
import { ref, reactive, computed, nextTick } from 'vue';
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui';

useHead({ title: 'المواد' });

// ——— Refs & State ———
const table = useTemplateRef('table');
const toast = useToast();

// Search
const searchTerm = ref('');

// New / Edit Modal State
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

// Delete State
const deletedSubjectId = ref<number | null>(null);
const addModalOpen = ref(false);
const editModalOpen = ref(false);
const deleteModalOpen = ref(false);

// ——— Fetch Subjects (Search Endpoint Only) ———
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

// **Add Subject**
const addSubject = async () => {
  if (!newSubject.name.trim()) return;

  newSubject.pending = true;
  const { error } = await useCachedFetch<ISubject>('/subjects', {
    method: 'POST',
    body: { name: newSubject.name.trim() },
  });

  if (error.value) {
    toast.add({
      title: 'خطأ عند إضافة مادة',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    });
  } else {
    toast.add({
      title: 'تمت إضافة مادة',
      description: `تمت إضافة "${newSubject.name.trim()}".`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
    refresh();
  }

  newSubject.name = '';
  newSubject.pending = false;
  addModalOpen.value = false;
};

// **Update Subject**
const updateSubject = async () => {
  if (!editSubject.id || !editSubject.name.trim()) return;

  editSubject.pending = true;
  const { error } = await useCachedFetch<ISubject>(
    `/subjects/${editSubject.id}`,
    {
      method: 'PATCH',
      body: { name: editSubject.name.trim() },
    }
  );

  if (error.value) {
    toast.add({
      title: 'خطأ عند تعديل مادة',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    });
  } else {
    toast.add({
      title: 'تم تعديل مادة',
      description: `تم تحديث "${editSubject.name.trim()}".`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
    refresh();
  }

  editSubject.id = null;
  editSubject.name = '';
  editSubject.pending = false;
  editModalOpen.value = false;
};

// **Delete Subject**
const deleteSubject = async () => {
  if (!deletedSubjectId.value) return;

  const { data: deleted, error } = await useCachedFetch<
    IFetchResponse<ISubject>
  >(`/subjects/${deletedSubjectId.value}`, { method: 'DELETE' });

  if (error.value) {
    toast.add({
      title: 'خطأ عند حذف مادة',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    });
  } else {
    toast.add({
      title: 'تم حذف مادة',
      description: `تم حذف "${deleted.value?.data.name}".`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
    refresh();
  }

  deletedSubjectId.value = null;
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
function openEditModal(subject: ISubject) {
  editModalOpen.value = false;
  nextTick(() => {
    editSubject.id = subject.id;
    editSubject.name = subject.name;
    editModalOpen.value = true;
  });
}

function openDeleteModal(id: number) {
  deleteModalOpen.value = false;
  nextTick(() => {
    deletedSubjectId.value = id;
    deleteModalOpen.value = true;
  });
}

// ——— Page Meta ———
definePageMeta({
  title: 'المواد',
  description: 'عرض وإدارة المواد الدراسية في الجامعة كافة',
});
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
        clearable />
      <UButton
        icon="i-lucide-rotate-ccw"
        color="neutral"
        class="text-nowrap"
        variant="outline"
        @click="searchTerm = ''">
        تحديث
      </UButton>

      <UButton
        icon="i-lucide-plus"
        color="primary"
        class="text-nowrap"
        @click="addModalOpen = true">
        إضافة مادة
      </UButton>
    </div>

    <!-- 🗃️ Data Table -->
    <UTable
      ref="table"
      empty="لا يوجد بيانات"
      :loading="loading"
      :columns="columns as any"
      :data="filteredSubjects"
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

    <!-- ➕ Add Modal -->
    <UModal
      v-model:open="addModalOpen"
      title="إضافة مادة جديدة"
      description="أدخل اسم المادة الجديدة">
      <template #body>
        <UFormField label="الاسم" name="name">
          <UInput v-model="newSubject.name" class="w-full" />
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
            :loading="newSubject.pending"
            @click="addSubject" />
        </div>
      </template>
    </UModal>

    <!-- ✏️ Edit Modal -->
    <UModal
      v-model:open="editModalOpen"
      title="تعديل المادة"
      description="قم بتعديل بيانات المادة">
      <template #body>
        <UFormField label="الاسم" name="name">
          <UInput v-model="editSubject.name" class="w-full" />
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
            :loading="editSubject.pending"
            @click="updateSubject" />
        </div>
      </template>
    </UModal>

    <!-- 🗑️ Delete Modal -->
    <UModal
      v-model:open="deleteModalOpen"
      title="حذف المادة"
      description="هل أنت متأكد من حذف هذه المادة؟"
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
            @click="deleteSubject" />
        </div>
      </template>
    </UModal>
  </div>
</template>
