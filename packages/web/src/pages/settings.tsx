import Head from 'next/head'
import React from 'react'
import {
  FiUserCheck,
  FiPlus,
  FiSearch,
  FiInfo,
  FiUserPlus,
  FiAward,
  FiEdit,
  FiTrash2,
  FiSettings,
  FiTool,
  FiBriefcase,
  FiFileText
} from 'react-icons/fi'
import Button from '../components/Button'
import Card from '../components/Card'
import Input from '../components/Input'
import PaginatedTable from '../components/PaginatedTable'
import Tab from '../components/Tab'
import usePaginatedRequest from '../services/usePaginatedRequest'
import { Container } from '../styles/pages/Home'

const settings: React.FC = () => {
  const request = usePaginatedRequest<any>({
    url: 'http://localhost:3001/test/functions'
  })
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
                  <form>
                    <Input
                      type="text"
                      placeholder="Buscar função"
                      icon={<FiSearch size={20} />}
                    />
                  </form>
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
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Button
                              inline
                              ghost
                              square
                              color="secondary"
                              size="small"
                            // onClick={() =>
                            //   history.push(
                            //     `/access-control/collaborators/edit/${movie.id}`
                            //   )
                            // }
                            >
                              <FiInfo size={20} />
                            </Button>
                            <Button
                              inline
                              ghost
                              square
                              color="warning"
                              size="small"
                            // onClick={() =>
                            //   history.push(
                            //     `/access-control/collaborators/edit/${movie.id}`
                            //   )
                            // }
                            >
                              <FiEdit size={20} />
                            </Button>
                            <Button
                              inline
                              ghost
                              square
                              color="danger"
                              size="small"
                            // onClick={() =>
                            //   history.push(
                            //     `/access-control/collaborators/edit/${movie.id}`
                            //   )
                            // }
                            >
                              <FiTrash2 size={20} />
                            </Button>
                          </div>
                          {/*
                </Button>
                <Button inline size="small" color="danger">
                  Deletar
                </Button> */}
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
                <form>
                  <Input
                    type="text"
                    placeholder="Buscar atividade"
                    icon={<FiSearch size={20} />}
                  />
                </form>
              </header>
            )
          }
        ]}
      />
    </Container>
  )
}

export default settings
