import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Head from 'next/head'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  FiEdit,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUsers,
  FiUser,
  FiX,
  FiMail,
  FiCheck,
  FiUserPlus,
  FiUnlock,
  FiLock
} from 'react-icons/fi'
import * as Yup from 'yup'

import Alert from '../components/alert'
import Button from '../components/button'
import Card from '../components/card'
import Column from '../components/column'
import DeleteModal from '../components/deleteModal'
import Input from '../components/input'
import Modal from '../components/modal'
import PaginatedTable from '../components/paginatedTable'
import Select from '../components/select'
import { UserModal } from '../components/user/user.modal'
import withAuth from '../hocs/withAuth'
import { useToast } from '../providers/toast'
import api from '../services/axios'
import usePaginatedRequest, {
  PaginatedRequest
} from '../services/usePaginatedRequest'
import { Container } from '../styles/pages/home'
import theme from '../styles/theme'

const Users: React.FC = () => {
  const [selectedId, setSelectedId] = useState(null)
  const [typeModal, setTypeModal] = useState<
    'update-user' | 'add-user' | 'update-email'
  >(null)
  const [openUserModal, setOpenUserModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const [filters, setFilters] = useState(null)
  const request = usePaginatedRequest<any>({
    url: 'users',
    params:
      filters && order !== ''
        ? Object.assign(filters, { sort_by: column, order_by: order })
        : order !== ''
        ? { sort_by: column, order_by: order }
        : filters
  })

  const { addToast } = useToast()
  const [user, setUser] = useState(null)
  const handleSubmitDelete = useCallback(() => {
    api
      .delete('users/' + user.id)
      .then(resp => {
        if (resp?.data?.message === 'user_delete_by_id_success') {
          addToast({
            title: 'Mensagem',
            type: 'success',
            description: 'O usuário foi excluído com sucesso.'
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
          description: 'Houve um erro ao deletar o usuário.'
        })
      })
  }, [addToast, request, user])

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
    <Container>
      <Head>
        <title>Usuários | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiUsers size={24} /> Usuários
          </h1>
          <h2>São pessoas que terão acesso gerencial ao sistema.</h2>
        </div>
        <nav>
          <Button
            onClick={() => {
              setSelectedId(null)
              setTypeModal('add-user')
              setOpenUserModal(true)
            }}
          >
            <FiPlus size={20} />
            <span className="hide-md-down">Adicionar Usuário</span>
          </Button>
        </nav>
      </header>
      <Card>
        <header>
          <h2>Usuários Cadastrados</h2>
          <Form onSubmit={handleFilter}>
            <Input name="search" placeholder="Buscar usuário" icon={FiSearch} />
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
              <th>E-mail</th>
              <th>Tipo</th>
              <th></th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.map(user => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'ADMIN' ? 'Administrador' : 'Coordenador'}
                </td>
                <td>
                  {user.is_confirmed ? (
                    <div style={{ display: 'flex' }}>
                      <FiUnlock size={20} color={theme.colors.success} />
                      <span
                        style={{
                          marginLeft: '10px',
                          marginTop: 'auto',
                          marginBottom: 'auto'
                        }}
                      >
                        Entrou em{' '}
                        {new Date(user.last_login).toLocaleDateString()} às{' '}
                        {new Date(user.last_login).toLocaleTimeString()}
                      </span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex' }}>
                      <FiLock size={20} color={theme.colors.danger} />
                      <span
                        style={{
                          marginLeft: '10px',
                          marginTop: 'auto',
                          marginBottom: 'auto'
                        }}
                      >
                        Não confirmou o cadastro
                      </span>
                    </div>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      inline
                      ghost
                      square
                      color="warning"
                      size="small"
                      onClick={() => {
                        setSelectedId(user.id)
                        setTypeModal('update-email')
                        setOpenUserModal(true)
                      }}
                    >
                      <FiMail size={20} />
                    </Button>
                    <Button
                      inline
                      ghost
                      square
                      color="secondary"
                      size="small"
                      onClick={() => {
                        setSelectedId(user.id)
                        setTypeModal('update-user')
                        setOpenUserModal(true)
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
                        setUser(user)
                        setOpenDeleteModal(true)
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
      </Card>
      <UserModal
        request={request}
        openModal={openUserModal}
        setOpenModal={setOpenUserModal}
        type={typeModal}
        selectId={selectedId}
      />
      <DeleteModal
        name="Usuário"
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        handleSubmit={handleSubmitDelete}
      >
        <>
          <Alert marginBottom="sm">
            Tem certeza que você deseja excluir o usuário de <b>{user?.name}</b>
            ?
          </Alert>
          <Alert size="sm" icon={FiMail}>
            <b>{user?.email}</b>
          </Alert>
        </>
      </DeleteModal>
    </Container>
  )
}

export default withAuth(Users)
