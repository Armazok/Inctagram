import { authInstance } from '@/services'
import { ReqPublication, ResPublication } from '@/types'

export const sendPublicationPost = (data: ReqPublication) => {
  const { description, childrenMetadata } = data
  const uploadId = childrenMetadata[0].uploadId

  return authInstance.post<ResPublication>('posts', {
    description: description,
    childrenMetadata: [{ uploadId }],
  })
}
