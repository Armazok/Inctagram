import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

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
    setError(name, {
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
