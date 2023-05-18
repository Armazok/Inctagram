import { authInstance } from '@/services'

export interface Device {
  ip: string
  userAgent: string
  lastVisit: string
  deviceId: number
}

interface GetSessionsResponse {
  devices: Device[]
  currentDeviceId: number
}

export const getSessions = async () => {
  const res = await authInstance.get<GetSessionsResponse>('sessions')

  return res.data
}

export const deleteSessions = async () => {
  return authInstance.delete('sessions')
}

export const deleteSession = async (deviceId: number) => {
  return authInstance.delete(`sessions/${deviceId}`)
}
