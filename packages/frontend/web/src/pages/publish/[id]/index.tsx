import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiChevronLeft, FiSend, FiChevronRight, FiCheck } from 'react-icons/fi'

import Alert from '../../../components/alert'
import Button from '../../../components/button'
import Card from '../../../components/card'
import Stepper, {
  getSelected,
  getStepList,
  StepConfig
} from '../../../components/stepper'
import EventActivity from '../../../components/steps/eventActivity'
import EventCertificate from '../../../components/steps/eventCertificate'
import PublishSuccess from '../../../components/steps/publishSuccess'
import EventInfo from '../../../components/tabs/eventInfo'
import withAuth from '../../../hocs/withAuth'
import { useToast } from '../../../providers/toast'
import api from '../../../services/axios'
import { Container } from '../../../styles/pages/home'
import { CardHeader } from '../../../styles/pages/publish'

const infoName = 'Informações'
const activityName = 'Atividades'
const modelName = 'Modelos de Certificados'
const endName = 'Pronto'

const stepConfig: StepConfig[] = [
  { name: infoName },
  { name: activityName },
  { name: modelName },
  { name: endName }
]

const Publish: React.FC = () => {
  const router = useRouter()
  const { id } = router?.query
  const [event, setEvent] = useState(null)
  const { addToast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get(`events/${id}`)

        const event = response?.data?.data

        if (event) {
          setEvent(event)
        }
      } catch (err) {
        addToast({
          title: 'Erro no carregamento',
          type: 'error',
          description: err
        })
        history.back()
      }
    }
    if (id) loadData()
  }, [id, addToast])

  const [steps, setSteps] = useState(getStepList(stepConfig, 0))

  return (
    <Container>
      <Head>
        <title>Publicar {event?.name} | Evento</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiSend size={20} /> Publicar {event?.name}
          </h1>
        </div>
      </header>
      <Stepper steps={steps}></Stepper>
      {getSelected(steps).name !== endName && (
        <Alert marginBottom="md" card={true} type="warning">
          <b>Atenção!</b> Revise as informações antes de publicar o evento.
        </Alert>
      )}

      <Card>
        <CardHeader>
          <Button
            disabled={getSelected(steps).name === endName}
            ghost
            color="secondary"
            size="default"
            type="button"
            onClick={() => {
              const selected = getSelected(steps)
              if (selected.name === infoName) {
                router.push(`/events/info/${event.id}`)
              } else {
                setSteps(getStepList(stepConfig, selected.id - 1))
              }
            }}
            inline
          >
            <FiChevronLeft size={20} />
            <span>Voltar</span>
          </Button>
          <Button
            color={'primary'}
            size="default"
            type="button"
            onClick={() => {
              const selected = getSelected(steps)
              if (selected.name === endName) {
                router.push(`/events/info/${event.id}`)
              } else {
                console.log()
                setSteps(getStepList(stepConfig, selected.id + 1))
              }
            }}
            inline
          >
            {getSelected(steps).name === endName && (
              <>
                <FiCheck size={20} /> <span>Concluir</span>
              </>
            )}
            {getSelected(steps).name === modelName && (
              <>
                <FiCheck size={20} /> <span>Publicar</span>
              </>
            )}
            {getSelected(steps).name !== modelName &&
              getSelected(steps).name !== endName && (
                <>
                  <FiChevronRight size={20} /> <span>Avançar</span>
                </>
              )}
          </Button>
        </CardHeader>
        {getSelected(steps).name === infoName && (
          <EventInfo edit={false} event={event} setEvent={setEvent}></EventInfo>
        )}
        {getSelected(steps).name === activityName && (
          <EventActivity addToast={addToast} event={event}></EventActivity>
        )}
        {getSelected(steps).name === modelName && (
          <EventCertificate></EventCertificate>
        )}
        {getSelected(steps).name === endName && (
          <PublishSuccess></PublishSuccess>
        )}
      </Card>
    </Container>
  )
}

export default withAuth(Publish)
