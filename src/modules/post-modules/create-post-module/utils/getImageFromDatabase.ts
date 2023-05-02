import { getDatabase } from '@/modules/post-modules/create-post-module/utils/getDatabase'
import {
  DB_NAME,
  KEY_PATH,
  STORE_NAME,
} from '@/modules/post-modules/create-post-module/utils/setImageToDatabase'

export const getImageFromDatabase = async (onSuccess: any): Promise<any | void> => {
  const db = await getDatabase({ dbName: DB_NAME, storeName: STORE_NAME, keyPath: KEY_PATH })
  const tx = db.transaction([STORE_NAME], 'readonly')
  const imagesStore = tx.objectStore(STORE_NAME)

  imagesStore.getAll().onsuccess = event => {
    const formData = new FormData()
    // @ts-ignore
    event.target.result.forEach((imageData: any) => {
      fetch(imageData.data)
        .then(response => response.blob())
        .then(blob => {
          formData.append('file', blob, 'image.png')
          onSuccess(formData)
        })
        .catch(error => {
          console.error('Error fetching Blob data:', error)
        })
    })
  }
}
