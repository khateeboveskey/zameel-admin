<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const toast = useToast()

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: 'البريد الإلكتروني',
  placeholder: 'أدخل بريدك الإلكتروني',
  required: true,
}, {
  name: 'password',
  label: 'كلمة المرور',
  type: 'password' as const,
  placeholder: 'أدخل كلمة المرور',
  required: true,
}, {
  name: 'remember',
  label: 'تذكرني',
  type: 'checkbox' as const
}]

const schema = z.object({
  email: z.string({ required_error: 'هذا الحقل مطلوب' }).email('بريد إلكتروني غير صالح'),
  password: z.string({ required_error: 'هذا الحقل مطلوب' }).min(8, 'يجب أن يكون طول كلمة المرور 8 أحرف على الأقل')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
  toast.add({
    title: 'تم تسجيل الدخول بنجاح',
    description: 'مرحبًا بك في زميل!',
    color: 'success',
    icon: 'i-lucide-check-circle',
  })
}

definePageMeta({
  layout: 'no-sidebar',
})
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center gap-4 p-4 bg-muted">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :ui="{
          leading: 'h-fit -m-4'
        }"
        :schema="schema"
        title="تسجيل الدخول"
        description="قم بتسجيل الدخول كمشرف في زميل."
        icon="i-lucide-user"
        :fields="fields"
        :submit="{
          label: 'تسجيل الدخول',
          loading: false
        }"
        @submit="onSubmit"
      >
        <template #leading>
          <IconLogo class="mx-auto text-[150px]" />
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
