import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { noRefetch } from '@/common'
import { getPosts, getPostsById } from '@/modules/post-modules/latest-posts/api/latest-posts-api'

export const useGetInfiniteLatestPosts = (userId: number | undefined) => {
  const { data, isLoading, isError, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['posts', `user_${userId}`],
      // onSuccess: idPost => {
      //   onSuccess(idPost)
      // },
      queryFn: ({ pageParam = 1 }) => getPosts({ userId, page: pageParam }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page * lastPage.pageSize < lastPage.totalCount
          ? lastPage.page + 1
          : undefined
      },
      enabled: !!userId,
      ...noRefetch,
    })

  return {
    data,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  }
}

export const useGetPostById = (postId: number | null) => {
  const { data } = useQuery({
    queryKey: ['posts/p/', `postId${postId}`],
    queryFn: () => getPostsById({ postId }),
  })

  return { data }
}
