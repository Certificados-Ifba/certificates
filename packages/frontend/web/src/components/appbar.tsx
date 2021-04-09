import { useContext } from 'react'
import { FiLogOut, FiMenu } from 'react-icons/fi'

import { SidebarContext } from '../contexts/sidebarContext'
import useAuth from '../hooks/useAuth'
import {
  Container,
  Button,
  UserInfo,
  Info,
  Avatar,
  Right
} from '../styles/components/appbar'

const Appbar: React.FC = () => {
  const { user, signOut } = useAuth()
  console.log(user)

  const { toogleActive } = useContext(SidebarContext)

  return (
    <Container>
      <Button onClick={toogleActive}>
        <FiMenu size={24} />
      </Button>
      <Right>
        <UserInfo className="hide-md-down">
          <Info>
            <b>{user?.name}</b>
            <span>{user?.role}</span>
          </Info>
          <Avatar>{user?.name.substr(0, 1).toUpperCase()}</Avatar>
        </UserInfo>
        <Button>
          <FiLogOut size={24} onClick={signOut} />
        </Button>
      </Right>
    </Container>
  )
}

export default Appbar
