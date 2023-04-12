import React, { FC } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { formatDate } from '@/common'
import { settingsSchema, SettingsSchemaType } from '@/common/constants'
import GlobalButton from '@/ui/buttons/GlobalButton'
import GlobalInput from '@/ui/Inputs/Input/Input'
import { Textarea } from '@/ui/textarea/Textarea'

type PropsType = {
  username: string
  firstName: string
  lastName: string
  date: string
  city: string
  aboutMe: string
  callbackSubmit: (data: SettingsSchemaType) => void
  create: boolean
}

const AccountSettingForm: FC<Partial<PropsType>> = ({
  city: initialCity,
  aboutMe: initialAboutMe,
  username: initialUsername,
  firstName: initialFirstName,
  lastName: initialLastName,
  date: initialDate,
  callbackSubmit,
  create,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: initialUsername,
      firstName: initialFirstName,
      lastName: initialLastName,
      dateOfBirth: initialDate ? formatDate(initialDate) : null,
      city: initialCity,
      aboutMe: initialAboutMe,
    },
    resolver: yupResolver(settingsSchema),
  })

  const settingFormSubmit = (data: SettingsSchemaType | any) => {
    callbackSubmit?.(data)
  }

  return (
    <form className="flex flex-col w-full gap-[22px]" onSubmit={handleSubmit(settingFormSubmit)}>
      <GlobalInput
        type="text"
        label="Username"
        defaultValue={initialUsername}
        {...register('userName')}
        error={errors?.userName?.message}
      />
      <GlobalInput
        type="text"
        label="Name"
        defaultValue={initialFirstName}
        {...register('firstName')}
        error={errors?.firstName?.message}
      />
      <GlobalInput
        type="text"
        label="Surname"
        defaultValue={initialLastName}
        {...register('lastName')}
        error={errors?.lastName?.message}
      />
      <GlobalInput
        type="date"
        label="Date of Birthday"
        defaultValue={initialDate}
        {...register('dateOfBirth')}
        error={errors?.dateOfBirth?.message}
      />
      <GlobalInput
        type="text"
        label="City"
        {...register('city')}
        error={errors?.city?.message}
        defaultValue={initialCity}
      />
      <Textarea
        defaultValue={initialAboutMe}
        label="About me"
        textAreaClassName="w-full resize-none"
        {...register('aboutMe')}
        error={errors?.aboutMe?.message}
      />
      <GlobalButton type="submit" variant="default" className="ml-auto mt-[30px] text-[16px]">
        {create ? `Create Account` : `Save Changes`}
      </GlobalButton>
    </form>
  )
}

export default AccountSettingForm
