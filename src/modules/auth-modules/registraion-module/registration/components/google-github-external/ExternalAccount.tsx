import React, { FC } from 'react'

import Image from 'next/image'

import BroSingUp from '@/assets/images/bro-sing-up.png'
import { Confirm } from '@/components/modals'
import { useExternalAccount } from '@/modules/auth-modules/registraion-module'
import { GlobalButton } from '@/ui'

type PropsType = {
  code: string
  email: string
}

export const ExternalAccount: FC<PropsType> = ({ code, email }) => {
  const { confirmMerge, cancelMerge, closeModal, isLoading, modalContent } = useExternalAccount()

  return (
    <>
      <div className={'flex justify-center items-center flex-col text-light-100 gap-7'}>
        <span className={'font-bold mt-9'}>Merger of Accounts</span>

        <span className={'w-96 text-center text-base font-normal'}>
          The user with email: {email} is already in the system. Could we merge this accounts?
        </span>
        <GlobalButton
          type="button"
          variant="transparent"
          className="w-48"
          callback={() => confirmMerge(code)}
          disabled={isLoading}
        >
          Yes, merge
        </GlobalButton>
        <GlobalButton
          type="button"
          variant="transparent"
          className="w-48"
          callback={() => cancelMerge(code)}
          disabled={isLoading}
        >
          No
        </GlobalButton>
        <Image src={BroSingUp} alt={'broSingUp'} height={290} width={290} priority />
      </div>
      <Confirm
        isOpen={modalContent.isOpen}
        onConfirm={closeModal}
        onClose={closeModal}
        title="Merger of Accounts"
        text={modalContent.text}
        confirmButtonText="OK"
      />
    </>
  )
}
