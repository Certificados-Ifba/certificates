import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  FiAlertCircle,
  FiAlignCenter,
  FiBook,
  FiBriefcase,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiCreditCard,
  FiFilePlus,
  FiFileText,
  FiMail,
  FiMinusCircle,
  FiPlus,
  FiPlusCircle,
  FiUser,
  FiUsers,
  FiX
} from 'react-icons/fi'
import * as Yup from 'yup'

import Card from '../../../components/card'
import participants from '../../../pages/participants'
import { useToast } from '../../../providers/toast'
import api from '../../../services/axios'
import { PaginatedRequest } from '../../../services/usePaginatedRequest'
import { Section, Footer } from '../../../styles/components/accordion'
import { Divider } from '../../../styles/components/divider'
import { ParticipantCard } from '../../../styles/components/event/participant'
import { Row } from '../../../styles/components/grid'
import getValidationErrors from '../../../utils/getValidationErrors'
import Accordion from '../../accordion'
import Alert from '../../alert'
import Button from '../../button'
import Input from '../../input'
import Modal from '../../modal'
import Select from '../../select'

export const AddParticipant: React.FC<{
  event: any
  request: PaginatedRequest<any, any>
}> = ({ event, request }) => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const [filters, setFilters] = useState(null)
  const [activitySelectedId, setactivitySelectedId] = useState(null)

  const [participants, setParticipants] = useState([])

  const { addToast } = useToast()

  const handleFilter = useCallback(
    data => {
      !data.search && delete data.search
      request.resetPage()
      setFilters(data)
    },
    [request]
  )

  const handleSubmit = useCallback(
    data => {
      const schema = Yup.object().shape({
        name: Yup.string().required(`A atividade do evento precisa de um nome`),
        activityType: Yup.string().required(`Selecione um tipo de atividade`),
        workload: Yup.string().required('Por favor, digite a carga horária'),
        start_date: Yup.string().required(
          'Selecione a data inicial da atividade'
        ),
        end_date: Yup.string().required('Selecione a data final da atividade')
      })
      schema
        .validate(data, {
          abortEarly: false
        })
        .then(async data => {
          const response = await api.post(`event/${event.id}/activity`, data)

          if (response.data) {
            addToast({
              type: 'success',
              title: `Participações adicionadas`,
              description: `As participações foram adicionadas com sucesso.`
            })
            request.revalidate()
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
            title: `Erro ao adicionar as participações`,
            description: err
          })
        })
    },
    [event, addToast, request]
  )

  const handleOnChangeSelect = useCallback(data => {
    if (data?.value) {
      setactivitySelectedId(data.value)
    } else {
      setactivitySelectedId(null)
      formRef.current.setFieldValue('activity', null)
      formRef.current.setFieldValue('function', null)
    }
  }, [])

  const handleOnParticipantSelect = useCallback(
    (data: any) => {
      if (data) {
        const contains: boolean = participants.some(
          (part: any) => data.id === part.id
        )
        if (!contains) {
          setParticipants([...participants, { key: data.id, ...data }])
        } else {
          setParticipants([...participants])
          addToast({
            title: 'Mensagem',
            type: 'info',
            description: 'Esse participante já foi adicionado.'
          })
        }
      }
    },
    [participants, addToast]
  )

  useEffect(() => {
    formRef?.current?.setFieldValue('add-participant', null)
  }, [participants])

  return (
    <Form ref={formRef} onSubmit={handleFilter}>
      <Accordion icon={FiPlusCircle} title="Adicionar Participações">
        <header>
          <h2>Em qual atividade?</h2>
        </header>
        <Section paddingBottom="sm">
          <Row cols={2}>
            <div>
              <Select
                isClearable={true}
                formRef={formRef}
                label="Tipo de Atividade"
                name="activityType"
                isSearchable={true}
                marginBottom="sm"
                async={true}
                url="activities"
                handleOnSelect={handleOnChangeSelect}
                icon={FiFileText}
              />
            </div>
            <div>
              <Select
                formRef={formRef}
                label="Atividade"
                name="activity"
                isSearchable={true}
                marginBottom="sm"
                async={true}
                url={`events/${event.id}/activities`}
                isDisabled={!activitySelectedId}
                icon={FiFileText}
              />
            </div>
          </Row>
          <Row cols={2}>
            <div>
              <Select
                formRef={formRef}
                label="Função"
                name="function"
                isSearchable={true}
                marginBottom="sm"
                async={true}
                url={`functions`}
                isDisabled={!activitySelectedId}
                icon={FiBriefcase}
              />
            </div>
            <div>
              <Input
                type="number"
                formRef={formRef}
                name="workload"
                label="Carga Horária (Horas)"
                marginBottom="sm"
                placeholder="Carga Horária"
                icon={FiClock}
                disabled={loading}
              />
            </div>
          </Row>
          <Row cols={2}>
            <div>
              <Input
                type="date"
                formRef={formRef}
                name="start_date"
                label="Inicia em"
                marginBottom="sm"
                placeholder="Data de Início"
                icon={FiCalendar}
                disabled={loading}
              />
            </div>
            <div>
              <Input
                marginBottom="sm"
                type="date"
                formRef={formRef}
                name="end_date"
                label="Termina em"
                placeholder="Data Final"
                icon={FiCalendar}
                disabled={loading}
              />
            </div>
          </Row>
          <Row cols={2}>
            <div>
              <Input
                marginBottom="sm"
                type="text"
                formRef={formRef}
                name="authorship_order"
                label="Ordem Autoria"
                placeholder="Ordem Autoria"
                icon={FiBook}
                disabled={loading}
              />
            </div>
            <div>
              <Input
                marginBottom="sm"
                type="text"
                formRef={formRef}
                name="aditional_field"
                label="Texto Adicional"
                placeholder="Texto Adicional"
                icon={FiAlignCenter}
                disabled={loading}
              />
            </div>
          </Row>
        </Section>
        <Divider />
        <header>
          <h2>Quem participou?</h2>
        </header>
        <Section paddingBottom="md">
          <Row cols={2}>
            <div>
              <Select
                formRef={formRef}
                name="add-participant"
                isSearchable={true}
                async={true}
                url="participants"
                icon={FiUsers}
                handleOnSelect={handleOnParticipantSelect}
                marginBottom="sm"
                optionContent={({ props }) => {
                  return (
                    <>
                      <div style={{ marginBottom: '5px' }}>
                        <FiUser /> {props.children}
                      </div>
                      <div
                        style={{
                          fontSize: 'small',
                          marginLeft: '10px',
                          marginBottom: '5px'
                        }}
                      >
                        <FiCreditCard /> {props.data?.cpf}
                      </div>
                      <div
                        style={{
                          fontSize: 'small',
                          marginLeft: '10px',
                          marginBottom: '5px'
                        }}
                      >
                        <FiMail /> {props.data?.email}
                      </div>
                    </>
                  )
                }}
              />
            </div>
            <div></div>
          </Row>
          <Row cols={4}>
            {participants.map(participant => {
              return (
                <ParticipantComponent
                  participants={participants}
                  setParticipants={setParticipants}
                  key={participant.id}
                  participant={participant}
                ></ParticipantComponent>
              )
            })}
          </Row>
          {participants.length === 0 && (
            <Alert icon={FiAlertCircle} size="md" type="info">
              Use o campo para adicionar participantes na atividade
            </Alert>
          )}
        </Section>
        <Footer>
          <div>
            <Button size="default" onClick={() => {}}>
              <FiPlus size={20} />
              <span>Adicionar Participações</span>
            </Button>
          </div>
        </Footer>
      </Accordion>
    </Form>
  )
}

const ParticipantComponent: React.FC<{
  participant: any
  participants: any[]
  setParticipants: Dispatch<SetStateAction<any[]>>
}> = ({ participant, participants, setParticipants }) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <ParticipantCard showInfo={showInfo}>
      <h3>
        <span>
          <FiUser size={30} />
        </span>
        <span>{participant.name}</span>
        <span style={{ marginLeft: 'auto' }}>
          <Button
            inline
            ghost
            square
            color="info"
            size="small"
            onClick={() => {
              setShowInfo(!showInfo)
            }}
          >
            {showInfo && <FiChevronUp size={20} />}
            {!showInfo && <FiChevronDown size={20} />}
          </Button>
        </span>
        <span>
          <Button
            inline
            ghost
            square
            color="danger"
            size="small"
            onClick={() => {
              participants.splice(participants.indexOf(participant), 1)
              setParticipants([...participants])
            }}
          >
            <FiMinusCircle size={20} />
          </Button>
        </span>
      </h3>
      {showInfo && (
        <>
          <Alert marginBottom="xs" size="sm" icon={FiMail}>
            {participant.email}
          </Alert>
          <div style={{ display: 'flex' }}>
            <div>
              <Alert marginBottom="xs" size="sm" icon={FiCreditCard}>
                {participant.cpf}
              </Alert>
              <Alert size="sm" icon={FiCalendar}>
                {new Date(participant.birth_date).toLocaleDateString()}
              </Alert>
            </div>
          </div>
        </>
      )}
    </ParticipantCard>
  )
}
