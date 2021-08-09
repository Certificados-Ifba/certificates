import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  FiFileText,
  FiChevronLeft,
  FiCalendar,
  FiInfo,
  FiAward,
  FiUsers,
  FiSend
} from 'react-icons/fi'

import Alert from '../../../../components/alert'
import Button from '../../../../components/button'
import Tab from '../../../../components/tab'
import EventActivity from '../../../../components/tabs/eventActivity'
import EventCertificate from '../../../../components/tabs/eventCertificate'
import EventInfo from '../../../../components/tabs/eventInfo'
import EventParticipant from '../../../../components/tabs/eventParticipant'
import withAuth from '../../../../hocs/withAuth'
import { useToast } from '../../../../providers/toast'
import api from '../../../../services/axios'
import { Container } from '../../../../styles/pages/home'
import { formatData } from '../../../../utils/formatters'

const EventDetail: React.FC = () => {
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

  return (
    <Container hasAlert={true}>
      <Head>
        <title>{event?.name} | Evento</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiCalendar size={24} /> {event?.name}
          </h1>
          <h2>
            {`Início em ${formatData(event?.start_date)} e coordenado por ${
              event?.user.name
            }`}
          </h2>
        </div>
        <nav>
          <Button
            color="secondary"
            ghost
            onClick={() => {
              router.push('/events')
            }}
          >
            <FiChevronLeft size={20} />
            <span className="hide-md-down">Voltar</span>
          </Button>
          <Button
            onClick={() => {
              router.push(`/publish/${event.id}`)
            }}
          >
            <FiSend size={20} />
            <span className="hide-md-down">Publicar</span>
          </Button>
        </nav>
      </header>
      {true && (
        <Alert type="warning" card={true}>
          <b>Atenção!</b> Esse evento ainda não foi publicado.
          <br />
          <small>
            Para os participantes baixarem os certificados ele precisa ser
            publicado.
          </small>
        </Alert>
      )}
      {false && (
        <Alert type="danger" card={true}>
          <b>Atenção!</b> Esse evento está em edição.
          <br />
          <small>
            Para os participantes baixarem os certificados ele precisa ser
            publicado.
          </small>
        </Alert>
      )}
      <Tab
        tabs={[
          {
            name: 'Informações',
            icon: FiInfo,
            children: (
              <EventInfo edit={true} event={event} setEvent={setEvent} />
            ),
            path: 'info'
          },
          {
            name: 'Atividades',
            icon: FiFileText,
            children: <EventActivity event={event} />,
            path: 'activities'
          },
          {
            name: 'Participantes',
            icon: FiUsers,
            children: <EventParticipant event={event} />,
            path: 'participants'
          },
          {
            name: 'Certificados',
            icon: FiAward,
            children: <EventCertificate event={event} />,
            path: 'certificates'
          }
        ]}
      />
    </Container>
  )
}

export default withAuth(EventDetail)
