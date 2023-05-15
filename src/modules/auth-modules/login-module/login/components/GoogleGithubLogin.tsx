import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import github from '@/assets/icons/github-svgrepo.png'
import google from '@/assets/icons/google-svgrepo.png'
import { Confirm } from '@/components/modals'
import { AUTH2_STATUS, OAUTH_AUTHORIZATION } from '@/services'

export const GoogleGithubLogin = () => {
  const [modalData, setModalData] = useState({
    modalText: '',
    isOpenModal: false,
  })

  const { query } = useRouter()
  const query_status = query['status_code'] as string

  const closeModal = () => {
    setModalData({
      ...modalData,
      isOpenModal: false,
    })
  }

  useEffect(() => {
    if (!query_status) return

    if (query_status === AUTH2_STATUS['401']) {
      setModalData({
        ...modalData,
        modalText: `This account is not in the system, if you want to register, go to the page "Sign Up" `,
        isOpenModal: true,
      })
    }

    if (query_status === AUTH2_STATUS['204']) {
      setModalData({
        ...modalData,
        modalText: `A user with this email already exists. Go to your email to continue`,
        isOpenModal: true,
      })
    }
  }, [query_status])

  return (
    <>
      <div className="flex gap-[60px] items-center">
        <div className="cursor-pointer" onClick={OAUTH_AUTHORIZATION.loginGoogle}>
          <Image src={google} width={36} height={36} alt={'googleIcon'} priority />
        </div>

        <div className="cursor-pointer" onClick={OAUTH_AUTHORIZATION.loginGithub}>
          <Image src={github} width={36} height={36} alt={'githubIcon'} priority />
        </div>
      </div>

      <Confirm
        isOpen={modalData.isOpenModal}
        onConfirm={closeModal}
        onClose={closeModal}
        title="Login"
        text={modalData.modalText}
        confirmButtonText="OK"
      />
    </>
  )
}
