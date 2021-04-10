import { Form } from '@unform/web'
import Head from 'next/head'
import { useCallback } from 'react'
import {
  FiAward,
  FiEdit,
  FiInfo,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUserCheck,
  FiUserPlus
} from 'react-icons/fi'

import Button from '../components/button'
import Card from '../components/card'
import Input from '../components/input'
import PaginatedTable from '../components/paginatedTable'
import withAuth from '../hocs/withAuth'
import { useAuth } from '../providers/auth'
import usePaginatedRequest from '../services/usePaginatedRequest'
import { Container } from '../styles/pages/home'

const Participants: React.FC = () => {
  const { user } = useAuth()

  const request = usePaginatedRequest<any>({
    url: 'test/participants'
  })

  const handleFilter = useCallback(data => {
    console.log(data)
  }, [])

  if (!user) {
    return <div>loading...</div>
  }

  return (
    <Container>
      <Head>
        <title>Participantes | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiUserCheck size={24} /> Participantes
          </h1>
          <h2>
            Todas as pessoas que participaram ou vão participar dos eventos
          </h2>
        </div>
        <nav>
          <Button>
            <FiPlus size={20} />
            <span className="hide-md-down">Adicionar Participante</span>
          </Button>
        </nav>
      </header>
      <Card>
        <header>
          <h2>Participantes dos Últimos Eventos</h2>
          <Form onSubmit={handleFilter}>
            <Input name="search" placeholder="Buscar função" icon={FiSearch} />
          </Form>
        </header>
        <PaginatedTable request={request}>
          <thead>
            <tr>
              <th>CPF</th>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>E-mail</th>
              <th>Instituição</th>
              <th>Ultimo Evento</th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.participants?.map(participant => (
              <tr key={participant.cpf}>
                <td>{participant.cpf}</td>
                <td>{participant.name}</td>
                <td>{participant.birth_date}</td>
                <td>{participant.email}</td>
                <td>{participant.institution}</td>
                <td>{participant.last_event}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button inline ghost square color="secondary" size="small">
                      <FiInfo size={20} />
                    </Button>
                    <Button inline ghost square color="secondary" size="small">
                      <FiUserPlus size={20} />
                    </Button>
                    <Button inline ghost square color="primary" size="small">
                      <FiAward size={20} />
                    </Button>
                    <Button inline ghost square color="warning" size="small">
                      <FiEdit size={20} />
                    </Button>
                    <Button inline ghost square color="danger" size="small">
                      <FiTrash2 size={20} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </PaginatedTable>
      </Card>
    </Container>
  )
}

export default withAuth(Participants)
