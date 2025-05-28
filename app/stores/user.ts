import { defineStore } from 'pinia'
import type { User } from '~/models/user'

interface UserState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  remember: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
    isAuthenticated: false,
    token: null,
    remember: false,
  }),

  getters: {
    getUserData: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated && !!state.token,
    getToken: (state) => state.token,
  },

  actions: {
    setUser(userData: User) {
      this.user = userData
      this.isAuthenticated = true
    },

    setToken(token: string) {
      this.token = token
    },

    setRemember(remember: boolean) {
      this.remember = remember
    },

    login(userData: User, token: string, remember = false) {
      this.setUser(userData)
      this.setToken(token)
      this.setRemember(remember)
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      this.token = null
      this.remember = false
    },

    updateUser(userData: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...userData }
      }
    },
  },
  persist: true
})