import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons'

import { Container } from '../styles/components/tab'
import Card from './card'

interface TabsProps {
  name: string
  icon: React.ComponentType<IconBaseProps>
  children: ReactNode
  path?: string
}

const Tab: React.FC<{ tabs: TabsProps[] }> = ({ tabs }) => {
  const router = useRouter()
  const query: any = router.query

  if (!tabs || tabs.length === 0)
    throw new Error('A tab component must have at least 1 tab')

  const getIndexTabByPath: (path: string) => number = useCallback(
    (path: string) => {
      let selectedTabIndex = 0
      if (path) {
        let index = 0
        for (const tab of tabs) {
          if (tab.path === query.tab) {
            selectedTabIndex = index
            break
          }
          index++
        }
      }
      return selectedTabIndex
    },
    [query?.tab, tabs]
  )

  const [selectedTab, setSelectedTab] = useState(getIndexTabByPath(query.tab))
  const [byClick, setByClick] = useState(true)
  const handleTabChange = useCallback(
    index => {
      if (query.tab) {
        let path: string = router.pathname
        for (const key of Object.keys(query)) {
          if (key !== 'tab')
            path = path.replaceAll(
              new RegExp('\\[' + key + '\\]', 'g'),
              query[key]
            )
        }
        path = path.replaceAll(/\[tab\]/g, tabs[index].path)
        router.push(path)
        setSelectedTab(index)
        setByClick(true)
      } else {
        setSelectedTab(index)
        setByClick(true)
      }
    },
    [query, router, tabs]
  )

  return (
    <>
      <Container>
        {tabs.map((tab, index) => (
          <span key={index}>
            <input
              defaultChecked={selectedTab === index}
              type="radio"
              id={'tab' + index + '_' + tab.name.replace(' ', '_')}
              name="tabs"
              onChange={() => {
                handleTabChange(index)
              }}
            />
            <label htmlFor={'tab' + index + '_' + tab.name.replace(' ', '_')}>
              <tab.icon size={18} />
              <span className="hide-md-down">{tab.name}</span>
            </label>
          </span>
        ))}
      </Container>
      <Card>{tabs[selectedTab]?.children}</Card>
    </>
  )
}

export default Tab
