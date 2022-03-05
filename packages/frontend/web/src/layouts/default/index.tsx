import { Appbar, Sidebar, Background } from '@components'
import { SidebarContext } from '@providers'
import { useContext } from 'react'

import { Container, Column, Main, ScrollArea } from './styles'

export const DefaultLayout: React.FC = ({ children }) => {
  const { isActive, isMobile, hideSidebar } = useContext(SidebarContext)

  return (
    <Container>
      <Sidebar />
      <Column>
        <Appbar />
        <Main>
          <ScrollArea>{children}</ScrollArea>
        </Main>
        {isActive && isMobile && <Background onClick={hideSidebar} />}
      </Column>
    </Container>
  )
}
