import { setItemToDatabase } from '@/common/indexedDb/previous/setItemToDatabase'
import { IMAGES } from '@/modules/post-modules/create-post-module/constants/db-image-names'
import { IPhoto } from '@/store/storeSelectorPhoto'

type ImageDataType = {
  data: {
    photoArray: IPhoto[]
    description: string
  }
  timestamp: number
}

export const setNewPostToIndexedDB = async (postPhotos: IPhoto[], postDescription: string) => {
  try {
    const draftPhotos = await Promise.all(
      postPhotos.map(async photo => {
        // @ts-ignore
        const urlResponse = await fetch(photo.url)
        const urlBlob = await urlResponse.blob()

        // @ts-ignore
        const FilteredUrlResponse = await fetch(photo.filteredUrl)
        const filteredUrlBlob = await FilteredUrlResponse.blob()

        let finalUrlBlob

        if (photo.finalUrl) {
          // @ts-ignore
          const finalUrlResponse = await fetch(photo.finalUrl)

          finalUrlBlob = await finalUrlResponse.blob()
        } else {
          finalUrlBlob = filteredUrlBlob
        }

        return {
          ...photo,
          filteredUrl: filteredUrlBlob,
          finalUrl: finalUrlBlob,
          url: urlBlob,
        }
      })
    )
    let imageData: ImageDataType = {
      data: { photoArray: draftPhotos, description: postDescription },
      timestamp: Date.now(),
    }

    setItemToDatabase({
      keyPath: IMAGES.KEY_PATH,
      storeName: IMAGES.STORE_NAME,
      dbName: IMAGES.DB_NAME,
      itemData: imageData,
    })
  } catch (error) {
    console.error('Error fetching Blob:', error)
  }
}
