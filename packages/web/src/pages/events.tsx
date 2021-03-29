import { Form } from '@unform/web'
import Head from 'next/head'
import { useCallback } from 'react'
import {
  FiAward,
  FiCalendar,
  FiEdit,
  FiInfo,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUserPlus
} from 'react-icons/fi'

import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import PaginatedTable from '../components/PaginatedTable'
import usePaginatedRequest from '../services/usePaginatedRequest'
import { Container } from '../styles/pages/Home'

const Events: React.FC = () => {
  const request = usePaginatedRequest<any>({
    url: 'http://localhost:3001/test/events'
  })

  const handleFilter = useCallback(data => {
    console.log(data)
  }, [])

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
          <Button>
            <FiPlus size={20} />
            <span className="hide-md-down">Adicionar Evento</span>
          </Button>
        </nav>
      </header>
      <Card>
        <header>
          <h2>Últimos Eventos</h2>
          <Form onSubmit={handleFilter}>
            <Input name="search" placeholder="Buscar função" icon={FiSearch} />
          </Form>
        </header>
        {/* <Table columns={columns} data={data} /> */}
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
            {request.data?.data?.events?.map(event => (
              <tr key={event.initials}>
                <td>{event.name}</td>
                <td>{event.initials}</td>
                <td>{event.year}</td>
                <td>{event.start_date}</td>
                <td>{event.end_date}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      inline
                      ghost
                      square
                      color="secondary"
                      size="small"
                      // onClick={() =>
                      //   history.push(
                      //     `/access-control/collaborators/edit/${movie.id}`
                      //   )
                      // }
                    >
                      <FiInfo size={20} />
                    </Button>
                    <Button
                      inline
                      ghost
                      square
                      color="secondary"
                      size="small"
                      // onClick={() =>
                      //   history.push(
                      //     `/access-control/collaborators/edit/${movie.id}`
                      //   )
                      // }
                    >
                      <FiUserPlus size={20} />
                    </Button>
                    <Button
                      inline
                      ghost
                      square
                      color="primary"
                      size="small"
                      // onClick={() =>
                      //   history.push(
                      //     `/access-control/collaborators/edit/${movie.id}`
                      //   )
                      // }
                    >
                      <FiAward size={20} />
                    </Button>
                    <Button
                      inline
                      ghost
                      square
                      color="warning"
                      size="small"
                      // onClick={() =>
                      //   history.push(
                      //     `/access-control/collaborators/edit/${movie.id}`
                      //   )
                      // }
                    >
                      <FiEdit size={20} />
                    </Button>
                    <Button
                      inline
                      ghost
                      square
                      color="danger"
                      size="small"
                      // onClick={() =>
                      //   history.push(
                      //     `/access-control/collaborators/edit/${movie.id}`
                      //   )
                      // }
                    >
                      <FiTrash2 size={20} />
                    </Button>
                  </div>
                  {/*
                </Button>
                <Button inline size="small" color="danger">
                  Deletar
                </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </PaginatedTable>
      </Card>
    </Container>
  )
}

export default Events
