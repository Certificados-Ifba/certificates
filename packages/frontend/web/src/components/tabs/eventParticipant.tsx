import { useCallback, useState } from 'react'
import { FiPlusCircle, FiUsers } from 'react-icons/fi'

import IEvent from '../../dtos/IEvent'
import { Container } from '../../styles/components/tabs/eventParticipant'
import Accordion from '../accordion'
import ParticipationForm from '../accordions/participationForm'
import ParticipationList from '../accordions/participationList'

interface Props {
  event: IEvent
}

const EventParticipant: React.FC<Props> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenAccordion = useCallback(() => setIsOpen(true), [])
  const handleCloseAccordion = useCallback(() => setIsOpen(false), [])

  return (
    <Container>
      <Accordion
        title="Adicionar Participações"
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        icon={FiPlusCircle}
      >
        <ParticipationForm
          event={event}
          closeAccordion={handleCloseAccordion}
        />
      </Accordion>
      <Accordion title="Participantes do Evento" isOpen={true} icon={FiUsers}>
        <ParticipationList event={event} openAccordion={handleOpenAccordion} />
      </Accordion>
    </Container>
  )
}

export default EventParticipant
