import { useContext } from 'react'
import {
  FiCalendar,
  FiHome,
  FiSettings,
  FiUserCheck,
  FiUsers
} from 'react-icons/fi'

import LogoFull from '../assets/logo-full.svg'
import LogoSimple from '../assets/logo.svg'
import { SidebarContext } from '../providers/sidebar'
import {
  Container,
  LogoArea,
  ScrollBar,
  Buttons
} from '../styles/components/sidebar'
import ActiveLink from './activeLink'

const Sidebar: React.FC = () => {
  const { isActive, hideSidebar } = useContext(SidebarContext)

  const itens = [
    {
      name: 'Dashboard',
      link: '/',
      icon: FiHome
    },
    {
      name: 'Eventos',
      link: '/events',
      icon: FiCalendar
    },
    {
      name: 'Participantes',
      link: '/participants',
      icon: FiUserCheck
    },
    {
      name: 'Usuários',
      link: '/users',
      icon: FiUsers
    },
    {
      name: 'Configurações',
      link: '/settings',
      icon: FiSettings
    }
  ]
  const active = isActive ? 'active' : ''
  const Logo = isActive ? LogoFull : LogoSimple

  return (
    <Container className={active}>
      <LogoArea>
        <Logo />
      </LogoArea>
      <Buttons>
        <ScrollBar>
          {itens.map(({ name, link, icon: Icon }, key) => (
            <li key={key} onClick={hideSidebar}>
              <ActiveLink href={link}>
                <a>
                  <Icon size={24} />
                  <span>{name}</span>
                </a>
              </ActiveLink>
            </li>
          ))}
        </ScrollBar>
      </Buttons>
    </Container>
  )
}

export default Sidebar
