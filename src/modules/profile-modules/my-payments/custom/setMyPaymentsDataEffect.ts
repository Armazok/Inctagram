import { useEffect } from 'react'

export const setMyPaymentsDataEffect = (
  data: any,
  isSuccess: boolean,
  setMyPaymentsData: (data: any) => any
) => {
  return useEffect(() => {
    if (data) {
      setMyPaymentsData(data)
    }
  }, [isSuccess])
}
