import { authInstance } from '@/services'

export const sendEditPost = ({ postId, description }: editParams) => {
  return authInstance.put(`posts/${postId}`, { description: description })
}

type editParams = {
  postId: number | null
  description: string
}
