import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons'

import { Container } from '../styles/components/tab'
import Card from './card'

interface ITab {
  name: string
  icon: React.ComponentType<IconBaseProps>
  children: ReactNode
  path?: string
}

interface Props {
  tabs: ITab[]
}

const Tab: React.FC<Props> = ({ tabs }) => {
  const router = useRouter()
  const query: any = router?.query
  const [selectedTab, setSelectedTab] = useState(0)

  if (!tabs || tabs.length === 0)
    throw new Error('A tab component must have at least 1 tab')

  const handleTabChange = useCallback(
    index => {
      if (query.tab) {
        let path = router.pathname
        for (const key of Object.keys(query)) {
          path = path.replaceAll(
            new RegExp('\\[' + key + '\\]', 'g'),
            key !== 'tab' ? query[key] : tabs[index].path
          )
        }
        router.push(path)
      }
      setSelectedTab(index)
    },
    [query, tabs, router]
  )

  useEffect(() => {
    const index = tabs.findIndex(tab => tab.path === query?.tab)
    setSelectedTab(index !== -1 ? index : 0)
  }, [tabs, query])

  return (
    <>
      <Container>
        {tabs.map(({ name, icon: Icon }, index) => (
          <span key={index}>
            <input
              defaultChecked={selectedTab === index}
              type="radio"
              id={'tab' + index + '_' + name.replace(' ', '_')}
              name="tabs"
              onClick={() => handleTabChange(index)}
            />
            <label htmlFor={'tab' + index + '_' + name.replace(' ', '_')}>
              <Icon size={18} />
              <span className="hide-md-down">{name}</span>
            </label>
          </span>
        ))}
      </Container>
      <Card>{tabs[selectedTab]?.children}</Card>
    </>
  )
}

export default Tab
