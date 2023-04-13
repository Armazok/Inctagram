import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UserStore {
  email: string | null
  isLoggedIn: boolean
  userName: boolean
  logout: () => void
  accessToken: string | null
}

export const useUserStore = create<UserStore>()(
  devtools(set => ({
    email: 'test1337@gmail.com',
    isLoggedIn: true,
    userName: true,
    accessToken: '',
    logout() {
      set({ email: null, isLoggedIn: false })
    },
  }))
)
