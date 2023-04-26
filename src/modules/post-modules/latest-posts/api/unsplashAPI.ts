import { authInstance } from '@/services'

export const sendMyPosts = (userId: number | undefined) => {
  return authInstance.get<ResMyPosts>(`posts/${userId}`)
}

type ResMyPosts = {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  items: [
    {
      id: number
      description: string
      location: string
      images: [
        {
          uploadId: string
          url: string
          width: number
          height: number
          fileSize: number
        }
      ]
      createdAt: string
      updatedAt: string
    }
  ]
}

// import { createApi } from 'unsplash-js'
//
// const unsplash = createApi({
//   accessKey: 'tYGvV_aC41dAOtc-dWn-axAe9uY__AOSe4H6UAU4Va0',
// })
//
// export const getLatestPosts = () => {
//   return unsplash.search.getPhotos({
//     query: 'people',
//     perPage: 20,
//   })
// }
//
// export const getPostCollection = () => {
//   return unsplash.collections.getPhotos({
//     collectionId: '99144643',
//   })
// }
