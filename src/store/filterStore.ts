import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IFilterStore {
  filter: string
  setFilter: (filter: string) => void
}

export const useFilterStore = create<IFilterStore>()(
  devtools(set => ({
    filter: 'none',
    setFilter(filter) {
      set({ filter: filter })
    },
  }))
)
