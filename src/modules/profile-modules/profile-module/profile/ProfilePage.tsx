import React from 'react'

import { useRouter } from 'next/router'

import GlobalButton from '@/ui/buttons/GlobalButton'

export const ProfilePage = () => {
  const { push } = useRouter()

  const onRedirectToSetting = () => push('/profile/settings/edit')

  return (
    <div className="flex">
      <main className="pl-6 py-9 pr-16">
        <div className="flex text-light-100 gap-9">
          <img
            src={'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg'}
            className={'rounded-full w-72'}
            alt={'photo'}
          />
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <div className="font-bold">ORANGE ORANGE</div>
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
              <p className="text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum eius explicabo
                recusandae repellat reprehenderit similique suscipit, voluptates! Excepturi iste
                libero magnam quae totam voluptas. Dolorem quos repellendus rerum sapiente vitae.
              </p>
            </div>
          </div>
        </div>
        <div></div>
        <div className="grid grid-cols-4 gap-3 mt-14">
          <img
            src={'https://foodcity.ru/storage/products/October2018/6XZSr6ddCl6cxfo0UchP.jpg'}
            alt={'photo'}
          />
        </div>
      </main>
    </div>
  )
}
