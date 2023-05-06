import { authInstance } from '@/services'

export const sendPublicationImage = (formData: File | Blob | FormData) => {
  debugger

  // return authInstance.post<ResImagePublication>('posts/image', formData, {
  return authInstance.post<ResImagePublication>('test/posts/images', formData, {
    // return authInstance.post<ResImagePublication>(
    //   'test/posts/',
    //   { formData, description: 'test' },
    //   {
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
