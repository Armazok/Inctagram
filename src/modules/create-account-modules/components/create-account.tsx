import React, { FC } from 'react'

import { useRouter } from 'next/router'

import { NameTitle } from '@/components/atoms/title/nameTitle'
import GlobalButton from '@/ui/buttons/GlobalButton'

interface IIndex {}

const CreateAccount: FC<IIndex> = ({}) => {
  const { push } = useRouter()

  return (
    <div className="flex flex-col justify-center items-center">
      <NameTitle
        nameTitle="Oops! This place looks empty"
        className="font-bold text-light-100 text-[20px] leading-[36px] mb-3"
      />
      <NameTitle
        nameTitle={
          'You do not have an account to create one, click below and then fill in all the fields '
        }
        className="font-medium text-light-100 text-[16px] leading-[24px] mb-12"
      />
      <GlobalButton variant={'default'} type={'button'} callback={() => push('create-profile')}>
        Create Account
      </GlobalButton>
    </div>
  )
}

export default CreateAccount
