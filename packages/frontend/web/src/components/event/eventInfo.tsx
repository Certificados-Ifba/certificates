import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { FiCalendar, FiEdit, FiTag, FiTrash2, FiUser } from 'react-icons/fi'

import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import {
  ButtonContainer,
  InfoContainer,
  TabContainer
} from '../../styles/pages/event'
import Alert from '../alert'
import Button from '../button'
import DeleteModal from '../deleteModal'
import { EventModal } from './eventModal'

export const EventInfo: React.FC<{
  event: any
}> = ({ event }) => {
  const [eventModal, setEventModal] = useState(event)
  const [openEventModal, setOpenEventModal] = useState(false)
  useEffect(() => {
    setEventModal(event)
  }, [event])
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const { addToast } = useToast()
  const router = useRouter()
  const handleSubmitDelete = useCallback(() => {
    api
      .delete('events/' + event.id)
      .then(resp => {
        if (resp?.data?.message === 'event_delete_by_id_success') {
          addToast({
            title: 'Mensagem',
            type: 'success',
            description: 'O evento foi excluído com sucesso.'
          })
          setOpenDeleteModal(false)
          router.replace(`/events`)
        }
      })
      .catch(err => {
        console.error(err)
        addToast({
          title: 'Erro desconhecido',
          type: 'error',
          description: 'Houve um erro ao deletar o evento.'
        })
      })
  }, [addToast, event, router])
  return (
    <TabContainer>
      <InfoContainer>
        <div>
          <Alert marginBottom="sm" size="sm">
            Nome do Evento:
          </Alert>
          <Alert icon={FiTag} marginBottom="md">
            <b>
              {event?.name} #{event?.edition} ({event?.initials})
            </b>
          </Alert>
          <Alert marginBottom="sm" size="sm">
            Coordenador:
          </Alert>
          <Alert icon={FiUser} marginBottom="md">
            <b>{event?.user_id.name}</b>
          </Alert>
          <Alert marginBottom="sm" size="sm">
            Datas:
          </Alert>
          <Alert icon={FiCalendar}>
            <b>
              De {new Date(event?.start_date).toLocaleDateString()} até{' '}
              {new Date(event?.end_date).toLocaleDateString()}
            </b>
          </Alert>
        </div>
        <ButtonContainer>
          <div style={{ display: 'inline' }}>
            <Button
              marginBottom="xs"
              size="small"
              color="secondary"
              onClick={() => {
                setEventModal(JSON.parse(JSON.stringify(event)))
                setOpenEventModal(true)
              }}
            >
              <FiEdit size={20} />
              <span>Editar</span>
            </Button>
          </div>
          <div style={{ display: 'inline', marginTop: 'auto' }}>
            <Button
              size="small"
              color="danger"
              outline
              onClick={() => {
                setOpenDeleteModal(true)
              }}
            >
              <FiTrash2 size={20} />
              <span>Excluir</span>
            </Button>
          </div>
        </ButtonContainer>
      </InfoContainer>
      <DeleteModal
        name="Evento"
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        handleSubmit={handleSubmitDelete}
      >
        <Alert>
          Tem certeza que você deseja excluir o evento <b>{event?.name}</b>?
        </Alert>
      </DeleteModal>
      <EventModal
        type="edit"
        event={eventModal}
        openModal={openEventModal}
        setOpenModal={setOpenEventModal}
      />
    </TabContainer>
  )
}
