import * as yup from 'yup'

export type FormData = yup.InferType<typeof schema>

export const schema = yup.object({
  email: yup.string().required('Email is required filed'),
  password: yup.string().required().min(6).max(20),
  confirmPassword: yup
    .string()
    .required()
    .min(6, 'min')
    .max(20, 'max')
    .oneOf([yup.ref('password')!], 'passwords do not match'),
})
