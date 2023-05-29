import { IMAGES } from '@/modules/post-modules/create-post-module/constants/db-image-names'
import { indexedDbPostDraft } from '@/modules/post-modules/create-post-module/indexedDB/indexedDbPostDraft.repository'
import { IPhoto } from '@/store/storeSelectorPhoto'

export const getDraftPost = async () => {
  const data = await indexedDbPostDraft.getItemFromDatabase({
    keyPath: IMAGES.KEY_PATH,
    storeName: IMAGES.STORE_NAME,
    dbName: IMAGES.DB_NAME,
  })

  try {
    let { photoArray, description } = data

    photoArray.map((photo: IPhoto) => {
      // @ts-ignore
      photo.filteredUrl = URL.createObjectURL(photo.filteredUrl)
      // @ts-ignore
      photo.finalUrl = URL.createObjectURL(photo.finalUrl)
      // @ts-ignore
      photo.url = URL.createObjectURL(photo.url)
    })

    return data
  } catch (e) {
    console.log(e)
  }
}
