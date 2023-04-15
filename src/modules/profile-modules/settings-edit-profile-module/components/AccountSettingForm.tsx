import React, { FC } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { settingsSchema, SettingsSchemaType } from '@/common/constants'
import GlobalButton from '@/ui/buttons/GlobalButton'
import GlobalInput from '@/ui/Inputs/Input/Input'
import { Textarea } from '@/ui/textarea/Textarea'

type ProfileType = {
  userName: string
  firstName: string
  lastName: string
  dateOfBirth: Date | null
  city: string
  aboutMe: string
}

type PropsType = {
  onSubmit: (data: SettingsSchemaType) => void
  initialProfileData: ProfileType
}

const AccountSettingForm: FC<Partial<PropsType>> = ({ initialProfileData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: initialProfileData?.userName,
      firstName: initialProfileData?.firstName,
      lastName: initialProfileData?.lastName,
      dateOfBirth: initialProfileData?.dateOfBirth,
      city: initialProfileData?.city,
      aboutMe: initialProfileData?.aboutMe,
    },
    resolver: yupResolver(settingsSchema),
    mode: 'onChange',
  })

  const settingFormSubmit = (data: SettingsSchemaType | any) => {
    onSubmit?.(data)
  }

  return (
    <form className="flex flex-col w-full gap-[22px]" onSubmit={handleSubmit(settingFormSubmit)}>
      <GlobalInput
        type="text"
        label="Username"
        {...register('userName')}
        error={errors?.userName?.message}
      />
      <GlobalInput
        type="text"
        label="Name"
        {...register('firstName')}
        error={errors?.firstName?.message}
      />
      <GlobalInput
        type="text"
        label="Surname"
        {...register('lastName')}
        error={errors?.lastName?.message}
      />
      <GlobalInput
        type="date"
        label="Date of Birthday"
        {...register('dateOfBirth')}
        error={errors?.dateOfBirth?.message}
      />

      <GlobalInput type="text" label="City" {...register('city')} error={errors?.city?.message} />
      <Textarea
        label="About me"
        textAreaClassName="w-full resize-none"
        {...register('aboutMe')}
        error={errors?.aboutMe?.message}
      />
      <GlobalButton type="submit" variant="default" className="ml-auto mt-[30px] text-[16px]">
        Save Changes
      </GlobalButton>
    </form>
  )
}

export default AccountSettingForm
