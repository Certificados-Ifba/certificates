import { Form } from '@unform/web'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import {
  FiMail,
  FiCreditCard,
  FiCalendar,
  FiUser,
  FiFileText,
  FiDownload,
  FiExternalLink,
  FiChevronLeft,
  FiPhoneCall,
  FiSearch,
  FiInfo
} from 'react-icons/fi'

import Alert from '../../components/alert'
import Button from '../../components/button'
import Card from '../../components/card'
import Column from '../../components/column'
import Input from '../../components/input'
import PaginatedTable from '../../components/paginatedTable'
import withoutAuth from '../../hocs/withoutAuth'
import ParticipantHomeLayout from '../../layouts/participantHome'
import usePaginatedRequest from '../../services/usePaginatedRequest'
import { Row } from '../../styles/components/grid'
import { TableRow } from '../../styles/pages/home'
import { Container, FormContainer } from '../../styles/pages/participants'
import { formatData } from '../../utils/formatters'

const Home: React.FC = () => {
  const info = {
    participant: {
      name: 'Lucas Nascimento Bertoldi',
      cpf: '000.000.000-00',
      email: 'lucasn.bertoldi@gmail.com',
      dataNascimento: '22/09/1992',
      telefone: '(77) 98809-0649'
    },
    events: [
      {
        name: 'Evento',
        initials: 'EV',
        edition: '01',
        local: 'Vitória da Conquista',
        start_date: '2021-07-01T00:00:00.000Z',
        end_date: '2021-07-01T00:00:00.000Z'
      }
    ],
    activities: [
      {
        id: 1,
        name: 'Competição Baiana de Veículos Autônomos em Escala',
        activitieType: 'Competição',
        workload: 10,
        start_date: '2021-08-14T02:58:03.079Z',
        end_date: '2021-08-14T02:58:03.079Z',
        participants: 0,
        function: 'Ouvinte'
      },
      {
        id: 2,
        name: 'Competição Baiana de Veículos Autônomos em Escala',
        activitieType: 'Palestra',
        workload: 10,
        start_date: '2021-08-14T02:58:03.079Z',
        end_date: '2021-08-14T02:58:03.079Z',
        participants: 20,
        function: 'Ouvinte'
      },
      {
        id: 3,
        name: 'Competição Baiana de Veículos Autônomos em Escala',
        activitieType: 'Palestra',
        workload: 10,
        start_date: '2021-08-14T02:58:03.079Z',
        end_date: '2021-08-14T02:58:03.079Z',
        participants: 50,
        function: 'Ouvinte'
      }
    ]
  }

  const router = useRouter()

  const [filtersEvent, setFiltersEvent] = useState(null)
  const [columnEvent, setColumnEvent] = useState('name')
  const [orderEvent, setOrderEvent] = useState<'' | 'ASC' | 'DESC'>('ASC')

  const requestEvent = usePaginatedRequest<any>({
    url: 'test/events/participants',
    params:
      filtersEvent && orderEvent !== ''
        ? Object.assign(filtersEvent, {
            sort_by: columnEvent,
            order_by: orderEvent
          })
        : orderEvent !== ''
        ? { sort_by: columnEvent, order_by: orderEvent }
        : filtersEvent
  })

  const handleFilterEvent = useCallback(
    data => {
      !data.search && delete data.search
      requestEvent.resetPage()
      setFiltersEvent(data)
    },
    [requestEvent]
  )

  const handleOrderEvent = useCallback(
    columnSelected => {
      if (columnEvent !== columnSelected) {
        setColumnEvent(columnSelected)
        setOrderEvent('ASC')
      } else {
        setOrderEvent(value =>
          value === '' ? 'ASC' : value === 'ASC' ? 'DESC' : ''
        )
      }
    },
    [columnEvent]
  )

  const [filtersActivity, setFiltersActivity] = useState(null)
  const [columnActivity, setColumnActivity] = useState('name')
  const [orderActivity, setOrderActivity] = useState<'' | 'ASC' | 'DESC'>('ASC')

  const requestActivity = usePaginatedRequest<any>({
    url: 'test/events/participants/activities',
    params:
      filtersActivity && orderActivity !== ''
        ? Object.assign(filtersActivity, {
            sort_by: columnActivity,
            order_by: orderActivity
          })
        : orderActivity !== ''
        ? { sort_by: columnActivity, order_by: orderActivity }
        : filtersActivity
  })

  const handleFilterActivity = useCallback(
    data => {
      !data.search && delete data.search
      requestActivity.resetPage()
      setFiltersActivity(data)
    },
    [requestActivity]
  )

  const handleOrderActivity = useCallback(
    columnSelected => {
      if (columnActivity !== columnSelected) {
        setColumnActivity(columnSelected)
        setOrderActivity('ASC')
      } else {
        setOrderActivity(value =>
          value === '' ? 'ASC' : value === 'ASC' ? 'DESC' : ''
        )
      }
    },
    [columnActivity]
  )

  return (
    <Container maxWidth={1500} login={false}>
      <Head>
        <title>{info.participant.name} | Certificados</title>
      </Head>
      <Card>
        <header>
          <h2>
            <FiUser size={30} /> <span>Informações Pessoais</span>{' '}
            <Button
              color="secondary"
              ghost
              inline
              onClick={() => {
                router.push('/participants/login')
              }}
            >
              <FiChevronLeft size={20} />
              <span className="hide-md-down">Voltar</span>
            </Button>
          </h2>
        </header>
        <FormContainer paddingSize="md" padding={true}>
          <Row cols={3}>
            <div>
              <Alert marginBottom="sm" size="sm">
                Nome:
              </Alert>
              <Alert icon={FiUser}>
                <b>{info.participant.name} </b>
              </Alert>
            </div>
            <div>
              <Alert marginBottom="sm" size="sm">
                E-mail:
              </Alert>
              <Alert icon={FiMail}>
                <b>{info.participant.email} </b>
              </Alert>
            </div>
          </Row>
          <div style={{ marginTop: '15px' }}>
            <Row cols={3}>
              <div>
                <Alert marginBottom="sm" size="sm">
                  CPF:
                </Alert>
                <Alert icon={FiCreditCard}>
                  <b>{info.participant.cpf} </b>
                </Alert>
              </div>
              <div>
                <Alert marginBottom="sm" size="sm">
                  Data de Nascimento:
                </Alert>
                <Alert icon={FiCalendar}>
                  <b>{info.participant.dataNascimento} </b>
                </Alert>
              </div>
              <div>
                <Alert marginBottom="sm" size="sm">
                  Telefone:
                </Alert>
                <Alert icon={FiPhoneCall}>
                  <b>{info.participant.telefone} </b>
                </Alert>
              </div>
            </Row>
          </div>
        </FormContainer>
      </Card>
      <div style={{ marginTop: '15px' }}>
        <Card>
          <header>
            <h2>
              <FiCalendar size={30} /> <span>Eventos que você participou</span>
            </h2>
            <Form onSubmit={handleFilterEvent}>
              <Input
                name="search"
                placeholder="Buscar evento"
                icon={FiSearch}
              />
            </Form>
          </header>
          <PaginatedTable request={requestEvent}>
            <thead>
              <tr>
                <th onClick={() => handleOrderEvent('name')}>
                  <Column order={orderEvent} selected={columnEvent === 'name'}>
                    Nome
                  </Column>
                </th>
                <th onClick={() => handleOrderEvent('period')}>
                  <Column
                    order={orderEvent}
                    selected={columnEvent === 'period'}
                  >
                    Período
                  </Column>
                </th>
                <th onClick={() => handleOrderEvent('local')}>
                  <Column order={orderEvent} selected={columnEvent === 'local'}>
                    Local
                  </Column>
                </th>
                <th onClick={() => handleOrderEvent('edition')}>
                  <Column
                    order={orderEvent}
                    selected={columnEvent === 'edition'}
                  >
                    Edição
                  </Column>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requestEvent.data?.data?.map(event => (
                <tr key={event.id}>
                  <td>
                    {event?.name} ({event?.initials})
                  </td>
                  <td>
                    De {formatData(event?.start_date)} até{' '}
                    {formatData(event?.end_date)}
                  </td>
                  <td>{event?.local}</td>
                  <td>{event?.edition}</td>
                  <td>
                    <TableRow>
                      <Button
                        ghost
                        inline
                        square
                        color="secondary"
                        size="small"
                        onClick={() => {
                          console.log()
                        }}
                      >
                        <FiSearch size={20} />
                        <span>Ver Atividades</span>
                      </Button>
                    </TableRow>
                  </td>
                </tr>
              ))}
            </tbody>
          </PaginatedTable>
        </Card>
      </div>

      <div style={{ marginTop: '15px' }}>
        <Card>
          <header>
            <h2>
              <FiFileText size={30} />{' '}
              <span>Atividades que você participou</span>
            </h2>
            <Form onSubmit={handleFilterActivity}>
              <Input
                name="search"
                placeholder="Buscar atividade"
                icon={FiSearch}
              />
            </Form>
          </header>
          <PaginatedTable request={requestEvent}>
            <thead>
              <tr>
                <th onClick={() => handleOrderEvent('type')}>
                  <Column
                    order={orderActivity}
                    selected={columnActivity === 'type'}
                  >
                    Tipo
                  </Column>
                </th>
                <th onClick={() => handleOrderEvent('name')}>
                  <Column
                    order={orderActivity}
                    selected={columnActivity === 'name'}
                  >
                    Nome
                  </Column>
                </th>
                <th onClick={() => handleOrderEvent('function')}>
                  <Column
                    order={orderActivity}
                    selected={columnActivity === 'function'}
                  >
                    Função
                  </Column>
                </th>
                <th onClick={() => handleOrderEvent('workload')}>
                  <Column
                    order={orderActivity}
                    selected={columnActivity === 'workload'}
                  >
                    Carga Horária
                  </Column>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requestActivity.data?.data?.map(activity => (
                <tr key={activity.id}>
                  <td>{activity?.activitieType}</td>
                  <td>{activity?.name}</td>
                  <td>{activity?.function}</td>
                  <td>{activity?.workload}</td>
                  <td>
                    <TableRow>
                      <Button
                        ghost
                        inline
                        square
                        color="secondary"
                        size="small"
                        onClick={() => {
                          console.log()
                        }}
                      >
                        <FiExternalLink size={20} />
                        <span>Visualizar</span>
                      </Button>
                      <span style={{ marginLeft: '10px' }}>
                        <Button
                          inline
                          square
                          color="secondary"
                          size="small"
                          onClick={() => {
                            console.log()
                          }}
                        >
                          <FiDownload size={20} />
                          <span>Baixar</span>
                        </Button>
                      </span>
                    </TableRow>
                  </td>
                </tr>
              ))}
            </tbody>
          </PaginatedTable>
        </Card>
      </div>
    </Container>
  )
}

export default withoutAuth(Home, ParticipantHomeLayout)
