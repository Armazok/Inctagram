import * as yup from 'yup'

export type FormDataRegistered = yup.InferType<typeof registrationSchema>

export const registrationSchema = yup.object({
  userName: yup.string().required('User name is required filed').min(6).max(30).trim(),
  email: yup.string().required('Email is required filed').email().trim(),
  password: yup.string().required().min(6).max(20).trim(),
  confirmPassword: yup
    .string()
    .required()
    .min(6, 'min')
    .max(20, 'max')
    .oneOf([yup.ref('password')!], 'passwords do not match')
    .trim(),
})
