import { Form } from '@unform/web'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import {
  FiAward,
  FiEdit,
  FiInfo,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUserPlus,
  FiUsers
} from 'react-icons/fi'

import Button from '../components/button'
import Card from '../components/card'
import Column from '../components/column'
import Input from '../components/input'
import PaginatedTable from '../components/paginatedTable'
import withAuth from '../hocs/withAuth'
import usePaginatedRequest from '../services/usePaginatedRequest'
import { Container } from '../styles/pages/home'

const Users: React.FC = () => {
  const [column, setColumn] = useState('type')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const request = usePaginatedRequest<any>({
    url: 'test/users'
  })

  const handleFilter = useCallback(data => {
    console.log(data)
  }, [])

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

  return (
    <Container>
      <Head>
        <title>Usuários | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiUsers size={24} /> Usuários
          </h1>
          <h2>São pessoas que terão acesso gerencial ao sistema.</h2>
        </div>
        <nav>
          <Button>
            <FiPlus size={20} />
            <span className="hide-md-down">Adicionar Usuário</span>
          </Button>
        </nav>
      </header>
      <Card>
        <header>
          <h2>Usuários Cadastrados</h2>
          <Form onSubmit={handleFilter}>
            <Input name="search" placeholder="Buscar função" icon={FiSearch} />
          </Form>
        </header>
        <PaginatedTable request={request}>
          <thead>
            <tr>
              <th onClick={() => handleOrder('name')}>
                <Column order={order} selected={column === 'name'}>
                  Nome
                </Column>
              </th>
              <th onClick={() => handleOrder('email')}>
                <Column order={order} selected={column === 'email'}>
                  E-mail
                </Column>
              </th>
              <th onClick={() => handleOrder('role')}>
                <Column order={order} selected={column === 'role'}>
                  Tipo
                </Column>
              </th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.users?.map(user => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button inline ghost square color="secondary" size="small">
                      <FiInfo size={20} />
                    </Button>
                    <Button inline ghost square color="secondary" size="small">
                      <FiUserPlus size={20} />
                    </Button>
                    <Button inline ghost square color="primary" size="small">
                      <FiAward size={20} />
                    </Button>
                    <Button inline ghost square color="warning" size="small">
                      <FiEdit size={20} />
                    </Button>
                    <Button inline ghost square color="danger" size="small">
                      <FiTrash2 size={20} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </PaginatedTable>
      </Card>
    </Container>
  )
}

export default withAuth(Users)
