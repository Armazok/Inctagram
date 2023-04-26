import { authInstance } from '@/services'

interface PostImage {
  url: string
  width: number
  height: number
  fileSize: number
  uploadId: string
}

interface Post {
  id: number
  description: string
  location: null | string
  images: PostImage[]
}

interface GetPostsResponse {
  totalCount: number
  pageCount: number
  page: number
  pageSize: number
  items: Post[]
}

interface GetPostsParams {
  userId: number | undefined
  page: number
}

export const getPosts = async ({ userId, page }: GetPostsParams) => {
  const res = await authInstance.get<GetPostsResponse>(`/posts/${userId}`, {
    params: {
      pageNumber: page,
      pageSize: 100,
    },
  })

  return res.data
}