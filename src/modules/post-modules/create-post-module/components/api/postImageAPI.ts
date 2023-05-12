import { authInstance } from '@/services'

export const sendPublicationImage = (formData: File | Blob | FormData) => {
  return authInstance.post<ResImagePublication>('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

type ResImagePublication = {
  images: [
    {
      uploadId: string
      url: string
      width: number
      height: number
      fileSize: number
    }
  ]
}
