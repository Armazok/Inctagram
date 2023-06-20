import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import settings from '../../../../assets/icons/settings.svg'

import { LatestPosts } from '@/modules/post-modules/latest-posts'
import { useGetProfile } from '@/modules/profile-modules/settings-edit-profile-module'
import { Avatar, GlobalButton } from '@/ui'

export const ProfilePage = () => {
  const { push } = useRouter()
  const { profileData, profileAvatar } = useGetProfile()
  const userName = profileData && profileData.userName
  const aboutMe = profileData && profileData.aboutMe
  const avatar = profileAvatar && profileAvatar
  const onRedirectToSetting = () => push('/profile/settings/edit')

  return (
    <div className="flex w-full">
      <main className="pl-6 py-9 pr-16 grow">
        <div className="flex text-light-100 gap-9">
          <Avatar src={avatar} alt={'photo'} />
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-wrap justify-between">
              <div className="font-bold">{userName}</div>
              <GlobalButton
                className={'md:px-3'}
                type={'button'}
                variant={'white'}
                callback={onRedirectToSetting}
              >
                <span className={'md:hidden'}> Profile Settings</span>
                <Image
                  className={'md:visible invisible'}
                  src={settings}
                  alt={'settings'}
                  height={24}
                  width={24}
                />
              </GlobalButton>
            </div>
            <div className="flex gap-[72px] md:gap-[20px] flex-wrap">
              <div className="text-sm">
                <div className="font-bold">2 218</div>
                <span>Subscriptions</span>
              </div>
              <div className="text-sm">
                <div className="font-bold">2 358</div>
                <span>Subscribers</span>
              </div>
              <div className="text-sm">
                <div className="font-bold">2 764</div>
                <span>Publications</span>
              </div>
            </div>
            <div>
              <p className="text-base">{aboutMe}</p>
            </div>
          </div>
        </div>

        <LatestPosts />
      </main>
    </div>
  )
}
