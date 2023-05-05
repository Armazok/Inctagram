//eslint-disable-next-line
//@ts-ignore
import { v1 } from 'uuid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
// @ts-ignore

type PostType = {
  uploadId: string
  croppedPhoto: string
  filteredPhoto: string
  isLoadedFromDB: boolean
}

interface PostStore {
  postPhotos: PostType[]
  postDescription: string
  imageDbCount: number
  setImageDbCount: (imageDbCount: number) => void
  setCroppedPhoto: (croppedPhoto: string) => void
  setPostDescription: (description: string) => void
  setFilteredPhoto: (uploadId: any, filteredPhoto: string) => void
  clearPostPhotos: () => void
  setPhotoFromDB: (photo: PostType) => void
}

export const usePostStore = create<PostStore>()(
  immer(set => ({
    postPhotos: [],
    postDescription: '',
    imageDbCount: 0,
    setImageDbCount(imageDbCount: number) {
      set((state): any => {
        state.imageDbCount = imageDbCount
      })
    },
    setCroppedPhoto(croppedPhoto: string) {
      set((state): any => {
        const uploadId = v1()
        state.postPhotos.push({
          uploadId: uploadId,
          croppedPhoto: croppedPhoto,
          filteredPhoto: croppedPhoto,
          isLoadedFromDB: false,
        })
      })
    },
    setPostDescription(description: string) {
      set((state): any => {
        state.postDescription = description
      })
    },
    setFilteredPhoto(uploadId, filteredPhoto) {
      set((state): any => {
        const photo = state.postPhotos.find(photo => {
          return photo.uploadId === uploadId
        })

        if (photo) {
          const photoIndex = state.postPhotos.indexOf(photo)
          state.postPhotos[photoIndex].filteredPhoto = filteredPhoto
        }
      })
    },
    clearPostPhotos() {
      set((state): any => {
        state.postPhotos = []
      })
    },
    setPhotoFromDB(photo: PostType) {
      set((state): any => {
        const { uploadId, filteredPhoto, croppedPhoto } = photo
        debugger
        console.log(photo, 'photo')
        console.log(photo.filteredPhoto, 'filteredPhoto')
        state.postPhotos.push({ uploadId, filteredPhoto, croppedPhoto, isLoadedFromDB: true })
      })
    },
  }))
)
