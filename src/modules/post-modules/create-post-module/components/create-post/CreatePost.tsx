import React, { useState } from 'react'

// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import plusOutline from '@/assets/icons/plus-square-outline.svg'
import plus from '@/assets/icons/plus-square.svg'
import { ModalManagerPost, stateModalType } from '@/modules/post-modules/create-post-module'
import { createPostEffect } from '@/modules/post-modules/create-post-module/components/create-post/custom/custom'

export const CreatePost = () => {
  const [modalOpen, setModal] = useState<stateModalType>('')
  const { query, replace, pathname } = useRouter()

  const onCloseClick = () => {
    setModal('')
    replace(pathname)
  }

  createPostEffect(setModal, query)

  return (
    <div>
      <Link
        className="flex gap-[15px] items-center"
        href={{
          query: { create: true },
        }}
      >
        <Image src={modalOpen ? plus : plusOutline} alt={'Create'} height={24} width={24} />
        <div className={clsx('cursor-pointer', modalOpen && 'text-accent-500', 'md:hidden')}>Create</div>
      </Link>
      {query.create && (
        <ModalManagerPost onClose={onCloseClick} isModalOpen={modalOpen} setModal={setModal} />
      )}
    </div>
  )
}
