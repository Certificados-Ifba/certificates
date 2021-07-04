import IEvent from '../../dtos/IEvent'
import { Container } from '../../styles/components/tabs/eventCertificate'
import AddCertificate from '../accordions/addCertificate'

interface Props {
  event: IEvent
}

const EventCertificate: React.FC<Props> = ({ event }) => {
  return (
    <Container>
      <AddCertificate event={event} />
    </Container>
  )
}

export default EventCertificate
