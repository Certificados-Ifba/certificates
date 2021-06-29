import { Form } from '@unform/web'
import { useCallback, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiEdit, FiPlus, FiSearch, FiTrash2 } from 'react-icons/fi'

import Alert from '../../components/alert'
import Button from '../../components/button'
import Input from '../../components/input'
import PaginatedTable from '../../components/paginatedTable'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import usePaginatedRequest from '../../services/usePaginatedRequest'
import { TableRow } from '../../styles/pages/home'
import Column from '../column'
import DeleteModal from '../modals/deleteModal'
import GenericModal from '../modals/genericModal'
import Tooltip from '../tooltip'

interface GenericProps {
  name: string
  plural: string
  url: string
  icon: React.ComponentType<IconBaseProps>
}

interface Generic {
  id: string
  type: string
  name: string
}

interface IResponse {
  message: string
  data: Generic
}

const Generic: React.FC<GenericProps> = ({ name, plural, url, icon }) => {
  const [generic, setGeneric] = useState<Generic>(null)
  const [filters, setFilters] = useState(null)
  const [openGenericModal, setOpenGenericModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const [typeModal, setTypeModal] = useState<'update' | 'add'>(null)
  const { addToast } = useToast()

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
      await api.delete(`${url}/${generic.id}`)
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
      </header>
      <PaginatedTable request={request}>
        <thead>
          <tr>
            <th onClick={() => handleOrder('name')}>
              <Column order={order} selected={column === 'name'}>
                Nome
              </Column>
            </th>
            <th style={{ width: 32 }} />
          </tr>
        </thead>
        <tbody>
          {request.data?.data?.map(generic => (
            <tr key={generic.id}>
              <td>{generic.name}</td>
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
            </tr>
          ))}
        </tbody>
      </PaginatedTable>
      <GenericModal
        openModal={openGenericModal}
        setOpenModal={setOpenGenericModal}
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
        setOpenModal={setOpenDeleteModal}
        handleSubmit={handleSubmitDelete}
      >
        <Alert marginBottom="sm">
          Tem certeza que você deseja excluir a {`${name.toLowerCase()} `}
          <b>{generic?.name}</b>?
        </Alert>
      </DeleteModal>
      {/* <Modal open={openModal} onClose={handleCloseModal}>
        <header>
          <h2>
            {isDeleted ? (
              <>
                <FiTrash2 size={20} />
                <span>Excluir {name}</span>
              </>
            ) : idSelected ? (
              <>
                <FiEdit size={20} />
                <span>Editar {name}</span>
              </>
            ) : (
              <>
                <FiPlusCircle size={20} />
                <span>Adicionar {name}</span>
              </>
            )}
          </h2>
        </header>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="modal-body">
            <Input
              formRef={formRef}
              name="name"
              label="Nome"
              placeholder="Nome"
              icon={icon}
              disabled={loading}
              hidden={isDeleted}
            />
            {isDeleted && (
              <Alert>
                Tem certeza que você deseja excluir a {`${name.toLowerCase()} `}
                <b>{selectedName}</b>?
              </Alert>
            )}
          </div>
          <div className="modal-footer">
            <Button
              onClick={() => {
                handleCloseModal()
              }}
              color="secondary"
              type="button"
              outline={!isDeleted}
            >
              <FiX size={20} />
              <span>Cancelar</span>
            </Button>
            <Button
              color={
                isDeleted ? 'danger' : idSelected ? 'secondary' : 'primary'
              }
              type="submit"
              loading={loading}
              outline={isDeleted}
            >
              {isDeleted ? (
                <>
                  <FiTrash2 size={20} /> <span>Excluir</span>
                </>
              ) : idSelected ? (
                <>
                  <FiCheck size={20} /> <span>Atualizar</span>
                </>
              ) : (
                <>
                  <FiPlus size={20} /> <span>Adicionar</span>
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal> */}
    </>
  )
}

export default Generic
