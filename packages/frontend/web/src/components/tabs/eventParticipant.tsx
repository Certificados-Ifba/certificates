import { useCallback, useState } from 'react'
import { FiPlusCircle, FiUsers } from 'react-icons/fi'

import IEvent from '../../dtos/IEvent'
import { CertificatesProvider } from '../../providers/certificates'
import { Container } from '../../styles/components/tabs/eventParticipant'
import Accordion from '../accordion'
import CertificateForm from '../accordions/certificateForm'
import CertificateList from '../accordions/certificateList'

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
        <CertificatesProvider>
          <CertificateForm
            event={event}
            closeAccordion={handleCloseAccordion}
          />
        </CertificatesProvider>
      </Accordion>
      <Accordion title="Participantes do Evento" isOpen={true} icon={FiUsers}>
        <CertificateList event={event} openAccordion={handleOpenAccordion} />
      </Accordion>
    </Container>
  )
}

export default EventParticipant
