import { Container, CloseArea } from '../styles/components/Modal'
import Card from './Card'

interface ModalProps {
  open: boolean
  onClose: () => void
  // modalRef: any
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const className = open ? 'show' : ''
  return (
    <Container className={`${className}`}>
      <CloseArea onClick={onClose} />
      <Card>{children}</Card>
    </Container>
    // <Container className={`${className}`} onClick={onClose}>
    //   <Card>{children}</Card>
    // </Container>
  )
}

export default Modal
