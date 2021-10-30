import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useEffect, useRef } from 'react'
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
import IGeneric from '../../dtos/IGeneric'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import { PaginatedRequest } from '../../services/usePaginatedRequest'
import { Row } from '../../styles/components/grid'
import capitalize from '../../utils/capitalize'
import { formatData } from '../../utils/formatters'
import getValidationErrors from '../../utils/getValidationErrors'
import { getActivitySchema } from '../../utils/schemas'
import { inDateRange, minDate } from '../../utils/validators'
import AsyncSelect from '../asyncSelect'
import Button from '../button'
import Input from '../input'
import Modal from '../modal'

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
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleCloseModal = useCallback(() => {
    formRef.current.reset()
    formRef.current.setErrors({})
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(
    async data => {
      const schema = getActivitySchema(
        data.start_date,
        event.start_date,
        event.end_date
      )

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

  const loadTypes = useCallback(async search => {
    const response = await api.get<{ data: IGeneric[] }>('/activity_types', {
      params: { search, sort_by: 'name', order_by: 'ASC' }
    })

    const data = []

    response.data?.data?.forEach(type => {
      data.push({
        value: type.id,
        label: capitalize(type.name)
      })
    })
    return data
  }, [])

  useEffect(() => {
    if (activity) {
      formRef.current.setData({
        name: activity.name,
        type: {
          label: capitalize(activity.type.name),
          value: activity.type.id
        },
        workload: activity.workload,
        start_date: activity.start_date,
        end_date: activity.end_date
      })
    } else {
      formRef.current.reset()
    }
  }, [activity, openModal])

  return (
    <Modal open={openModal} onClose={handleCloseModal} size="xl">
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
          <Row cols={2}>
            <AsyncSelect
              formRef={formRef}
              label="Tipo de Atividade"
              name="type"
              marginBottom="sm"
              icon={FiTag}
              loadOptions={loadTypes}
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
