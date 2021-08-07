import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
  FiFileText,
  FiChevronLeft,
  FiCalendar,
  FiInfo,
  FiAward,
  FiUsers,
  FiSend,
  FiChevronsLeft,
  FiChevronRight,
  FiCheck
} from 'react-icons/fi'

import Alert from '../../../components/alert'
import Button from '../../../components/button'
import Card from '../../../components/card'
import Stepper, { Step } from '../../../components/stepper'
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
const endName = 'Pronto'

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

  const active = useCallback((s: string, stepSelected: string) => {
    if (s === 'step-1') return true
    if (stepSelected === 'step-2') return s === 'step-2'
    if (stepSelected === 'step-3') return s === 'step-2' || s === 'step-3'
    if (stepSelected === 'step-4')
      return s === 'step-2' || s === 'step-3' || s === 'step-4'
  }, [])

  const getStep = useCallback<
    (name: string, step: string, stepSelected: string) => Step
  >(
    (name: string, step: string, stepSelected: string) => {
      return {
        active: active(step, stepSelected),
        name: name,
        selected: step === stepSelected,
        id: step
      }
    },
    [active]
  )

  const getStepList = useCallback<(selected: string) => Step[]>(
    (selected: string) => {
      return [
        getStep(infoName, 'step-1', selected),
        getStep('Atividades', 'step-2', selected),
        getStep('Modelos de Certificados', 'step-3', selected),
        getStep(endName, 'step-4', selected)
      ]
    },
    [getStep]
  )

  const [steps, setSteps] = useState(getStepList('step-1'))

  const getSelected = useCallback(() => {
    return steps.find(data => data.selected)
  }, [steps])

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
      {getSelected().id !== 'step-4' && (
        <Alert marginBottom="md" card={true} type="warning">
          <b>Atenção!</b> Revise as informações antes de publicar o evento.
        </Alert>
      )}

      <Card>
        <CardHeader>
          <Button
            disabled={getSelected().id === 'step-4'}
            ghost
            color="secondary"
            size="default"
            type="button"
            onClick={() => {
              const selected = getSelected()
              if (selected.name === infoName) {
                router.push(`/events/info/${event.id}`)
              } else {
                setSteps(
                  getStepList(
                    'step-' + (parseInt(selected.id.substr(5, 1)) - 1)
                  )
                )
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
              const selected = getSelected()
              if (selected.name === endName) {
                router.push(`/events/info/${event.id}`)
              } else {
                console.log()
                setSteps(
                  getStepList(
                    'step-' + (parseInt(selected.id.substr(5, 1)) + 1)
                  )
                )
              }
            }}
            inline
          >
            {getSelected().id === 'step-4' && (
              <>
                <FiCheck size={20} /> <span>Concluir</span>
              </>
            )}
            {getSelected().id === 'step-3' && (
              <>
                <FiCheck size={20} /> <span>Publicar</span>
              </>
            )}
            {getSelected().id !== 'step-3' && getSelected().id !== 'step-4' && (
              <>
                <FiChevronRight size={20} /> <span>Avançar</span>
              </>
            )}
          </Button>
        </CardHeader>
        {getSelected().id === 'step-1' && (
          <EventInfo edit={false} event={event} setEvent={setEvent}></EventInfo>
        )}
        {getSelected().id === 'step-2' && (
          <EventActivity addToast={addToast} event={event}></EventActivity>
        )}
        {getSelected().id === 'step-3' && <EventCertificate></EventCertificate>}
        {getSelected().id === 'step-4' && <PublishSuccess></PublishSuccess>}
      </Card>
    </Container>
  )
}

export default withAuth(Publish)
