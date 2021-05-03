import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Head from 'next/head'
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import {
  FiArrowLeft,
  FiArrowRight,
  FiAward,
  FiBookmark,
  FiCalendar,
  FiCheck,
  FiEdit,
  FiInfo,
  FiPlus,
  FiSearch,
  FiTag,
  FiTrash2,
  FiUserPlus,
  FiX
} from 'react-icons/fi'
import * as Yup from 'yup'

import Button from '../components/button'
import Card from '../components/card'
import Input from '../components/input'
import Modal from '../components/modal'
import PaginatedTable from '../components/paginatedTable'
import Select from '../components/select'
import withAuth from '../hocs/withAuth'
import { useToast } from '../providers/toast'
import usePaginatedRequest from '../services/usePaginatedRequest'
import Row from '../styles/components/row'
import { Container } from '../styles/pages/home'

const Events: React.FC = () => {
  const request = usePaginatedRequest<any>({
    url: 'test/events'
  })

  const handleFilter = useCallback(data => {
    console.log(data)
  }, [])

  const [openEventModal, setOpenEventModal] = useState(false)

  return (
    <Container>
      <Head>
        <title>Eventos | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiCalendar size={24} /> Eventos
          </h1>
          <h2>
            Os eventos são conjuntos de atividades (palestras, minicurso, etc)
          </h2>
        </div>
        <nav>
          <Button onClick={() => setOpenEventModal(true)}>
            <FiPlus size={20} />
            <span className="hide-md-down">Adicionar Evento</span>
          </Button>
        </nav>
      </header>
      <Card>
        <header>
          <h2>Últimos Eventos</h2>
          <Form onSubmit={handleFilter}>
            <Input name="search" placeholder="Buscar evento" icon={FiSearch} />
          </Form>
        </header>
        <PaginatedTable request={request}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Sigla</th>
              <th>Ano</th>
              <th>Data Inicial</th>
              <th>Data Final</th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.events?.map(event => (
              <tr key={event.initials}>
                <td>{event.name}</td>
                <td>{event.initials}</td>
                <td>{event.year}</td>
                <td>{event.start_date}</td>
                <td>{event.end_date}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      inline
                      ghost
                      square
                      color="secondary"
                      size="small"
                      // onClick={() => {}}
                    >
                      <FiInfo size={20} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </PaginatedTable>
      </Card>
      <EventModal openModal={openEventModal} setOpenModal={setOpenEventModal} />
    </Container>
  )
}

const EventModal: React.FC<{
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}> = ({ openModal, setOpenModal }) => {
  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)

  const [step, setStep] = useState<'step-1' | 'step-2'>('step-1')

  const handleCloseSaveModal = useCallback(() => {
    setStep('step-1')
    formRef.current.reset()
    formRef.current.setErrors({})
    setOpenModal(false)
  }, [setOpenModal])

  const handleSubmit = useCallback(
    data => {
      if (step === 'step-1') {
        const schema = Yup.object().shape({
          name: Yup.string().required(`O evento precisa ter um nome`),
          initials: Yup.string().required(
            `Por favor, digite a sigla do projeto`
          ),
          coordinator: Yup.string().required(
            `Você precisa selecionar um coordenador para o evento`
          )
        })
        schema
          .validate(data, {
            abortEarly: false
          })
          .then(data => {
            setStep('step-2')
          })
          .catch(err => {
            const validationErrors: { [key: string]: string } = {}
            if (err instanceof Yup.ValidationError) {
              err.inner.forEach((error: Yup.ValidationError) => {
                validationErrors[error.path] = error.message
              })
              formRef.current?.setErrors(validationErrors)
            } else {
              const message = 'Erro ao adicionar o evento.'
              addToast({
                title: `Erro desconhecido`,
                type: 'error',
                description: message
              })
            }
          })
      } else if (step === 'step-2') {
        const schema = Yup.object().shape({
          name: Yup.string().required(`O evento precisa ter um nome`),
          initials: Yup.string().required(
            `Por favor, digite a sigla do projeto`
          ),
          coordinator: Yup.string().required(
            `Você precisa selecionar um coordenador para o evento`
          )
        })
        schema
          .validate(data, {
            abortEarly: false
          })
          .then(data => {
            setStep('step-2')
          })
          .catch(err => {
            const validationErrors: { [key: string]: string } = {}
            if (err instanceof Yup.ValidationError) {
              err.inner.forEach((error: Yup.ValidationError) => {
                validationErrors[error.path] = error.message
              })
              formRef.current?.setErrors(validationErrors)
            } else {
              const message = 'Erro ao adicionar o evento.'
              addToast({
                title: `Erro desconhecido`,
                type: 'error',
                description: message
              })
            }
          })
      }
    },
    [addToast, step]
  )

  return (
    <Modal open={openModal} onClose={handleCloseSaveModal}>
      <header>
        <h2>
          <FiCalendar size={20} />
          <span>Adicionar Evento</span>
        </h2>
      </header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          formRef={formRef}
          marginBottom="sm"
          name="name"
          label="Nome"
          placeholder="Nome do Evento"
          icon={FiBookmark}
          hidden={step === 'step-2'}
        />
        <Input
          formRef={formRef}
          marginBottom="sm"
          name="initials"
          label="Sigla"
          placeholder="Sigla"
          icon={FiTag}
          hidden={step === 'step-2'}
        />
        <Select
          hidden={step === 'step-2'}
          formRef={formRef}
          label="Coordenador"
          name="coordinator"
          isSearchable={true}
          marginBottom="md"
          options={[
            {
              value: '1',
              label: 'Lucas Nascimento Bertoldi'
            },
            {
              value: '2',
              label: 'Pablo F Matos'
            },
            {
              value: '3',
              label: 'Matheus Coqueiro'
            }
          ]}
        />
        <Row>
          <Button
            onClick={() => {
              if (step === 'step-2') {
                setStep('step-1')
              } else {
                handleCloseSaveModal()
              }
            }}
            color="secondary"
            type="button"
            outline
          >
            {step === 'step-2' ? (
              <>
                <FiArrowLeft size={20} />
                <span>Voltar</span>
              </>
            ) : (
              <>
                <FiX size={20} />
                <span>Cancelar</span>
              </>
            )}
          </Button>
          <Button
            color={step === 'step-2' ? 'primary' : 'secondary'}
            type="submit"
          >
            {step === 'step-1' ? (
              <>
                <FiArrowRight size={20} /> <span>Próximo</span>
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

export default withAuth(Events)
