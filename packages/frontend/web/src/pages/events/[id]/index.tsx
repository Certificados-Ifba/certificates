import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FiSettings,
  FiBriefcase,
  FiFileText,
  FiPlus,
  FiChevronLeft,
  FiCalendar,
  FiUser,
  FiTag,
  FiInfo,
  FiEdit,
  FiHash,
  FiSearch,
  FiTrash2,
  FiPlusCircle,
  FiX,
  FiCheck,
  FiClock
} from 'react-icons/fi'
import AsyncSelect from 'react-select/async'
import * as Yup from 'yup'

import Alert from '../../../components/alert'
import Button from '../../../components/button'
import Column from '../../../components/column'
import { EventModal } from '../../../components/eventModal'
import Input from '../../../components/input'
import Modal from '../../../components/modal'
import PaginatedTable from '../../../components/paginatedTable'
import Select from '../../../components/select'
import Tab from '../../../components/tab'
import withAuth from '../../../hocs/withAuth'
import { useToast } from '../../../providers/toast'
import api from '../../../services/axios'
import usePaginatedRequest from '../../../services/usePaginatedRequest'
import {
  ButtonContainer,
  InfoContainer,
  TabContainer
} from '../../../styles/pages/event'
import { Container } from '../../../styles/pages/home'
import getValidationErrors from '../../../utils/getValidationErrors'

const EventDetail: React.FC = () => {
  const event = {
    id: 1,
    name: 'Projeto de Extensão do NAPNEE Curso TEA',
    initials: 'TEA',
    number: 1,
    startDate: '22/09/1992',
    endDate: '22/09/1992',
    coordinator: 'Lucas Nascimento Bertoldi'
  }
  const router = useRouter()
  return (
    <Container>
      <Head>
        <title>{event?.name} | Evento</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiCalendar size={24} /> {event?.name}
          </h1>
          <h2>
            Início em {event?.startDate} e coordenado por {event?.coordinator}
          </h2>
        </div>
        <nav>
          <Button
            ghost
            onClick={() => {
              router.replace('/events')
            }}
          >
            <FiChevronLeft size={20} />
            <span className="hide-md-down">Voltar</span>
          </Button>
        </nav>
      </header>
      <Tab
        tabs={[
          {
            name: 'Informações',
            icon: FiInfo,
            children: <EventInfo event={event}></EventInfo>
          },
          {
            name: 'Atividades',
            icon: FiFileText,
            children: <EventActivity event={event}></EventActivity>
          },
          {
            name: 'Participantes',
            icon: FiFileText,
            children: <>2</>
          }
        ]}
      />
    </Container>
  )
}

export default withAuth(EventDetail)

const EventActivity: React.FC<{ event: any }> = ({ event }) => {
  const [activitySelected, setActivitySelected] = useState(null)
  const [isDeleted, setIsDeleted] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState(null)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const formRef = useRef<FormHandles>(null)
  const searchFormRef = useRef<FormHandles>()

  const { addToast } = useToast()
  const request = usePaginatedRequest<any>({
    url: `test/events/${event.id}/activities`,
    params:
      filters && order !== ''
        ? Object.assign(filters, { sort_by: column, order_by: order })
        : order !== ''
        ? { sort_by: column, order_by: order }
        : filters
  })

  useEffect(() => {
    if (activitySelected && openModal) {
      async function loadData() {
        // const response = await api.get<IResponse>(`${url}/${idSelected}`)
        // formRef.current?.setData(response?.data?.data)
      }
      setLoading(true)
      loadData()
      setLoading(false)
    }
  }, [activitySelected, openModal])

  const handleOpenModal = useCallback(() => {
    setOpenModal(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    formRef.current.setErrors({})
    formRef.current.reset()
    setOpenModal(false)
  }, [])

  const handleFilter = useCallback(
    data => {
      !data.search && delete data.search
      request.resetPage()
      setFilters(data)
    },
    [request]
  )

  const handleOrder = useCallback(
    columnSelected => {
      if (column !== columnSelected) {
        setColumn(columnSelected)
        setOrder('ASC')
      } else {
        setOrder(value =>
          value === '' ? 'ASC' : value === 'ASC' ? 'DESC' : ''
        )
      }
    },
    [column]
  )

  const handleSubmit = useCallback(
    data => {
      const schema = Yup.object().shape({})
      schema
        .validate(data, {
          abortEarly: false
        })
        .then(async data => {
          let response
          if (isDeleted) {
            response = await api.delete(
              `event/${event.id}/activity/${activitySelected}`
            )
          } else if (activitySelected) {
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
                isDeleted
                  ? 'deletada'
                  : activitySelected
                  ? 'alterada'
                  : 'cadastrada'
              }`,
              description: `A atividade foi ${
                isDeleted
                  ? 'deletada'
                  : activitySelected
                  ? 'alterada'
                  : 'cadastrada'
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
    [isDeleted, activitySelected, event, addToast, request, handleCloseModal]
  )
  let timeout

  const defaultOptions = []

  const onFocus = () => {
    console.log('aaaa')
    const respApi = await api.get('activities')
    
  }

  const loadOptions = (inputValue, callback) => {
    if (timeout) clearTimeout(timeout)
    const resp = []

    const filter = (inputValue: string) => {
      return resp
    }
    timeout = setTimeout(async () => {
      console.log(inputValue)

      try {
        const respApi = await api.get('activities', {
          params: { search: inputValue }
        })

        if (respApi?.data?.data) {
          const list = respApi?.data?.data
          for (const obj of list) {
            resp.push({ value: obj.id, label: obj.name })
          }
        }
        callback(filter(inputValue))
      } catch (error) {
        console.error(error)
        callback(filter(inputValue))
      }
    }, 500)
  }
  return (
    <>
      <header>
        <h2>Atividades do Evento</h2>
        <Form ref={searchFormRef} onSubmit={handleFilter}>
          <Input
            name="search"
            placeholder={`Buscar atividade no evento`}
            icon={FiSearch}
          />
        </Form>
        <Button
          size="small"
          inline
          onClick={() => {
            setActivitySelected(null)
            setIsDeleted(false)
            handleOpenModal()
          }}
        >
          <FiPlus size={20} />
          <span>Adicionar Atividade</span>
        </Button>
      </header>
      <PaginatedTable request={request}>
        <thead>
          <tr>
            <th onClick={() => handleOrder('name')}>
              <Column order={order} selected={column === 'name'}>
                Nome
              </Column>
            </th>
            <th>Tipo</th>
            <th>Carga Horária</th>
            <th>Início</th>
            <th>Fim</th>
            <th style={{ width: 32 }} />
          </tr>
        </thead>
        <tbody>
          {request.data?.data?.map(act => (
            <tr key={act.id}>
              <td>{act.name}</td>
              <td>{act.activitieType}</td>
              <td>{act.workload}</td>
              <td>{act.start_date}</td>
              <td>{act.end_date}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    inline
                    ghost
                    square
                    color="secondary"
                    size="small"
                    onClick={() => {
                      // setIdSelected(func.id)
                      // setIsDeleted(false)
                      // handleOpenModal()
                    }}
                  >
                    <FiEdit size={20} />
                  </Button>
                  <Button
                    inline
                    ghost
                    square
                    color="danger"
                    size="small"
                    onClick={() => {
                      // setIdSelected(func.id)
                      // setIsDeleted(true)
                      // handleOpenModal()
                    }}
                  >
                    <FiTrash2 size={20} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </PaginatedTable>
      <Modal open={openModal} onClose={handleCloseModal}>
        <header>
          <h2>
            {isDeleted ? (
              <>
                <FiTrash2 size={20} />
                <span>Excluir Atividade</span>
              </>
            ) : activitySelected ? (
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
            {isDeleted && <Alert>Tem certeza que você deseja excluir?</Alert>}
            <AsyncSelect
              loadOptions={loadOptions}
              onFocus={onFocus}
              defaultOptions={defaultOptions}
            />
            <Input
              formRef={formRef}
              name="name"
              label="Nome"
              marginBottom="sm"
              placeholder="Nome"
              icon={FiFileText}
              disabled={loading}
              hidden={isDeleted}
            />
            <Select
              hidden={isDeleted}
              formRef={formRef}
              label="Tipo de Atividade"
              name="activitieType"
              isSearchable={true}
              marginBottom="sm"
              options={[
                {
                  value: '1',
                  label: 'Minicurso'
                },
                {
                  value: '2',
                  label: 'Palestra'
                }
              ]}
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
              hidden={isDeleted}
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
              hidden={isDeleted}
            />
            <Input
              type="date"
              formRef={formRef}
              name="start_date"
              label="Termina em"
              placeholder="Data Final"
              icon={FiCalendar}
              disabled={loading}
              hidden={isDeleted}
            />
          </div>
          <div className="modal-footer">
            <Button
              onClick={() => {
                handleCloseModal()
              }}
              color="secondary"
              type="button"
              outline={!isDeleted}
            >
              <FiX size={20} />
              <span>Cancelar</span>
            </Button>
            <Button
              color={
                isDeleted
                  ? 'danger'
                  : activitySelected
                  ? 'secondary'
                  : 'primary'
              }
              type="submit"
              loading={loading}
              outline={isDeleted}
            >
              {isDeleted ? (
                <>
                  <FiTrash2 size={20} /> <span>Excluir</span>
                </>
              ) : activitySelected ? (
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
    </>
  )
}

const EventInfo: React.FC<{
  event: any
}> = ({ event }) => {
  const [eventModal, setEventModal] = useState(event)
  const [openEventModal, setOpenEventModal] = useState(false)

  return (
    <TabContainer>
      <InfoContainer>
        <div>
          <Alert marginBottom="sm" size="sm">
            Nome do Evento:
          </Alert>
          <Alert icon={FiTag} marginBottom="md">
            <b>
              {event?.name} #{event?.number} ({event?.initials})
            </b>
          </Alert>
          <Alert marginBottom="sm" size="sm">
            Coordenador:
          </Alert>
          <Alert icon={FiUser} marginBottom="md">
            <b>{event?.coordinator}</b>
          </Alert>
          <Alert marginBottom="sm" size="sm">
            Datas:
          </Alert>
          <Alert icon={FiCalendar}>
            <b>
              De {event?.startDate} até {event?.endDate}
            </b>
          </Alert>
        </div>
        <ButtonContainer>
          <div style={{ display: 'inline' }}>
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                setEventModal(JSON.parse(JSON.stringify(event)))
                setOpenEventModal(true)
              }}
            >
              <FiEdit size={20} />
              <span>Editar</span>
            </Button>
          </div>
        </ButtonContainer>
      </InfoContainer>
      <EventModal
        event={eventModal}
        openModal={openEventModal}
        setOpenModal={setOpenEventModal}
      />
    </TabContainer>
  )
}
