import { Container, CloseArea } from '../styles/components/modal'
import Card from './card'

interface Props {
  open: boolean
  onClose: () => void
  size?: 'sm' | 'lg' | 'xl'
}

const Modal: React.FC<Props> = ({ open, onClose, children, size = 'sm' }) => {
  const className = open ? 'show' : ''
  return (
    <Container size={size} className={`${className}`}>
      <CloseArea onClick={onClose} />
      <div className="modal-container-div">
        <Card>{children}</Card>
      </div>
    </Container>
  )
}

export default Modal
