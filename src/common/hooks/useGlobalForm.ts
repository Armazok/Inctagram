import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

export const useGlobalForm = (schema: any) => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const setCustomError = (name: string, message: string) => {
    return setError(name, {
      type: 'custom',
      message: message,
    })
  }
  return {
    register,
    reset,
    handleSubmit,
    errors,
    setCustomError,
  }
}
