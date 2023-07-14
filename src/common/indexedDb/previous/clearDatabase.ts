import { DatabaseMetaDataType } from '@/common/indexedDb/indexedDb.repository'
import { getDatabase } from '@/common/indexedDb/previous/getDatabase'

export const clearDatabase = async ({ dbName, storeName, keyPath }: DatabaseMetaDataType) => {
  const db = await getDatabase({ dbName, keyPath, storeName })
  const clearTx = db.transaction([storeName], 'readwrite')
  const clearStore = clearTx.objectStore(storeName)

  clearStore.clear()
}
