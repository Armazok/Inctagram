import * as yup from 'yup'

export const settingsSchema = yup.object({
  userName: yup.lazy(value =>
    !value
      ? yup.string().required('Username is required').min(6).max(30).trim()
      : yup.string().min(6).max(30).trim()
  ),
  firstName: yup.string().trim(),
  lastName: yup.string().trim(),
  dateOfBirth: yup
    .date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .typeError('Date of birth has to be a valid date'),
  city: yup.string().trim(),
  aboutMe: yup.string().trim().max(200, 'Сan not be more than 200'),
})
export type SettingsSchemaType = yup.InferType<typeof settingsSchema>
