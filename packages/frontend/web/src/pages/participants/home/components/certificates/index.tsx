import {
  Button,
  Card,
  Column,
  Input,
  Loading,
  PaginatedTable,
  TableRow
} from '@components'
import { usePaginatedRequest } from '@services'
import { Form } from '@unform/web'
import { useCallback, useState } from 'react'
import {
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiSearch
} from 'react-icons/fi'

interface Props {
  token: string
  loading: boolean
}

export const Certificates: React.FC<Props> = ({ token, loading }) => {
  const [filtersCertificate, setFiltersCertificate] = useState(null)
  const [columnCertificate, setColumnCertificate] = useState('name')
  const [orderCertificate, setOrderCertificate] = useState<'' | 'ASC' | 'DESC'>(
    'ASC'
  )

  const requestCertificate = usePaginatedRequest<any>({
    url: 'me/certificates',
    headers: { authorization: `Bearer ${token}` },
    params:
      filtersCertificate && orderCertificate !== ''
        ? Object.assign(filtersCertificate, {
            sort_by: columnCertificate,
            order_by: orderCertificate
          })
        : orderCertificate !== ''
        ? { sort_by: columnCertificate, order_by: orderCertificate }
        : filtersCertificate
  })

  const handleFilterCertificate = useCallback(
    data => {
      !data.search && delete data.search
      requestCertificate.resetPage()
      setFiltersCertificate(data)
    },
    [requestCertificate]
  )

  const handleOrderCertificate = useCallback(
    columnSelected => {
      if (columnCertificate !== columnSelected) {
        setColumnCertificate(columnSelected)
        setOrderCertificate('ASC')
      } else {
        setOrderCertificate(value =>
          value === '' ? 'ASC' : value === 'ASC' ? 'DESC' : ''
        )
      }
    },
    [columnCertificate]
  )
  return (
    <div style={{ marginTop: '15px' }}>
      <Card>
        <header>
          <h2>
            <FiFileText size={30} />
            <span>Seus Certificados</span>
          </h2>
          {!loading && (
            <Form onSubmit={handleFilterCertificate}>
              <Input
                name="search"
                placeholder="Buscar atividade"
                icon={FiSearch}
              />
            </Form>
          )}
        </header>
        <Loading active={loading} />
        {!loading && (
          <PaginatedTable request={requestCertificate}>
            <thead>
              <tr>
                <th onClick={() => handleOrderCertificate('type')}>
                  <Column
                    order={orderCertificate}
                    selected={columnCertificate === 'type'}
                  >
                    Tipo
                  </Column>
                </th>
                <th onClick={() => handleOrderCertificate('name')}>
                  <Column
                    order={orderCertificate}
                    selected={columnCertificate === 'name'}
                  >
                    Nome
                  </Column>
                </th>
                <th onClick={() => handleOrderCertificate('function')}>
                  <Column
                    order={orderCertificate}
                    selected={columnCertificate === 'function'}
                  >
                    Função
                  </Column>
                </th>
                <th onClick={() => handleOrderCertificate('workload')}>
                  <Column
                    order={orderCertificate}
                    selected={columnCertificate === 'workload'}
                  >
                    Carga Horária
                  </Column>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requestCertificate.data?.data?.map(certificate => (
                <tr key={certificate.id}>
                  <td>{certificate?.activitieType}</td>
                  <td>{certificate?.name}</td>
                  <td>{certificate?.function}</td>
                  <td>{certificate?.workload}</td>
                  <td>
                    <TableRow>
                      <Button
                        ghost
                        inline
                        square
                        color="secondary"
                        size="small"
                        onClick={() => {
                          console.log()
                        }}
                      >
                        <FiExternalLink size={20} />
                        <span>Visualizar</span>
                      </Button>
                      <span style={{ marginLeft: '10px' }}>
                        <Button
                          inline
                          square
                          color="secondary"
                          size="small"
                          onClick={() => {
                            console.log()
                          }}
                        >
                          <FiDownload size={20} />
                          <span>Baixar</span>
                        </Button>
                      </span>
                    </TableRow>
                  </td>
                </tr>
              ))}
            </tbody>
          </PaginatedTable>
        )}
      </Card>
    </div>
  )
}
