import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useRef, useCallback, useEffect } from 'react'
import {
  FiBookmark,
  FiTag,
  FiCalendar,
  FiX,
  FiPlus,
  FiCheck
} from 'react-icons/fi'
import * as Yup from 'yup'

import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import { PaginatedRequest } from '../../services/usePaginatedRequest'
import Button from '../button'
import Input from '../input'
import Modal from '../modal'
import Select from '../select'

export const EventModal: React.FC<{
  event?: any
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  type: 'add' | 'edit'
  request?: PaginatedRequest<any, any>
}> = ({ openModal, setOpenModal, event, type, request }) => {
  const { addToast } = useToast()

  const router = useRouter()

  const formRef = useRef<FormHandles>(null)

  const handleCloseSaveModal = useCallback(() => {
    formRef.current.reset()
    formRef.current.setErrors({})
    setOpenModal(false)
  }, [setOpenModal])

  useEffect(() => {
    if (event) {
      formRef.current.setData(event)
    } else {
      formRef.current.reset()
      formRef.current.setErrors({})
    }
  }, [event])

  const handleSubmit = useCallback(
    data => {
      const schema = Yup.object().shape({
        name: Yup.string().required(`O evento precisa ter um nome`),
        initials: Yup.string().required(`Por favor, digite a sigla do projeto`),
        user_id: Yup.string().required(
          `Você precisa selecionar um coordenador para o evento`
        ),
        start_date: Yup.string().required(`Selecione a data de início`),
        end_date: Yup.string().required(`Selecione a data do fim`)
      })
      schema
        .validate(data, {
          abortEarly: false
        })
        .then(async (data: any) => {
          data.year = '2020'
          const response: any = await api.post('events', data)
          if (response.data) {
            addToast({
              type: 'success',
              title: `O evento ${type === 'add' ? 'cadastrado' : 'atualizado'}`,
              description: `O evento foi ${
                type === 'add' ? 'cadastrado' : 'atualizado'
              } com sucesso.`
            })
            handleCloseSaveModal()

            if (response.data?.data?.event) {
              if (type === 'add')
                router.replace(`events/${response.data?.data?.event.id}`)
            }
          }
        })
        .catch(err => {
          const validationErrors: { [key: string]: string } = {}
          if (err instanceof Yup.ValidationError) {
            err.inner.forEach((error: Yup.ValidationError) => {
              validationErrors[error.path] = error.message
            })
            formRef.current?.setErrors(validationErrors)
          } else {
            const message = 'Erro ao adicionar o evento.'
            addToast({
              title: `Erro desconhecido`,
              type: 'error',
              description: message
            })
          }
        })
    },
    [addToast, handleCloseSaveModal, router, type]
  )

  return (
    <Modal open={openModal} onClose={handleCloseSaveModal}>
      <header>
        <h2>
          <FiCalendar size={20} />
          <span>{event ? 'Editar' : 'Adicionar'} Evento</span>
        </h2>
      </header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="modal-body">
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="name"
            label="Nome"
            placeholder="Nome do Evento"
            icon={FiBookmark}
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="initials"
            label="Sigla"
            placeholder="Sigla"
            icon={FiTag}
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="edition"
            label="Edição"
            placeholder="Edição"
            type="text"
            icon={FiTag}
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="start_date"
            label="Data Inicial"
            placeholder="Data Inicial"
            type="date"
            icon={FiCalendar}
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="end_date"
            label="Data Final"
            placeholder="Data Final"
            type="date"
            icon={FiCalendar}
          />
          <Select
            async={true}
            url="users"
            formRef={formRef}
            label="Coordenador"
            name="user_id"
            isSearchable={true}
          />
        </div>
        <div className="modal-footer">
          <Button
            onClick={() => {
              handleCloseSaveModal()
            }}
            color="secondary"
            type="button"
            outline
          >
            <FiX size={20} />
            <span>Cancelar</span>
          </Button>
          <Button color={event ? 'secondary' : 'primary'} type="submit">
            {event ? (
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
