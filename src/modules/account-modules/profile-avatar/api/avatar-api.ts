import { authInstance } from '@/services/api/auth/instanse'

export const sendAvatar = (formData: File) => {
  debugger
  return authInstance.post<ResAvatarType>('users/profile/avatar', formData, {
    headers: {
      // 'Content-Type': 'application/octet-stream',
      'Content-Type': 'multipart/form-data',
      // 'Content-Length': '',
      Host: 'lionfish-app-3jdhn.ondigitalocean.app',
      // 'Cross-Domain': 'true',
      // accept: 'application/json',
    },
  })
}

export type ResAvatarType = {
  avatar: AvatarType[]
}

export type AvatarType = {
  url: string
  width: number
  height: number
  fileSize: number
}
