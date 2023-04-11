import React from 'react'

import Head from 'next/head'

import AccountLayout from '@/components/account/account-layout/AccountLayout'
import SettingsAccount from '@/modules/account-modules/edit-account-module/SettingAccount'

const EditAccount = () => {
  return (
    <div>
      <Head>
        <title>Edit Account</title>
      </Head>

      <AccountLayout>
        <SettingsAccount />
      </AccountLayout>
    </div>
  )
}

export default EditAccount
