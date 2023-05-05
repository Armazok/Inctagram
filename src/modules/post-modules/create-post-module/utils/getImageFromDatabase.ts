import {
  DatabaseMetaDataType,
  getDatabase,
} from '@/modules/post-modules/create-post-module/utils/getDatabase'

export const getItemFromDatabase = async ({
  onSuccess,
  dbName,
  storeName,
  keyPath,
}: DatabaseMetaDataType & { onSuccess: any }): Promise<any | void> => {
  const db = await getDatabase({ dbName, storeName, keyPath })
  const tx = db.transaction([storeName], 'readonly')
  const imagesStore = tx.objectStore(storeName)

  imagesStore.getAll().onsuccess = event => {
    // @ts-ignore
    event.target.result.forEach((imageData: any) => {
      onSuccess(imageData.data)
    })
  }
}
