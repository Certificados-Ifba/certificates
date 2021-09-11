import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useEffect, useRef } from 'react'
import {
  FiBook,
  FiCalendar,
  FiCheck,
  FiCreditCard,
  FiEdit,
  FiMail,
  FiPhoneCall,
  FiPlus,
  FiUser,
  FiUserPlus,
  FiX
} from 'react-icons/fi'
import * as Yup from 'yup'

import IParticipant from '../../dtos/IParticipant'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import { PaginatedRequest } from '../../services/usePaginatedRequest'
import getValidationErrors from '../../utils/getValidationErrors'
import isValidCpf from '../../utils/isValidCpf'
import Button from '../button'
import Input from '../input'
import Modal from '../modal'
import Select from '../newSelect'

interface Props {
  type: 'add' | 'update'
  openModal: boolean
  onClose: () => void
  participant?: IParticipant
  request: PaginatedRequest<any, any>
}

const ParticipantModal: React.FC<Props> = ({
  type,
  openModal,
  onClose,
  participant,
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
      const schema = Yup.object().shape({
        name: Yup.string().required('O usuário precisa ter um nome'),
        email: Yup.string().email('Por favor, digite um e-mail válido'),
        cpf: Yup.string()
          .matches(
            /(\d{3}).(\d{3}).(\d{3})-(\d{2})/,
            'Por favor, digite um CPF válido.'
          )
          .test('is-jimmy', 'CPF precisa ser válido', isValidCpf)
          .required('Digite o CPF do participante'),
        dob: Yup.string().required('Selecione a data de nascimento'),
        phone: Yup.string().matches(
          /(^$|\((\d{2})\) (\d{4}|\d{5})-(\d{4}))/,
          'Por favor, digite um telefone válido.'
        ),
        institution: Yup.string().required(
          'Selecione se o participante é da instituição.'
        )
      })
      try {
        await schema.validate(data, {
          abortEarly: false
        })

        if (type === 'add') {
          data.cpf = data.cpf.replace(/[^\d]+/g, '')
          await api.post('participants', data)
        } else {
          delete data.cpf
          await api.put(`participants/${participant.id}`, data)
        }

        addToast({
          type: 'success',
          title: `O participante ${
            type === 'add' ? 'cadastrado' : 'atualizado'
          }`,
          description: `${data.name} foi ${
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
        if (type === 'update') {
          title += 'atualizar o participante'
        } else {
          title += 'adicionar o participante'
        }
        addToast({
          type: 'error',
          title: title,
          description: err
        })
      }
    },
    [type, participant, addToast, request, handleCloseSaveModal]
  )

  useEffect(() => {
    if (participant) {
      formRef.current?.setData({
        name: participant.name,
        email: participant.email,
        cpf: participant.personal_data.cpf,
        dob: participant.personal_data.dob,
        phone: participant.personal_data.phone,
        institution: participant.personal_data.institution
      })
    } else {
      formRef.current?.setData({})
    }
  }, [participant, openModal])

  return (
    <Modal open={openModal} onClose={handleCloseSaveModal}>
      <header>
        <h2>
          {type === 'update' ? (
            <>
              <FiEdit size={20} />
              <span>Editar Participante</span>
            </>
          ) : (
            <>
              <FiUserPlus size={20} />
              <span>Adicionar Participante</span>
            </>
          )}
        </h2>
      </header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <main>
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="name"
            label="Nome"
            placeholder="Nome"
            icon={FiUser}
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="cpf"
            label="CPF"
            placeholder="CPF"
            type="cpf"
            icon={FiCreditCard}
            disabled={type === 'update'}
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="dob"
            label="Data de Nascimento"
            type="date"
            icon={FiCalendar}
          />
          <Select
            formRef={formRef}
            marginBottom={'sm'}
            label="É da Instituição?"
            name="institution"
            isSearchable={false}
            icon={FiBook}
            options={[
              {
                value: true,
                label: 'Sim'
              },
              {
                value: false,
                label: 'Não'
              }
            ]}
          />
          <Input
            formRef={formRef}
            marginBottom={'sm'}
            name="email"
            label={'E-mail'}
            placeholder="email@exemplo.com"
            icon={FiMail}
            type="text"
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="phone"
            label="Telefone"
            placeholder="Telefone"
            type="phone"
            icon={FiPhoneCall}
          />
        </main>
        <footer>
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

export default ParticipantModal
