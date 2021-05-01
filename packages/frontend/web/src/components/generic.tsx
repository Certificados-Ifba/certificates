import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FiCheck,
  FiEdit,
  FiPlus,
  FiPlusCircle,
  FiSearch,
  FiTrash2,
  FiUser,
  FiX
} from 'react-icons/fi'
import * as Yup from 'yup'

import Alert from '../components/alert'
import Button from '../components/button'
import Input from '../components/input'
import Modal from '../components/modal'
import PaginatedTable from '../components/paginatedTable'
import { useToast } from '../providers/toast'
import api from '../services/axios'
import usePaginatedRequest from '../services/usePaginatedRequest'
import Row from '../styles/components/row'
import getValidationErrors from '../utils/getValidationErrors'
import Column from './column'

interface GenericProps {
  name: string
  plural: string
  url: string
}

interface IResponse {
  message: string
  data: {
    id: string
    type: string
    name: string
  }
}

const Generic: React.FC<GenericProps> = ({ name, plural, url }) => {
  const [idSelected, setIdSelected] = useState<string>(null)
  const [isDeleted, setIsDeleted] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState(null)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const formRef = useRef<FormHandles>(null)
  const searchFormRef = useRef<FormHandles>()
  const [selectedName, setSelectedName] = useState<string>('')

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

  useEffect(() => {
    setFilters({ search: '' })
    searchFormRef.current.reset()
  }, [name, plural, url])

  useEffect(() => {
    if (idSelected && openModal) {
      async function loadData() {
        const response = await api.get<IResponse>(`${url}/${idSelected}`)
        formRef.current?.setData(response?.data?.data)
        setSelectedName(response?.data?.data?.name)
      }
      setLoading(true)
      loadData()
      setLoading(false)
    }
  }, [idSelected, url, openModal])

  const handleOpenModal = useCallback(() => {
    setOpenModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    formRef.current.setErrors({})
    formRef.current.reset()
    setOpenModal(false)
  }, [])

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

  const handleSubmit = useCallback(
    data => {
      const schema = Yup.object().shape({
        name: Yup.string().required(`A ${name} precisa ter um nome`)
      })
      schema
        .validate(data, {
          abortEarly: false
        })
        .then(async data => {
          let response
          if (isDeleted) {
            response = await api.delete(`${url}/${idSelected}`)
          } else if (idSelected) {
            response = await api.put(`${url}/${idSelected}`, data)
          } else {
            response = await api.post(url, data)
          }

          if (response.data) {
            addToast({
              type: 'success',
              title: `${name} ${
                isDeleted ? 'deletada' : idSelected ? 'alterada' : 'cadastrada'
              }`,
              description: `${data.name} foi ${
                isDeleted ? 'deletada' : idSelected ? 'alterada' : 'cadastrada'
              } com sucesso.`
            })
            request.revalidate()
            handleCloseModal()
          }
        })
        .catch(err => {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err)

            formRef.current?.setErrors(errors)

            setLoading(false)

            return
          }
          setLoading(false)

          addToast({
            type: 'error',
            title: `Erro ${idSelected ? 'na alteração' : 'no cadastro'}`,
            description: err
          })
        })
    },
    [addToast, handleCloseModal, idSelected, name, request, url, isDeleted]
  )

  return (
    <>
      <header>
        <h2>{plural} disponíveis</h2>
        <Form ref={searchFormRef} onSubmit={handleFilter}>
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
            setIdSelected(null)
            setIsDeleted(false)
            handleOpenModal()
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
          {request.data?.data?.map(func => (
            <tr key={func.name}>
              <td>{func.name}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    inline
                    ghost
                    square
                    color="secondary"
                    size="small"
                    onClick={() => {
                      setIdSelected(func.id)
                      setIsDeleted(false)
                      handleOpenModal()
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
                      setIdSelected(func.id)
                      setIsDeleted(true)
                      handleOpenModal()
                    }}
                  >
                    <FiTrash2 size={20} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </PaginatedTable>
      <Modal open={openModal} onClose={handleCloseModal}>
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
          <Input
            formRef={formRef}
            marginBottom="md"
            name="name"
            label="Nome"
            placeholder="Nome"
            icon={FiUser}
            disabled={loading}
            hidden={isDeleted}
          />
          {isDeleted && (
            <Alert marginBottom="md">
              Tem certeza que você deseja excluir a {`${name.toLowerCase()} `}
              <b>{selectedName}</b>?
            </Alert>
          )}
          <Row>
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
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default Generic
