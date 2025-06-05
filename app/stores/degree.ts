import { defineStore } from 'pinia'

interface Degree {
  id: number
  name: string
}

const degrees: Degree[] = [
  {
    id: 1,
    name: 'دبلوم',
  },
  {
    id: 2,
    name: 'بكالريوس',
  },
  {
    id: 3,
    name: 'ماجستير',
  },
  {
    id: 4,
    name: 'دكتوراه',
  },
  {
    id: 5,
    name: 'بروفيسوراه',
  },
]

export const useDegreeStore = defineStore('degree', {
  state: () => ({
    degrees,
  }),

  getters: {
    getDegree: state => (id: number) =>
      state.degrees.find(degree => degree.id === id),
  },
})
