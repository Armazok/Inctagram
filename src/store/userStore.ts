import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UserStore {
  email: string | null
  isLoggedIn: boolean
  userName: string | null
  logout: () => void
  accessToken: string | null
}

export const useUserStore = create<UserStore>()(
  devtools(set => ({
    email: 'test1337@gmail.com',
    isLoggedIn: true,
    userName: '',
    accessToken: '',
    logout() {
      set({ email: null, isLoggedIn: false })
    },
  }))
)
