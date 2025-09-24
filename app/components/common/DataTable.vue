<template>
  <div class="space-y-4">
    <!-- Table -->
    <UTable
      ref="table"
      :empty="emptyText"
      :sticky="sticky"
      :loading="loading"
      :columns="columns"
      :data="data"
      :ui="tableUI"
      v-model:pagination="pagination"
      :pagination-options="paginationOptions">
      
      <!-- Actions cell template -->
      <template #actions-cell="{ row }">
        <UDropdownMenu
          :items="actionItems"
          :popper="{ placement: 'bottom-start' }">
          <UButton
            icon="i-lucide-more-vertical"
            color="neutral"
            variant="ghost" />
          <template #edit-label>
            <div @click="$emit('edit', row.original)">تعديل</div>
          </template>
          <template #delete-label>
            <div @click="$emit('delete', row.original.id)">حذف</div>
          </template>
        </UDropdownMenu>
      </template>

      <!-- Pass through all other slots -->
      <template v-for="(slot, name) in $slots" #[name]="slotProps" :key="name">
        <slot :name="name" v-bind="slotProps" />
      </template>
    </UTable>

    <!-- Pagination -->
    <div v-if="showPagination && meta" class="flex justify-center">
      <UPagination
        :total="meta.total"
        :page-count="meta.per_page"
        :current-page="meta.current_page"
        @update:page="handlePageChange"
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

<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table';

interface Props {
  data?: any[];
  columns?: any[];
  loading?: boolean;
  emptyText?: string;
  sticky?: boolean;
  showPagination?: boolean;
  meta?: IFetchResponseMeta;
  actionItems?: any[];
  tableUI?: Record<string, string>;
  paginationOptions?: any;
  pagination?: any;
}

interface Emits {
  (e: 'edit', item: any): void;
  (e: 'delete', id: number): void;
  (e: 'page-change', page: number): void;
  (e: 'update:pagination', pagination: any): void;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  columns: () => [],
  loading: false,
  emptyText: 'لا يوجد بيانات',
  sticky: true,
  showPagination: true,
  actionItems: () => [
    { label: 'تعديل', slot: 'edit-label', icon: 'i-lucide-edit' },
    { label: 'حذف', slot: 'delete-label', icon: 'i-lucide-trash' },
  ],
  tableUI: () => ({
    base: 'table-fixed border-separate border-spacing-0',
    thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
    tbody: '[&>tr]:last:[&>td]:border-b-0',
    td: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e text-right',
    th: 'py-2 first:rounded-s-lg last:rounded-e-lg border-y border-default first:border-s last:border-e text-right',
  }),
  paginationOptions: () => ({ getPaginationRowModel: getPaginationRowModel() }),
});

const emit = defineEmits<Emits>();

const table = useTemplateRef('table');

const pagination = computed({
  get: () => props.pagination,
  set: (value) => emit('update:pagination', value),
});

const handlePageChange = (page: number) => {
  emit('page-change', page);
};
</script>