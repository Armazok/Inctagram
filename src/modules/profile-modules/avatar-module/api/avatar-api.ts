import { authInstance } from '@/services/api/auth/instanse'

export const sendAvatar = (formData: File) => {
  return authInstance.post<ResAvatarType>('users/profile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // Host: 'lionfish-app-3jdhn.ondigitalocean.app',
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
