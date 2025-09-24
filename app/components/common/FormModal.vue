<template>
  <UModal
    :open="open"
    @update:open="$emit('update:open', $event)"
    :title="title"
    :description="description">
    <template #body>
      <slot :form-data="formData" :is-pending="isPending" />
      
      <div class="flex justify-end gap-2 mt-4">
        <UButton
          label="إلغاء"
          color="neutral"
          variant="outline"
          @click="$emit('cancel')" />
        <UButton
          :label="submitLabel"
          :icon="submitIcon"
          color="primary"
          :loading="isPending"
          @click="$emit('submit')" />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
interface Props {
  open: boolean;
  title: string;
  description?: string;
  submitLabel?: string;
  submitIcon?: string;
  isPending?: boolean;
  formData?: any;
}

interface Emits {
  (e: 'update:open', value: boolean): void;
  (e: 'submit'): void;
  (e: 'cancel'): void;
}

withDefaults(defineProps<Props>(), {
  submitLabel: 'حفظ',
  submitIcon: 'i-lucide-save',
  isPending: false,
});

defineEmits<Emits>();
</script>