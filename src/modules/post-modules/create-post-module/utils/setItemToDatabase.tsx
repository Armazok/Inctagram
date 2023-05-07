import {
  DatabaseMetaDataType,
  getDatabase,
} from '@/modules/post-modules/create-post-module/utils/getDatabase'

type SetItemParamsType = DatabaseMetaDataType & { itemData: any }

export const setItemToDatabase = async ({
  itemData,
  dbName,
  storeName,
  keyPath,
}: SetItemParamsType) => {
  const db = await getDatabase({ dbName, storeName, keyPath })
  const tx = db.transaction([storeName], 'readwrite')
  const store = tx.objectStore(storeName)

  // const request = store.put(itemData)
  const request = store.put(itemData, keyPath)

  // await new Promise((resolve, reject) => {
  //   tx.oncomplete = () => {
  //     resolve('success')
  //   }
  //   tx.onerror = () => {
  //     reject(tx.error)
  //   }
}
