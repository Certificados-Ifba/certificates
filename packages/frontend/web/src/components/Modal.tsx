import { Container, CloseArea } from '../styles/components/Modal'
import Card from './Card'

interface ModalProps {
  open: boolean
  onClose: () => void
  size?: string
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  size = 'sm'
}) => {
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
