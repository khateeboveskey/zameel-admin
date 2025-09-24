<template>
  <UModal
    :open="open"
    @update:open="$emit('update:open', $event)"
    :title="title"
    :description="description">
    <template #body>
      <div class="mb-4">
        <p class="text-gray-600">
          {{ message || `هل أنت متأكد من أنك تريد حذف هذا ${resourceName}؟` }}
        </p>
        <p class="text-sm text-gray-500 mt-2">
          لا يمكن التراجع عن هذا الإجراء.
        </p>
      </div>
      
      <div class="flex justify-end gap-2">
        <UButton
          label="إلغاء"
          color="neutral"
          variant="outline"
          @click="$emit('cancel')" />
        <UButton
          :label="confirmLabel"
          icon="i-lucide-trash"
          color="red"
          :loading="isPending"
          @click="$emit('confirm')" />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
interface Props {
  open: boolean;
  title?: string;
  description?: string;
  message?: string;
  resourceName?: string;
  confirmLabel?: string;
  isPending?: boolean;
}

interface Emits {
  (e: 'update:open', value: boolean): void;
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}

withDefaults(defineProps<Props>(), {
  title: 'تأكيد الحذف',
  description: 'هذا الإجراء لا يمكن التراجع عنه',
  resourceName: 'العنصر',
  confirmLabel: 'حذف',
  isPending: false,
});

defineEmits<Emits>();
</script>