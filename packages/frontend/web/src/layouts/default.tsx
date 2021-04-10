import { useContext } from 'react'

import Appbar from '../components/appbar'
import Sidebar from '../components/sidebar'
import { SidebarContext } from '../providers/sidebar'
import Background from '../styles/components/background'
import { Container, Column, Main, ScrollArea } from '../styles/layouts/default'

const DefaultLayout: React.FC = ({ children }) => {
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

export default DefaultLayout
