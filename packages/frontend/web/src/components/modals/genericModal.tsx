import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useEffect, useRef } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiCheck, FiEdit, FiPlus, FiUserPlus, FiX } from 'react-icons/fi'
import * as Yup from 'yup'

import IGeneric from '../../dtos/IGeneric'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import { PaginatedRequest } from '../../services/usePaginatedRequest'
import getValidationErrors from '../../utils/getValidationErrors'
import Button from '../button'
import Input from '../input'
import Modal from '../modal'

interface Props {
  type: 'add' | 'update'
  name: string
  url: string
  openModal: boolean
  onClose: () => void
  generic?: IGeneric
  request: PaginatedRequest<any, any>
  icon: React.ComponentType<IconBaseProps>
}

const GenericModal: React.FC<Props> = ({
  type,
  openModal,
  onClose,
  generic,
  request,
  icon,
  name,
  url
}) => {
  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)

  const handleCloseModal = useCallback(() => {
    formRef.current.reset()
    formRef.current.setErrors({})
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(
    async data => {
      const schema = Yup.object().shape({
        name: Yup.string().required(`A ${name} precisa ter um nome`)
      })
      try {
        await schema.validate(data, {
          abortEarly: false
        })

        if (type === 'add') {
          await api.post(url, data)
        } else {
          delete data.cpf
          await api.put(`${url}/${generic?.id}`, data)
        }

        addToast({
          type: 'success',
          title: `${name} ${type === 'add' ? 'cadastrada' : 'atualizada'}`,
          description: `${data.name} foi ${
            type === 'add' ? 'cadastrado' : 'atualizado'
          } com sucesso.`
        })
        request.revalidate()
        handleCloseModal()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: `Erro ${generic?.id ? 'na alteração' : 'no cadastro'}`,
          description: err
        })
      }
    },
    [type, generic?.id, addToast, request, handleCloseModal, name, url]
  )

  useEffect(() => {
    if (generic) {
      formRef.current?.setData(generic)
    } else {
      formRef.current?.setData({})
    }
  }, [generic, openModal])

  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <header>
        <h2>
          {type === 'update' ? (
            <>
              <FiEdit size={20} />
              <span>Editar {name}</span>
            </>
          ) : (
            <>
              <FiUserPlus size={20} />
              <span>Adicionar {name}</span>
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
            placeholder="Nome"
            icon={icon}
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
            color={type === 'add' ? 'primary' : 'secondary'}
            type="submit"
          >
            {type === 'update' ? (
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

export default GenericModal
