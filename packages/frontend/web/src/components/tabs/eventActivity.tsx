import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef, useState } from 'react'
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi'

import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import usePaginatedRequest from '../../services/usePaginatedRequest'
import { TableRow } from '../../styles/pages/home'
import Alert from '../alert'
import Button from '../button'
import Column from '../column'
import Input from '../input'
import EventActivityModal from '../modals/activityModal'
import DeleteModal from '../modals/deleteModal'
import PaginatedTable from '../paginatedTable'

const EventActivity: React.FC<{ event: any }> = ({ event }) => {
  const { addToast } = useToast()

  const [activitySelected, setActivitySelected] = useState(null)
  const [nameActivitySelected, setNameActivitySelected] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [filters, setFilters] = useState(null)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const searchFormRef = useRef<FormHandles>()
  const request = usePaginatedRequest<any>({
    url: `events/${event.id}/activities`,
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

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleSubmitDelete = useCallback(() => {
    api
      .delete(`event/${event.id}/activity/${activitySelected}`)
      .then(resp => {
        if (resp?.data?.message === 'event_activity_delete_by_id_success') {
          addToast({
            title: 'Mensagem',
            type: 'success',
            description: 'A atividade foi excluída com sucesso.'
          })
          request.revalidate()
          setOpenDeleteModal(false)
        }
      })
      .catch(err => {
        console.error(err)
        addToast({
          title: 'Erro desconhecido',
          type: 'error',
          description: 'Houve um erro ao deletar a atividade.'
        })
      })
  }, [event, activitySelected, addToast, request])

  return (
    <>
      <header>
        <h2>Atividades do Evento</h2>
        <Form ref={searchFormRef} onSubmit={handleFilter}>
          <Input
            name="search"
            placeholder={`Buscar atividade no evento`}
            icon={FiSearch}
          />
        </Form>
        <Button
          size="small"
          inline
          onClick={() => {
            setActivitySelected(null)
            setOpenModal(true)
          }}
        >
          <FiPlus size={20} />
          <span>Adicionar Atividade</span>
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
            <th>Tipo</th>
            <th>Carga Horária</th>
            <th>Início</th>
            <th>Fim</th>
            <th style={{ width: 32 }} />
          </tr>
        </thead>
        <tbody>
          {request.data?.data?.map(act => (
            <tr key={act.id}>
              <td>{act.name}</td>
              <td>{act.activitieType}</td>
              <td>{act.workload} h</td>
              <td>{new Date(act.start_date).toLocaleDateString()}</td>
              <td>{new Date(act.end_date).toLocaleDateString()}</td>
              <td>
                <TableRow>
                  <Button
                    inline
                    ghost
                    square
                    color="secondary"
                    size="small"
                    onClick={() => {
                      setActivitySelected(1)
                      setOpenModal(true)
                    }}
                  >
                    <FiEdit size={20} />
                  </Button>
                  <Button
                    inline
                    ghost
                    square
                    color="danger"
                    size="small"
                    onClick={() => {
                      setActivitySelected(act.id)
                      setNameActivitySelected(act.name)
                      setOpenDeleteModal(true)
                    }}
                  >
                    <FiTrash2 size={20} />
                  </Button>
                </TableRow>
              </td>
            </tr>
          ))}
        </tbody>
      </PaginatedTable>
      <EventActivityModal
        activitySelected={activitySelected}
        event={event}
        openModal={openModal}
        request={request}
        setOpenModal={setOpenModal}
      />
      <DeleteModal
        handleSubmit={handleSubmitDelete}
        name="Atividade"
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      >
        <Alert>
          Tem certeza que você deseja excluir a atividade{' '}
          <b>{nameActivitySelected}</b>?
        </Alert>
      </DeleteModal>
    </>
  )
}

export default EventActivity
