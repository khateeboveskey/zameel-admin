<template>
  <UButton label="زميل" variant="outline" @click="useAuth().logout()" />
</template>

<script setup lang="ts">
useHead({ title: 'الرئيسية' });
</script>
