import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UserStore {
  email: string
  isLoggedIn: boolean
  logout: () => void
}

export const useUserStore = create<UserStore>(
  devtools(set => ({
    email: 'test1337@gmail.com',
    isLoggedIn: true,
    logout() {
      set({ email: null, isLoggedIn: false })
    },
  }))
)
