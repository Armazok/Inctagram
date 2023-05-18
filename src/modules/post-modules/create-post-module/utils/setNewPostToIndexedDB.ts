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

export const setNewPostToIndexedDB = (postPhotos: IPhoto[], postDescription: string) => {
  // await convertToBlob(postPhotos)

  let imageData: ImageDataType = {
    data: { photoArray: postPhotos, description: postDescription },
    timestamp: Date.now(),
  }

  setItemToDatabase({
    keyPath: IMAGES.KEY_PATH,
    storeName: IMAGES.STORE_NAME,
    dbName: IMAGES.DB_NAME,
    itemData: imageData,
  })
}

// const convertToBlob = async (postPhotos: IPhoto[]) => {
//   postPhotos.map(async photo => {
//     let photoData = {
//       ...photo,
//       id: photo.id,
//       filteredUrl: photo.filteredUrl,
//       finalUrl: photo.finalUrl ? photo.finalUrl : photo.filteredUrl,
//     }
//     try {
//       const finalUrlResponse = photoData.finalUrl
//       // @ts-ignore
//       const finalUrlBlob = await finalUrlResponse.blob()
//       photoData.finalUrl = finalUrlBlob
//       // @ts-ignore
//       const filteredUrlResponse = await photoData.filteredUrl
//       // @ts-ignore
//       const filteredUrlBlob = filteredUrlResponse.blob()
//
//       photoData.filteredUrl = filteredUrlBlob
//     } catch (error) {
//       console.error('Error fetching Blob:', error)
//     }
//   })
// }
