import { Form } from '@unform/web'
import { FiTrash2, FiX } from 'react-icons/fi'

import Button from '../button'
import Modal from '../modal'

const DeleteModal: React.FC<{
  openModal: boolean
  onClose: () => void
  name: string
  handleSubmit: (data: any) => void
}> = ({ openModal, onClose, name, children, handleSubmit }) => {
  return (
    <Modal open={openModal} onClose={onClose}>
      <header>
        <h2>
          <FiTrash2 size={20} />
          <span>Excluir {name}</span>
        </h2>
      </header>
      <Form onSubmit={handleSubmit}>
        <main>{children}</main>
        <footer>
          <Button onClick={onClose} color="secondary" type="button">
            <FiX size={20} />
            <span>Cancelar</span>
          </Button>
          <Button color="danger" type="submit" outline>
            <FiTrash2 size={20} /> <span>Excluir</span>
          </Button>
        </footer>
      </Form>
    </Modal>
  )
}

export default DeleteModal
