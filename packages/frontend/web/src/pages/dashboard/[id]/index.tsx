import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FiAlertCircle,
  FiAward,
  FiDownload,
  FiEdit,
  FiFileText,
  FiHome,
  FiInfo,
  FiPlus,
  FiPlusCircle,
  FiSearch,
  FiSend,
  FiTool,
  FiUsers
} from 'react-icons/fi'

import Alert from '../../../components/alert'
import Button from '../../../components/button'
import Card from '../../../components/card'
import CardIcon from '../../../components/cardIcon'
import Column from '../../../components/column'
import Dropdown from '../../../components/dropdown'
import Input from '../../../components/input'
import PaginatedTable from '../../../components/paginatedTable'
import Select from '../../../components/select'
import Tooltip from '../../../components/tooltip'
import IUser from '../../../dtos/IUser'
import withAuth from '../../../hocs/withAuth'
import { useAuth } from '../../../providers/auth'
import usePaginatedRequest from '../../../services/usePaginatedRequest'
import { Row } from '../../../styles/components/grid'
import { Container, TableRow } from '../../../styles/pages/home'
import { formatData } from '../../../utils/formatters'

const Home: React.FC = () => {
  const [user, setUser] = useState<IUser>()
  const { user: userAuth } = useAuth()
  const [filters, setFilters] = useState(null)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const { isAdmin } = useAuth()
  const router = useRouter()

  const [event, setEvent] = useState({
    participants: 15,
    certificates: 30,
    download: 15,
    activities: 5,
    id: '60e8fbac290fc4003284701c',
    name: 'Evento 1'
  })

  useEffect(() => {
    if (!user) {
      setUser(userAuth)
    }
  }, [user, userAuth])

  const firstName = user?.name.split(' ')[0]

  const formRef = useRef<FormHandles>(null)
  formRef.current?.setData({ event: '1' })

  const request = null
  // usePaginatedRequest<any>({
  //   url: 'events',
  //   params:
  //     filters && order !== ''
  //       ? Object.assign(filters, { sort_by: column, order_by: order })
  //       : order !== ''
  //       ? { sort_by: column, order_by: order }
  //       : filters
  // })

  const handleFilter = useCallback(
    data => {
      !data.search && delete data.search
      request.resetPage()
      setFilters(data)
    },
    [request]
  )

  const handleOrder = useCallback(
    columnSelected => {
      if (column !== columnSelected) {
        setColumn(columnSelected)
        setOrder('ASC')
      } else {
        setOrder(value =>
          value === '' ? 'ASC' : value === 'ASC' ? 'DESC' : ''
        )
      }
    },
    [column]
  )

  const [dropActive, setDropActive] = useState(false)

  return (
    <Container hasAlert={true} titleForm={true}>
      <Head>
        <title>Página Inicial | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiHome size={24} /> Página Inicial
          </h1>
          <h2>
            Seja bem vindo, <b>{firstName}</b>
          </h2>
        </div>
        <Form
          style={{ display: 'flex' }}
          ref={formRef}
          onSubmit={() => {
            console.log()
          }}
        >
          <div>
            <Dropdown
              icon={FiTool}
              setActive={setDropActive}
              active={dropActive}
              ghost
              size="small"
              color="secondary"
              dropdownChildren={
                <>
                  <Button
                    style={{ marginBottom: '10px' }}
                    ghost
                    color="secondary"
                    size="small"
                    type="button"
                    onClick={() => {
                      router.push(`/events/info/${event?.id}`)
                    }}
                  >
                    <FiEdit size={20} />
                    <span>Editar Evento</span>
                  </Button>

                  <Button
                    style={{ marginBottom: '10px' }}
                    ghost
                    color="info"
                    size="small"
                    type="button"
                    onClick={() => {
                      router.push(`/events/certificates/${event?.id}`)
                    }}
                  >
                    <FiFileText size={20} />
                    <span>Configurar Modelos de Certificado</span>
                  </Button>
                  <Button
                    color="primary"
                    size="small"
                    type="button"
                    onClick={() => {
                      router.push(`/publish/${event?.id}`)
                    }}
                  >
                    <FiSend size={20} />
                    <span>Publicar Evento</span>
                  </Button>
                </>
              }
            >
              Opções
            </Dropdown>
          </div>
          <div style={{ width: '100%' }}>
            <Select
              formRef={formRef}
              name="event"
              options={[{ label: 'Evento 1', value: '1' }]}
            />
          </div>
        </Form>
      </header>
      <Alert type="warning" card>
        <h2>Atenção!</h2>
        Esse evento ainda não foi publicado!
      </Alert>
      <div style={{ marginBottom: '20px' }}>
        <Row firstWidth="1330px" cols={4}>
          <div>
            <CardIcon
              title="Participantes"
              value={event?.participants + ''}
              icon={<FiUsers size={24} />}
              color="secondary"
              buttonName="Detalhar"
              buttonIcon={<FiInfo size={20} />}
              onButtonClick={() => {
                router.push(`/dashboard/${event?.id}/participants`)
              }}
            />
          </div>
          <div>
            <CardIcon
              title="Certificados"
              value={event?.certificates + ''}
              icon={<FiAward size={24} />}
              color="info"
              buttonName="Adicionar"
              buttonIcon={<FiPlusCircle size={20} />}
              onButtonClick={() => {
                router.push(`/events/participants/${event?.id}`)
              }}
            />
          </div>
          <div>
            <CardIcon
              title="Baixaram"
              value={event?.download + '%'}
              icon={<FiDownload size={24} />}
              color="primary"
              buttonName="Ver Downloads"
              buttonIcon={<FiInfo size={20} />}
              onButtonClick={() => {
                router.push(`/dashboard/${event?.id}/certificates/`)
              }}
            />
          </div>
          <div>
            <CardIcon
              title="Atividades"
              value={event?.activities + ''}
              icon={<FiFileText size={24} />}
              color="warning"
              buttonName="Adicionar"
              buttonIcon={<FiPlusCircle size={20} />}
              onButtonClick={() => {
                router.push(`/events/activities/${event?.id}`)
              }}
            />
          </div>
        </Row>
      </div>
      <Card>
        <header>
          <h2>Últimos Eventos</h2>
          <Form onSubmit={handleFilter}>
            <Input name="search" placeholder="Buscar evento" icon={FiSearch} />
          </Form>
        </header>
        {/* <PaginatedTable request={request}>
          <thead>
            <tr>
              <th onClick={() => handleOrder('name')}>
                <Column order={order} selected={column === 'name'}>
                  Nome
                </Column>
              </th>

              <th onClick={() => handleOrder('user')}>
                <Column order={order} selected={column === 'user'}>
                  Coordenador
                </Column>
              </th>
              <th onClick={() => handleOrder('participants')}>
                <Column order={order} selected={column === 'participants'}>
                  Participantes
                </Column>
              </th>
              <th onClick={() => handleOrder('certificates')}>
                <Column order={order} selected={column === 'certificates'}>
                  Certificados
                </Column>
              </th>
              <th onClick={() => handleOrder('download')}>
                <Column order={order} selected={column === 'download'}>
                  Baixaram
                </Column>
              </th>
              <th onClick={() => handleOrder('activities')}>
                <Column order={order} selected={column === 'activities'}>
                  Atividades
                </Column>
              </th>
              <th onClick={() => handleOrder('lastUpdate')}>
                <Column order={order} selected={column === 'lastUpdate'}>
                  Alterado em
                </Column>
              </th>
              <th onClick={() => handleOrder('status')}>
                <Column order={order} selected={column === 'status'}>
                  Status
                </Column>
              </th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request?.data?.data?.map(event => (
              <tr
                key={event.id}
                onClick={() => {
                  console.log()
                }}
              >
                <td>
                  <Tooltip
                    title={`Em ${event.local} de ${formatData(
                      event.start_date
                    )} até ${formatData(event.end_date)}`}
                  >
                    {`${event.name} (${event.initials})`} #{event.edition}
                  </Tooltip>
                </td>
                <td>{event?.user?.name}</td>
                <td>15</td>
                <td>30</td>
                <td>15%</td>
                <td>5</td>
                <td>{formatData(event.end_date)} às 18:30</td>
                <td>Publicado</td>
                <td>
                  <TableRow>
                    <Button
                      inline
                      ghost
                      square
                      color="secondary"
                      size="small"
                      onClick={() => {
                        router.push(`events/info/${event.id}`)
                      }}
                    >
                      <FiInfo size={20} />
                    </Button>
                  </TableRow>
                </td>
              </tr>
            ))}
          </tbody>
        </PaginatedTable> */}
      </Card>
    </Container>
  )
}

export default withAuth(Home)
