import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: 'tYGvV_aC41dAOtc-dWn-axAe9uY__AOSe4H6UAU4Va0',
})

export const getLatestPosts = () => {
  return unsplash.search.getPhotos({
    query: 'people',
    perPage: 20,
  })
}

export const getPostCollection = () => {
  return unsplash.collections.getPhotos({
    collectionId: '99144643',
  })
}
