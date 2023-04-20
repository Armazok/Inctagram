import { useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/common'
import { getPostCollection } from '@/modules/post-modules/latest-posts/api/unsplashAPI'

export const useGetPost = () => {
  return useQuery({
    queryKey: ['post-collection'],
    queryFn: getPostCollection,
    ...noRefetch,
    retry: false,
  })
}
