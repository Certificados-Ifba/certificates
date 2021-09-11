import Head from 'next/head'
import { useEffect, useState } from 'react'
import {
  FiCalendar,
  FiHome,
  FiPlus,
  FiTool,
  FiUserCheck,
  FiUsers
} from 'react-icons/fi'

import Button from '../components/button'
import CardIcon from '../components/cardIcon'
import IUser from '../dtos/IUser'
import withAuth from '../hocs/withAuth'
import { useAuth } from '../providers/auth'
import { Container, ListCards } from '../styles/pages/home'
import capitalize from '../utils/capitalize'

const Home: React.FC = () => {
  const [user, setUser] = useState<IUser>()
  const { user: userAuth } = useAuth()

  useEffect(() => {
    if (!user) {
      setUser(userAuth)
    }
  }, [user, userAuth])

  const firstName = capitalize(user?.name.split(' ')[0])

  return (
    <Container>
      <Head>
        <title>Dashboard | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiHome size={24} /> Dashboard
          </h1>
          <h2>
            Seja bem vindo, <b>{firstName}</b>
          </h2>
        </div>
        <nav>
          <Button>
            <FiPlus size={20} />
            <span className="hide-md-down">Adicionar Evento</span>
          </Button>
        </nav>
      </header>
      <ListCards>
        <CardIcon
          title="Participantes"
          value={1563}
          icon={<FiUserCheck size={24} />}
          color="secondary"
        />
        <CardIcon
          title="Funções"
          value={20}
          icon={<FiTool size={24} />}
          color="danger"
        />
        <CardIcon
          title="Usuários"
          value={30}
          icon={<FiUsers size={24} />}
          color="primary"
        />
        <CardIcon
          title="Eventos"
          value={33}
          icon={<FiCalendar size={24} />}
          color="warning"
        />
      </ListCards>
    </Container>
  )
}

export default withAuth(Home)
