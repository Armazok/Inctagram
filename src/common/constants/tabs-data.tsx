import React from 'react'

import { nanoid } from 'nanoid'

import { EditSettingProfile } from '@/modules/profile-modules/settings-edit-profile-module'

export const tabs = [
  { id: nanoid(), label: 'General information', content: <EditSettingProfile /> },
  {
    id: nanoid(),
    label: 'Devices',
    content: <div className="text-white mt-[20px] ml-[50px]">in future Devices</div>,
  },
  {
    id: nanoid(),
    label: 'Account Management',
    content: <div className="text-white mt-[20px] ml-[50px]">in future Account Management</div>,
  },
  {
    id: nanoid(),
    label: 'My payments',
    content: <div className="text-white mt-[20px] ml-[50px]">in future My payments</div>,
  },
]
