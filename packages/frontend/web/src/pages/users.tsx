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
              <th>Confirmado?</th>
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
                  <div style={{ display: 'flex' }}>
                    {user.is_confirmed ? (
                      <FiUnlock
                        style={{ margin: 'auto' }}
                        size={20}
                        color={theme.colors.success}
                      ></FiUnlock>
                    ) : (
                      <FiLock
                        style={{ margin: 'auto' }}
                        size={20}
                        color={theme.colors.danger}
                      ></FiLock>
                    )}
                  </div>
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

const UserModal: React.FC<{
  type: 'add-user' | 'update-user' | 'update-email'
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  selectId?: boolean
  request: PaginatedRequest<any, any>
}> = ({ type, openModal, setOpenModal, selectId, request }) => {
  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)

  const [user, setUser] = useState<{
    name: string
    email: string
    is_confirmed: boolean
  }>(null)

  const handleCloseSaveModal = useCallback(() => {
    formRef.current.reset()
    formRef.current.setErrors({})
    setOpenModal(false)
  }, [setOpenModal])

  useEffect(() => {
    if (
      openModal &&
      selectId &&
      (type === 'update-user' || type === 'update-email')
    ) {
      api
        .get(`users/${selectId}`)
        .then((response: any) => {
          if (response?.data?.message === 'user_get_by_id_not_found') {
            addToast({
              title: 'Menssagem',
              type: 'info',
              description: 'Não foi possível encontrar o usuário.'
            })
            setOpenModal(false)
          }

          const user = response?.data?.data

          if (user) {
            setUser({
              email: user.email,
              name: user.name,
              is_confirmed: user.is_confirmed
            })
            if (type === 'update-user') {
              formRef.current?.setData(user)
            } else {
              formRef.current?.setData({})
            }
          }
        })
        .catch(err => {
          console.error(err)
          addToast({
            title: 'Erro desconhecido',
            type: 'info',
            description: 'Houve um erro desconhecido ao encontrar o usuário.'
          })
          setOpenModal(false)
        })
    }
  }, [type, selectId, openModal, addToast, setOpenModal])

  const handleSubmit = useCallback(
    data => {
      const schemaObj: any = {}
      if (type === 'add-user' || type === 'update-user') {
        schemaObj.name = Yup.string().required(`O usuário precisa ter um nome`)
        schemaObj.role = Yup.string().required(
          `Você precisa selecionar um privilégio`
        )
      }

      if (type === 'add-user' || type === 'update-email') {
        schemaObj.repeatEmail = Yup.string()
          .email('Por favor, digite um e-mail válido')
          .required('Você precisa repetir o e-mail')
          .oneOf([data.email], 'Os e-mails devem ser iguais.')
        schemaObj.email = Yup.string()
          .email('Por favor, digite um e-mail válido')
          .required(`O usuário precisa ter um e-mail`)
      }

      const schema = Yup.object().shape(schemaObj)
      schema
        .validate(data, {
          abortEarly: false
        })
        .then(async data => {
          let response: any = {}

          if (type === 'add-user') {
            response = await api.post('users', data)
          } else if (type === 'update-user') {
            response = await api.put(`users/${selectId}`, data)
          }

          if (response.data) {
            addToast({
              type: 'success',
              title: `O usuário ${
                type === 'add-user' ? 'cadastrado' : 'atualizado'
              }`,
              description: `O usuário foi ${
                type === 'add-user' ? 'cadastrado' : 'atualizado'
              } com sucesso.`
            })
            request.revalidate()
            handleCloseSaveModal()
          }
        })
        .catch(err => {
          const validationErrors: { [key: string]: string } = {}
          if (err instanceof Yup.ValidationError) {
            err.inner.forEach((error: Yup.ValidationError) => {
              validationErrors[error.path] = error.message
            })
            formRef.current?.setErrors(validationErrors)
          } else {
            let title = 'Erro ao '
            if (type === 'update-email') {
              title += 'atualizar o e-mail'
            } else if (type === 'update-user') {
              title += 'atualizar o usuário'
            } else {
              title += 'adicionar o usuário'
            }
            addToast({
              title: title,
              type: 'error',
              description: err
            })
          }
        })
    },
    [type, selectId, addToast, request, handleCloseSaveModal]
  )

  return (
    <Modal open={openModal} onClose={handleCloseSaveModal}>
      <header>
        <h2>
          {type === 'update-user' ? (
            <>
              <FiEdit size={20} />
              <span>Editar Usuário</span>
            </>
          ) : type === 'update-email' ? (
            <>
              <FiMail size={20} />
              <span>Atualizar E-mail</span>
            </>
          ) : (
            <>
              <FiUserPlus size={20} />
              <span>Adicionar Usuário</span>
            </>
          )}
        </h2>
      </header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="modal-body">
          {type === 'update-email' && (
            <>
              <Alert size="sm" marginBottom="xs">
                Você irá alterar o e-mail de:
              </Alert>
              <Alert size="sm" icon={FiUser} marginBottom="sm">
                <b>{user?.name}</b>
              </Alert>
              <Alert size="sm" marginBottom="xs">
                O antigo e-mail dele(a) é:
              </Alert>
              <Alert size="sm" icon={FiMail} marginBottom="xs">
                <b>{user?.email}</b>
              </Alert>
              <Alert
                type={user?.is_confirmed ? 'success' : 'danger'}
                icon={user?.is_confirmed ? FiUnlock : FiLock}
                size="sm"
                marginBottom="md"
              >
                Esse e-mail {user?.is_confirmed ? 'já foi' : 'não foi'}{' '}
                confirmado
              </Alert>
            </>
          )}
          {type === 'update-user' && (
            <>
              <Alert size="sm" marginBottom="sm">
                O e-mail de {user?.name} é:
              </Alert>
              <Alert size="sm" icon={FiMail} marginBottom="md">
                <b>{user?.email}</b>
              </Alert>
            </>
          )}
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="name"
            label="Nome"
            placeholder="Nome"
            icon={FiUser}
            hidden={type === 'update-email'}
          />
          <Select
            hidden={type === 'update-email'}
            formRef={formRef}
            label="Privilégio"
            name="role"
            isSearchable={false}
            marginBottom={type === 'add-user' ? 'sm' : ''}
            options={[
              {
                value: 'ADMIN',
                label: 'Administrador'
              },
              {
                value: 'COORDINATOR',
                label: 'Coordenador de Eventos'
              }
            ]}
          />
          <Input
            hidden={type === 'update-user'}
            formRef={formRef}
            marginBottom={'sm'}
            name="email"
            label={type === 'update-email' ? 'Novo E-mail' : 'E-mail'}
            placeholder="email@exemplo.com"
            icon={FiMail}
            type="text"
          />
          <Input
            hidden={type === 'update-user'}
            formRef={formRef}
            name="repeatEmail"
            label={
              type === 'update-email'
                ? 'Repetir o Novo E-mail'
                : 'Repetir o E-mail'
            }
            placeholder="email@exemplo.com"
            icon={FiMail}
            type="text"
          />
        </div>
        <div className="modal-footer">
          <Button
            onClick={() => {
              handleCloseSaveModal()
            }}
            color="secondary"
            type="button"
            outline
          >
            <FiX size={20} />
            <span>Cancelar</span>
          </Button>
          <Button
            color={type === 'add-user' ? 'primary' : 'secondary'}
            type="submit"
          >
            {type === 'update-user' || type === 'update-email' ? (
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
    </Modal>
  )
}

export default withAuth(Users)
