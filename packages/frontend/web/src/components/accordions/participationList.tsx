import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import {
  FiDownload,
  FiExternalLink,
  FiFilePlus,
  FiMinusCircle,
  FiPlus,
  FiSearch
} from 'react-icons/fi'

import IEvent from '../../dtos/IEvent'
import usePaginatedRequest from '../../services/usePaginatedRequest'
import { TableRow } from '../../styles/pages/home'
import Button from '../button'
import Column from '../column'
import Input from '../input'
import PaginatedTable from '../paginatedTable'

interface Props {
  event: IEvent
  openAccordion: () => void
}

const ParticipationList: React.FC<Props> = ({ event, openAccordion }) => {
  const router = useRouter()

  const [filters, setFilters] = useState(null)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const searchFormRef = useRef<FormHandles>()
  const request = usePaginatedRequest<any>({
    url: `events/${event?.id}/participants`,
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
  return (
    <>
      <header>
        <h2>Participantes</h2>
        <Form ref={searchFormRef} onSubmit={handleFilter}>
          <Input
            name="search"
            placeholder={`Buscar participante no evento`}
            icon={FiSearch}
          />
        </Form>
        <Button size="small" inline onClick={openAccordion}>
          <FiPlus size={20} />
          <span>Adicionar Atividade</span>
        </Button>
        <Button
          inline
          color="info"
          size="small"
          onClick={() => {
            router.push(`/import/events/participants/${event?.id}`)
          }}
        >
          <FiFilePlus size={20} />
          <span>Importar via Planilha</span>
        </Button>
      </header>
      <PaginatedTable request={request}>
        <thead>
          <tr>
            <th onClick={() => handleOrder('name')}>
              <Column order={order} selected={column === 'name'}>
                Nome
              </Column>
            </th>
            <th>CPF</th>
            <th>Atividade</th>
            <th>Carga Horária</th>
            <th>Data Início</th>
            <th>Data Fim</th>
            <th>Incluído Em</th>
            <th style={{ width: 32 }} />
          </tr>
        </thead>
        <tbody>
          {request.data?.data?.map(part => (
            <tr key={part.id}>
              <td>{part.name}</td>
              <td>{part.cpf}</td>
              <td>{part.activity}</td>
              <td>{part.workload} h</td>
              <td>{new Date(part.start_date).toLocaleDateString()}</td>
              <td>{new Date(part.end_date).toLocaleDateString()}</td>
              <td>
                {new Date().toLocaleDateString()} às{' '}
                {new Date().toLocaleTimeString()}
              </td>
              <td>
                <TableRow>
                  <Button
                    inline
                    ghost
                    square
                    color="success"
                    size="small"
                    onClick={() => {
                      //   setActivitySelected(act.id)
                      //   setNameActivitySelected(act.name)
                      //   setOpenDeleteModal(true)
                    }}
                  >
                    <FiExternalLink size={20} />
                  </Button>
                  <Button
                    inline
                    ghost
                    square
                    color="info"
                    size="small"
                    onClick={() => {
                      //   setActivitySelected(act.id)
                      //   setNameActivitySelected(act.name)
                      //   setOpenDeleteModal(true)
                    }}
                  >
                    <FiDownload size={20} />
                  </Button>
                  <Button
                    inline
                    ghost
                    square
                    color="danger"
                    size="small"
                    onClick={() => {
                      //   setActivitySelected(act.id)
                      //   setNameActivitySelected(act.name)
                      //   setOpenDeleteModal(true)
                    }}
                  >
                    <FiMinusCircle size={20} />
                  </Button>
                </TableRow>
              </td>
            </tr>
          ))}
        </tbody>
      </PaginatedTable>
    </>
  )
}

export default ParticipationList
