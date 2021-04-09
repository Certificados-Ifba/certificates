import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Head from 'next/head'
import { useCallback, useRef, useState } from 'react'
import {
  FiSearch,
  FiUser,
  FiEdit,
  FiTrash2,
  FiSettings,
  FiBriefcase,
  FiFileText,
  FiPlus,
  FiPlusCircle,
  FiRefreshCw,
  FiX
} from 'react-icons/fi'
import * as Yup from 'yup'

import PageWithLayoutType from '../@types/pageWithLayout'
import Alert from '../components/alert'
import Button from '../components/button'
import Input from '../components/input'
import Modal from '../components/modal'
import PaginatedTable from '../components/paginatedTable'
import Tab from '../components/tab'
import withAuth from '../hocs/withAuth'
import DefaultLayout from '../layouts/defaultLayout'
import usePaginatedRequest from '../services/usePaginatedRequest'
import Row from '../styles/components/row'
import { Container } from '../styles/pages/home'

const Settings: React.FC = () => {
  const request = usePaginatedRequest<any>({
    url: 'test/functions'
  })

  const handleFilter = useCallback(data => {
    console.log(data)
  }, [])

  const [type, setType] = useState('Função')
  const [update, setUpdate] = useState(false)
  const [selectedName, setSelectedName] = useState('')
  const [openEditModal, setOpenEditModal] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const handleOpenEditModal = useCallback(() => {
    formRef.current.setErrors({})
    setOpenEditModal(true)
  }, [])
  const handleCloseEditModal = useCallback(() => {
    setOpenEditModal(false)
  }, [])
  const handleSubmit = useCallback(data => {
    const schema = Yup.object().shape({
      name: Yup.string().required(`A ${type} precisa ter um nome`)
    })
    schema
      .validate(data, {
        abortEarly: false
      })
      .then(data => {
        // enviar req
      })
      .catch(err => {
        const validationErrors: { [key: string]: string } = {}
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach((error: Yup.ValidationError) => {
            validationErrors[error.path] = error.message
          })
          formRef.current?.setErrors(validationErrors)
        } else {
          // mostrar mensagem erro
        }
      })
  }, [])

  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const handleOpenDeleteModal = useCallback(() => {
    setOpenDeleteModal(true)
  }, [])
  const handleCloseDeleteModal = useCallback(() => {
    setOpenDeleteModal(false)
  }, [])

  return (
    <Container>
      <Head>
        <title>Configurações | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiSettings size={24} /> Configurações
          </h1>
          <h2>
            Defina as funções dos participantes, atividades de um evento e etc.
          </h2>
        </div>
      </header>
      <Tab
        tabs={[
          {
            name: 'Funções',
            icon: FiBriefcase,
            children: (
              <>
                <header>
                  <h2>Funções disponíveis</h2>
                  <Form onSubmit={handleFilter}>
                    <Input
                      name="search"
                      placeholder="Buscar função"
                      icon={FiSearch}
                    />
                  </Form>
                  <Button
                    size="small"
                    onClick={() => {
                      setType('Função')
                      setUpdate(false)
                      setSelectedName('')
                      handleOpenEditModal()
                    }}
                  >
                    <FiPlus size={20} />
                    <span>Adicionar Função</span>
                  </Button>
                </header>
                <PaginatedTable request={request}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th style={{ width: 32 }} />
                    </tr>
                  </thead>
                  <tbody>
                    {request.data?.data?.functions?.map(func => (
                      <tr key={func.name}>
                        <td>{func.name}</td>
                        <td>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Button
                              inline
                              ghost
                              square
                              color="warning"
                              size="small"
                              onClick={() => {
                                setType('Função')
                                setUpdate(true)
                                setSelectedName(func.name)
                                handleOpenEditModal()
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
                                setSelectedName(func.name)
                                handleOpenDeleteModal()
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
              </>
            )
          },
          {
            name: 'Atividades',
            icon: FiFileText,
            children: (
              <>
                <header>
                  <h2>Atividades disponíveis</h2>
                  <Form onSubmit={handleFilter}>
                    <Input
                      name="search"
                      placeholder="Buscar atividade"
                      icon={FiSearch}
                    />
                  </Form>
                  <Button
                    size="small"
                    onClick={() => {
                      setType('Atividade')
                      setUpdate(false)
                      setSelectedName('')
                      handleOpenEditModal()
                    }}
                  >
                    <FiPlus size={20} />
                    <span>Adicionar Atividade</span>
                  </Button>
                </header>
                <PaginatedTable request={request}>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th style={{ width: 32 }} />
                    </tr>
                  </thead>
                  <tbody>
                    {request.data?.data?.functions?.map(func => (
                      <tr key={func.name}>
                        <td>{func.name}</td>
                        <td>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Button
                              inline
                              ghost
                              square
                              color="warning"
                              size="small"
                              onClick={() => {
                                setType('Atividade')
                                setUpdate(true)
                                setSelectedName(func.name)
                                handleOpenEditModal()
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
                                setSelectedName(func.name)
                                handleOpenDeleteModal()
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
              </>
            )
          }
        ]}
      />
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <header>
          <h2>
            {update ? (
              <>
                <FiEdit size={20}></FiEdit>
                <span>Editar {type}</span>
              </>
            ) : (
              <>
                <FiPlusCircle size={20}></FiPlusCircle>
                <span>Adicionar {type}</span>
              </>
            )}
          </h2>
        </header>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="type" value={type} hidden />
          <Input
            setValue={setSelectedName}
            value={selectedName}
            formRef={formRef}
            marginBottom="sm"
            name="name"
            label="Nome"
            placeholder="Nome"
            icon={FiUser}
          />
          <Button color={update ? 'warning' : 'primary'} type="submit">
            {update ? (
              <>
                <FiRefreshCw size={20}></FiRefreshCw> <span>Atualizar</span>
              </>
            ) : (
              <>
                <FiPlus size={20}></FiPlus> <span>Adicionar</span>
              </>
            )}
          </Button>
        </Form>
      </Modal>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <header>
          <h2>
            <FiTrash2 size={20} />
            <span>Excluir {type}</span>
          </h2>
        </header>
        <Form onSubmit={handleSubmit}>
          <Alert
            hideIcon={true}
            marginBottom="md"
            message={
              <>
                {`Tem certeza que você deseja excluir a ${type} `}
                <b>{selectedName}</b>?
              </>
            }
            type="info"
          ></Alert>
          <Row>
            <Button color="danger" type="submit">
              <FiTrash2 size={20} />
              <span>Excluir</span>
            </Button>
            <Button
              onClick={() => {
                handleCloseDeleteModal()
              }}
              color="secondary"
              type="button"
            >
              <FiX size={20} />
              <span>Cancelar</span>
            </Button>
          </Row>
        </Form>
      </Modal>
    </Container>
  )
}

;(Settings as PageWithLayoutType).layout = DefaultLayout

export default Settings
// export default withAuth(Settings)
