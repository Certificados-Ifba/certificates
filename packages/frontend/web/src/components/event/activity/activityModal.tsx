import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiEdit,
  FiFileText,
  FiPlus,
  FiPlusCircle,
  FiX
} from 'react-icons/fi'
import * as Yup from 'yup'

import { useToast } from '../../../providers/toast'
import api from '../../../services/axios'
import { PaginatedRequest } from '../../../services/usePaginatedRequest'
import getValidationErrors from '../../../utils/getValidationErrors'
import Button from '../../button'
import Input from '../../input'
import Modal from '../../modal'
import Select from '../../select'

export const EventActivityModal: React.FC<{
  event: any
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  activitySelected: string
  request: PaginatedRequest<any, any>
}> = ({ event, openModal, setOpenModal, activitySelected, request }) => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleCloseModal = useCallback(() => {
    formRef.current.reset()
    formRef.current.setErrors({})
    setOpenModal(false)
  }, [setOpenModal])

  useEffect(() => {
    if (activitySelected && openModal) {
      async function loadData() {
        const response = await api.get(
          `events/${event.id}/activities/${activitySelected}`
        )
        formRef.current?.setData(response?.data?.data)
      }
      setLoading(true)
      loadData()
      setLoading(false)
    }
  }, [activitySelected, event, openModal])

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
          let response
          if (activitySelected) {
            response = await api.put(
              `event/${event.id}/activity/${activitySelected}`,
              data
            )
          } else {
            response = await api.post(`event/${event.id}/activity`, data)
          }
          if (response.data) {
            addToast({
              type: 'success',
              title: `Atividade ${
                activitySelected ? 'alterada' : 'cadastrada'
              }`,
              description: `A atividade foi ${
                activitySelected ? 'alterada' : 'cadastrada'
              } com sucesso.`
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
            title: `Erro ${activitySelected ? 'na alteração' : 'no cadastro'}`,
            description: err
          })
        })
    },
    [activitySelected, event, addToast, request, handleCloseModal]
  )

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <header>
        <h2>
          {activitySelected ? (
            <>
              <FiEdit size={20} />
              <span>Editar Atividade</span>
            </>
          ) : (
            <>
              <FiPlusCircle size={20} />
              <span>Adicionar Atividade</span>
            </>
          )}
        </h2>
      </header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="modal-body">
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
        <div className="modal-footer">
          <Button
            onClick={() => {
              handleCloseModal()
            }}
            color="secondary"
            type="button"
            outline
          >
            <FiX size={20} />
            <span>Cancelar</span>
          </Button>
          <Button
            color={activitySelected ? 'secondary' : 'primary'}
            type="submit"
            loading={loading}
          >
            {activitySelected ? (
              <>
                <FiCheck size={20} /> <span>Atualizar</span>
              </>
            ) : (
              <>
                <FiPlus size={20} /> <span>Adicionar</span>
              </>
            )}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
