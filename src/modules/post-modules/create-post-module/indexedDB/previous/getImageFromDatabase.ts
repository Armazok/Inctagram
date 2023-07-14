import { DatabaseMetaDataType } from '@/common/indexedDb/indexedDb.repository'
import { getDatabase } from '@/common/indexedDb/previous/getDatabase'

export const getItemFromDatabase = async ({
  dbName,
  storeName,
  keyPath,
}: DatabaseMetaDataType): Promise<any | void> => {
  const db = await getDatabase({ dbName, storeName, keyPath })
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
}
