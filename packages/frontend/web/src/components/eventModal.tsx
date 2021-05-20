import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
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

import { useToast } from '../providers/toast'
import Button from './button'
import Input from './input'
import Modal from './modal'
import Select from './select'

export const EventModal: React.FC<{
  event?: any
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}> = ({ openModal, setOpenModal, event }) => {
  const { addToast } = useToast()

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
        coordinator: Yup.string().required(
          `Você precisa selecionar um coordenador para o evento`
        ),
        startDate: Yup.string().required(`Selecione a data de início`),
        endDate: Yup.string().required(`Selecione a data do fim`)
      })
      schema
        .validate(data, {
          abortEarly: false
        })
        .then(data => {
          console.log(data)
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
    [addToast]
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
            name="number"
            label="Número"
            placeholder="Número"
            type="number"
            icon={FiTag}
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="startDate"
            label="Data Inicial"
            placeholder="Data Inicial"
            type="date"
            icon={FiCalendar}
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="endDate"
            label="Data Final"
            placeholder="Data Final"
            type="date"
            icon={FiCalendar}
          />
          <Select
            formRef={formRef}
            label="Coordenador"
            name="coordinator"
            isSearchable={true}
            options={[
              {
                value: '1',
                label: 'Lucas Nascimento Bertoldi'
              },
              {
                value: '2',
                label: 'Pablo F Matos'
              },
              {
                value: '3',
                label: 'Matheus Coqueiro'
              }
            ]}
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
