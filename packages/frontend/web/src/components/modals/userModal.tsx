import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useEffect, useRef } from 'react'
import {
  FiEdit,
  FiPlus,
  FiUser,
  FiX,
  FiMail,
  FiCheck,
  FiUserPlus,
  FiUnlock,
  FiLock,
  FiKey
} from 'react-icons/fi'
import * as Yup from 'yup'

import IUser from '../../dtos/IUser'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import { PaginatedRequest } from '../../services/usePaginatedRequest'
import getValidationErrors from '../../utils/getValidationErrors'
import Alert from '../alert'
import Button from '../button'
import Input from '../input'
import Modal from '../modal'
import Select from '../select'

interface Props {
  type: 'add' | 'update' | 'update-email'
  openModal: boolean
  onClose: () => void
  user?: IUser
  request: PaginatedRequest<any, any>
}

const UserModal: React.FC<Props> = ({
  type,
  openModal,
  onClose,
  user,
  request
}) => {
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)

  const handleCloseSaveModal = useCallback(() => {
    formRef.current.reset()
    formRef.current.setErrors({})
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(
    async data => {
      const schemaObj: any = {}

      if (type === 'add' || type === 'update') {
        schemaObj.name = Yup.string().required('O usuário precisa ter um nome')
        schemaObj.role = Yup.string().required(
          'Você precisa selecionar um privilégio'
        )
      }

      if (type === 'add' || type === 'update-email') {
        schemaObj.repeatEmail = Yup.string()
          .email('Por favor, digite um e-mail válido')
          .required('Você precisa confirmar o e-mail')
          .oneOf([data.email], 'Os e-mails devem ser iguais.')
          .notOneOf([user?.email], 'O e-mail deve ser diferente do atual')
        schemaObj.email = Yup.string()
          .email('Por favor, digite um e-mail válido')
          .required('O usuário precisa ter um e-mail')
          .notOneOf([user?.email], 'O e-mail deve ser diferente do atual')
      }

      const schema = Yup.object().shape(schemaObj)
      try {
        await schema.validate(data, {
          abortEarly: false
        })

        delete data.repeatEmail

        if (type === 'add') {
          await api.post('users', data)
        } else {
          await api.put(`users/${user.id}`, data)
        }

        addToast({
          type: 'success',
          title: `O usuário foi ${
            type === 'add' ? 'cadastrado' : 'atualizado'
          }`,
          description:
            type === 'update-email'
              ? 'O e-mail foi atualizado, peça para o usuário confirmar sua conta.'
              : `${data.name} foi ${
                  type === 'add' ? 'cadastrado' : 'atualizado'
                } com sucesso.`
        })
        request.revalidate()
        handleCloseSaveModal()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        let title = 'Erro ao '
        if (type === 'update-email') {
          title += 'atualizar o e-mail'
        } else if (type === 'update') {
          title += 'atualizar o usuário'
        } else {
          title += 'adicionar o usuário'
        }
        addToast({
          type: 'error',
          title: title,
          description: err
        })
      }
    },
    [type, user, addToast, request, handleCloseSaveModal]
  )

  useEffect(() => {
    if (type === 'update' && user) {
      formRef.current?.setData(user)
    } else {
      formRef.current?.setData({})
    }
  }, [user, openModal, type])

  return (
    <Modal open={openModal} onClose={handleCloseSaveModal}>
      <header>
        <h2>
          {type === 'update' ? (
            <>
              <FiEdit size={20} />
              <span>Editar Usuário</span>
            </>
          ) : type === 'update-email' ? (
            <>
              <FiMail size={20} />
              <span>Atualizar E-mail</span>
            </>
          ) : (
            <>
              <FiUserPlus size={20} />
              <span>Adicionar Usuário</span>
            </>
          )}
        </h2>
      </header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="modal-body">
          {type === 'update-email' && (
            <>
              <Alert size="sm" marginBottom="xs">
                Usuário:
              </Alert>
              <Alert size="sm" icon={FiUser} marginBottom="sm">
                <b>{user?.name}</b>
              </Alert>
              <Alert size="sm" marginBottom="xs">
                E-mail atual:
              </Alert>
              <Alert size="sm" icon={FiMail} marginBottom="xs">
                <b>{user?.email}</b>
              </Alert>
              <Alert
                type={user?.is_confirmed ? 'success' : 'danger'}
                icon={user?.is_confirmed ? FiUnlock : FiLock}
                size="sm"
                marginBottom="md"
              >
                Este e-mail {user?.is_confirmed ? 'já foi' : 'não foi'}{' '}
                confirmado
              </Alert>
            </>
          )}
          {type === 'update' && (
            <>
              <Alert size="sm" marginBottom="sm">
                O e-mail de {user?.name} é:
              </Alert>
              <Alert size="sm" icon={FiMail} marginBottom="md">
                <b>{user?.email}</b>
              </Alert>
            </>
          )}
          {type !== 'update-email' && (
            <>
              <Input
                formRef={formRef}
                marginBottom="sm"
                name="name"
                label="Nome"
                placeholder="Nome"
                icon={FiUser}
              />
              <Select
                formRef={formRef}
                label="Privilégio"
                name="role"
                isSearchable={false}
                marginBottom={type === 'add' ? 'sm' : ''}
                icon={FiKey}
                options={[
                  {
                    value: 'ADMIN',
                    label: 'Administrador'
                  },
                  {
                    value: 'COORDINATOR',
                    label: 'Coordenador de Eventos'
                  }
                ]}
              />
            </>
          )}
          {type !== 'update' && (
            <>
              <Input
                formRef={formRef}
                marginBottom={'sm'}
                name="email"
                label={type === 'update-email' ? 'Novo e-mail' : 'E-mail'}
                placeholder="email@exemplo.com"
                icon={FiMail}
                type="text"
              />
              <Input
                formRef={formRef}
                name="repeatEmail"
                label={
                  type === 'update-email'
                    ? 'Confirme o novo e-mail'
                    : 'Confirme o e-mail'
                }
                placeholder="email@exemplo.com"
                icon={FiMail}
                type="text"
              />
            </>
          )}
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
          <Button
            color={type === 'add' ? 'primary' : 'secondary'}
            type="submit"
          >
            {type === 'update' || type === 'update-email' ? (
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

export default UserModal
