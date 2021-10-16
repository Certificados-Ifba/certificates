import { Form } from '@unform/web'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import {
  FiCalendar,
  FiCheck,
  FiCheckCircle,
  FiChevronLeft,
  FiDownload,
  FiMail,
  FiSearch,
  FiSend,
  FiX,
  FiXCircle
} from 'react-icons/fi'

import Button from '../../../components/button'
import Card from '../../../components/card'
import CardIcon from '../../../components/cardIcon'
import Column from '../../../components/column'
import Input from '../../../components/input'
import PaginatedTable from '../../../components/paginatedTable'
import withAuth from '../../../hocs/withAuth'
import usePaginatedRequest from '../../../services/usePaginatedRequest'
import { Row } from '../../../styles/components/grid'
import { Container } from '../../../styles/pages/home'
import theme from '../../../styles/theme'

const DashboardCertificate: React.FC = () => {
  const [event, setEvent] = useState({
    download: 50,
    downloadCount: 15,
    notDownloadCount: 30,
    id: '60e8fbac290fc4003284701c',
    name: 'Evento 1'
  })

  const [filters, setFilters] = useState(null)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')

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

  const request = usePaginatedRequest<any>({
    url: 'participants',
    params:
      filters && order !== ''
        ? Object.assign(filters, { sort_by: column, order_by: order })
        : order !== ''
        ? { sort_by: column, order_by: order }
        : filters
  })

  const handleFilter = useCallback(
    data => {
      !data.search && delete data.search
      request.resetPage()
      setFilters(data)
    },
    [request]
  )

  const router = useRouter()

  return (
    <Container>
      <Head>
        <title>Downloads | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiCalendar size={24} /> Certificados do {event?.name}
          </h1>
          <h2>Aqui estão as informações sobre os certificados do evento.</h2>
        </div>
        <nav>
          <Button
            color="secondary"
            ghost
            onClick={() => {
              router.push(`/dashboard/${event?.id}`)
            }}
          >
            <FiChevronLeft size={20} />
            <span className="hide-md-down">Voltar</span>
          </Button>
        </nav>
      </header>
      <Row style={{ marginBottom: '10px' }} cols={3}>
        <div>
          <CardIcon
            title="Baixaram"
            value={event?.download + '%'}
            icon={<FiDownload size={24} />}
            color="primary"
          />
        </div>
        <div>
          <CardIcon
            title="Baixaram"
            value={event?.downloadCount + ''}
            icon={<FiCheck size={24} />}
            color="primary"
          />
        </div>
        <div>
          <CardIcon
            title="Não Baixaram"
            value={event?.notDownloadCount + ''}
            icon={<FiX size={24} />}
            color="danger"
          />
        </div>
      </Row>
      <Card>
        <header>
          <h2></h2>
          <Form onSubmit={handleFilter}>
            <Input
              name="search"
              placeholder="Buscar atividade"
              icon={FiSearch}
            />
          </Form>
          <Button
            inline
            color="danger"
            size="small"
            onClick={() => {
              console.log('')
            }}
          >
            <FiSend size={20} />
            <span>Re-enviar para os que não baixaram</span>
          </Button>
        </header>
        <PaginatedTable request={request}>
          <thead>
            <tr>
              <th onClick={() => handleOrder('activity')}>
                <Column order={order} selected={column === 'activity'}>
                  Atividade
                </Column>
              </th>
              <th onClick={() => handleOrder('name')}>
                <Column order={order} selected={column === 'name'}>
                  Nome
                </Column>
              </th>
              <th>Baixou?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.map((participant, index) => (
              <tr key={participant.id}>
                <td>Atividade 1</td>
                <td>{participant.name}</td>
                <td>
                  {index === 0 && (
                    <FiCheckCircle
                      color={theme.colors.success}
                      size={20}
                    ></FiCheckCircle>
                  )}
                  {index === 1 && (
                    <FiXCircle
                      color={theme.colors.danger}
                      size={20}
                    ></FiXCircle>
                  )}
                </td>
                <td>
                  <Button
                    inline
                    onClick={() => {
                      console.log('')
                    }}
                    ghost
                    size="small"
                    color="info"
                  >
                    <FiSend size={20} />
                    <span>Enviar Certificado por E-mail</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </PaginatedTable>
      </Card>
    </Container>
  )
}

export default withAuth(DashboardCertificate)
