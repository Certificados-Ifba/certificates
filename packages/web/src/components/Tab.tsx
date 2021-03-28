import React, { ReactNode } from 'react'
import { Container } from '../styles/components/Tab'
import { useState } from 'react'
import Card from './Card'
import { IconBaseProps } from 'react-icons'

interface TabsProps {
  id?: string
  name: string
  icon: React.ComponentType<IconBaseProps>
  children: ReactNode
}

const Tab: React.FC<{ tabs: TabsProps[] }> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState<TabsProps>(tabs[0])
  return (
    <>
      <Container>
        {tabs.map((tab, index) => {
          if (!tab.id)
            tab.id = 'tab' + index + "_" + tab.name.toLowerCase().replace(" ", "_");
          return (
            <span key={tab.id}>
              <input
                defaultChecked={selectedTab.id == tab.id}
                type="radio"
                id={tab.id}
                name="tabs"
                onChange={() => setSelectedTab(tab)}
              />
              <label htmlFor={tab.id}>
                <tab.icon /> <span className="hide-md-down">{tab.name}</span>
              </label>
            </span>
          )
        })}
      </Container>
      <Card>{selectedTab.children}</Card>
    </>
  )
}

export default Tab
