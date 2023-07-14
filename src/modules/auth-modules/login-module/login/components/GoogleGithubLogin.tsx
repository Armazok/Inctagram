import React, { useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import github from '@/assets/icons/github-svgrepo.png'
import google from '@/assets/icons/google-svgrepo.png'
import { useAuth2ControllerPopup } from '@/common'
import { Confirm } from '@/components/modals'
import { AUTH2_STATUS, OAUTH_AUTHORIZATION } from '@/services'

export const GoogleGithubLogin = () => {
  const { popupContent, setAuth2ContentPopup, closePopup } = useAuth2ControllerPopup()

  const { query } = useRouter()
  const query_status = query['status_code'] as string

  useEffect(() => {
    if (!query_status) return

    if (query_status === AUTH2_STATUS['401']) {
      setAuth2ContentPopup(
        true,
        `This account is not in the system, if you want to register, go to the page "Sign Up" `
      )
    }

    if (query_status === AUTH2_STATUS['204']) {
      setAuth2ContentPopup(
        true,
        `A user with this email already exists. Go to your email for further instructions`
      )
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
        isOpen={popupContent.isOpen}
        onConfirm={closePopup}
        onClose={closePopup}
        title={query_status === AUTH2_STATUS['401'] ? 'Login' : 'Email Sent'}
        text={popupContent.content}
        confirmButtonText="OK"
      />
    </>
  )
}
