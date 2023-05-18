import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { deleteSession } from '../api/devices-api'

export const useDeleteSession = (deviceId: number) => {
  const client = useQueryClient()

  const { isLoading, mutate } = useMutation({
    mutationKey: ['sessions'],
    mutationFn: () => deleteSession(deviceId),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['sessions'] })

      toast.success('Session have been terminated')
    },
    onError: () => {
      console.log('error during terminate session')
    },
  })

  return { isLoading, mutate }
}
