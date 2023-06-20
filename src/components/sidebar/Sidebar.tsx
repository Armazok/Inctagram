import React, { FC } from 'react'

// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { className } from 'postcss-selector-parser'

import bookmarkOutline from '../../assets/icons/bookmark-outline.svg'
import bookmark from '../../assets/icons/bookmark.svg'
import homeOutline from '../../assets/icons/home-outline.svg'
import home from '../../assets/icons/home.svg'
import personOutline from '../../assets/icons/person-outline.svg'
import person from '../../assets/icons/person.svg'
import trendingOutline from '../../assets/icons/trending-up-outline.svg'
import trending from '../../assets/icons/trending-up.svg'

import { LogoutButton } from '@/modules/auth-modules/login-module/logout'
import { CreatePost } from '@/modules/post-modules/create-post-module'
// @ts-ignore

export const Sidebar: FC = () => {
  const { pathname } = useRouter()

  // CSS Styles
  const className = {
    home: clsx(pathname === '/' ? 'text-accent-500' : '', 'flex gap-[15px] items-center'),
    myProfile: clsx(
      pathname === '/profile' ? 'text-accent-500' : '',
      'flex gap-[15px] items-center'
    ),
    statistics: clsx(
      pathname === '/statistics' ? 'text-accent-500' : '',
      'flex gap-[15px] items-center mt-14'
    ),
    favorites: clsx(
      pathname === '/favorites' ? 'text-accent-500' : '',
      'flex gap-[15px] items-center'
    ),
    hidden: 'md:hidden',
  }

  return (
    <aside className="h-screen sticky top-0 max-w-[320px] w-full border-r-[1px] border-r-bgLogBorder md:max-w-[100px]">
      <div className="text-light-100 font-medium flex flex-col items-center justify-between py-[72px] h-full">
        <ul className="list-none flex gap-6 flex-col">
          <li>
            <Link href={'/'} className={className.home}>
              <Image
                src={pathname === '/' ? home : homeOutline}
                alt={'Home'}
                height={24}
                width={24}
              />
              <span className={className.hidden}>Home</span>
            </Link>
          </li>
          <li>
            <CreatePost />
          </li>
          <li className="">
            <Link href={'/profile'} className={className.myProfile}>
              <Image
                src={pathname === '/profile' ? person : personOutline}
                alt={'Profile'}
                height={24}
                width={24}
              />
              <span className={className.hidden}>My profile</span>
            </Link>
          </li>
          <li className="">
            <Link href={'/statistics'} className={className.statistics}>
              <Image
                src={pathname === '/statistics' ? trending : trendingOutline}
                alt={'Statistic'}
                height={24}
                width={24}
              />
              <span className={className.hidden}>Statistics</span>
            </Link>
          </li>
          <li className="">
            <Link href={'/favorites'} className={className.favorites}>
              <Image
                src={pathname === '/favorites' ? bookmark : bookmarkOutline}
                alt={'Favorites'}
                height={24}
                width={24}
              />
              <span className={className.hidden}>Favorites</span>
            </Link>
          </li>
        </ul>
        <LogoutButton />
      </div>
    </aside>
  )
}
