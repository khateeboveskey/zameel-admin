<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'

const table = useTemplateRef('table')
const currentPage = ref(1);

let { data: users, pending } = await useCachedFetch<IUserIndexResponse>('/users', {
  params: {
    page: currentPage
  }
});

const columns: TableColumn<IUser>[] = [
  {
    accessorKey: 'id',
    header: 'المعرف',
    cell: ({ row }) => row.getValue('id')
  },
  {
    accessorKey: 'name',
    header: 'الاسم',
    cell: ({ row }) => row.getValue('name')
  },
  {
    accessorKey: 'role_id',
    header: 'الرتب',
  },
  {
    accessorKey: 'email_verified_at',
    header: 'تاريخ تأكيد البريد',
    cell: ({ row }) => toArabicDate(row.getValue('email_verified_at'))
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
  },
]

const getRoleBadge = (
  id: string | number
): { color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'; icon: string } => {
  switch (id) {
    case 1:
      return { color: 'error', icon: 'lucide-shield-user' }
    case 2:
      return { color: 'warning', icon: 'lucide-school' }
    case 3:
      return { color: 'success', icon: 'lucide-book' }
    case 4:
      return { color: 'secondary', icon: 'lucide-user-round-pen' }
    case 5:
      return { color: 'primary', icon: 'lucide-graduation-cap' }
    default:
      return { color: 'neutral', icon: 'lucide-graduation-cap' }
  }
}

const updateRole = async (userId: number, newRoleId: number) => {
  const { data: updatedRoleUser, error } = await useCachedFetch(`/users/${userId}/roles/${newRoleId}`, {
    method: 'POST',
    body: {
      user: userId,
      role: newRoleId
    }
  });
  if (error.value) {
    console.log(error.value);
  }
  console.log(updatedRoleUser.value);
}

const pagination = ref({
  pageIndex: 0,
  pageSize: users.value?.meta.per_page || 15
})
</script>


<template>
  <div class="space-y-4 pb-4">
    <UTable
      class="h-[80dvh]"
      ref="table"
      v-model:pagination="pagination"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
      :sticky="true"
      :loading="pending"
      :columns="columns as any"
      :data="users?.data"
      :ui="{
        base: 'table-fixed border-separate border-spacing-0',
        thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
        tbody: '[&>tr]:last:[&>td]:border-b-0',
        th: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e text-right',
        td: 'border-b border-default'
      }"
    >
      <template #name-cell="{ row }">
        <div>
          <p class="font-medium text-highlighted">
            {{ row.original.name }}
          </p>
          <NuxtLink
            external
            target="_blank"
            class="hover:underline"
            :to="`mailto:${row.original.email}`"
          >
            {{ row.original.email }}
          </NuxtLink>
        </div>
      </template>
      <template #role_id-cell="{ row }">
        <UBadge
          :icon="getRoleBadge(row.original.role_id)?.icon"
          :ui="{
            base: 'py-0'
          }"
          :color="getRoleBadge(row.original.role_id)?.color"
          variant="subtle"
        >
          <span>{{ getRole(row.original.role_id) }}</span>
        </UBadge>
      </template>
      <template #actions-cell="{ row }">
        <UButton @click="updateRole(Number(row.original.id), 4)">{{ row.original.id }}</UButton>
      </template>
    </UTable>

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi.getState().pagination.pageSize"
        :total="users?.meta.total"
        @update:page="(p) => currentPage = p"
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
