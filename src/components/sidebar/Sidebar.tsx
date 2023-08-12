import React, { FC } from 'react'

// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import bookmarkOutline from '@/assets/icons/sidebar/bookmark-outline.svg'
import bookmark from '@/assets/icons/sidebar/bookmark.svg'
import homeOutline from '@/assets/icons/sidebar/home-outline.svg'
import home from '@/assets/icons/sidebar/home.svg'
import messengerOutline from '@/assets/icons/sidebar/message-circle-outline.svg'
import messenger from '@/assets/icons/sidebar/message-circle.svg'
import personOutline from '@/assets/icons/sidebar/person-outline.svg'
import person from '@/assets/icons/sidebar/person.svg'
import searchOutline from '@/assets/icons/sidebar/search-outline.svg'
import search from '@/assets/icons/sidebar/search.svg'
import trendingOutline from '@/assets/icons/sidebar/trending-up-outline.svg'
import trending from '@/assets/icons/sidebar/trending-up.svg'
import { useTranslation } from '@/components/translation'
import { LogoutButton } from '@/modules/auth-modules/login-module/logout'
import { CreatePost } from '@/modules/post-modules/create-post-module'

export const Sidebar: FC = () => {
  const { pathname } = useRouter()
  const { t } = useTranslation()
  // CSS Styles
  const className = {
    home: clsx(pathname === '/' ? 'text-accent-500' : '', 'flex gap-[15px] items-center'),
    myProfile: clsx(
      pathname === '/profile' ? 'text-accent-500' : '',
      'flex gap-[15px] items-center'
    ),
    messenger: clsx(
      pathname === '/messenger' ? 'text-accent-500' : '',
      'flex gap-[15px] items-center'
    ),
    search: clsx(pathname === '/search' ? 'text-accent-500' : '', 'flex gap-[15px] items-center'),
    statistics: clsx(
      pathname === '/statistics' ? 'text-accent-500' : '',
      'flex gap-[15px] items-center mt-14'
    ),
    favorites: clsx(
      pathname === '/favorites' ? 'text-accent-500' : '',
      'flex gap-[15px] items-center'
    ),
    hidden: 'lg:hidden',
  }

  return (
    <aside className="h-screen sticky top-0 max-w-[320px] w-full border-r-[1px] border-r-bgLogBorder lg:max-w-[100px]">
      <div className="text-light-100 font-medium flex flex-col items-center justify-between py-[72px] h-full">
        <ul className="list-none flex gap-6 flex-col">
          <li>
            <Link href={'/'} className={className.home}>
              <Image
                src={pathname === '/' ? home : homeOutline}
                alt={t.navBar.home}
                height={24}
                width={24}
              />
              <span className={className.hidden}>{t.navBar.home}</span>
            </Link>
          </li>
          <li>
            <CreatePost />
          </li>
          <li className="">
            <Link href={'/profile'} className={className.myProfile}>
              <Image
                src={pathname === '/profile' ? person : personOutline}
                alt={t.navBar.myProfile}
                height={24}
                width={24}
              />
              <span className={className.hidden}>{t.navBar.myProfile}</span>
            </Link>
          </li>
          <li className="">
            <Link href={'/messenger'} className={className.messenger}>
              <Image
                src={pathname === '/messenger' ? messenger : messengerOutline}
                alt={t.navBar.messenger}
                height={24}
                width={24}
              />
              <span className={className.hidden}>{t.navBar.messenger}</span>
            </Link>
          </li>
          <li className="">
            <Link href={'/search'} className={className.search}>
              <Image
                src={pathname === '/search' ? search : searchOutline}
                alt={t.navBar.search}
                height={24}
                width={24}
              />
              <span className={className.hidden}>{t.navBar.search}</span>
            </Link>
          </li>
          <li className="">
            <Link href={'/statistics'} className={className.statistics}>
              <Image
                src={pathname === '/statistics' ? trending : trendingOutline}
                alt={t.navBar.statistics}
                height={24}
                width={24}
              />
              <span className={className.hidden}>{t.navBar.statistics}</span>
            </Link>
          </li>
          <li className="">
            <Link href={'/favorites'} className={className.favorites}>
              <Image
                src={pathname === '/favorites' ? bookmark : bookmarkOutline}
                alt={t.navBar.favorites}
                height={24}
                width={24}
              />
              <span className={className.hidden}>{t.navBar.favorites}</span>
            </Link>
          </li>
        </ul>
        <LogoutButton />
      </div>
    </aside>
  )
}
