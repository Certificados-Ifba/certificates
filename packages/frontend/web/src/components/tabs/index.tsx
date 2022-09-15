import { Card } from '@components'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons'

import { Container } from './styles'

interface ITab {
  name: string
  icon: React.ComponentType<IconBaseProps>
  children: ReactNode
  path?: string
  disabled?: boolean
}

interface Props {
  tabs: ITab[]
  name?: string
  notPushRouter?: boolean
}

export const Tabs: React.FC<Props> = ({
  tabs,
  name = 'tabs',
  notPushRouter
}) => {
  const router = useRouter()
  const tab: any = router?.query?.tab
  const [selectedTab, setSelectedTab] = useState(0)

  if (!tabs || tabs.length === 0)
    throw new Error('A tab component must have at least 1 tab')

  const handleTabChange = useCallback(
    index => {
      if (!notPushRouter) router.push(tabs[index].path)
      setSelectedTab(index)
    },
    [notPushRouter, router, tabs]
  )

  useEffect(() => {
    if (tab) {
      const index = tabs.findIndex(
        ({ path, disabled }) => path === tab && !disabled
      )
      if (index === -1 && !notPushRouter) router.push(tabs[0].path)
      setSelectedTab(index !== -1 && !notPushRouter ? index : 0)
    }
  }, [notPushRouter, router, tab, tabs])

  return (
    <>
      <Container>
        {tabs.map(({ name: tabName, icon: Icon }, index) => (
          <span key={index}>
            <input
              checked={selectedTab === index}
              type="radio"
              id={`tab-${index}-${tabName.replace(' ', '-')}`}
              name={name}
              onChange={() => handleTabChange(index)}
            />
            <label htmlFor={`tab-${index}-${tabName.replace(' ', '-')}`}>
              <Icon size={18} />
              <span className="hide-md-down">{tabName}</span>
            </label>
          </span>
        ))}
      </Container>
      <Card>{tabs[selectedTab]?.children}</Card>
    </>
  )
}
