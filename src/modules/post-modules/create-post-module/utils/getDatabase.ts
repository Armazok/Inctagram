export type DatabaseMetaDataType = { dbName: string; storeName: string; keyPath: string }

export const getDatabase = async ({
  dbName,
  storeName,
  keyPath,
}: DatabaseMetaDataType): Promise<IDBDatabase> => {
  const indexedDB =
    // @ts-ignore
    window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB
  const openRequest = indexedDB.open(dbName, 1)

  openRequest.onupgradeneeded = event => {
    //@ts-ignore
    const db = event.target.result
    const imagesStore = db.createObjectStore(storeName, {
      keyPath: keyPath,
    })
  }

  return new Promise((resolve, reject) => {
    openRequest.onsuccess = () => {
      resolve(openRequest.result)
    }

    openRequest.onerror = () => {
      reject(openRequest.error)
    }
  })
}
