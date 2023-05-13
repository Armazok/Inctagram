import { POSTS_PER_PAGE } from '@/modules/post-modules/latest-posts/contastants/latest-posts-constants'
import { authInstance } from '@/services'

interface PostImageVersion {
  url: string
  width: number
  height: number
  fileSize: number
}

export interface PostImage {
  uploadId: string
  versions: {
    huge: PostImageVersion
    large: PostImageVersion
  }
}

export interface Post {
  id: number
  ownerId: number
  description: string
  location: null | string
  images: PostImage[]
  createdAt: string
  updatedAt: string
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
  const res = await authInstance.get<GetPostsResponse>(`posts/${userId}`, {
    params: {
      pageNumber: page,
      pageSize: POSTS_PER_PAGE,
    },
  })

  return res.data
}

interface GetPostResponse extends Post {
  createdAt: string
  updatedAt: string
}

export const getPost = async (postId: number | null) => {
  const res = await authInstance.get<GetPostResponse>(`posts/p/${postId}`)

  return res.data
}

export const deletePostImage = (postId: number, uploadId: string) => {
  return authInstance.delete(`posts/${postId}/images/${uploadId}`)
}
