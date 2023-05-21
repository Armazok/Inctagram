import { authInstance } from '@/services'

export const sendPublicationImage = (formData: File | Blob | FormData) => {
  return authInstance.post<ResImagePublication>('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

type ResImagePublication = {
  id: number
  ownerId: number
  description: string
  location: string
  images: [
    {
      uploadId: string
      versions: {
        huge: {
          url: string
          width: number
          height: number
          fileSize: number
        }
        large: {
          url: string
          width: number
          height: number
          fileSize: number
        }
      }
    }
  ]
  createdAt: string
  updatedAt: string
}
