import { ReactNode, useState } from 'react'
import { IconBaseProps } from 'react-icons'

import { Container } from '../styles/components/Tab'
import Card from './Card'

interface TabsProps {
  id?: string
  name: string
  icon: React.ComponentType<IconBaseProps>
  children: ReactNode
}

const Tab: React.FC<{ tabs: TabsProps[] }> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  return (
    <>
      <Container>
        {tabs.map((tab, index) => {
          if (!tab.id)
            tab.id =
              'tab' + index + '_' + tab.name.toLowerCase().replace(' ', '_')
          return (
            <span key={tab.id}>
              <input
                defaultChecked={selectedTab === index}
                type="radio"
                id={tab.id}
                name="tabs"
                onChange={() => setSelectedTab(index)}
              />
              <label htmlFor={tab.id}>
                <tab.icon size={18} />
                <span className="hide-md-down">{tab.name}</span>
              </label>
            </span>
          )
        })}
      </Container>
      <Card>{tabs[selectedTab]?.children}</Card>
    </>
  )
}

export default Tab
