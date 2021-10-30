import { useRouter } from 'next/router'
import { useState, useCallback } from 'react'

import Import from '../../../../components/import/import'
import {
  Column,
  Enum,
  ExtraBody,
  Rows,
  ValueEnum
} from '../../../../components/import/importObjects'
import Spinner from '../../../../components/spinner'
import withAuth from '../../../../hocs/withAuth'
import api from '../../../../services/axios'
import { getActivitySchema } from '../../../../utils/schemas'

const getActivityTypes = async () => {
  const resp = await api.get(`activity_types`)
  const list = resp?.data?.data ? resp.data.data : []
  const enums: ValueEnum[] = []
  list.forEach(act => {
    enums.push({ name: act.name, value: act.id })
  })
  return enums
}

const getFunctionTypes = async () => {
  const resp = await api.get(`functions`)
  const list = resp?.data?.data ? resp.data.data : []
  const enums: ValueEnum[] = []
  list.forEach(act => {
    enums.push({ name: act.name, value: act.id })
  })
  return enums
}

const getActivity = async (id: string) => {
  const resp = await api.get(`events/${id}/activities`)
  const list = resp?.data?.data ? resp.data.data : []
  const enums: ValueEnum[] = []
  list.forEach(act => {
    enums.push({ name: act.name, value: act.id })
  })
  return enums
}

const getEvent = async (id: string) => {
  const response = await api.get(`events/${id}`)
  return response?.data?.data
}

const getActivityConfig = async (id: string) => {
  const activityTypeEnum = await getActivityTypes()
  const event = await getEvent(id)
  return { activityTypeEnum, event }
}

const getCertificateConfig = async (id: string) => {
  const activityEnum = await getActivity(id)
  const functionTypeEnum = await getFunctionTypes()
  const event = await getEvent(id)
  return { activityEnum, event, functionTypeEnum }
}

const ImportEvent: React.FC = () => {
  const router = useRouter()
  const { id, type } = router?.query
  const [event, setEvent] = useState(null)
  const [createSchema, setCreateSchema] = useState<(item: any) => any>(null)

  let title: string
  let sendURL: string
  let columns: Column[]
  let examples: Rows[]
  let extraBody: ExtraBody[]

  const [enums, setEnums] = useState<Enum[]>(null)
  const [loading, setLoading] = useState(true)

  switch (type) {
    case 'activities':
      title = 'Atividades'
      sendURL = `events/${id}/activities`

      columns = [
        {
          name: 'Nome da Atividade',
          key: 'name',
          type: 'string'
        },
        {
          name: 'Carga Horária',
          key: 'workload',
          type: 'number'
        },
        {
          name: 'Tipo',
          color: 'primary',
          key: 'type',
          type: 'string'
        },
        {
          name: 'Data Inicial',
          key: 'start_date',
          type: 'date'
        },
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
      if (loading)
        getActivityConfig(id + '').then(resp => {
          setEvent(resp.event)
          setCreateSchema(() => (item: any) => {
            console.log(item)

            return item
              ? getActivitySchema(
                  item.start_date,
                  resp.event.start_date,
                  resp.event.end_date
                )
              : null
          })
          setEnums([
            {
              color: 'primary',
              name: 'Tipo',
              values: resp.activityTypeEnum,
              key: 'type'
            }
          ])
          setLoading(false)
        })
      break
    case 'certificates':
      title = 'Certificados'
      sendURL = `events/${id}/certificates`
      columns = [
        { name: 'CPF', key: 'cpf', type: 'string' },
        {
          name: 'Atividade',
          color: 'primary',
          key: 'activity',
          type: 'string'
        },
        { name: 'Carga Horária', key: 'workload', type: 'string' },
        { name: 'Data Inicial', key: 'start_date', type: 'date' },
        { name: 'Data Final', key: 'end_date', type: 'date' },
        { name: 'Função', color: 'info', key: 'function', type: 'string' }
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
      if (loading)
        getCertificateConfig(id + '').then(resp => {
          setEvent(resp.event)
          setEnums([
            {
              color: 'primary',
              name: 'Atividade',
              values: resp.activityEnum,
              key: 'activity'
            },
            {
              color: 'info',
              name: 'Função',
              values: resp.functionTypeEnum,
              key: 'function'
            }
          ])
          setLoading(false)
        })
      break
  }

  return (
    <Import
      createSchema={createSchema}
      loading={loading}
      extraBody={extraBody}
      sendURL={sendURL}
      columns={columns}
      examples={examples}
      enums={enums || []}
      backRoute={`/events/${id}/${type}`}
      title={loading ? 'Carregando...' : `Importar ${title} em ${event?.name}`}
      windowTitle={
        loading ? 'Carregando...' : `Importar ${title} | ${event?.name}`
      }
    ></Import>
  )
}

export default withAuth(ImportEvent)
