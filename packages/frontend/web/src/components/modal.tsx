import { Container, CloseArea } from '../styles/components/modal'
import Card from './card'

interface ModalProps {
  open: boolean
  onClose: () => void
  size?: 'sm' | 'lg'
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
