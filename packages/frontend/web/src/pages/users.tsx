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
  FiPlusCircle,
  FiRefreshCw,
  FiX,
  FiMail,
  FiCheck,
  FiUserPlus
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
import usePaginatedRequest from '../services/usePaginatedRequest'
import Row from '../styles/components/row'
import { Container } from '../styles/pages/home'

const Users: React.FC = () => {
  const [selectedId, setSelectedId] = useState(null)
  const [typeModal, setTypeModal] = useState<
    'update-user' | 'add-user' | 'update-email'
  >(null)
  const [openUserModal, setOpenUserModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const request = usePaginatedRequest<any>({
    url: 'test/users'
  })
  const handleSubmitDelete = useCallback(() => {
    console.log('')
  }, [])

  const [user, setUser] = useState<{ name: string; email: string }>(null)

  const handleFilter = useCallback(data => {
    console.log(data)
  }, [])

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
              <th onClick={() => handleOrder('email')}>
                <Column order={order} selected={column === 'email'}>
                  E-mail
                </Column>
              </th>
              <th onClick={() => handleOrder('role')}>
                <Column order={order} selected={column === 'role'}>
                  Tipo
                </Column>
              </th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.users?.map(user => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      inline
                      ghost
                      square
                      color="warning"
                      size="small"
                      onClick={() => {
                        setSelectedId(1)
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
                        setSelectedId(1)
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
                        setUser({
                          email: 'lucasn.bertoldi@gmail.com',
                          name: 'Lucas Nascimento Bertoldi'
                        })
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
          <Alert size="sm" icon={FiMail} marginBottom="md">
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
}> = ({ type, openModal, setOpenModal, selectId }) => {
  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)

  const [user, setUser] = useState<{ name: string; email: string }>(null)

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
      if (type === 'update-user')
        formRef.current.setData({
          name: 'Lucas Nascimento',
          email: 'lucasn.bertoldi@gmail.com',
          role: 'ADMIN'
        })
      if (type === 'update-email' || type === 'update-user')
        setUser({
          email: 'lucasn.bertoldi@gmail.com',
          name: 'Lucas Nascimento Bertoldi'
        })
    }
  }, [type, selectId, openModal])

  const handleSubmit = useCallback(
    data => {
      const schema = Yup.object().shape({
        name: Yup.string().required(`O usuário precisa ter um nome`),
        email: Yup.string()
          .email('Por favor, digite um e-mail válido')
          .required(`O usuário precisa ter um e-mail`),
        repeatEmail: Yup.string()
          .email('Por favor, digite um e-mail válido')
          .required('Você precisa repetir o e-mail')
          .oneOf([data.email], 'Os e-mails devem ser iguais.'),
        role: Yup.string().required(`Você precisa selecionar um privilégio`)
      })
      schema
        .validate(data, {
          abortEarly: false
        })
        .then(data => {
          console.log(data)

          // enviar req
        })
        .catch(err => {
          const validationErrors: { [key: string]: string } = {}
          if (err instanceof Yup.ValidationError) {
            err.inner.forEach((error: Yup.ValidationError) => {
              validationErrors[error.path] = error.message
            })
            formRef.current?.setErrors(validationErrors)
          } else {
            let message = 'Erro ao '
            if (type === 'update-email') {
              message += 'atualizar o e-mail'
            } else if (type === 'update-user') {
              message += 'atualizar o usuário'
            } else {
              message += 'adicionar o usuário'
            }
            message += '.'
            addToast({
              title: `Erro desconhecido`,
              type: 'error',
              description: message
            })
          }
        })
    },
    [type, addToast]
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
            <Alert size="sm" icon={FiMail} marginBottom="md">
              <b>{user?.email}</b>
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
          marginBottom={type === 'add-user' ? 'sm' : 'md'}
          options={[
            {
              value: 'ADMIN',
              label: 'Administrador'
            },
            {
              value: 'EVENT_MANAGER',
              label: 'Coordenador de Eventos'
            }
          ]}
        />
        <Input
          hidden={type === 'update-user'}
          formRef={formRef}
          marginBottom="sm"
          name="email"
          label={type === 'update-email' ? 'Novo E-mail' : 'E-mail'}
          placeholder="email@exemplo.com"
          icon={FiMail}
          type="text"
        />
        <Input
          hidden={type === 'update-user'}
          formRef={formRef}
          marginBottom="md"
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
        <Row>
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
        </Row>
      </Form>
    </Modal>
  )
}

export default withAuth(Users)
