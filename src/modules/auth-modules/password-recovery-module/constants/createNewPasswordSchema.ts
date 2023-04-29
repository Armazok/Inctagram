import * as yup from 'yup'

export const createNewPasswordSchema = yup.object({
  password: yup.string().trim().required().min(6).max(20),
  confirmPassword: yup
    .string()
    .trim()
    .required()
    .min(6)
    .max(20)
    .oneOf([yup.ref('password')!], 'passwords do not match'),
})
