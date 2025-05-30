<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import { useRoleStore } from '~/stores/role'

const roleStore = useRoleStore()
const table = useTemplateRef('table')
const currentPage = ref(1)
const updatingRole = ref<number[]>([])

// Fetch users
const { data: users, pending, refresh } = await useCachedFetch<IUserIndexResponse>('/users', {
  params: { page: currentPage }
})

// Prepare role options
const items = computed(() =>
  roleStore.roles.map(role => ({
    ...role,
    label: role.name,
    value: role.id,
    id: role.id,
    icon: role.icon,
    color: role.color || 'gray'
  }))
)

// Selected roles per user (full object)
const selectedRoles = ref<Record<number, any>>({})

watchEffect(() => {
  if (users.value?.data) {
    users.value.data.forEach(user => {
      selectedRoles.value[user.id] = items.value.find(role => role.id === user.role_id)
    })
  }
})

// Update role
const updateRole = async (userId: number, newRoleId: number) => {
  updatingRole.value.push(userId)
  const { data: updatedRoleUser, error } = await useCachedFetch<IUserShowResponse>(`/users/${userId}/roles/${newRoleId}`, {
    method: 'POST',
    body: { user: userId, role: newRoleId }
  })

  updatingRole.value = updatingRole.value.filter(id => id !== userId)

  if (error.value) {
    console.error(error.value)
  } else {
    await refresh()
    const user = updatedRoleUser.value?.data;
    useToast().add({
      title: 'تمت العملية بنجاح',
      description: `تم تحديث رتبة ${user?.name.split(' ').slice(0, 2).join(' ')} ل${roleStore.getRole(Number(user?.role_id))?.name}`,
      color: 'success',
      icon: 'i-lucide-alert-triangle',
    })
  }
}

// Columns
const columns: TableColumn<IUser>[] = [
  { accessorKey: 'id', header: 'المعرف', cell: ({ row }) => row.getValue('id') },
  { accessorKey: 'name', header: 'الاسم', cell: ({ row }) => row.getValue('name') },
  { accessorKey: 'role_id', header: 'الرتبة' },
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
  }
]

// Pagination state
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
      :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }"
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
          <p class="font-medium text-highlighted">{{ row.original.name }}</p>
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
        <USelectMenu
          v-model="selectedRoles[row.original.id]"
          :items="items"
          option-attribute="id"
          :icon="selectedRoles[row.original.id]?.icon"
          :color="selectedRoles[row.original.id]?.color"
          :highlight="true"
          :search-input="false"
          :loading="updatingRole.includes(row.original.id)"
          class="w-full mt-2"
          @update:model-value="val => updateRole(row.original.id, val.id)"
        >
          <template #default>
            {{ selectedRoles[row.original.id]?.label || 'اختر رتبة' }}
          </template>
        </USelectMenu>
      </template>
    </UTable>

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi.getState().pagination.pageSize"
        :total="users?.meta.total"
        @update:page="p => currentPage = p"
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
