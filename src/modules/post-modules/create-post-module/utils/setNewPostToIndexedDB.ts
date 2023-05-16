import { setItemToDatabase } from '@/common/utils/indexedDb/setItemToDatabase'
import { IMAGES } from '@/modules/post-modules/create-post-module/constants/db-image-names'
import { PostType } from '@/store'
import { IPhoto } from '@/store/storeSelectorPhoto'

type ImageDataType = {
  data: {
    photoArray: IPhoto[]
    description: string
  }
  timestamp: number
}

export const setNewPostToIndexedDB = async (postPhotos: IPhoto[], postDescription: string) => {
  let indexedDbArray = [] as IPhoto[]

  postPhotos.forEach(photo => {
    let photoData = {
      ...photo,
      id: photo.id,
      filteredUrl: photo.filteredUrl,
      finalUrl: photo.finalUrl ? photo.finalUrl : photo.filteredUrl,
    }

    // @ts-ignore
    fetch(photoData.finalUrl)
      .then(response => response.blob())
      .then(blob => {
        photoData.finalUrl = blob
      })
      .then(() => {
        //@ts-ignore
        fetch(photoData.filteredUrl)
          .then(response => response.blob())
          .then(blob => {
            photoData.filteredUrl = blob
            // @ts-ignore
            indexedDbArray.push(photoData)
          })
      })
      .catch(error => {
        console.error('Error fetching Blob:', error)
      })
      .then(() => {
        let imageData: ImageDataType = {
          data: {
            photoArray: indexedDbArray,
            description: postDescription,
          },
          timestamp: Date.now(),
        }

        debugger
        setItemToDatabase({
          keyPath: IMAGES.KEY_PATH,
          storeName: IMAGES.STORE_NAME,
          dbName: IMAGES.DB_NAME,
          itemData: imageData,
        })
      })
  })
}
