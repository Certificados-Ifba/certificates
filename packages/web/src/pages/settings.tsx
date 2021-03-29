import { Form } from '@unform/web'
import Head from 'next/head'
import { useCallback } from 'react'
import {
  FiSearch,
  FiInfo,
  FiEdit,
  FiTrash2,
  FiSettings,
  FiBriefcase,
  FiFileText
} from 'react-icons/fi'

import Button from '../components/Button'
import Input from '../components/Input'
import PaginatedTable from '../components/PaginatedTable'
import Tab from '../components/Tab'
import usePaginatedRequest from '../services/usePaginatedRequest'
import { Container } from '../styles/pages/Home'

const settings: React.FC = () => {
  const request = usePaginatedRequest<any>({
    url: 'http://localhost:3001/test/functions'
  })

  const handleFilter = useCallback(data => {
    console.log(data)
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
                              color="secondary"
                              size="small"
                            >
                              <FiInfo size={20} />
                            </Button>
                            <Button
                              inline
                              ghost
                              square
                              color="warning"
                              size="small"
                            >
                              <FiEdit size={20} />
                            </Button>
                            <Button
                              inline
                              ghost
                              square
                              color="danger"
                              size="small"
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
              <header>
                <h2>Atividades disponíveis</h2>
                <Form onSubmit={handleFilter}>
                  <Input
                    name="search"
                    placeholder="Buscar atividade"
                    icon={FiSearch}
                  />
                </Form>
              </header>
            )
          }
        ]}
      />
    </Container>
  )
}

export default settings
