import { DatabaseMetaDataType, indexedDbRepository } from '@/common/indexedDb/indexedDb.repository'
import { IMAGES } from '@/modules/post-modules/create-post-module/constants/db-image-names'
import { IPhoto } from '@/store/storeSelectorPhoto'

type ImageDataType = {
  data: {
    photoArray: IPhoto[]
    description: string
  }
  timestamp: number
}

export const indexedDbPostDraft = {
  clearPreviousDraft: async () => {
    await indexedDbRepository.clearDatabase({
      dbName: IMAGES.DB_NAME,
      storeName: IMAGES.STORE_NAME,
      keyPath: IMAGES.KEY_PATH,
    })
  },
  checkCountDraftPost: async () => {
    const count = await indexedDbRepository.countData(IMAGES.DB_NAME, IMAGES.STORE_NAME)

    return count
  },
  setNewPostToIndexedDB: async (postPhotos: IPhoto[], postDescription: string) => {
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

      indexedDbRepository.setItemToDatabase({
        keyPath: IMAGES.KEY_PATH,
        storeName: IMAGES.STORE_NAME,
        dbName: IMAGES.DB_NAME,
        itemData: imageData,
      })
    } catch (error) {
      console.error('Error fetching Blob:', error)
    }
  },
  getItemFromDatabase: async ({
    dbName,
    storeName,
    keyPath,
  }: DatabaseMetaDataType): Promise<any | void> => {
    const db = await indexedDbRepository.getDatabase({ dbName, storeName, keyPath })
    const tx = db.transaction([storeName], 'readonly')
    const imagesStore = tx.objectStore(storeName)

    try {
      const result = await new Promise((resolve, reject) => {
        imagesStore.getAll().onsuccess = event => {
          // @ts-ignore
          resolve(event.target.result[0].data)
        }
        // imagesStore.getAll().onerror = event => {
        //   reject(event.error)
        // }
      })

      return result
    } catch (e) {
      console.log('Error fetching data from IndexedDB:', e)
    }
  },
}
