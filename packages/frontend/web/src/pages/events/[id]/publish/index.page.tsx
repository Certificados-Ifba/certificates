import {
  Alert,
  Button,
  Card,
  Container,
  // getSelected,
  // getStepList,
  Header,
  StepConfig,
  Stepper
} from '@components'
import { withAuth } from '@hocs'
import { useToast } from '@providers'
import { api } from '@services'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { FiChevronLeft, FiSend, FiChevronRight, FiCheck } from 'react-icons/fi'

import { EventInfo } from '../components'
import { EventActivity, EventCertificate, PublishSuccess } from './components'
import { CardHeader } from './styles'

// import Alert from '../../../components/alert'
// import Button from '../../../components/button'
// import Card from '../../../components/card'
// import Header from '../../../components/header'
// import Stepper, {
//   getSelected,
//   getStepList,
//   StepConfig
// } from '../../../components/stepper'
// import EventActivity from '../../../components/steps/eventActivity'
// import EventCertificate from '../../../components/steps/eventCertificate'
// import PublishSuccess from '../../../components/steps/publishSuccess'
// import EventInfo from '../../../components/tabs/eventInfo'
// import withAuth from '../../../hocs/withAuth'
// import { useToast } from '../../../providers/toast'
// import api from '../../../services/axios'
// import { Container } from '../../../styles/pages/home'
// import { CardHeader } from '../../../styles/pages/publish'

const infoName = 'Informações'
const activityName = 'Atividades'
const modelName = 'Modelos de Certificados'
const endName = 'Pronto'

// const stepConfig: StepConfig[] = [
//   { name: infoName },
//   { name: activityName },
//   { name: modelName },
//   { name: endName }
// ]

const Publish: React.FC = () => {
  const router = useRouter()
  const { id } = router?.query
  const [event, setEvent] = useState(null)
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)

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

  // const [steps, setSteps] = useState(getStepList(stepConfig, 0))

  const publish = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.post(`events/${id}/publish`, {})
      setLoading(false)
      return true
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao publicar evento',
        description: err
      })
      setLoading(false)
      return false
    }
  }, [addToast, id])

  return (
    <Container>
      <Head>
        <title>Publicar {event?.name} | Evento</title>
      </Head>
      <Header title={`Publicar ${event?.name}`} icon={FiSend} />
      {/* <Stepper steps={steps} /> */}
      {/* {getSelected(steps).name !== endName && (
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
                router.push(`/events/${event.id}/info`)
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
            loading={loading}
            disabled={loading}
            onClick={() => {
              const selected = getSelected(steps)
              if (selected.name === endName) {
                router.push(`/events/${event.id}/info`)
              } else if (selected.name === modelName) {
                publish()
                  .then(publish => {
                    if (publish)
                      setSteps(getStepList(stepConfig, selected.id + 1))
                  })
                  .catch()
              } else {
                setSteps(getStepList(stepConfig, selected.id + 1))
              }
            }}
            inline
          >
            {getSelected(steps).name === endName && (
              <>
                <FiCheck size={20} />
                <span>Concluir</span>
              </>
            )}
            {getSelected(steps).name === modelName && (
              <>
                <FiCheck size={20} />
                <span>Publicar</span>
              </>
            )}
            {getSelected(steps).name !== modelName &&
              getSelected(steps).name !== endName && (
                <>
                  <FiChevronRight size={20} />
                  <span>Avançar</span>
                </>
              )}
          </Button>
        </CardHeader>
        {getSelected(steps).name === infoName && (
          <EventInfo edit={false} event={event} setEvent={setEvent} />
        )}
        {getSelected(steps).name === activityName && (
          <EventActivity addToast={addToast} event={event} />
        )}
        {getSelected(steps).name === modelName && <EventCertificate />}
        {getSelected(steps).name === endName && <PublishSuccess />}
      </Card> */}
    </Container>
  )
}

export default withAuth(Publish)
