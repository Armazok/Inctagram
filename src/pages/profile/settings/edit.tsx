import React from 'react'

import Head from 'next/head'

import { useWindowSize } from '@/common'
import { AccountLayout } from '@/components/account'
import { NavigateToProfile } from '@/components/account/navigate-to-profile/NavigateToProfile'
import { getGlobalLayout, getLayoutWithHeader } from '@/components/layout'
import { SettingsProfile } from '@/modules/profile-modules/settings-edit-profile-module'
import { NextPageWithLayout } from '@/pages/_app'

const editProfilePage: NextPageWithLayout = () => {
  const { width } = useWindowSize()

  return (
    <>
      {width &&
        width <= 360 &&
        getLayoutWithHeader(
          <>
            <Head>
              <title>Profile Settings</title>
            </Head>
            <AccountLayout>
              <NavigateToProfile />
              <SettingsProfile />
            </AccountLayout>
          </>
        )}
      {width &&
        width > 360 &&
        getGlobalLayout(
          <>
            <Head>
              <title>Profile Settings</title>
            </Head>
            <AccountLayout>
              <SettingsProfile />
            </AccountLayout>
          </>
        )}
    </>
  )
}

export default editProfilePage
