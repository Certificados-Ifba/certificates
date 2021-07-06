import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRef, useCallback } from 'react'
import { FiX, FiPlus } from 'react-icons/fi'

import Button from '../button'
import Modal from '../modal'

interface Props {
  openModal: boolean
  onClose: () => void
}

const VariableModal: React.FC<Props> = ({ openModal, onClose }) => {
  const formRef = useRef<FormHandles>(null)

  const handleClose = useCallback(() => {
    formRef.current.reset()
    formRef.current.setErrors({})
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(async data => {
    console.log(data)
  }, [])

  return (
    <Modal open={openModal} onClose={handleClose}>
      <header>
        <h2>Qual variável?</h2>
      </header>
      <Form onSubmit={handleSubmit}>
        <main></main>
        <footer>
          <Button onClick={onClose} color="secondary" type="button" outline>
            <FiX size={20} />
            <span>Cancelar</span>
          </Button>
          <Button color="success" type="submit">
            <FiPlus size={20} /> <span>Adicionar</span>
          </Button>
        </footer>
      </Form>
    </Modal>
  )
}

export default VariableModal
