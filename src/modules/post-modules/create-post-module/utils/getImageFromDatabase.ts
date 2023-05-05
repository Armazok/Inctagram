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
      debugger
      fetch(imageData.data)
        .then(data => {
          debugger
          onSuccess(data)
        })
        .catch(error => {
          console.error('Error fetching Blob data:', error)
        })
    })

    // imagesStore.getAll().onsuccess = (event: any) => {
    //   //@ts-ignore
    //   event.target.result.forEach((imageData: any) => {
    // const { data } = imageData
    // debugger
    // if (data) {
    //   fetch(data)
    //     .then(response => {
    //       debugger
    //       if (!response.ok) {
    //         throw new Error(`Failed to fetch ${data}: ${response.status} ${response.statusText}`)
    //       }
    //       return response
    //     })
    //     .then(response => {
    //       onSuccess(response)
    //     })
    //     .catch(error => {
    //       console.error('Error fetching Blob data:', error)
    //     })
    // }
    // })
  }
}

// } catch (error) {
//     console.error('Error getting item from database:', error)
// }
// }
// fetch(imageData.data)
//   .then(data => {
//     debugger
//     onSuccess(data)
//   })
//   .catch(error => {
//     console.error('Error fetching Blob data:', error)
//   })
//     }
// )
//     }
// }
