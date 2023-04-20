import React, { useState } from 'react'

import { tabs } from '@/common'
import { TabsTitle } from '@/components/account'

export const SettingsProfile = () => {
  const [activeTab, setActiveTab] = useState(tabs && tabs[0].label)

  const tabsLayout = tabs.map(tab => {
    return <div key={tab.id}>{activeTab === tab.label && tab.content}</div>
  })

  const onChangeTab = (tabLabel: string | undefined) => setActiveTab(tabLabel ? tabLabel : '')

  return (
    <div className="relative w-full">
      <TabsTitle tabs={tabs} setActiveTab={onChangeTab} activeTab={activeTab} />
      {tabsLayout}
    </div>
  )
}
