<template>
  <div class="flex gap-4 items-center">
    <UInput
      v-model="searchTerm"
      :placeholder="placeholder"
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

    <slot name="filters" />

    <UButton
      icon="i-lucide-rotate-ccw"
      color="neutral"
      class="text-nowrap"
      variant="outline"
      @click="handleRefresh">
      تحديث
    </UButton>

    <slot name="actions" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  placeholder?: string;
  modelValue?: string;
  showRefresh?: boolean;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
  (e: 'refresh'): void;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'بحث...',
  showRefresh: true,
});

const emit = defineEmits<Emits>();

const searchTerm = computed({
  get: () => props.modelValue || '',
  set: (value: string) => emit('update:modelValue', value),
});

const handleRefresh = () => {
  searchTerm.value = '';
  emit('refresh');
};
</script>