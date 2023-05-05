import {
  DatabaseMetaDataType,
  getDatabase,
} from '@/modules/post-modules/create-post-module/utils/getDatabase'

export const clearDatabase = async ({ dbName, storeName, keyPath }: DatabaseMetaDataType) => {
  const db = await getDatabase({ dbName, keyPath, storeName })
  const clearTx = db.transaction([storeName], 'readwrite')
  const clearStore = clearTx.objectStore(storeName)

  clearStore.clear()

  // clearTx.oncomplete = () => {
  // }
}
