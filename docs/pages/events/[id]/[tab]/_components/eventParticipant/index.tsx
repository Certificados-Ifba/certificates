import { Accordion } from '@components'
import CertificateForm from '@components/_old/accordions/certificateForm'
import { IEvent } from '@dtos'
import { CertificatesProvider } from '@providers'
import { useCallback, useState } from 'react'
import { FiPlusCircle, FiUsers } from 'react-icons/fi'

import { CertificateList } from '../'
import { Container } from './styles'

interface Props {
  event: IEvent
}

export const EventParticipant: React.FC<Props> = ({ event }) => {
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
