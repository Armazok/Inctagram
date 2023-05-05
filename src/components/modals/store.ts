import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface StoreType {
  isModalOpen: boolean
  setIsModalOpen: (isModalOpen: boolean) => void
}

//Надо узнать правильную типизацию zustand
// const createStore = store => create(devtools(store))
const storeModal = (set: any): StoreType => ({
  isModalOpen: false,
  setIsModalOpen: isModalOpen => set({ isModalOpen: isModalOpen }, false, 'setIsModalOpen'),
})

export const useStoreWithContentModal = create(devtools(storeModal))
export const useStoreCropEditorModal = create(devtools(storeModal))
export const useStoreFilterEditorModal = create(devtools(storeModal))
export const useStoreAddPostModal = create(devtools(storeModal))
export const useStoreAvatarBlockModal = create(devtools(storeModal))
