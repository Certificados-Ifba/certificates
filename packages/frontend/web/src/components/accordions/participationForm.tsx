import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
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
  FiFileText,
  FiMail,
  FiMinusCircle,
  FiUser,
  FiUserCheck,
  FiUsers,
  FiX
} from 'react-icons/fi'
import * as Yup from 'yup'

import IEvent from '../../dtos/IEvent'
import { useToast } from '../../providers/toast'
import { Footer, Section } from '../../styles/components/accordion'
import {
  ParticipantCard,
  ParticipantOption
} from '../../styles/components/accordions/participationForm'
import { Divider } from '../../styles/components/divider'
import { Row } from '../../styles/components/grid'
import theme from '../../styles/theme'
import { formatData } from '../../utils/formatters'
import getValidationErrors from '../../utils/getValidationErrors'
import Alert from '../alert'
import Button from '../button'
import Input from '../input'
import Select from '../select'
import Spinner from '../spinner'

interface Props {
  event: IEvent
  closeAccordion: () => void
}

const ParticipationForm: React.FC<Props> = ({ event, closeAccordion }) => {
  const [activitySelectedId, setActivitySelectedId] = useState(null)
  const [participants, setParticipants] = useState([])
  const [indexAddParticipant, setIndexAddParticipant] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(data => {
    console.log(data)
  }, [])

  const handleOnChangeSelect = useCallback(data => {
    if (data?.value) {
      setActivitySelectedId(data.value)
    } else {
      setActivitySelectedId(null)
      formRef.current.setFieldValue('activity', null)
      formRef.current.setFieldValue('function', null)
    }
  }, [])

  const handleOnParticipantSelect = useCallback(
    (selected: any) => {
      if (selected) {
        setParticipants([
          {
            ...selected,
            key: indexAddParticipant,
            status: { send: true, showInfo: false }
          },
          ...participants
        ])
        setIndexAddParticipant(indexAddParticipant + 1)
      }
    },
    [indexAddParticipant, participants]
  )

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
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
              url={`events/${event?.id}/activities`}
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
              label="Carga Horária"
              marginBottom="sm"
              placeholder="Carga Horária em Horas"
              icon={FiClock}
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
          <Select
            formRef={formRef}
            name="add-participant"
            isSearchable={true}
            async={true}
            url="participants"
            icon={FiUsers}
            handleOnSelect={handleOnParticipantSelect}
            marginBottom="md"
            optionContent={({ props }) => {
              return (
                <ParticipantOption>
                  <div className="title">
                    <FiUser /> {props.children}
                  </div>

                  <Row cols={2}>
                    <div>
                      <div className="info">
                        <FiCreditCard /> {props.data?.personal_data.cpf}
                      </div>
                      <div className="info">
                        <FiMail /> {props.data?.email}
                      </div>
                    </div>
                    <div>
                      <div className="info">
                        <FiCalendar />{' '}
                        {formatData(props.data?.personal_data.dob)}
                      </div>
                      <div className="info">
                        <FiClock />{' '}
                        {new Date(props.data.updated_at).toLocaleString()}
                      </div>
                    </div>
                  </Row>
                </ParticipantOption>
              )
            }}
          />
        </Row>
        {participants.length === 0 ? (
          <Alert icon={FiAlertCircle} size="md" type="info">
            Use o campo para adicionar participantes na atividade
          </Alert>
        ) : (
          <>
            <Row cols={4} marginBottom="md">
              {participants.map((participant, index) => {
                return (
                  (showAll || index < 4) && (
                    <span key={participant.key}>
                      <ParticipantComponent
                        event={event}
                        formRef={formRef}
                        participants={participants}
                        setParticipants={setParticipants}
                        key={participant.key}
                        participant={participant}
                      />
                    </span>
                  )
                )
              })}
            </Row>
            <Alert marginBottom="sm" icon={FiAlertCircle} size="md" type="info">
              Exibindo{' '}
              <b>
                últimos{' '}
                {!showAll && participants.length > 4 ? 4 : participants.length}{' '}
              </b>
              participantes adicionados. Até agora{' '}
              <b>foram adicionados {participants.length}</b>.
            </Alert>
            {participants.length > 4 && (
              <Button
                size="small"
                color="secondary"
                ghost
                inline
                onClick={() => {
                  setShowAll(oldValue => !oldValue)
                }}
                type="button"
              >
                {showAll ? (
                  <>
                    <FiChevronUp size={20} />
                    <span>Mostrar menos</span>
                  </>
                ) : (
                  <>
                    <FiChevronDown size={20} />
                    <span>Mostrar mais</span>
                  </>
                )}
              </Button>
            )}
          </>
        )}
      </Section>
      <Footer>
        <div>
          <Button
            size="default"
            color="secondary"
            outline
            onClick={() => {
              formRef.current.reset()
              formRef.current.setErrors({})
              setParticipants([])
              closeAccordion()
            }}
            type="button"
          >
            <FiX size={20} />
            <span>Fechar</span>
          </Button>
        </div>
      </Footer>
    </Form>
  )
}

const ParticipantComponent: React.FC<{
  participant: any
  participants: any[]
  setParticipants: Dispatch<SetStateAction<any[]>>
  formRef: MutableRefObject<FormHandles>
  event: any
}> = ({ participant, participants, setParticipants, formRef, event }) => {
  console.log(participant.status.send)
  console.log(participant)

  const { addToast } = useToast()

  const sendActivity = useCallback(() => {
    const schema = Yup.object().shape({
      activityType: Yup.string().required(`Selecione um tipo de atividade`),
      activity: Yup.string().required(`Selecione a atividade`),
      function: Yup.string().required(`Selecione a função`),
      workload: Yup.string().required('Por favor, digite a carga horária'),
      start_date: Yup.string().required(
        'Selecione a data inicial da atividade'
      ),
      end_date: Yup.string().required('Selecione a data final da atividade')
    })
    schema
      .validate(formRef.current.getData(), {
        abortEarly: false
      })
      .then(data => {
        // const response = await api.post(`event/${event?.id}/activity`, data)
        setTimeout(() => {
          participant.status.send = false
          setParticipants([...participants])
          clearSelect(formRef)
          focusSelect(formRef)
        }, 1000)
      })
      .catch(err => {
        participants.splice(participants.indexOf(participants), 1)
        setParticipants([...participants])
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          addToast({
            title: 'Não foi possível adicionar',
            description:
              'Você precisa preencher as informações da participação',
            type: 'error'
          })
          return
        }
        addToast({
          title: 'Erro desconhecido',
          description: 'Não foi possível adicionar',
          type: 'error'
        })
      })
  }, [addToast, formRef, participant.status, participants, setParticipants])

  if (participant.status.send) {
    sendActivity()
  }

  return (
    <ParticipantCard showInfo={participant.status.showInfo}>
      <h3>
        <span>
          {participant.status.send && (
            <Spinner color={theme.colors.secondary} />
          )}
          {!participant.status.send && (
            <FiUserCheck color={theme.colors.primary} size={30} />
          )}
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
              participant.status.showInfo = !participant.status.showInfo
              setParticipants([...participants])
            }}
            type="button"
          >
            {participant.status.showInfo && <FiChevronUp size={20} />}
            {!participant.status.showInfo && <FiChevronDown size={20} />}
          </Button>
        </span>
        {!participant.status.send && (
          <span>
            <Button
              inline
              ghost
              square
              color="danger"
              size="small"
              type="button"
              onClick={() => {
                participants.splice(participants.indexOf(participants), 1)
                setParticipants([...participants])
                addToast({
                  title: 'Participação Removida',
                  description: 'O participante foi removido da atividade',
                  type: 'success'
                })
              }}
            >
              <FiMinusCircle size={20} />
            </Button>
          </span>
        )}
      </h3>
      {participant.status.showInfo && (
        <>
          <Alert marginBottom="xs" size="sm" icon={FiMail}>
            {participant.email}
          </Alert>
          <div style={{ display: 'flex' }}>
            <div>
              <Alert marginBottom="xs" size="sm" icon={FiCreditCard}>
                {participant.personal_data.cpf}
              </Alert>
              <Alert size="sm" marginBottom="xs" icon={FiCalendar}>
                {formatData(participant.personal_data.dob)}
              </Alert>
              <Alert size="sm" icon={FiClock}>
                {new Date(participant.updated_at).toLocaleString()}
              </Alert>
            </div>
          </div>
        </>
      )}
    </ParticipantCard>
  )
}

const getSelect: (formRef: MutableRefObject<FormHandles>) => any = formRef => {
  const select = formRef?.current?.getFieldRef('add-participant')?.select
  return select
}

const focusSelect: (
  formRef: MutableRefObject<FormHandles>
) => void = formRef => {
  const select = getSelect(formRef)
  select.state.menuIsOpen = true
  select?.select.focus()
}

const clearSelect: (
  formRef: MutableRefObject<FormHandles>
) => void = formRef => {
  const select = getSelect(formRef)
  select?.select.setValue(null)
}

export default ParticipationForm
