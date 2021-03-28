import Link from 'next/link'
import React from 'react'
import {
  FiCalendar,
  FiHome,
  FiSettings,
  FiUserCheck,
  FiUsers
} from 'react-icons/fi'

import LogoFull from '../assets/logo-full.svg'
import LogoSimple from '../assets/logo.svg'
import {
  Container,
  LogoArea,
  ScrollBar,
  Buttons
} from '../styles/components/Sidebar'

interface SidebarProps {
  isActive: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ isActive }) => {
  const itens = [
    {
      name: 'Dashboard',
      link: '/',
      icon: <FiHome size={24} />
    },
    {
      name: 'Eventos',
      link: '/events',
      icon: <FiCalendar size={24} />
    },
    {
      name: 'Participantes',
      link: '/participants',
      icon: <FiUserCheck size={24} />
    },
    {
      name: 'Usuários',
      link: '/users',
      icon: <FiUsers size={24} />
    },
    {
      name: 'Configurações',
      link: '/settings',
      icon: <FiSettings size={24} />
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
          {itens.map(({ name, link, icon }, key) => (
            <li key={key}>
              <Link href={link}>
                <a>
                  {icon}
                  <span>{name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ScrollBar>
      </Buttons>
      {/* <Button>
        <FiSettings size={24} />
      </Button> */}
    </Container>
  )
}

export default Sidebar
