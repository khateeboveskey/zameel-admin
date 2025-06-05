import { defineStore } from 'pinia'

interface Role {
  id: number
  name: string
  icon: string
  color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'error'
    | 'neutral'
}

const roles: Role[] = [
  {
    id: 1,
    name: 'مشرف',
    color: 'error',
    icon: 'lucide-shield-user',
  },
  {
    id: 2,
    name: 'إداري',
    color: 'warning',
    icon: 'lucide-school',
  },
  {
    id: 3,
    name: 'أكاديمي',
    color: 'success',
    icon: 'lucide-book',
  },
  {
    id: 4,
    name: 'مندوب',
    color: 'secondary',
    icon: 'lucide-user-round-pen',
  },
  {
    id: 5,
    name: 'طالب',
    color: 'primary',
    icon: 'lucide-graduation-cap',
  },
]

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles,
  }),

  getters: {
    getRole: state => (id: number) => state.roles.find(role => role.id === id),
  },
})
