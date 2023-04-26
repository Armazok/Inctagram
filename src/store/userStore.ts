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
  idImg: number | undefined
  setIdMe: (idImg: number) => void
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
    idImg: undefined,
    setIdMe(idImg) {
      set({ idImg: idImg })
    },
    logout() {
      set({ email: null, isLoggedIn: false })
    },
  }))
)
