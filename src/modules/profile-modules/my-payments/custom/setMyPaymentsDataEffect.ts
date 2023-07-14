import { useEffect } from 'react'

export const setMyPaymentsDataEffect = (
  data: any,
  isSuccess: boolean,
  isLoading: boolean,
  setMyPaymentsData: (data: any) => any
) => {
  return useEffect(() => {
    isLoading || !isSuccess ? setMyPaymentsData(Array(30).fill({})) : data
    if (data) {
      setMyPaymentsData(data)
    }
  }, [isSuccess, isLoading])
}
