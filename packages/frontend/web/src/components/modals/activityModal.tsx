import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiEdit,
  FiFileText,
  FiPlus,
  FiPlusCircle,
  FiTag,
  FiX
} from 'react-icons/fi'
import * as Yup from 'yup'

import IActivity from '../../dtos/IActivity'
import IEvent from '../../dtos/IEvent'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import { PaginatedRequest } from '../../services/usePaginatedRequest'
import { formatData } from '../../utils/formatters'
import getValidationErrors from '../../utils/getValidationErrors'
import Button from '../button'
import Input from '../input'
import Modal from '../modal'
import Select from '../select'

interface Props {
  type: 'add' | 'update'
  event: IEvent
  openModal: boolean
  onClose: () => void
  activity?: IActivity
  request: PaginatedRequest<any, any>
}

const ActivityModal: React.FC<Props> = ({
  type,
  event,
  openModal,
  onClose,
  activity,
  request
}) => {
  // const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleCloseModal = useCallback(() => {
    formRef.current.reset()
    formRef.current.setErrors({})
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(
    async data => {
      // setLoading(true)
      console.log(event, data)

      const schema = Yup.object().shape({
        name: Yup.string().required('A atividade precisa ter um nome'),
        type: Yup.string().required(`Selecione um tipo da atividade`),
        workload: Yup.string().required('Por favor, digite a carga horária'),
        start_date: Yup.string()
          .min(
            event.start_date,
            `A atividade precisa ser entre os dias ${formatData(
              event.start_date
            )} e ${formatData(event.end_date)}`
          )
          .required('Selecione a data de início'),
        end_date: Yup.string()
          .min(
            data?.start_date,
            'A data final precisa ser maior que a data inicial'
          )
          .required('Selecione a data do fim')
      })

      try {
        await schema.validate(data, {
          abortEarly: false
        })

        if (type === 'add') {
          await api.post(`events/${event?.id}/activities`, data)
        } else {
          await api.put(`events/${event?.id}/activities/${activity?.id}`, data)
        }

        addToast({
          type: 'success',
          title: `A atividade ${type === 'add' ? 'cadastrado' : 'atualizado'}`,
          description: `A atividade foi ${
            type === 'add' ? 'cadastrado' : 'atualizado'
          } com sucesso.`
        })
        request.revalidate()
        handleCloseModal()
        // setLoading(false)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: `Erro ao ${
            type === 'add' ? 'adicionar atividade' : 'atualizar atividade'
          }`,
          description: err
        })
        // setLoading(false)
      }
    },
    [type, event, activity?.id, addToast, handleCloseModal, request]
  )

  useEffect(() => {
    if (activity) {
      formRef.current.setData(activity)
    } else {
      formRef.current.setErrors({})
    }
  }, [activity, openModal])

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <header>
        <h2>
          {activity ? (
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
        <main>
          <Input
            formRef={formRef}
            name="name"
            label="Nome"
            marginBottom="sm"
            placeholder="Nome"
            icon={FiFileText}
          />
          <Select
            formRef={formRef}
            label="Tipo de Atividade"
            name="type"
            isSearchable={true}
            marginBottom="sm"
            async={true}
            url="activity_types"
            icon={FiTag}
          />
          <Input
            type="number"
            formRef={formRef}
            name="workload"
            label="Carga Horária (Horas)"
            marginBottom="sm"
            placeholder="Carga Horária"
            icon={FiClock}
          />
          <Input
            type="date"
            formRef={formRef}
            name="start_date"
            label="Inicia em"
            marginBottom="sm"
            placeholder="Data de Início"
            icon={FiCalendar}
          />
          <Input
            type="date"
            formRef={formRef}
            name="end_date"
            label="Termina em"
            placeholder="Data Final"
            icon={FiCalendar}
          />
        </main>
        <footer>
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
            color={activity ? 'secondary' : 'primary'}
            type="submit"
            // loading={loading}
          >
            {activity ? (
              <>
                <FiCheck size={20} /> <span>Atualizar</span>
              </>
            ) : (
              <>
                <FiPlus size={20} /> <span>Adicionar</span>
              </>
            )}
          </Button>
        </footer>
      </Form>
    </Modal>
  )
}

export default ActivityModal
