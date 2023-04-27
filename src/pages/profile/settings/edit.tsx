import React from 'react'

import Head from 'next/head'

import { AccountLayout } from '@/components/account'
import { getGlobalLayout } from '@/components/layout'
import { SettingsProfile } from '@/modules/profile-modules/settings-edit-profile-module'
import { NextPageWithLayout } from '@/pages/_app'

const editProfilePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Profile Settings</title>
      </Head>
      <AccountLayout>
        <SettingsProfile />
      </AccountLayout>
    </>
  )
}

editProfilePage.getLayout = getGlobalLayout
export default editProfilePage
