import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UserStore {
  email: string | null
  isLoggedIn: boolean
  userName: string | null
  logout: () => void
  accessToken: string | null
  uploadId: string
  setUploadId: (uploadId: string) => void
  idMe: number | undefined
  setIdMe: (idMe: number) => void
}

export const useUserStore = create<UserStore>()(
  devtools(set => ({
    email: 'test1337@gmail.com',
    isLoggedIn: true,
    userName: '',
    accessToken: '',
    uploadId: '',
    setUploadId(uploadId) {
      set({ uploadId: uploadId })
    },
    idMe: undefined,
    setIdMe(idMe) {
      set({ idMe: idMe })
    },
    logout() {
      set({ email: null, isLoggedIn: false })
    },
  }))
)
