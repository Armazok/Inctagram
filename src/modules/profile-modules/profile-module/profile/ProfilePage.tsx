import React from 'react'

import { useRouter } from 'next/router'

import { LatestPosts } from '@/modules/post-modules/latest-posts'
import { useGetProfile } from '@/modules/profile-modules/settings-edit-profile-module'
import { GlobalButton } from '@/ui'

export const ProfilePage = () => {
  const { push } = useRouter()
  const { profileData, profileAvatar } = useGetProfile()
  const userName = profileData && profileData.userName
  const aboutMe = profileData && profileData.aboutMe
  const avatar = profileAvatar && profileAvatar
  const onRedirectToSetting = () => push('/profile/settings/edit')

  // 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg'
  return (
    <div className="flex">
      <main className="pl-6 py-9 pr-16">
        <div className="flex text-light-100 gap-9">
          <img src={avatar} className={'rounded-full w-72'} alt={'photo'} />
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <div className="font-bold">{userName}</div>
              <GlobalButton type={'button'} variant={'white'} callback={onRedirectToSetting}>
                Profile Settings
              </GlobalButton>
            </div>
            <div className="flex gap-[72px]">
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
        <div></div>

        <LatestPosts />
      </main>
    </div>
  )
}
