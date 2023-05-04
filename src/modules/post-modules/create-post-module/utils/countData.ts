export const countData = (dbName: string, storeName: string): any => {
  debugger
  const request = indexedDB.open(dbName)

  request.onsuccess = function (event) {
    //@ts-ignore
    const db = event.target.result
    const store = db.transaction(storeName, 'readonly').objectStore(storeName)

    // Use the count() method to count the number of records in the store
    const countRequest = store.count()

    countRequest.onsuccess = function (event: any) {
      const count = event.target.result

      return count
    }
    countRequest.onerror = function (event: any) {
      return 0
    }
  }
}
