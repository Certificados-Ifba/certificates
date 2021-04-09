import { transparentize } from 'polished'
import { BaseHTMLAttributes, useContext } from 'react'
import SimpleBar from 'simplebar-react'
import styled from 'styled-components'

import Appbar from '../components/appbar'
import Sidebar from '../components/sidebar'
import { SidebarContext } from '../contexts/sidebarContext'

import 'simplebar/dist/simplebar.min.css'

interface MainProps extends BaseHTMLAttributes<HTMLDivElement> {
  isActive: boolean
}

const Main = styled.main<MainProps>`
  flex: 1;
  ${({ isActive, theme }) =>
    isActive &&
    `
    @media (max-width: 768px) {
    filter: blur(4px);
    transition: all 0.5s;
    ::before {
      content: '';
      background-color: ${transparentize(0.8, theme.colors.dark)};
      position: absolute;
      top: -100px;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
    }
  }
  `}
`
const DefaultLayout: React.FC = ({ children }) => {
  const { isActive, toogleActive } = useContext(SidebarContext)

  return (
    <div id="app">
      <Sidebar isActive={isActive} />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Appbar />
        <Main isActive={isActive}>
          {/* onClick={() => isActive && toogleActive()}> */}
          <SimpleBar
            style={{ maxHeight: 'calc(100vh - 100px)', width: '100%' }}
          >
            {children}
          </SimpleBar>
        </Main>
      </div>
    </div>
  )
}

export default DefaultLayout
