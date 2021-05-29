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
  FiArrowLeft,
  FiArrowRight,
  FiAward,
  FiCalendar,
  FiCheck,
  FiCreditCard,
  FiEdit,
  FiInfo,
  FiMail,
  FiPhoneCall,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUser,
  FiUserCheck,
  FiUserPlus,
  FiX
} from 'react-icons/fi'
import * as Yup from 'yup'

import Alert from '../components/alert'
import Button from '../components/button'
import Card from '../components/card'
import DeleteModal from '../components/deleteModal'
import Input from '../components/input'
import Modal from '../components/modal'
import PaginatedTable from '../components/paginatedTable'
import Select from '../components/select'
import withAuth from '../hocs/withAuth'
import { useAuth } from '../providers/auth'
import { useToast } from '../providers/toast'
import usePaginatedRequest from '../services/usePaginatedRequest'
import Row from '../styles/components/row'
import { Container } from '../styles/pages/home'

const Participants: React.FC = () => {
  const [participant, setParticipant] = useState<{
    name: string
    email: string
  }>(null)
  const [selectedId, setSelectedId] = useState(null)
  const [typeModal, setTypeModal] = useState<
    'update-participant' | 'add-participant' | 'update-email'
  >(null)
  const [openParticipantModal, setOpenParticipantModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const request = usePaginatedRequest<any>({
    url: 'test/participants'
  })

  const handleFilter = useCallback(data => {
    console.log(data)
  }, [])

  const handleSubmitDelete = useCallback(() => {
    console.log('Deletado!')
  }, [])

  return (
    <Container>
      <Head>
        <title>Participantes | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiUserCheck size={24} /> Participantes
          </h1>
          <h2>
            Todas as pessoas que participaram ou vão participar dos eventos
          </h2>
        </div>
        <nav>
          <Button
            onClick={() => {
              setTypeModal('add-participant')
              setOpenParticipantModal(true)
            }}
          >
            <FiPlus size={20} />
            <span className="hide-md-down">Adicionar Participante</span>
          </Button>
        </nav>
      </header>
      <Card>
        <header>
          <h2>Participantes dos Últimos Eventos</h2>
          <Form onSubmit={handleFilter}>
            <Input name="search" placeholder="Buscar função" icon={FiSearch} />
          </Form>
        </header>
        <PaginatedTable request={request}>
          <thead>
            <tr>
              <th>CPF</th>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>E-mail</th>
              <th>Instituição</th>
              <th>Ultimo Evento</th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.participants?.map(participant => (
              <tr key={participant.cpf}>
                <td>{participant.cpf}</td>
                <td>{participant.name}</td>
                <td>{participant.birth_date}</td>
                <td>{participant.email}</td>
                <td>{participant.institution}</td>
                <td>{participant.last_event}</td>
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
                        setOpenParticipantModal(true)
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
                        setTypeModal('update-participant')
                        setOpenParticipantModal(true)
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
                        setParticipant({
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
      <ParticipantModal
        openModal={openParticipantModal}
        setOpenModal={setOpenParticipantModal}
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
            Tem certeza que você deseja excluir o usuário de{' '}
            <b>{participant?.name}</b>?
          </Alert>
          <Alert size="sm" icon={FiMail}>
            <b>{participant?.email}</b>
          </Alert>
        </>
      </DeleteModal>
    </Container>
  )
}

const ParticipantModal: React.FC<{
  type: 'add-participant' | 'update-participant' | 'update-email'
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  selectId?: boolean
}> = ({ type, openModal, setOpenModal, selectId }) => {
  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)

  const [participant, setParticipant] = useState<{
    name: string
    email: string
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
      (type === 'update-participant' || type === 'update-email')
    ) {
      if (type === 'update-participant')
        formRef.current.setData({
          name: 'Lucas Nascimento',
          email: 'lucasn.bertoldi@gmail.com',
          cpf: '057.487.615-48',
          birthday: '1992-09-22',
          institution: true
        })
      if (type === 'update-email' || type === 'update-participant')
        setParticipant({
          name: 'Lucas Nascimento',
          email: 'lucasn.bertoldi@gmail.com'
        })
    }
  }, [type, selectId, openModal])

  const handleSubmit = useCallback(
    data => {
      const schemaObj: any = {}
      if (type === 'add-participant' || type === 'update-participant') {
        schemaObj.name = Yup.string().required(
          `O participante precisa ter um nome`
        )
        schemaObj.birthday = Yup.string().required(
          `Selecione a data de nascimento`
        )
        schemaObj.institution = Yup.string().required(
          `Selecione se o participante é da instituição.`
        )
        schemaObj.phone = Yup.string().matches(
          /(^$|\((\d{2})\) (\d{4}|\d{5})-(\d{4}))/,
          'Por favor, digite um telefone válido.'
        )
        schemaObj.cpf = Yup.string()
          .matches(
            /(\d{3}).(\d{3}).(\d{3})-(\d{2})/,
            'Por favor, digite um CPF válido.'
          )
          .required(`Digite o CPF do participante`)
      }

      if (type === 'add-participant' || type === 'update-email') {
        schemaObj.email = Yup.string()
          .email('Por favor, digite um e-mail válido')
          .required(`O usuário precisa ter um e-mail`)
      }

      if (type === 'update-email') {
        schemaObj.repeatEmail = Yup.string()
          .email('Por favor, digite um e-mail válido')
          .required('Você precisa repetir o e-mail')
          .oneOf([data.email], 'Os e-mails devem ser iguais.')
      }

      const schema = Yup.object().shape(schemaObj)
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
            } else {
              message += 'adicionar o participante'
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
          {type === 'update-participant' ? (
            <>
              <FiEdit size={20} />
              <span>Editar Participante</span>
            </>
          ) : type === 'update-email' ? (
            <>
              <FiMail size={20} />
              <span>Atualizar E-mail</span>
            </>
          ) : (
            <>
              <FiUserPlus size={20} />
              <span>Adicionar Participante</span>
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
                <b>{participant?.name}</b>
              </Alert>
              <Alert size="sm" marginBottom="xs">
                O antigo e-mail dele(a) é:
              </Alert>
              <Alert size="sm" icon={FiMail} marginBottom="md">
                <b>{participant?.email}</b>
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
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="cpf"
            label="CPF"
            placeholder="CPF"
            type="cpf"
            icon={FiCreditCard}
            hidden={type === 'update-email'}
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="birthday"
            label="Data de Nascimento"
            type="date"
            icon={FiCalendar}
            hidden={type === 'update-email'}
          />
          <Select
            hidden={type === 'update-email'}
            formRef={formRef}
            label="É da Instituição?"
            name="institution"
            isSearchable={false}
            marginBottom={type === 'update-participant' ? '' : 'sm'}
            options={[
              {
                value: true,
                label: 'Sim'
              },
              {
                value: false,
                label: 'Não'
              }
            ]}
          />
          <Input
            hidden={type === 'update-participant'}
            formRef={formRef}
            marginBottom={type === 'update-email' ? 'sm' : ''}
            name="email"
            label={type === 'update-email' ? 'Novo E-mail' : 'E-mail'}
            placeholder="email@exemplo.com"
            icon={FiMail}
            type="text"
          />
          <Input
            hidden={type !== 'update-email'}
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
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="phone"
            label="Telefone"
            placeholder="Telefone"
            type="phone"
            icon={FiPhoneCall}
            hidden={type === 'update-email'}
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
            <>
              <FiX size={20} />
              <span>Cancelar</span>
            </>
          </Button>
          <Button
            color={type === 'add-participant' ? 'primary' : 'secondary'}
            type="submit"
          >
            {type === 'update-participant' || type === 'update-email' ? (
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

export default withAuth(Participants)
