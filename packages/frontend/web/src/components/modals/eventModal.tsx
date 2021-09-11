import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useRouter } from 'next/router'
import {
  Dispatch,
  SetStateAction,
  useRef,
  useCallback,
  useEffect,
  useState
} from 'react'
import {
  FiBookmark,
  FiTag,
  FiCalendar,
  FiX,
  FiPlus,
  FiCheck,
  FiHash,
  FiUser,
  FiMapPin
} from 'react-icons/fi'
import * as Yup from 'yup'

import IEvent from '../../dtos/IEvent'
import IUser from '../../dtos/IUser'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import { Group, Badge } from '../../styles/components/select'
import getValidationErrors from '../../utils/getValidationErrors'
import AsyncSelect from '../asyncSelect'
import Button from '../button'
import Input from '../input'
import Modal from '../modal'

interface IResponse {
  data: IUser[]
}

interface Props {
  type: 'add' | 'edit'
  openModal: boolean
  onClose: () => void
  setEvent?: Dispatch<SetStateAction<IEvent>>
  event?: IEvent
}

const EventModal: React.FC<Props> = ({
  type,
  openModal,
  onClose,
  setEvent,
  event
}) => {
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const router = useRouter()

  const formRef = useRef<FormHandles>(null)

  const handleCloseSaveModal = useCallback(() => {
    formRef.current.reset()
    formRef.current.setErrors({})
    onClose()
  }, [onClose])

  useEffect(() => {
    if (event) {
      formRef.current.setData(event)
    } else {
      formRef.current.setErrors({})
    }
  }, [event, openModal])

  const handleSubmit = useCallback(
    async data => {
      console.log(data)

      setLoading(true)
      const schema = Yup.object().shape({
        name: Yup.string().required('O evento precisa ter um nome'),
        initials: Yup.string().required('Por favor, digite a sigla do evento'),
        edition: Yup.string().required('Por favor, digite a edição do evento'),
        local: Yup.string().required('Por favor, digite o local do evento'),
        user: Yup.string().required(
          'Você precisa selecionar um coordenador para o evento'
        ),
        start_date: Yup.string().required('Selecione a data de início'),
        end_date: Yup.string().required('Selecione a data do fim')
        // .min(
        //   data.start_date,
        //   'A data final precisa ser maior que a data inicial'
        // )
      })

      try {
        await schema.validate(data, {
          abortEarly: false
        })

        if (type === 'add') {
          const response = await api.post('events', data)
          router.push(`events/info/${response.data?.data?.event.id}`)
        } else {
          const response = await api.put(`events/${event?.id}`, data)
          setEvent(response.data?.data?.event)
        }

        addToast({
          type: 'success',
          title: `O evento ${type === 'add' ? 'cadastrado' : 'atualizado'}`,
          description: `O evento foi ${
            type === 'add' ? 'cadastrado' : 'atualizado'
          } com sucesso.`
        })
        handleCloseSaveModal()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }
        addToast({
          type: 'error',
          title: `Erro ao ${
            type === 'add' ? 'adicionar o usuário' : 'atualizar o usuário'
          }`,
          description: err
        })
        setLoading(false)
      }
    },
    [router, type, event?.id, addToast, handleCloseSaveModal, setEvent]
  )

  const loadUsers = useCallback(async search => {
    const response = await api.get<IResponse>('/users', {
      params: { search, sort_by: 'name', order_by: 'ASC' }
    })

    const data = [
      {
        label: 'Administrador',
        options: []
      },
      {
        label: 'Coordenador',
        options: []
      }
    ]

    response.data?.data?.forEach(user => {
      data[user.role === 'ADMIN' ? 0 : 1].options.push({
        value: user.id,
        label: user.name
      })
    })
    return data
  }, [])

  const formatGroupLabel = data => (
    <Group>
      <span>{data.label}</span>
      <Badge>{data.options.length}</Badge>
    </Group>
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
        <main>
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
            icon={FiHash}
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="edition"
            label="Edição"
            placeholder="Edição"
            icon={FiTag}
          />
          <Input
            formRef={formRef}
            marginBottom="sm"
            name="local"
            label="Local"
            placeholder="Local"
            icon={FiMapPin}
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
          <AsyncSelect
            label="Coordenador"
            formRef={formRef}
            name="user"
            loadOptions={loadUsers}
            formatGroupLabel={formatGroupLabel}
            icon={FiUser}
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
            color={event ? 'secondary' : 'primary'}
            type="submit"
            loading={loading}
          >
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
        </footer>
      </Form>
    </Modal>
  )
}

export default EventModal
