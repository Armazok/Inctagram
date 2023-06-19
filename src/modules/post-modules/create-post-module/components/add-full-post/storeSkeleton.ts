import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface StoreType {
  isLoadingPublication: boolean
  setIsLoadingPublication: (isLoadingPublication: boolean) => void
}

const createStore = (store: (set: (store: StoreType) => void) => StoreType) =>
  create<StoreType, [['zustand/devtools', never]]>(devtools(store))
const storeIsLoadingPublication = (set: any): StoreType => ({
  isLoadingPublication: false,
  setIsLoadingPublication: isLoadingPublication =>
    set({ isLoadingPublication: isLoadingPublication }, false, 'setIsLoadingPublication'),
})

export const useStoreIsLoadingPublication = createStore(storeIsLoadingPublication)
