import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  FiFileText,
  FiChevronLeft,
  FiCalendar,
  FiInfo,
  FiAward,
  FiUsers
} from 'react-icons/fi'

import Button from '../../../../components/button'
import { EventActivity } from '../../../../components/event/activity/eventActivity'
import { EventInfo } from '../../../../components/event/eventInfo'
import { EventParticipant } from '../../../../components/event/participant/eventParticipant'
import Tab from '../../../../components/tab'
import withAuth from '../../../../hocs/withAuth'
import { useToast } from '../../../../providers/toast'
import api from '../../../../services/axios'
import { Container } from '../../../../styles/pages/home'

const EventDetail: React.FC = () => {
  const router = useRouter()
  const { id } = router?.query
  const [event, setEvent] = useState(null)
  const { addToast } = useToast()

  useEffect(() => {
    if (!event)
      api
        .get(`events/${id}`)
        .then((response: any) => {
          if (response?.data?.message === 'event_get_by_id_not_found') {
            addToast({
              title: 'Menssagem',
              type: 'info',
              description: 'Não foi possível encontrar o evento.'
            })
            router.replace(`/events`)
          }
          const event = response?.data?.data
          if (event) {
            setEvent(event)
          }
        })
        .catch(err => {
          console.error(err)
          addToast({
            title: 'Erro desconhecido',
            type: 'error',
            description: 'Houve um erro desconhecido ao encontrar o evento.'
          })
          router.replace(`/events`)
        })
  }, [addToast, id, router, event])
  return (
    <Container>
      <Head>
        <title>{event?.name} | Evento</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiCalendar size={24} /> {event?.name}
          </h1>
          <h2>
            Início em {new Date(event?.start_date).toLocaleDateString()} e
            coordenado por {event?.user_id.name}
          </h2>
        </div>
        <nav>
          <Button
            ghost
            onClick={() => {
              router.replace('/events')
            }}
          >
            <FiChevronLeft size={20} />
            <span className="hide-md-down">Voltar</span>
          </Button>
        </nav>
      </header>
      <Tab
        tabs={[
          {
            name: 'Informações',
            icon: FiInfo,
            children: <EventInfo event={event}></EventInfo>,
            path: 'info'
          },
          {
            name: 'Atividades',
            icon: FiFileText,
            children: <EventActivity event={event}></EventActivity>,
            path: 'activities'
          },
          {
            name: 'Participantes',
            icon: FiUsers,
            children: <EventParticipant event={event}></EventParticipant>,
            path: 'participants'
          },
          {
            name: 'Certificados',
            icon: FiAward,
            children: <>2</>,
            path: 'certificates'
          }
        ]}
      />
    </Container>
  )
}

export default withAuth(EventDetail)
