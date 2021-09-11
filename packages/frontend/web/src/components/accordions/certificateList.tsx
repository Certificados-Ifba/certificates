import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef, useState } from 'react'
import {
  FiDownload,
  FiExternalLink,
  FiMinusCircle,
  FiPlus,
  FiSearch
} from 'react-icons/fi'

import IActivity from '../../dtos/IActivity'
import IEvent from '../../dtos/IEvent'
import IGeneric from '../../dtos/IGeneric'
import IParticipant from '../../dtos/IParticipant'
import usePaginatedRequest from '../../services/usePaginatedRequest'
import { TableRow } from '../../styles/pages/home'
import capitalize from '../../utils/capitalize'
import Button from '../button'
import Column from '../column'
import Input from '../input'
import PaginatedTable from '../paginatedTable'

interface Props {
  event: IEvent
  openAccordion: () => void
}
interface ICertificate {
  id: string
  activity: IActivity
  function: IGeneric
  participant: IParticipant
  event: Event
  key: string
  workload: number
  start_date: Date
  end_date: Date
  authorship_order: string
  additional_field: string
  created_at: Date
  updated_at: Date
}

interface IRequest {
  data: ICertificate[]
}

const CertificateList: React.FC<Props> = ({ event, openAccordion }) => {
  const [filters, setFilters] = useState(null)
  const [column, setColumn] = useState('created_at')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('DESC')
  const searchFormRef = useRef<FormHandles>()
  const request = usePaginatedRequest<IRequest>({
    url: `events/${event?.id}/certificates`,
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
      </header>
      <PaginatedTable request={request}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Atividade</th>
            <th>Função</th>
            <th>Carga Horária</th>
            <th>Data Início</th>
            <th>Data Fim</th>
            <th onClick={() => handleOrder('created_at')}>
              <Column order={order} selected={column === 'created_at'}>
                Incluído Em
              </Column>
            </th>
            <th style={{ width: 32 }} />
          </tr>
        </thead>
        <tbody>
          {request.data?.data?.map(
            ({
              id,
              activity: { name: activity },
              participant: {
                name,
                personal_data: { cpf }
              },
              function: { name: _function },
              workload,
              start_date,
              end_date,
              created_at
            }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{cpf}</td>
                <td>{activity}</td>
                <td>{capitalize(_function)}</td>
                <td>
                  {workload} Hora{Number(workload) > 1 && 's'}
                </td>
                <td>{new Date(start_date).toLocaleDateString()}</td>
                <td>{new Date(end_date).toLocaleDateString()}</td>
                <td>{new Date(created_at).toLocaleString()}</td>
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
            )
          )}
        </tbody>
      </PaginatedTable>
    </>
  )
}

export default CertificateList
