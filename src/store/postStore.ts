// @ts-ignore
import { v1 } from 'uuid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const usePostStore = create<PostStore>()(
  immer(set => ({
    postPhotos: [],
    postDescription: '',
    selectedPhotos: '',
    isLoadedFromDB: false,
    imageUrl: '',
    setImageUrl(imageUrl) {
      set((state): any => {
        state.imageUrl = imageUrl
      })
    },
    setUploadId(selectedPhotos: string | File | Blob | MediaSource) {
      set((state: any) => {
        state.postPhotos.push({
          uploadId: v1(),
          croppedPhoto: '',
          filteredPhoto: '',
          cropSize: { width: 0, height: 0 },
          selectedPhotos: selectedPhotos,
        })
        state.isLoadedFromDB = false
      })
    },
    setSelectedPhotos(selectedPhotos) {
      set((state): any => {
        state.selectedPhotos = selectedPhotos
      })
    },
    setCroppedPhoto(
      uploadId: string,
      croppedPhoto: string[],
      cropSize: { width: number; height: number }
    ) {
      set((state): any => {
        const photo = state.postPhotos.find(photo => {
          return photo.uploadId === uploadId
        })

        if (photo) {
          const photoIndex = state.postPhotos.indexOf(photo)

          state.postPhotos[photoIndex].croppedPhoto = croppedPhoto.join(' ')
          state.postPhotos[photoIndex].filteredPhoto = croppedPhoto.join(' ')
          state.postPhotos[photoIndex].cropSize = cropSize
        }
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
        state.postDescription = ''
        state.isLoadedFromDB = false
      })
    },
    setPhotoFromDB(
      id: string,
      croppedPhoto: string,
      filteredPhoto: string,
      description: string,
      cropSize: any,
      selectedPhotos: string | File | Blob | MediaSource
    ) {
      set((state): any => {
        state.postPhotos.push({
          uploadId: id,
          filteredPhoto: filteredPhoto,
          croppedPhoto: croppedPhoto,
          cropSize: cropSize,
          selectedPhotos: selectedPhotos,
        })
        state.isLoadedFromDB = true
        state.postDescription = description
      })
    },
  }))
)

export type PostType = {
  uploadId: string
  croppedPhoto: string
  filteredPhoto: string
  selectedPhotos: string | File | Blob | MediaSource
  cropSize: CropSizeType
}

type CropSizeType = { width: number; height: number }

interface PostStore {
  postPhotos: PostType[]
  postDescription: string
  isLoadedFromDB: boolean
  setUploadId: (selectedPhotos: string | File | Blob | MediaSource) => void
  setCroppedPhoto: (
    uploadId: string,
    croppedPhoto: string[],
    cropSize: { width: number; height: number }
  ) => void
  setPostDescription: (description: string) => void
  setFilteredPhoto: (uploadId: any, filteredPhoto: string) => void
  clearPostPhotos: () => void
  setPhotoFromDB: (
    id: string,
    croppedPhoto: string,
    filteredPhoto: string,
    description: string,
    cropSize: CropSizeType,
    selectedPhotos: string | File | Blob | MediaSource
  ) => void
  selectedPhotos: string | File | Blob | MediaSource
  setSelectedPhotos: (selectedPhotos: string | File | Blob | MediaSource) => void
  imageUrl: string | File | Blob | MediaSource
  setImageUrl: (imageUrl: string | File | Blob | MediaSource) => void
}
