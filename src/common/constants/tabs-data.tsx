import React from 'react'

import { nanoid } from 'nanoid'

import { EditSettingProfile } from '@/modules/profile-modules/settings-edit-profile-module'

export const tabs = [
  { id: nanoid(), label: 'General information', content: <EditSettingProfile /> },
  {
    id: nanoid(),
    label: 'Devices',
    content: <div className="text-white mt-[20px] ml-[50px]">in future</div>,
  },
]
