import { Button, HeaderModal, Modal, FooterModal, MainModal } from '@components'
import { Form } from '@unform/web'
import { FiTrash2, FiX } from 'react-icons/fi'

interface Props {
  openModal: boolean
  onClose: () => void
  name: string
  handleSubmit: (data: any) => void
}

export const DeleteModal: React.FC<Props> = ({
  openModal,
  onClose,
  name,
  children,
  handleSubmit
}) => {
  return (
    <Modal open={openModal} onClose={onClose}>
      <HeaderModal>
        <h2>
          <FiTrash2 size={20} />
          <span>Excluir {name}</span>
        </h2>
      </HeaderModal>
      <Form onSubmit={handleSubmit}>
        <MainModal>{children}</MainModal>
        <FooterModal>
          <Button onClick={onClose} color="secondary" type="button">
            <FiX size={20} />
            <span>Cancelar</span>
          </Button>
          <Button color="danger" type="submit" outline>
            <FiTrash2 size={20} /> <span>Excluir</span>
          </Button>
        </FooterModal>
      </Form>
    </Modal>
  )
}
