import Head from 'next/head'
import { useRouter } from 'next/router'
import { FiChevronLeft, FiSend, FiChevronRight, FiCheck } from 'react-icons/fi'

import Alert from '../../../../components/alert'
import Import from '../../../../components/import/import'
import { Column, Enum, Rows } from '../../../../components/import/importObjects'
import Table from '../../../../components/table'
import withAuth from '../../../../hocs/withAuth'
import usePaginatedRequest from '../../../../services/usePaginatedRequest'

const ImportEvent: React.FC = () => {
  const router = useRouter()
  const { id, type } = router?.query
  const event = {
    name: 'Evento 1'
  }
  let title: string
  let sendURL: string
  let columns: Column[]
  let examples: Rows[]
  let enums: Enum[]
  switch (type) {
    case 'activities':
      title = 'Atividades'
      sendURL = 'test/import'
      columns = [
        { name: 'Nome da Atividade', key: 'name', type: 'string' },
        { name: 'Carga Horária', key: 'workload', type: 'number' },
        { name: 'Tipo', color: 'primary', key: 'type', type: 'string' },
        { name: 'Data Inicial', key: 'start_date', type: 'date' },
        { name: 'Data Final', key: 'end_date', type: 'date' }
      ]
      examples = [
        {
          values: ['Atividade 1', '3', 'Palestra', '11/09/2021', '11/09/2021']
        },
        {
          values: ['Atividade 2', '5', 'Minicurso', '11/09/2021', '11/09/2021']
        },
        { values: ['Atividade 3', '4', 'Curso', '11/09/2021', '11/09/2021'] }
      ]
      enums = [
        {
          color: 'primary',
          name: 'Tipo',
          values: ['Minicurso', 'Curso', 'Palestra']
        }
      ]
      break
    case 'participants':
      title = 'Certificados'
      sendURL = 'test/import'
      columns = [
        { name: 'CPF', key: 'cpf', type: 'string' },
        { name: 'Atividade', color: 'info', key: 'activity', type: 'string' },
        { name: 'Carga Horária', key: 'workload', type: 'string' },
        { name: 'Data Inicial', key: 'start_date', type: 'date' },
        { name: 'Data Final', key: 'end_date', type: 'date' },
        { name: 'Função', color: 'primary', key: 'function', type: 'string' }
      ]
      examples = [
        {
          values: [
            '000.000.000-00',
            'Atividade 1',
            '3',
            '11/09/2021',
            '11/09/2021',
            'Palestrante'
          ]
        },
        {
          values: [
            '111.111.111-11',
            'Atividade 1',
            '3',
            '11/09/2021',
            '11/09/2021',
            'Ouvinte'
          ]
        },
        {
          values: [
            '222.222.222-22',
            'Atividade 2',
            '4',
            '11/09/2021',
            '11/09/2021',
            'Palestrante'
          ]
        }
      ]
      enums = [
        {
          color: 'info',
          name: 'Atividade',
          values: ['Atividade 1', 'Atividade 2', 'Atividade 3']
        },
        {
          color: 'primary',
          name: 'Função',
          values: ['Ouvinte', 'Palestrante']
        }
      ]
      break
    default:
      break
  }

  return (
    <Import
      sendURL={sendURL}
      columns={columns}
      examples={examples}
      enums={enums}
      backRoute={`/events/${type}/${id}`}
      title={`Importar ${title} em ${event?.name}`}
      windowTitle={`Importar ${title} | ${event?.name}`}
    ></Import>
  )
}

export default withAuth(ImportEvent)
