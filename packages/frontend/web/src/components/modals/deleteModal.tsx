import { Form } from '@unform/web'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { FiTrash2, FiX } from 'react-icons/fi'

import Button from '../button'
import Modal from '../modal'

const DeleteModal: React.FC<{
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  name: string
  handleSubmit: (data: any) => void
}> = ({ openModal, setOpenModal, name, children, handleSubmit }) => {
  const handleCloseSaveModal = useCallback(() => {
    setOpenModal(false)
  }, [setOpenModal])
  return (
    <Modal open={openModal} onClose={handleCloseSaveModal}>
      <header>
        <h2>
          <FiTrash2 size={20} />
          <span>Excluir {name}</span>
        </h2>
      </header>
      <Form onSubmit={handleSubmit}>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <Button
            onClick={() => {
              setOpenModal(false)
            }}
            color="secondary"
            type="button"
          >
            <FiX size={20} />
            <span>Cancelar</span>
          </Button>
          <Button color="danger" type="submit" outline>
            <FiTrash2 size={20} /> <span>Excluir</span>
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default DeleteModal
