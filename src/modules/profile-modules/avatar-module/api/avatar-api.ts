import { authInstance } from '@/services'

export const sendAvatar = (formData: File) => {
  return authInstance.post<ResAvatarType>('users/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const deleteAvatar = () => {
  return authInstance.delete('users/profile/avatar')
}

export type ResAvatarType = {
  avatars: AvatarType[]
}

export type AvatarType = {
  url: string
  width: number
  height: number
  fileSize: number
}
