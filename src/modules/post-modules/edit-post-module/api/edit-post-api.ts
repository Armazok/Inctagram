import { authInstance } from '@/services'

export const deletePost = (postId: number) => {
  return authInstance.delete(`posts/${postId}`)
}
