import { useQuery } from '@tanstack/react-query'
import { UAParser } from 'ua-parser-js'

import { noRefetch } from '@/common'
import { getSessions } from '@/modules/profile-modules/devices-module/api/devices-api'

export const useGetSessions = () => {
  const {
    data: sessions,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: ['sessions'],
    queryFn: getSessions,
    select: data => ({
      ...data,
      devices: data.devices.map(device => ({
        ...device,
        ...new UAParser(device.userAgent),
      })),
    }),
    ...noRefetch,
    refetchOnMount: true,
  })

  return { sessions, isLoading, isError, isSuccess, isFetching }
}
