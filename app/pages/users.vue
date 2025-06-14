<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table';
import type { TableColumn } from '@nuxt/ui';
import { useRoleStore } from '~/stores/role';

useHead({ title: 'المستخدمون' });

const roleStore = useRoleStore();
const table = useTemplateRef('table');
const currentPage = ref(1);
const updatingRole = ref<number[]>([]);

// Search state
const searchTerm = ref('');
const debouncedSearchTerm = debouncedRef(searchTerm, 1000);
const selectedRolesFilter = ref<any[]>([]);
const verifiedOnly = ref(false);

// Fetch users
const {
  data: users,
  pending,
  refresh,
} = await useCachedFetch<IUserIndexResponse>('/users', {
  params: { page: currentPage },
});

// Advanced search
const filters = computed(() => {
  const filterArr: any[] = [];

  if (debouncedSearchTerm.value) {
    filterArr.push({
      type: 'or',
      field: 'name',
      operator: 'like',
      value: `%${debouncedSearchTerm.value}%`,
    });
    filterArr.push({
      type: 'or',
      field: 'email',
      operator: 'like',
      value: `%${debouncedSearchTerm.value}%`,
    });
  }

  if (selectedRolesFilter.value.length) {
    filterArr.push({
      type: 'and',
      field: 'role_id',
      operator: 'in',
      value: selectedRolesFilter.value.map(role => role.id),
    });
  }

  if (verifiedOnly.value) {
    filterArr.push({
      type: 'and',
      field: 'email_verified_at',
      operator: '!=',
      value: null,
    });
  }

  return filterArr.length ? [{ type: 'and', nested: filterArr }] : [];
});

const {
  data: usersSearchResult,
  refresh: refreshSearch,
  pending: searchPending,
} = await useCachedFetch<IUserIndexResponse>('/users/search', {
  method: 'POST',
  body: {
    filters: filters,
    page: computed(() => currentPage.value),
  },
});

// Watch for filter changes and refresh search
watch([debouncedSearchTerm, selectedRolesFilter, verifiedOnly], () => {
  currentPage.value = 1;
  refreshSearch();
});

// Prepare role options
const items = computed(() =>
  roleStore.roles.map(role => ({
    ...role,
    label: role.name,
    value: role.id,
    id: role.id,
    icon: role.icon,
    color: role.color || 'neutral',
  }))
);

// Selected roles per user (full object)
const selectedRoles = computed<Record<number, any>>(() => {
  const map: Record<number, any> = {};
  if (usersSearchResult.value?.data) {
    usersSearchResult.value.data.forEach(user => {
      map[user.id] = items.value.find(role => role.id === user.role_id);
    });
  }
  console.log(usersSearchResult.value?.data);

  return map;
});

// Update role
const updateRole = async (userId: number, newRoleId: number) => {
  updatingRole.value.push(userId);
  const { data: updatedRoleUser, error } =
    await useCachedFetch<IUserShowResponse>(
      `/users/${userId}/roles/${newRoleId}`,
      {
        method: 'POST',
        body: { user: userId, role: newRoleId },
      }
    );

  if (error.value) {
    useToast().add({
      title: 'حصل خطأ أثناء محاولة تحديث الرتبة',
      description: error.value.message,
      color: 'error',
      icon: 'i-lucide-alert-triangle',
    });
  } else {
    await refresh();
    updatingRole.value = updatingRole.value.filter(id => id !== userId);
    const user = updatedRoleUser.value?.data;
    useToast().add({
      title: 'تمت العملية بنجاح',
      description: `تم تحديث رتبة ${user?.name.split(' ').slice(0, 2).join(' ')} ل${roleStore.getRole(Number(user?.role_id))?.name}`,
      color: 'success',
      icon: 'i-lucide-circle-check',
    });
  }
};

// Columns
const columns: TableColumn<IUser>[] = [
  {
    accessorKey: 'id',
    header: 'المعرف',
    cell: ({ row }) => row.getValue('id'),
  },
  {
    accessorKey: 'name',
    header: 'الاسم',
    cell: ({ row }) => row.getValue('name'),
  },
  { accessorKey: 'role_id', header: 'الرتبة' },
  {
    accessorKey: 'email_verified_at',
    header: 'تاريخ تأكيد البريد',
    cell: ({ row }) => toArabicDate(row.getValue('email_verified_at')),
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
];

// Pagination state
const pagination = ref({
  pageIndex: 0,
  pageSize: computed(
    () =>
      usersSearchResult.value?.meta.per_page || users.value?.meta.per_page || 15
  ).value,
});

// Watch for pagination changes and update currentPage
watch(
  () => pagination.value.pageIndex,
  newPageIndex => {
    currentPage.value = newPageIndex + 1;
    refreshSearch();
  }
);

const resetFilters = () => {
  searchTerm.value = '';
  selectedRolesFilter.value = [];
  verifiedOnly.value = false;
  currentPage.value = 1;
  refreshSearch();
};

definePageMeta({
  title: 'المستخدمين',
});
</script>

<template>
  <div class="space-y-4 pb-4">
    <!-- Search & Filters -->
    <div class="flex flex-nowrap text-nowrap gap-4 items-center">
      <UInput
        v-model="searchTerm"
        placeholder="بحث بالاسم أو البريد"
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
      <USelectMenu
        v-model="selectedRolesFilter"
        :items="items"
        option-attribute="id"
        multiple
        class="w-72"
        placeholder="تصفية حسب الرتبة"
        :search-input="false"
        clearable>
        <template #default>
          <span v-if="selectedRolesFilter.length">
            {{ selectedRolesFilter.map(role => role.label).join(', ') }}
          </span>
          <span v-else>كل الرتب</span>
        </template>
      </USelectMenu>
      <UCheckbox
        v-model="verifiedOnly"
        label="مفعل البريد فقط"
        class="items-center" />
      <UButton
        icon="i-lucide-rotate-ccw"
        color="neutral"
        variant="outline"
        @click="resetFilters">
        إعادة تعيين الفلاتر
      </UButton>
    </div>

    <UTable
      ref="table"
      empty="لا يوجد بيانات"
      v-model:pagination="pagination"
      :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
      :sticky="true"
      :loading="pending || searchPending"
      :columns="columns as any"
      :data="usersSearchResult?.data"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e text-right',
        td: 'border-b border-default',
      }">
      <template #name-cell="{ row }">
        <div>
          <p class="font-medium text-highlighted">{{ row.original.name }}</p>
          <NuxtLink
            external
            target="_blank"
            class="hover:underline"
            :to="`mailto:${row.original.email}`">
            {{ row.original.email }}
          </NuxtLink>
        </div>
      </template>

      <template #role_id-cell="{ row }">
        <USelectMenu
          v-model="selectedRoles[row.original.id]"
          :items="items"
          :disabled="row.original.id === 1"
          option-attribute="id"
          :icon="selectedRoles[row.original.id]?.icon"
          :color="selectedRoles[row.original.id]?.color"
          :highlight="true"
          :search-input="false"
          :loading="updatingRole.includes(row.original.id)"
          class="w-full mt-2 disabled:opacity-50"
          @update:model-value="val => updateRole(row.original.id, val.id)">
          <template #default>
            {{ selectedRoles[row.original.id]?.label || 'اختر رتبة' }}
          </template>
        </USelectMenu>
      </template>
    </UTable>

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="
          (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
        "
        :items-per-page="table?.tableApi.getState().pagination.pageSize"
        :total="usersSearchResult?.meta?.total ?? users?.meta?.total"
        @update:page="p => (currentPage = p)"
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
