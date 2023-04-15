import React, { useState } from 'react'

import { tabs } from '@/common'
import { TabsTitle } from '@/components/account'

export const SettingsProfile = () => {
  const [activeTab, setActiveTab] = useState(tabs && tabs[0].label)

  const tabsLayout = tabs.map(tab => {
    return <div key={tab.id}>{activeTab === tab.label && tab.content}</div>
  })

  const onChange = (value: string | undefined) => {
    setActiveTab(value!)
  }

  return (
    <div className="relative w-full">
      <TabsTitle variant="edit" tabs={tabs} setActiveTab={onChange} activeTab={activeTab} />
      {tabsLayout}
    </div>
  )
}
