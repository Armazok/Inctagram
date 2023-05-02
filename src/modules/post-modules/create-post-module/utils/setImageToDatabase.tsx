import { getDatabase } from '@/modules/post-modules/create-post-module/utils/getDatabase'

export const DB_NAME = 'Draft_post_images'
export const STORE_NAME = 'images'
export const KEY_PATH = 'timestamp'

export const setImageToDatabase = async (blob: string | Blob) => {
  const db = await getDatabase({ dbName: DB_NAME, storeName: STORE_NAME, keyPath: KEY_PATH })
  const tx = db.transaction([STORE_NAME], 'readwrite')
  const imagesStore = tx.objectStore(STORE_NAME)

  const imageData = {
    data: blob,
    timestamp: Date.now(),
  }

  imagesStore.put(imageData)

  // tx.oncomplete = () => {
  //   console.log('Image saved to IndexedDB')
  // }
}
