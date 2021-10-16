import { Form } from '@unform/web'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import {
  FiEdit,
  FiFilePlus,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUserCheck
} from 'react-icons/fi'

import Alert from '../components/alert'
import Button from '../components/button'
import Card from '../components/card'
import Column from '../components/column'
import Input from '../components/input'
import DeleteModal from '../components/modals/deleteModal'
import ParticipantModal from '../components/modals/participantModal'
import PaginatedTable from '../components/paginatedTable'
import withAuth from '../hocs/withAuth'
import { useAuth } from '../providers/auth'
import { useToast } from '../providers/toast'
import api from '../services/axios'
import usePaginatedRequest from '../services/usePaginatedRequest'
import { Container, TableRow } from '../styles/pages/home'

const Participants: React.FC = () => {
  const [show, setShow] = useState(false)
  const [participant, setParticipant] = useState(null)
  const [filters, setFilters] = useState(null)
  const [openParticipantModal, setOpenParticipantModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const [typeModal, setTypeModal] = useState<'update' | 'add'>(null)
  const { addToast } = useToast()
  const { isAdmin } = useAuth()

  const request = usePaginatedRequest<any>({
    url: 'participants',
    params:
      filters && order !== ''
        ? Object.assign(filters, { sort_by: column, order_by: order })
        : order !== ''
        ? { sort_by: column, order_by: order }
        : filters
  })

  const handleSubmitDelete = useCallback(async () => {
    try {
      await api.delete(`participants/${participant.id}`)
      addToast({
        title: 'Participante excluido',
        type: 'success',
        description: `${participant.name} excluído com sucesso.`
      })
      request.revalidate()
      setOpenDeleteModal(false)
    } catch (err) {
      addToast({
        title: 'Erro na exclusão',
        type: 'error',
        description: err
      })
    }
  }, [addToast, request, participant])

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

  const handleCloseParticipantModal = useCallback(() => {
    setOpenParticipantModal(false)
  }, [])

  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false)
  }, [])

  useEffect(() => {
    if (!show) {
      setShow(isAdmin)
    }
  }, [show, isAdmin])

  const router = useRouter()

  return (
    <Container>
      <Head>
        <title>Participantes | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiUserCheck size={24} /> Participantes
          </h1>
          <h2>Todas as pessoas que participaram ou participarão de eventos</h2>
        </div>
        <nav>
          <Button
            onClick={() => {
              setParticipant(null)
              setTypeModal('add')
              setOpenParticipantModal(true)
            }}
          >
            <FiPlus size={20} />
            <span className="hide-md-down">Adicionar Participante</span>
          </Button>
        </nav>
      </header>
      <Card>
        <header>
          <h2>Participantes cadastrados</h2>
          <Form onSubmit={handleFilter}>
            <Input
              name="search"
              placeholder="Buscar participante"
              icon={FiSearch}
            />
          </Form>
          <Button
            inline
            color="info"
            size="small"
            onClick={() => {
              router.push(`/import/participants`)
            }}
          >
            <FiFilePlus size={20} />
            <span>Importar via Planilha</span>
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
              <th onClick={() => handleOrder('personal_data.cpf')}>
                <Column order={order} selected={column === 'personal_data.cpf'}>
                  CPF
                </Column>
              </th>
              <th onClick={() => handleOrder('personal_data.dob')}>
                <Column order={order} selected={column === 'personal_data.dob'}>
                  Data de Nascimento
                </Column>
              </th>
              <th onClick={() => handleOrder('email')}>
                <Column order={order} selected={column === 'email'}>
                  E-mail
                </Column>
              </th>
              <th onClick={() => handleOrder('personal_data.phone')}>
                <Column
                  order={order}
                  selected={column === 'personal_data.phone'}
                >
                  Telefone
                </Column>
              </th>
              <th onClick={() => handleOrder('personal_data.institution')}>
                <Column
                  order={order}
                  selected={column === 'personal_data.institution'}
                >
                  É da Instituição?
                </Column>
              </th>
              <th onClick={() => handleOrder('updated_at')}>
                <Column order={order} selected={column === 'updated_at'}>
                  Atualizado em
                </Column>
              </th>
              {show && <th style={{ width: 32 }} />}
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.map(participant => (
              <tr key={participant.id}>
                <td>{participant.name}</td>
                <td>{participant.personal_data.cpf}</td>
                <td>{participant.personal_data.dob}</td>
                <td>{participant.email}</td>
                <td>{participant.personal_data.phone}</td>
                <td>{participant.personal_data.institution ? 'Sim' : 'Não'}</td>
                <td>{new Date(participant.updated_at).toLocaleString()}</td>
                {show && (
                  <td>
                    <TableRow>
                      <Button
                        inline
                        ghost
                        square
                        color="secondary"
                        size="small"
                        onClick={() => {
                          setParticipant(participant)
                          setTypeModal('update')
                          setOpenParticipantModal(true)
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
                          setParticipant(participant)
                          setOpenDeleteModal(true)
                        }}
                      >
                        <FiTrash2 size={20} />
                      </Button>
                    </TableRow>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </PaginatedTable>
      </Card>
      <ParticipantModal
        openModal={openParticipantModal}
        onClose={handleCloseParticipantModal}
        type={typeModal}
        participant={participant}
        request={request}
      />
      <DeleteModal
        name="Participante"
        openModal={openDeleteModal}
        onClose={handleCloseDeleteModal}
        handleSubmit={handleSubmitDelete}
      >
        <>
          <Alert marginBottom="sm">
            Tem certeza que você deseja excluir o participante{' '}
            <b>{participant?.name}</b>?
          </Alert>
        </>
      </DeleteModal>
    </Container>
  )
}

export default withAuth(Participants)
