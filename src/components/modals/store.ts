import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface StoreType {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

const storeModule = (set: any): StoreType => ({
  isModalOpen: false,
  setIsModalOpen: isModalOpen => set({ isModalOpen: isModalOpen }, false, 'setIsModalOpen'),
})

export const useStoreWithContentModal = create(devtools(storeModule))
export const useStoreCropEditorModule = create(devtools(storeModule))
export const useStoreFilterEditorModule = create(devtools(storeModule))
export const useStoreAddPostModule = create(devtools(storeModule))
export const useStoreAvatarBlockModule = create(devtools(storeModule))
