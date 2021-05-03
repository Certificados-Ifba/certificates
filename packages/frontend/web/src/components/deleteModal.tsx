import { Form } from '@unform/web'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { FiMail, FiTrash2, FiX } from 'react-icons/fi'

import Row from '../styles/components/row'
import Button from './button'
import Modal from './modal'

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
        {children}
        <Row>
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
        </Row>
      </Form>
    </Modal>
  )
}

export default DeleteModal
