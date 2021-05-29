import { Form } from '@unform/web'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { FiCalendar, FiInfo, FiPlus, FiSearch } from 'react-icons/fi'

import Button from '../components/button'
import Card from '../components/card'
import { EventModal } from '../components/event/eventModal'
import Input from '../components/input'
import PaginatedTable from '../components/paginatedTable'
import withAuth from '../hocs/withAuth'
import usePaginatedRequest from '../services/usePaginatedRequest'
import { Container } from '../styles/pages/home'

const Events: React.FC = () => {
  const router = useRouter()

  const request = usePaginatedRequest<any>({
    url: 'events'
  })

  const handleFilter = useCallback(data => {
    console.log(data)
  }, [])

  const [openEventModal, setOpenEventModal] = useState(false)

  return (
    <Container>
      <Head>
        <title>Eventos | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiCalendar size={24} /> Eventos
          </h1>
          <h2>
            Os eventos são conjuntos de atividades (palestras, minicurso, etc)
          </h2>
        </div>
        <nav>
          <Button onClick={() => setOpenEventModal(true)}>
            <FiPlus size={20} />
            <span className="hide-md-down">Adicionar Evento</span>
          </Button>
        </nav>
      </header>
      <Card>
        <header>
          <h2>Últimos Eventos</h2>
          <Form onSubmit={handleFilter}>
            <Input name="search" placeholder="Buscar evento" icon={FiSearch} />
          </Form>
        </header>
        <PaginatedTable request={request}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sigla</th>
              <th>Ano</th>
              <th>Data Inicial</th>
              <th>Data Final</th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.map(event => (
              <tr key={event.initials}>
                <td>{event.name}</td>
                <td>{event.initials}</td>
                <td>{new Date(event.start_date).getFullYear()}</td>
                <td>{new Date(event.start_date).toLocaleDateString()}</td>
                <td>{new Date(event.end_date).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      inline
                      ghost
                      square
                      color="secondary"
                      size="small"
                      onClick={() => {
                        router.replace(`events/${event.id}`)
                      }}
                    >
                      <FiInfo size={20} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </PaginatedTable>
      </Card>
      <EventModal
        request={request}
        type="add"
        openModal={openEventModal}
        setOpenModal={setOpenEventModal}
      />
    </Container>
  )
}

export default withAuth(Events)
