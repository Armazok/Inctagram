import { getDatabase } from '@/modules/post-modules/create-post-module/utils/getDatabase'
import {
  DB_NAME,
  KEY_PATH,
  STORE_NAME,
} from '@/modules/post-modules/create-post-module/utils/setImageToDatabase'

export const clearDatabase = async () => {
  const db = await getDatabase({ dbName: DB_NAME, keyPath: KEY_PATH, storeName: STORE_NAME })
  const clearTx = db.transaction([STORE_NAME], 'readwrite')
  const clearStore = clearTx.objectStore(STORE_NAME)
  clearStore.clear()

  // clearTx.oncomplete = () => {
  //   console.log('IndexedDB cleared')
  // }
}
