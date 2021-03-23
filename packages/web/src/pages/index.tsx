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

interface Movie {
  id: string
  title: string
  year: number
  rating: number
  language: string
  state: string
  small_cover_image: string
}

interface Response {
  status: string
  status_message: string
  data: {
    movie_count: number
    limit: number
    page_number: number
    movies: Array<Movie>
  }
}

const Home: React.FC = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'name'
      },
      {
        Header: 'Ano',
        accessor: 'year'
      },
      {
        Header: 'Sigla',
        accessor: 'initials'
      }
    ],
    []
  )

  const statusChance = Math.random()
  const data = [
    {
      name: 'Projeto de Incentivo à Aprendizagem',
      year: '2016',
      initials: 'PINA'
    },
    {
      name: 'Semana de Tecnologia da Informação',
      year: '2017',
      initials: 'Week-IT'
    },
    {
      name: 'Semana Nacional de Ciência e Tecnologia',
      year: '2017',
      initials: 'SNCT'
    },
    {
      name: 'Projeto de Extensão do NAPNEE',
      year: '2017',
      initials: 'Curso TEA'
    },
    {
      name: 'Jornada Pedagógica',
      year: '2017',
      initials: 'JP'
    }
  ]

  const [filters, setFilters] = useState(null)

  const request = usePaginatedRequest<Response>({
    url: '/list_movies.json',
    params: filters
  })
  return (
    <Container>
      <Head>
        <title>Dashboard | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>Dashboard</h1>
          <h2>Informações do sistema</h2>
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
              <th>Título</th>
              <th>Ano</th>
              <th>Avaliação</th>
              <th>Linguagem</th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.movies?.map(movie => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td>{movie.rating}</td>
                <td>{movie.language}</td>
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

export default Home
