import {
  Button,
  Card,
  Column,
  Container,
  Header,
  Input,
  PaginatedTable,
  TableRow,
  EventModal
} from '@components'
import { withAuth } from '@hocs'
import { useAuth } from '@providers'
import { usePaginatedRequest } from '@services'
import { Form } from '@unform/web'
import { formatData } from '@utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { FiCalendar, FiInfo, FiPlus, FiSearch } from 'react-icons/fi'

const Events: React.FC = () => {
  const [show, setShow] = useState(false)
  const [filters, setFilters] = useState(null)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const [openEventModal, setOpenEventModal] = useState(false)
  const { isAdmin } = useAuth()
  const router = useRouter()

  const request = usePaginatedRequest<any>({
    url: 'events',
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

  const handleCloseEventModal = useCallback(() => {
    setOpenEventModal(false)
  }, [])

  useEffect(() => {
    if (!show) {
      setShow(isAdmin)
    }
  }, [show, isAdmin])

  return (
    <Container>
      <Head>
        <title>Eventos | Certificados</title>
      </Head>
      <Header
        title="Eventos"
        subtitle="O evento é o gerenciamento de atividade (palestras, minicurso, etc), participação e modelo de certificado."
        icon={FiCalendar}
        controls={
          show && (
            <nav>
              <Button onClick={() => setOpenEventModal(true)}>
                <FiPlus size={20} />
                <span className="hide-md-down">Adicionar Evento</span>
              </Button>
            </nav>
          )
        }
      />
      <Card>
        <header>
          <h2>Eventos cadastrados</h2>
          <Form onSubmit={handleFilter}>
            <Input name="search" placeholder="Buscar evento" icon={FiSearch} />
          </Form>
        </header>
        <PaginatedTable request={request}>
          <thead>
            <tr>
              <th onClick={() => handleOrder('name')}>
                <Column order={order} selected={column === 'name'}>
                  Nome
                </Column>
              </th>
              <th onClick={() => handleOrder('edition')}>
                <Column order={order} selected={column === 'edition'}>
                  Edição
                </Column>
              </th>
              <th onClick={() => handleOrder('name')}>
                <Column order={order} selected={column === 'name'}>
                  Ano
                </Column>
              </th>
              <th onClick={() => handleOrder('local')}>
                <Column order={order} selected={column === 'local'}>
                  Local
                </Column>
              </th>
              <th onClick={() => handleOrder('start_date')}>
                <Column order={order} selected={column === 'start_date'}>
                  Data Inicial
                </Column>
              </th>
              <th onClick={() => handleOrder('end_date')}>
                <Column order={order} selected={column === 'end_date'}>
                  Data Final
                </Column>
              </th>
              <th onClick={() => handleOrder('user')}>
                <Column order={order} selected={column === 'user'}>
                  Coordenador
                </Column>
              </th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.map(event => (
              <tr
                key={event?.id}
                onClick={() => {
                  router.push(`events/${event?.id}/info`)
                }}
              >
                <td>{`${event.name} (${event.initials})`}</td>
                <td>{event.edition}</td>
                <td>{event.year}</td>
                <td>{event.local}</td>
                <td>{formatData(event.start_date)}</td>
                <td>{formatData(event.end_date)}</td>
                <td>{event?.user?.name}</td>
                <td>
                  <TableRow>
                    <Button
                      inline
                      ghost
                      square
                      color="secondary"
                      size="small"
                      onClick={() => {
                        router.push(`events/${event?.id}/info`)
                      }}
                    >
                      <FiInfo size={20} />
                    </Button>
                  </TableRow>
                </td>
              </tr>
            ))}
          </tbody>
        </PaginatedTable>
      </Card>
      <EventModal
        type="add"
        openModal={openEventModal}
        onClose={handleCloseEventModal}
      />
    </Container>
  )
}

export default withAuth(Events)
