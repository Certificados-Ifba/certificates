import {
  Button,
  FooterModal,
  HeaderModal,
  Input,
  MainModal,
  Modal
} from '@components'
import { IGeneric } from '@dtos'
import { useToast } from '@providers'
import { api, PaginatedRequest } from '@services'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { getValidationErrors } from '@utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiCheck, FiEdit, FiPlus, FiUserPlus, FiX } from 'react-icons/fi'
import * as Yup from 'yup'

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

export const GenericModal: React.FC<Props> = ({
  type,
  openModal,
  onClose,
  generic,
  request,
  icon: Icon,
  name,
  url
}) => {
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)

  const handleCloseModal = useCallback(() => {
    formRef.current.reset()
    formRef.current.setErrors({})
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true)
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required(`A ${name} precisa ter um nome`)
        })
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
        setLoading(false)
        handleCloseModal()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          setLoading(false)
          return
        }
        setLoading(false)
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
      <HeaderModal>
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
      </HeaderModal>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <MainModal>
          <Input
            name="name"
            label="Nome"
            placeholder="Nome"
            icon={Icon}
            disabled={loading}
          />
        </MainModal>
        <FooterModal>
          <Button
            onClick={() => {
              handleCloseModal()
            }}
            color="secondary"
            type="button"
            outline
            disabled={loading}
          >
            <FiX size={20} />
            <span>Cancelar</span>
          </Button>
          <Button
            color={type === 'add' ? 'primary' : 'secondary'}
            type="submit"
            loading={loading}
          >
            {type === 'update' ? (
              <>
                <FiCheck size={20} />
                <span>Atualizar</span>
              </>
            ) : (
              <>
                <FiPlus size={20} />
                <span>Adicionar</span>
              </>
            )}
          </Button>
        </FooterModal>
      </Form>
    </Modal>
  )
}
