//eslint-disable-next-line
//@ts-ignore
import { v1 } from 'uuid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
// @ts-ignore

type PostType = {
  uploadId: string
  selectedPhoto: string
  croppedPhoto?: string
  filteredPhoto?: string
  // description?: string
}

// type PhotosType = { [uploadId: string]: PostType }

interface PostStore {
  postPhotos: PostType[]
  setSelectedPhoto: (selectedPhoto: string) => void
  setCroppedPhoto: (uploadId: any, croppedPhoto: string) => void
  setFilteredPhoto: (uploadId: any, filteredPhoto: string) => void
  clearPostPhotos: () => void
  setPhotoFromDB: (photo: PostType) => void
  // setPostDescription: (uploadId: string, description: string) => void
}

export const usePostStore = create<PostStore>()(
  immer(set => ({
    postPhotos: [],
    setSelectedPhoto(selectedPhoto: string) {
      set((state): any => {
        const uploadId = v1()

        state.postPhotos = [
          {
            uploadId,
            selectedPhoto,
            croppedPhoto: '',
            filteredPhoto: '',
            // description: '',
          },
        ]
      })
      // const uploadId = v1()
      // state.postPhotos[uploadId] = {
      //   uploadId: uploadId,
      //   selectedPhoto,
      //   croppedPhoto: '',
      //   filteredPhoto: '',
      //   // description: '',
      // }
      // })
    },
    setCroppedPhoto(index, croppedPhoto) {
      set((state): any => {
        //
        // const photo = state.postPhotos.find((photo: PostType) => {
        //   photo.uploadId === uploadId
        // })
        // if (photo) {
        //   const photoIndex = state.postPhotos.indexOf(photo)
        //   state.postPhotos[photoIndex].croppedPhoto = croppedPhoto
        // }
        // })
        state.postPhotos[index].croppedPhoto = croppedPhoto
      })
    },
    setFilteredPhoto(index, filteredPhoto) {
      set((state): any => {
        state.postPhotos[index].filteredPhoto = filteredPhoto

        // const photo = state.postPhotos.find(photo => {
        //   photo.uploadId === uploadId
        // })
        // if (photo) {
        //   const photoIndex = state.postPhotos.indexOf(photo)
        //   state.postPhotos[photoIndex].filteredPhoto = filteredPhoto
        // }
      })
    },
    clearPostPhotos() {
      set((state): any => {
        debugger
        state.postPhotos = []
      })
    },
    setPhotoFromDB(photo: PostType) {
      set((state): any => {
        state.postPhotos.push(photo)
      })
    },
    // setPostDescription(uploadId, description) {
    //   set((state): any => {
    //     // state.postPhotos[uploadId].description = description
    //   })
    // },
  }))
)
