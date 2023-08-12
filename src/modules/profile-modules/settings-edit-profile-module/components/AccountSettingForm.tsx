import React, { FC, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { settingsSchema, SettingsSchemaType } from '@/common'
import { useTranslation } from '@/components/translation'
import { RootProfile } from '@/modules/profile-modules/settings-edit-profile-module'
import { DateCalendar, GlobalButton, GlobalInput, Textarea } from '@/ui'

type PropsType = {
  onSubmit: (data: SettingsSchemaType) => void
  initialProfileData: Omit<RootProfile, 'avatars' | 'id'>
}

export const AccountSettingForm: FC<Partial<PropsType>> = ({ initialProfileData, onSubmit }) => {
  const [date, setDate] = useState(initialProfileData?.dateOfBirth)
  const { t } = useTranslation()

  const {
    register,
    setValue,
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
        label={t.profile.settingsProfile.generalInformation.userName}
        {...register('userName')}
        error={errors?.userName?.message}
      />
      <GlobalInput
        type="text"
        label={t.profile.settingsProfile.generalInformation.firstName}
        {...register('firstName')}
        error={errors?.firstName?.message}
      />
      <GlobalInput
        type="text"
        label={t.profile.settingsProfile.generalInformation.lastName}
        {...register('lastName')}
        error={errors?.lastName?.message}
      />

      <DateCalendar
        label={t.profile.settingsProfile.generalInformation.dateOfBirthday}
        endDate={null}
        setEndDate={() => null}
        errorMessage={errors?.dateOfBirth?.message}
        startDate={date as Date}
        {...register('dateOfBirth')}
        setStartDate={(data: any) => {
          setValue('dateOfBirth', data)
          setDate(data)
        }}
      />

      <GlobalInput
        type="text"
        label={t.profile.settingsProfile.generalInformation.city}
        {...register('city')}
        error={errors?.city?.message}
      />
      <Textarea
        label={t.profile.settingsProfile.generalInformation.aboutMe}
        textAreaClassName="w-full resize-none"
        {...register('aboutMe')}
        error={errors?.aboutMe?.message}
      />
      <GlobalButton
        type="submit"
        variant="default"
        className="ml-auto mt-[30px] text-[16px] sm:w-full sm:mt-0 sm:h-12 sm:items-center"
      >
        {t.profile.settingsProfile.generalInformation.buttonSaveChanges}
      </GlobalButton>
    </form>
  )
}
