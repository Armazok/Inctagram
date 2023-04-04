import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IUserStore {
  state: { email: string }
  isLoggedIn: boolean
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
  setEmail: (email: string) => void
}

export const useUserStore = create<IUserStore>()(
  devtools(set => ({
    state: {
      email: '',
    },
    isLoggedIn: false,
    isModalOpen: false,
    setIsModalOpen: (isModalOpen: boolean) =>
      set(state => ({
        ...state,
        isModalOpen,
      })),
    setEmail: (email: string) =>
      set(state => ({
        ...state,
        state: { email },
      })),
  }))
)
