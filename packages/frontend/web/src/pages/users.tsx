import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
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
  FiAward,
  FiEdit,
  FiInfo,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUserPlus,
  FiUsers,
  FiUser,
  FiSettings,
  FiBriefcase,
  FiFileText,
  FiPlusCircle,
  FiRefreshCw,
  FiX
} from 'react-icons/fi'
import Modal from '../components/modal'
import Button from '../components/button'
import Card from '../components/card'
import Input from '../components/input'
import Select from '../components/select'
import PaginatedTable from '../components/paginatedTable'
import withAuth from '../hocs/withAuth'
import { useToast } from '../providers/toast'
import usePaginatedRequest from '../services/usePaginatedRequest'
import { Container } from '../styles/pages/home'

const Users: React.FC = () => {
  const [selectedName, setSelectedName] = useState('')
  const [typeModal, setTypeModal] = useState('update-user')
  const [openEditModal, setOpenEditModal] = useState(false)

  const request = usePaginatedRequest<any>({
    url: 'test/users'
  })

  const handleFilter = useCallback(data => {
    console.log(data)
  }, [])

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
              setTypeModal('save-user')
              setSelectedName('')
              setOpenEditModal(true)
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
              <th>Nome</th>
              <th>E-mail</th>
              <th>Tipo</th>
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
                      color="secondary"
                      size="small"
                      onClick={() => {
                        setTypeModal('update-user')
                        setSelectedName(user.name)
                        setOpenEditModal(true)
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
                      onClick={() => {}}
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
      <SaveUserModal
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        type={typeModal}
        selectedName={selectedName}
        setSelectedName={setSelectedName}
      />
    </Container>
  )
}

const SaveUserModal: React.FC<{
  type: string
  selectedName: string
  setSelectedName: Dispatch<SetStateAction<string>>
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}> = ({ type, selectedName, setSelectedName, openModal, setOpenModal }) => {
  const { addToast } = useToast()

  const handleCloseSaveModal = useCallback(() => {
    setOpenModal(false)
  }, [])

  const formRef = useRef<FormHandles>(null)

  useEffect(() => {
    formRef.current.setErrors({})
  }, [openModal])

  const handleSubmit = useCallback(data => {
    const schema = Yup.object().shape({
      name: Yup.string().required(`O usuário precisa ter um nome`)
    })
    schema
      .validate(data, {
        abortEarly: false
      })
      .then(data => {
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
          console.error(err)
          addToast({
            title: `Erro desconhecido`,
            type: 'error',
            description: `Aconteceu um erro ao ${
              type === 'update-user' || type === 'update-password'
                ? 'atualizar'
                : 'cadastrar'
            } o usuário`
          })
        }
      })
  }, [])

  return (
    <Modal open={openModal} onClose={handleCloseSaveModal}>
      <header>
        <h2>
          {type === 'update-user' || type === 'update-password' ? (
            <>
              <FiEdit size={20}></FiEdit>
              <span>Editar o Usuário</span>
            </>
          ) : (
            <>
              <FiPlusCircle size={20}></FiPlusCircle>
              <span>Adicionar o Usuário</span>
            </>
          )}
        </h2>
      </header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          setValue={setSelectedName}
          value={selectedName}
          formRef={formRef}
          marginBottom="sm"
          name="name"
          label="Nome"
          placeholder="Nome Completo"
          icon={FiUser}
        />
        <Input
          formRef={formRef}
          marginBottom="sm"
          name="email"
          label="E-mail"
          placeholder="email@exemplo.com"
          icon={FiUser}
          type="email"
        />
        <Select
              isSearchable={false}
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
        {(type === 'update-password' || type === 'save-user') && (
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="password"
            label="Senha"
            placeholder="Digite a senha"
            icon={FiUser}
            type="password"
          />
        )}
        {(type === 'update-password' || type === 'save-user') && (
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="passwordAgain"
            label="Repita a Senha"
            placeholder="Digite a mesma senha"
            icon={FiUser}
            type="password"
          />
        )}
        <Button
          color={
            type === 'update-user' || type === 'update-password'
              ? 'secondary'
              : 'primary'
          }
          type="submit"
        >
          {type === 'update-user' || type === 'update-password' ? (
            <>
              <FiRefreshCw size={20}></FiRefreshCw> <span>Atualizar</span>
            </>
          ) : (
            <>
              <FiPlus size={20}></FiPlus> <span>Adicionar</span>
            </>
          )}
        </Button>
      </Form>
    </Modal>
  )
}

export default withAuth(Users)
