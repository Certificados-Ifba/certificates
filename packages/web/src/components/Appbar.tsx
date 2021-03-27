import { useContext } from 'react'
import { FiLogOut, FiMenu } from 'react-icons/fi'

import { SidebarContext } from '../contexts/SidebarContext'
import {
  Container,
  Button,
  UserInfo,
  Info,
  Avatar,
  Right
} from '../styles/components/Appbar'

const Appbar: React.FC = () => {
  const name = 'Lucas Nascimento Bertoldi'
  const type = 'Administrador'
  const { toogleActive } = useContext(SidebarContext)
  return (
    <Container>
      <Button onClick={toogleActive}>
        <FiMenu size={24} />
      </Button>
      <Right>
        <UserInfo className="hide-md-down">
          <Info>
            <b>{name}</b>
            <span>{type}</span>
          </Info>
          <Avatar>{name.substr(0, 1).toUpperCase()}</Avatar>
        </UserInfo>
        <Button>
          <FiLogOut size={24} />
        </Button>
      </Right>
    </Container>
  )
}

export default Appbar
