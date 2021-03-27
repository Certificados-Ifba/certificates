import Head from 'next/head'
import { useMemo, useState } from 'react'
import {
  FiAward,
  FiBarChart2,
  FiBook,
  FiCalendar,
  FiDelete,
  FiEdit,
  FiEdit2,
  FiEdit3,
  FiFileText,
  FiInfo,
  FiPlus,
  FiSearch,
  FiTool,
  FiTrash,
  FiTrash2,
  FiTrendingDown,
  FiUser,
  FiUserCheck,
  FiUserPlus,
  FiUsers
} from 'react-icons/fi'

import Button from '../components/Button'
import Card from '../components/Card'
import CardIcon from '../components/CardIcon'
import Input from '../components/Input'
import PaginatedTable from '../components/PaginatedTable'
import Table from '../components/Table'
import usePaginatedRequest from '../services/usePaginatedRequest'
import { Container, ListCards } from '../styles/pages/Home'

const Event: React.FC = () => {
  const request = usePaginatedRequest<any>({
    url: 'http://localhost:3001/test-events'
  })

  return (
    <Container>
      <Head>
        <title>Eventos | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>Eventos</h1>
          <h2>Informações do sistema</h2>
        </div>
        <nav>
          <Button>
            <FiPlus size={20} />
            <span className="hide-md-down">Novo Evento</span>
          </Button>
        </nav>
      </header>
      <Card>
        <header>
          <h2>Últimos Eventos</h2>
          <form>
            <Input
              type="text"
              placeholder="Buscar evento"
              icon={<FiSearch size={20} />}
            />
          </form>
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
            {request.data?.events?.map(event => (
              <tr key={event.name}>
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
        {/* <table>
          <thead>
            <tr>
              <td>Nome</td>
              <td>Ano</td>
              <td>Sigla</td>
              <td />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Projeto de Incentivo à Aprendizagem</td>
              <td>2016</td>
              <td>PINA</td>
            </tr>
            <tr>
              <td>Semana de Tecnologia da Informação</td>
              <td>2017</td>
              <td>Week-IT</td>
            </tr>
            <tr>
              <td>Semana Nacional de Ciência e Tecnologia</td>
              <td>2017</td>
              <td>SNCT</td>
            </tr>
            <tr>
              <td>Projeto de Extensão do NAPNEE</td>
              <td>2017</td>
              <td>Curso TEA</td>
            </tr>
            <tr>
              <td>Jornada Pedagógica</td>
              <td>2017</td>
              <td>JP</td>
            </tr>
          </tbody>
        </table> */}
      </Card>
    </Container>
  )
}

export default Event
