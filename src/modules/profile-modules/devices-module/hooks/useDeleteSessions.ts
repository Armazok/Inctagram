import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { deleteSessions } from '../api/devices-api'

export const useDeleteSessions = () => {
  const client = useQueryClient()

  const { isLoading, mutate } = useMutation({
    mutationKey: ['sessions'],
    mutationFn: deleteSessions,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['sessions'] })

      toast.success('All other sessions have been terminated')
    },
    onError: () => {
      console.log('error during terminate other sessions')
    },
  })

  return { isLoading, mutate }
}
