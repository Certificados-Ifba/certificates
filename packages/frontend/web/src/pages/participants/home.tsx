import { Form } from '@unform/web'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
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
import Spinner from '../../components/spinner'
import withoutAuth from '../../hocs/withoutAuth'
import ParticipantHomeLayout from '../../layouts/participantHome'
import api from '../../services/axios'
import { getToken } from '../../services/participant'
import usePaginatedRequest from '../../services/usePaginatedRequest'
import { Row } from '../../styles/components/grid'
import { TableRow } from '../../styles/pages/home'
import {
  Container,
  FormContainer,
  LoadingContainer
} from '../../styles/pages/participants'
import { formatData } from '../../utils/formatters'

const Home: React.FC = () => {
  const [token, setToken] = useState(null)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [participant, setParticipant] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (token === null) {
        const t = getToken()
        setToken(t)
        if (t === null) {
          router.replace('/participants/login')
        }
        const response = api
          .get('me', { headers: { authorization: `Bearer ${t}` } })
          .then(data => {
            const participant = data?.data?.data?.user
            if (participant) {
              setParticipant({
                name: participant.name,
                email: participant.email,
                cpf: participant.personal_data.cpf,
                phone: participant.personal_data.phone,
                dob: participant.personal_data.dob
              })
              setLoading(false)
            } else {
              router.replace('/participants/login')
            }
          })
      }
    }
  }, [token, router])

  return (
    <Container maxWidth={1500} login={false}>
      <Head>
        <title>
          {participant ? participant.name : 'Carregando...'} | Certificados
        </title>
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
        {loading && (
          <LoadingContainer>
            <Spinner size={70}></Spinner>
          </LoadingContainer>
        )}
        {!loading && (
          <FormContainer paddingSize="md" padding={true}>
            <Row cols={3}>
              <div>
                <Alert marginBottom="sm" size="sm">
                  Nome:
                </Alert>
                <Alert icon={FiUser}>
                  <b>{participant.name} </b>
                </Alert>
              </div>
              <div>
                <Alert marginBottom="sm" size="sm">
                  E-mail:
                </Alert>
                <Alert icon={FiMail}>
                  <b>{participant.email} </b>
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
                    <b>{participant.cpf} </b>
                  </Alert>
                </div>
                <div>
                  <Alert marginBottom="sm" size="sm">
                    Data de Nascimento:
                  </Alert>
                  <Alert icon={FiCalendar}>
                    <b>{participant.dob} </b>
                  </Alert>
                </div>
                <div>
                  <Alert marginBottom="sm" size="sm">
                    Telefone:
                  </Alert>
                  <Alert icon={FiPhoneCall}>
                    <b>{participant.phone} </b>
                  </Alert>
                </div>
              </Row>
            </div>
          </FormContainer>
        )}
      </Card>
      {!loading && <Events token={token} loading={loading}></Events>}
      {!loading && (
        <Certificates token={token} loading={loading}></Certificates>
      )}
    </Container>
  )
}

const Certificates: React.FC<{ token: string; loading: boolean }> = ({
  token,
  loading
}) => {
  const [filtersCertificate, setFiltersCertificate] = useState(null)
  const [columnCertificate, setColumnCertificate] = useState('name')
  const [orderCertificate, setOrderCertificate] = useState<'' | 'ASC' | 'DESC'>(
    'ASC'
  )

  const requestCertificate = usePaginatedRequest<any>({
    url: 'me/certificates',
    headers: { authorization: `Bearer ${token}` },
    params:
      filtersCertificate && orderCertificate !== ''
        ? Object.assign(filtersCertificate, {
            sort_by: columnCertificate,
            order_by: orderCertificate
          })
        : orderCertificate !== ''
        ? { sort_by: columnCertificate, order_by: orderCertificate }
        : filtersCertificate
  })

  const handleFilterCertificate = useCallback(
    data => {
      !data.search && delete data.search
      requestCertificate.resetPage()
      setFiltersCertificate(data)
    },
    [requestCertificate]
  )

  const handleOrderCertificate = useCallback(
    columnSelected => {
      if (columnCertificate !== columnSelected) {
        setColumnCertificate(columnSelected)
        setOrderCertificate('ASC')
      } else {
        setOrderCertificate(value =>
          value === '' ? 'ASC' : value === 'ASC' ? 'DESC' : ''
        )
      }
    },
    [columnCertificate]
  )
  return (
    <div style={{ marginTop: '15px' }}>
      <Card>
        <header>
          <h2>
            <FiFileText size={30} />
            <span>Seus Certificados</span>
          </h2>
          {!loading && (
            <Form onSubmit={handleFilterCertificate}>
              <Input
                name="search"
                placeholder="Buscar atividade"
                icon={FiSearch}
              />
            </Form>
          )}
        </header>
        {loading && (
          <LoadingContainer>
            <Spinner size={70}></Spinner>
          </LoadingContainer>
        )}
        {!loading && (
          <PaginatedTable request={requestCertificate}>
            <thead>
              <tr>
                <th onClick={() => handleOrderCertificate('type')}>
                  <Column
                    order={orderCertificate}
                    selected={columnCertificate === 'type'}
                  >
                    Tipo
                  </Column>
                </th>
                <th onClick={() => handleOrderCertificate('name')}>
                  <Column
                    order={orderCertificate}
                    selected={columnCertificate === 'name'}
                  >
                    Nome
                  </Column>
                </th>
                <th onClick={() => handleOrderCertificate('function')}>
                  <Column
                    order={orderCertificate}
                    selected={columnCertificate === 'function'}
                  >
                    Função
                  </Column>
                </th>
                <th onClick={() => handleOrderCertificate('workload')}>
                  <Column
                    order={orderCertificate}
                    selected={columnCertificate === 'workload'}
                  >
                    Carga Horária
                  </Column>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requestCertificate.data?.data?.map(certificate => (
                <tr key={certificate.id}>
                  <td>{certificate?.activitieType}</td>
                  <td>{certificate?.name}</td>
                  <td>{certificate?.function}</td>
                  <td>{certificate?.workload}</td>
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
        )}
      </Card>
    </div>
  )
}

const Events: React.FC<{ token: string; loading: boolean }> = ({
  token,
  loading
}) => {
  const [filtersEvent, setFiltersEvent] = useState(null)
  const [columnEvent, setColumnEvent] = useState('name')
  const [orderEvent, setOrderEvent] = useState<'' | 'ASC' | 'DESC'>('ASC')

  const requestEvent = usePaginatedRequest<any>({
    url: 'events',
    headers: { authorization: `Bearer ${token}` },
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

  return (
    <div style={{ marginTop: '15px' }}>
      <Card>
        <header>
          <h2>
            <FiCalendar size={30} /> <span>Eventos que você participou</span>
          </h2>
          {!loading && (
            <Form onSubmit={handleFilterEvent}>
              <Input
                name="search"
                placeholder="Buscar evento"
                icon={FiSearch}
              />
            </Form>
          )}
        </header>
        {loading && (
          <LoadingContainer>
            <Spinner size={70}></Spinner>
          </LoadingContainer>
        )}
        {!loading && (
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
        )}
      </Card>
    </div>
  )
}

export default withoutAuth(Home, ParticipantHomeLayout)
