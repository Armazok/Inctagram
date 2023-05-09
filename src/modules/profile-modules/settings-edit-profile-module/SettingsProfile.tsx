import React, { useState } from 'react'

import { settings_profile_tabs } from '@/common'
import { TabsTitle } from '@/components/account'

export const SettingsProfile = () => {
  const [activeTab, setActiveTab] = useState(
    settings_profile_tabs && settings_profile_tabs[0].label
  )

  const tabsLayout = settings_profile_tabs.map(tab => {
    return <div key={tab.id}>{activeTab === tab.label && tab.content}</div>
  })

  const onChangeTab = (tabLabel: string | undefined) => setActiveTab(tabLabel ?? '')

  return (
    <div className="relative w-full">
      <TabsTitle tabs={settings_profile_tabs} setActiveTab={onChangeTab} activeTab={activeTab} />
      {tabsLayout}
    </div>
  )
}
