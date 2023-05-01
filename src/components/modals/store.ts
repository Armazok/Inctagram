import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface BearState {
  isModalOpen: boolean
  setOpenModal: (isModalOpen: any) => void
}

export const useModalStore = create<BearState>()(
  devtools(set => ({
    isModalOpen: false,
    setOpenModal: isModalOpen => set({ isModalOpen: isModalOpen }),
  }))
)
