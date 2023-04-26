import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UserStore {
  accessToken: string | null
  uploadId: string
  setUploadId: (uploadId: string) => void
  idImg: number | undefined
  setIdMe: (idImg: number) => void
  postId: number | null
  setPostId: (id: number) => void
}

export const useUserStore = create<UserStore>()(
  devtools(set => ({
    accessToken: '',
    uploadId: '',
    postId: null,
    setUploadId(uploadId) {
      set({ uploadId: uploadId })
    },
    idImg: undefined,
    setIdMe(idImg) {
      set({ idImg: idImg })
    },
    setPostId(id) {
      set({ postId: id })
    },
  }))
)
