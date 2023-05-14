import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import github from '@/assets/icons/github-svgrepo.png'
import google from '@/assets/icons/google-svgrepo.png'
import { Confirm } from '@/components/modals'
import { AUTH2_STATUS, OAUTH_AUTHORIZATION } from '@/services'

export const GoogleGithubRegistration = () => {
  const [isOpen, seIsOpen] = useState(false)

  const { query } = useRouter()
  const query_status = query['status_code'] as string

  useEffect(() => {
    if (!query_status) return

    if (query_status === AUTH2_STATUS['400']) {
      seIsOpen(true)
    }
  }, [query_status])

  return (
    <>
      <div className="flex gap-[60px] items-center">
        <div className="cursor-pointer" onClick={OAUTH_AUTHORIZATION.registrationGoogle}>
          <Image src={google} width={36} height={36} alt={'googleIcon'} priority />
        </div>

        <div className="cursor-pointer" onClick={OAUTH_AUTHORIZATION.registrationGithub}>
          <Image src={github} width={36} height={36} alt={'githubIcon'} priority />
        </div>
      </div>

      <Confirm
        isOpen={isOpen}
        onConfirm={() => seIsOpen(false)}
        onClose={() => seIsOpen(false)}
        title="Registered"
        text={`An error occurred while registering. This user already exists. Go to page "Sign In" `}
        confirmButtonText="OK"
      />
    </>
  )
}
