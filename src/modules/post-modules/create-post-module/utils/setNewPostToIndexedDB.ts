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
  let indexedDbArray: IPhoto[] = []

  await Promise.all(
    postPhotos.map(async photo => {
      let photoData = {
        ...photo,
        id: photo.id,
        filteredUrl: photo.filteredUrl,
        finalUrl: photo.finalUrl ? photo.finalUrl : photo.filteredUrl,
      }

      try {
        // @ts-ignore
        const finalUrlResponse = await fetch(photoData.finalUrl)
        const finalUrlBlob = await finalUrlResponse.blob()

        photoData.finalUrl = finalUrlBlob

        // @ts-ignore
        const filteredUrlResponse = await fetch(photoData.filteredUrl)
        const filteredUrlBlob = await filteredUrlResponse.blob()

        photoData.filteredUrl = filteredUrlBlob

        indexedDbArray.push(photoData)
      } catch (error) {
        console.error('Error fetching Blob:', error)
      }
    })
  )

  let imageData: ImageDataType = {
    data: {
      photoArray: indexedDbArray,
      description: postDescription,
    },
    timestamp: Date.now(),
  }

  setItemToDatabase({
    keyPath: IMAGES.KEY_PATH,
    storeName: IMAGES.STORE_NAME,
    dbName: IMAGES.DB_NAME,
    itemData: imageData,
  })
}
