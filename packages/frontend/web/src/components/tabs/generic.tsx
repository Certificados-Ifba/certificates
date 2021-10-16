import { Form } from '@unform/web'
import { useCallback, useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi'

import Alert from '../../components/alert'
import Button from '../../components/button'
import Input from '../../components/input'
import PaginatedTable from '../../components/paginatedTable'
import IGeneric from '../../dtos/IGeneric'
import { useAuth } from '../../providers/auth'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import usePaginatedRequest from '../../services/usePaginatedRequest'
import { TableRow } from '../../styles/pages/home'
import Column from '../column'
import DeleteModal from '../modals/deleteModal'
import GenericModal from '../modals/genericModal'
import Tooltip from '../tooltip'

interface Props {
  name: string
  plural: string
  url: string
  icon: React.ComponentType<IconBaseProps>
}

const Generic: React.FC<Props> = ({ name, plural, url, icon }) => {
  const [show, setShow] = useState(false)
  const [generic, setGeneric] = useState<IGeneric>(null)
  const [filters, setFilters] = useState(null)
  const [openGenericModal, setOpenGenericModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const [typeModal, setTypeModal] = useState<'update' | 'add'>(null)
  const { addToast } = useToast()
  const { isAdmin } = useAuth()

  const request = usePaginatedRequest<any>({
    url,
    params:
      filters && order !== ''
        ? Object.assign(filters, { sort_by: column, order_by: order })
        : order !== ''
        ? { sort_by: column, order_by: order }
        : filters
  })

  const handleSubmitDelete = useCallback(async () => {
    try {
      await api.delete(`${url}/${generic?.id}`)
      addToast({
        title: `${name} excluída`,
        type: 'success',
        description: `${generic.name} excluído com sucesso.`
      })
      request.revalidate()
      setOpenDeleteModal(false)
    } catch (err) {
      addToast({
        title: 'Erro na exclusão',
        type: 'error',
        description: err
      })
    }
  }, [addToast, name, url, request, generic])

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

  const handleCloseGenericModal = useCallback(() => {
    setOpenGenericModal(false)
  }, [])

  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false)
  }, [])

  useEffect(() => {
    if (!show) {
      setShow(isAdmin)
    }
  }, [show, isAdmin])

  return (
    <>
      <header>
        <h2>{plural} disponíveis</h2>
        <Form onSubmit={handleFilter}>
          <Input
            name="search"
            placeholder={`Buscar ${name.toLowerCase()}`}
            icon={FiSearch}
          />
        </Form>
        {show && (
          <Button
            size="small"
            inline
            onClick={() => {
              setGeneric(null)
              setTypeModal('add')
              setOpenGenericModal(true)
            }}
          >
            <FiPlus size={20} />
            <span>Adicionar {name}</span>
          </Button>
        )}
      </header>
      <PaginatedTable request={request}>
        <thead>
          <tr>
            <th onClick={() => handleOrder('name')}>
              <Column order={order} selected={column === 'name'}>
                Nome
              </Column>
            </th>
            {show && <th style={{ width: 32 }} />}
          </tr>
        </thead>
        <tbody>
          {request.data?.data?.map(generic => (
            <tr key={generic?.id}>
              <td>{generic.name}</td>
              {show && (
                <td>
                  <TableRow>
                    <Tooltip title="Editar">
                      <Button
                        inline
                        ghost
                        square
                        color="secondary"
                        size="small"
                        onClick={() => {
                          setGeneric(generic)
                          setTypeModal('update')
                          setOpenGenericModal(true)
                        }}
                      >
                        <FiEdit size={20} />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <Button
                        inline
                        ghost
                        square
                        color="danger"
                        size="small"
                        onClick={() => {
                          setGeneric(generic)
                          setOpenDeleteModal(true)
                        }}
                      >
                        <FiTrash2 size={20} />
                      </Button>
                    </Tooltip>
                  </TableRow>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </PaginatedTable>
      <GenericModal
        openModal={openGenericModal}
        onClose={handleCloseGenericModal}
        type={typeModal}
        generic={generic}
        request={request}
        icon={icon}
        name={name}
        url={url}
      />
      <DeleteModal
        name={name}
        openModal={openDeleteModal}
        onClose={handleCloseDeleteModal}
        handleSubmit={handleSubmitDelete}
      >
        <Alert marginBottom="sm">
          Tem certeza que você deseja excluir a {`${name.toLowerCase()} `}
          <b>{generic?.name}</b>?
        </Alert>
      </DeleteModal>
    </>
  )
}

export default Generic
