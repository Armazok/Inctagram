import React from 'react'

import { nanoid } from 'nanoid'

import { EditSettingProfile } from '@/modules/profile-modules/settings-edit-profile-module'
import AccountManagementPage from '@/pages/profile/settings/account-management'

export const settings_profile_tabs = [
  { id: nanoid(), label: 'General information', content: <EditSettingProfile /> },
  {
    id: nanoid(),
    label: 'Devices',
    content: <div className="text-white mt-[20px] ml-[50px]">in future Devices</div>,
  },
  {
    id: nanoid(),
    label: 'Account Management',
    content: <AccountManagementPage />,
  },
  {
    id: nanoid(),
    label: 'My payments',
    content: <div className="text-white mt-[20px] ml-[50px]">in future My payments</div>,
  },
]
