import { useRouter } from 'next/router'
import { useCallback, useContext, useState } from 'react'
import { FiLogOut, FiMenu } from 'react-icons/fi'

import { useAuth } from '../providers/auth'
import { SidebarContext } from '../providers/sidebar'
import { useToast } from '../providers/toast'
import {
  Container,
  Button,
  UserInfo,
  Info,
  Avatar,
  Right
} from '../styles/components/appbar'

const Appbar: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user, signOut, data } = useAuth()
  const { addToast } = useToast()

  const { toogleActive } = useContext(SidebarContext)

  const handleSignOut = useCallback(async () => {
    try {
      setLoading(true)

      await signOut()

      setLoading(false)
      router.replace('/login')
    } catch (err) {
      setLoading(false)

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao sair, tente novamente mais tarde.'
      })
    }
  }, [router, signOut, addToast])

  console.log(data)

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
        <Button disabled={loading}>
          <FiLogOut size={24} onClick={handleSignOut} />
        </Button>
      </Right>
    </Container>
  )
}

export default Appbar
