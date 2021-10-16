import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef, useState } from 'react'
import {
  FiCalendar,
  FiClock,
  FiFileText,
  FiPlus,
  FiPlusCircle,
  FiX
} from 'react-icons/fi'
import * as Yup from 'yup'

import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import { PaginatedRequest } from '../../services/usePaginatedRequest'
import { Row } from '../../styles/components/modal'
import getValidationErrors from '../../utils/getValidationErrors'
import Button from '../button'
import Input from '../input'
import Modal from '../modal'
import Select from '../select'

interface Props {
  event: any
  openModal: boolean
  onClose: () => void
  request: PaginatedRequest<any, any>
}

const ParticipationModal: React.FC<Props> = ({
  event,
  openModal,
  onClose,
  request
}) => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const handleCloseModal = useCallback(() => {
    formRef.current.reset()
    formRef.current.setErrors({})
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(
    data => {
      const schema = Yup.object().shape({
        name: Yup.string().required(`A atividade do evento precisa de um nome`),
        activityType: Yup.string().required(`Selecione um tipo de atividade`),
        workload: Yup.string().required('Por favor, digite a carga horária'),
        start_date: Yup.string().required(
          'Selecione a data inicial da atividade'
        ),
        end_date: Yup.string().required('Selecione a data final da atividade')
      })
      schema
        .validate(data, {
          abortEarly: false
        })
        .then(async data => {
          const response = await api.post(`event/${event?.id}/activity`, data)

          if (response.data) {
            addToast({
              type: 'success',
              title: `Participações adicionadas`,
              description: `As participações foram adicionadas com sucesso.`
            })
            request.revalidate()
            handleCloseModal()
          }
        })
        .catch(err => {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err)
            formRef.current?.setErrors(errors)
            setLoading(false)
            return
          }
          setLoading(false)

          addToast({
            type: 'error',
            title: `Erro ao adicionar as participações`,
            description: err
          })
        })
    },
    [event, addToast, request, handleCloseModal]
  )

  return (
    <Modal size="lg" open={openModal} onClose={handleCloseModal}>
      <header>
        <h2>
          <FiPlusCircle size={20} />
          <span>Adicionar Participação</span>
        </h2>
      </header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <main>
          <Row cols={2}>
            <div>
              <Input
                formRef={formRef}
                name="name"
                label="Nome"
                marginBottom="sm"
                placeholder="Nome"
                icon={FiFileText}
                disabled={loading}
              />
              <Select
                formRef={formRef}
                label="Tipo de Atividade"
                name="activityType"
                isSearchable={true}
                marginBottom="sm"
                async={true}
                url="activities"
              />
              <Input
                type="number"
                formRef={formRef}
                name="workload"
                label="Carga Horária (Horas)"
                marginBottom="sm"
                placeholder="Carga Horária"
                icon={FiClock}
                disabled={loading}
              />
              <Input
                type="date"
                formRef={formRef}
                name="start_date"
                label="Inicia em"
                marginBottom="sm"
                placeholder="Data de Início"
                icon={FiCalendar}
                disabled={loading}
              />
              <Input
                type="date"
                formRef={formRef}
                name="end_date"
                label="Termina em"
                placeholder="Data Final"
                icon={FiCalendar}
                disabled={loading}
              />
            </div>
            <div></div>
          </Row>
        </main>
        <footer>
          <Button
            onClick={() => {
              handleCloseModal()
            }}
            color="secondary"
            type="button"
            outline
            inline
          >
            <FiX size={20} />
            <span>Cancelar</span>
          </Button>
          <Button inline color="primary" type="submit" loading={loading}>
            <FiPlus size={20} /> <span>Adicionar</span>
          </Button>
        </footer>
      </Form>
    </Modal>
  )
}

export default ParticipationModal
