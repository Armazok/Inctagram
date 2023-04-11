import React from 'react'

import { nanoid } from 'nanoid'

import EditSetting from '@/modules/account-modules/edit-account-module/components/EditSettingAccount'

export const tabs = [
  { id: nanoid(), label: 'General information', content: <EditSetting /> },
  {
    id: nanoid(),
    label: 'Devices',
    content: <div className="text-white mt-[20px] ml-[50px]">in future</div>,
  },
]
