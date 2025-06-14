<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table';

useHead({ title: 'المجموعات' });

// ——— Refs & State ———
const table = useTemplateRef('table');
const currentPage = ref(1);
const toast = useToast();

// Fetch majors for select
const { data: majors } =
  await useCachedFetch<IPaginatedFetchResponse<IMajor>>('/majors');

// Search & Debounce
const searchTerm = ref('');
const debouncedSearchTerm = debouncedRef(searchTerm, 1000);

const levelToArabic = (level: number) => {
  const arabicLevels = [
    'الأول',
    'الثاني',
    'الثالث',
    'الرابع',
    'الخامس',
    'السادس',
    'السابع',
    'الثامن',
    'التاسع',
    'العاشر',
  ];
  if (level >= 1 && level <= 10) {
    return arabicLevels[level - 1];
  }
  return level.toString();
};

// New / Edit Modal State
const newGroup = reactive({
  join_year: null as number | null,
  division: '',
  major_id: undefined as number | undefined,
  pending: false,
});

// Delete State
const deletedGroupId = ref<number | null>(null);
const addModalOpen = ref(false);
const deleteModalOpen = ref(false);

// Division options: English capitalized letters
const divisionOptions = Array.from({ length: 26 }, (_, i) => ({
  label: String.fromCharCode(65 + i),
  value: String.fromCharCode(65 + i),
}));

// ——— Computed Filters ———
const filters = computed(() => {
  if (!debouncedSearchTerm.value) return [];
  return [
    {
      type: 'and',
      nested: [
        {
          type: 'or',
          field: 'division',
          operator: 'like',
          value: `%${debouncedSearchTerm.value}%`,
        },
      ],
    },
  ];
});

// ——— Fetch Groups (Search Endpoint Only) ———
const {
  data: groupsResult,
  pending: loading,
  refresh,
} = await useCachedFetch<IPaginatedFetchResponse<IGroup>>('/groups/search', {
  method: 'POST',
  body: {
    filters,
    page: computed(() => currentPage.value),
  },
});

// ——— Pagination Setup ———
const pagination = reactive({
  pageIndex: 0,
  pageSize: computed(() => groupsResult.value?.meta?.per_page ?? 15),
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

// **Add Group**
const addGroup = async () => {
  if (!newGroup.join_year || !newGroup.division || !newGroup.major_id) return;

  newGroup.pending = true;
  const { error } = await useCachedFetch<IGroup>('/groups', {
    method: 'POST',
    body: {
      join_year: newGroup.join_year,
      division: newGroup.division,
      major_id: newGroup.major_id,
    },
  });

  if (error.value) {
    toast.add({
      title: 'خطأ عند إضافة مجموعة',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    });
  } else {
    toast.add({
      title: 'تمت إضافة مجموعة',
      description: `تمت إضافة "${newGroup.division}".`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
    currentPage.value = 1;
    pagination.pageIndex = 0;
    refresh();
  }

  newGroup.join_year = null;
  newGroup.division = '';
  newGroup.major_id = undefined;
  newGroup.pending = false;
  addModalOpen.value = false;
};

// Helper to calculate level from join year and current year
function getLevel(joinYear: number | null): number | null {
  if (!joinYear) return null;
  const now = new Date();
  // Academic year: if after August, increment year
  let currentYear = now.getFullYear();
  if (now.getMonth() >= 7) currentYear += 1;
  const level = currentYear - joinYear;
  return level > 0 ? level : 1;
}

// Remove columns/actions related to edit/delete
const columns = [
  {
    accessorKey: 'id',
    header: 'المعرف',
    cell: ({ row }: any) => row.getValue('id'),
  },
  {
    accessorKey: 'join_year',
    header: 'سنة الانضمام',
    cell: ({ row }: any) => row.getValue('join_year'),
  },
  {
    id: 'level',
    header: 'المستوى',
    cell: ({ row }: any) => {
      const joinYear = row.getValue('join_year');
      const majorId = row.getValue('major_id');
      const major = majors.value?.data.find((m: any) => m.id === majorId);
      const years = major?.years ?? 4;
      const level = getLevel(joinYear);
      const graduated = level !== null && level > years;
      const graduationYear = Number(joinYear) + years;

      let label = '';
      if (graduated) {
        label = `خريجين ${graduationYear}`;
      } else if (level !== null) {
        label = levelToArabic(level);
      }

      return h(
        resolveComponent('UBadge'),
        {
          color: graduated ? 'success' : 'primary',
          icon: graduated ? 'i-lucide-graduation-cap' : '',
          variant: 'subtle',
        },
        [label]
      );
    },
  },
  {
    accessorKey: 'division',
    header: 'الشعبة',
    cell: ({ row }: any) => row.getValue('division'),
  },
  {
    accessorKey: 'major_id',
    header: 'التخصص',
    cell: ({ row }: any) =>
      majors.value?.data.find((m: any) => m.id === row.getValue('major_id'))
        ?.name,
  },
  {
    accessorKey: 'created_at',
    header: 'تاريخ الإنشاء',
    cell: ({ row }: any) => toArabicDate(row.getValue('created_at')),
  },
  {
    accessorKey: 'updated_at',
    header: 'آخر تعديل',
    cell: ({ row }: any) => toArabicDate(row.getValue('updated_at')),
  },
];
</script>

<template>
  <div class="space-y-4 pb-4">
    <!-- 📌 Search & Controls -->
    <div class="flex gap-4 items-center">
      <UInput
        v-model="searchTerm"
        placeholder="بحث باسم الشعبة"
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
        إضافة مجموعة
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
      :columns="columns"
      :data="groupsResult?.data"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e text-right',
      }" />

    <!-- 🔢 Pagination Controls -->
    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="
          (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
        "
        :items-per-page="table?.tableApi.getState().pagination.pageSize"
        :total="groupsResult?.meta?.total ?? 0"
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
      title="إضافة مجموعة جديدة"
      description="أدخل بيانات المجموعة الجديدة">
      <template #body>
        <UFormField label="سنة الانضمام" name="join_year">
          <UInput
            v-model="newGroup.join_year"
            type="number"
            min="1900"
            placeholder="أدخل سنة الانضمام"
            class="w-full" />
        </UFormField>
        <UFormField label="الشعبة" name="division" class="mt-2">
          <USelect
            v-model="newGroup.division"
            :items="divisionOptions"
            placeholder="اختر الشعبة"
            class="w-full" />
        </UFormField>
        <UFormField label="التخصص" name="major_id" class="mt-2">
          <USelect
            v-model="newGroup.major_id"
            :items="majors?.data.map(m => ({ label: m.name, value: m.id }))"
            searchable
            placeholder="اختر التخصص"
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
            :loading="newGroup.pending"
            @click="addGroup" />
        </div>
      </template>
    </UModal>
  </div>
</template>
