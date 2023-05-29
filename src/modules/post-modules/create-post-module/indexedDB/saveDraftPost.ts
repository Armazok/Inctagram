import { indexedDbPostDraft } from '@/modules/post-modules/create-post-module/indexedDB/indexedDbPostDraft.repository'
import { IPhoto } from '@/store/storeSelectorPhoto'

export const saveDraftPost = async (imagesSelector: IPhoto[], description: string) => {
  await indexedDbPostDraft.clearPreviousDraft()
  await indexedDbPostDraft.setNewPostToIndexedDB(imagesSelector, description)
}
