import Head from 'next/head'
import {
  FiCalendar,
  FiHome,
  FiPlus,
  FiTool,
  FiUserCheck,
  FiUsers
} from 'react-icons/fi'

import Button from '../components/Button'
import CardIcon from '../components/CardIcon'
import useAuth from '../hooks/useAuth'
import { Container, ListCards } from '../styles/pages/Home'

const Home: React.FC = () => {
  const { user } = useAuth()
  const name = 'Lucas Nascimento Bertoldi'

  if (!user) {
    return <div>loading...</div>
  }

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
          <h2>Seja bem vindo, {name.split(' ')[0]}</h2>
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

export default Home
