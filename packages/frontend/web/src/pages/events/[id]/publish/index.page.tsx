import {
  Alert,
  Button,
  Card,
  Container,
  Header
} from '@components'
import { withAuth } from '@hocs'
import { useToast } from '@providers'
import { api } from '@services'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { FiCheck, FiChevronLeft, FiSend } from 'react-icons/fi'

import { EventInfo } from '../components'
import { PublishSuccess } from './components'
import { CardHeader } from './styles'

const Publish: React.FC = () => {
  const router = useRouter()
  const { id } = router?.query
  const [event, setEvent] = useState<any>(null)
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [published, setPublished] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get(`events/${id}`)
        const event = response?.data?.data

        if (event) setEvent(event)
      } catch (err) {
        addToast({
          title: 'Erro no carregamento',
          type: 'error',
          description: err
        })
        router.back()
      }
    }

    if (id) loadData()
  }, [id, addToast, router])

  const publish = useCallback(async () => {
    if (!event) return

    setLoading(true)

    try {
      await api.put(`events/${id}`, {
        name: event.name,
        local: event.local,
        initials: event.initials,
        year: event.year,
        edition: event.edition,
        start_date: event.start_date,
        end_date: event.end_date,
        status: 'PUBLISHED'
      })

      setPublished(true)

      addToast({
        type: 'success',
        title: 'Evento publicado com sucesso!'
      })
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao publicar evento',
        description: err
      })
    } finally {
      setLoading(false)
    }
  }, [event, id, addToast])

  return (
    <Container>
      <Head>
        <title>Publicar {event?.name} | Evento</title>
      </Head>

      <Header title={`Publicar ${event?.name}`} icon={FiSend} />

      {!published ? (
        <>
          <Alert marginBottom="md" card type="warning">
            <b>Atenção!</b> Revise todas as informações antes de publicar. Após isso,
            o evento ficará disponível para os participantes.
          </Alert>

          <Card>
            <CardHeader>
              <Button
                ghost
                color="secondary"
                onClick={() => router.back()}
              >
                <FiChevronLeft size={20} />
                <span>Voltar</span>
              </Button>

              <Button
                color="primary"
                loading={loading}
                disabled={loading || !event}
                onClick={publish}
              >
                <FiCheck size={20} />
                <span>Publicar evento</span>
              </Button>
            </CardHeader>

            {/* 🔥 AQUI É A REVISÃO */}
            <EventInfo edit={false} event={event} setEvent={setEvent} />
          </Card>
        </>
      ) : (
        <>
          <PublishSuccess />

          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Button
              color="primary"
              onClick={() => router.push(`/events/${id}/info`)}
            >
              <FiCheck size={20} />
              <span>Concluir</span>
            </Button>
          </div>
        </>
      )}
    </Container>
  )
}

export default withAuth(Publish)
