import { useEffect, useState } from 'react'
import { FiAlertCircle, FiCheck } from 'react-icons/fi'

import { ToastMessage } from '../../providers/toast'
import api from '../../services/axios'
import { Participants } from '../../styles/components/steps/eventActivity'
import { Column } from '../../styles/layouts/default'
import Table from '../table'

interface Props {
  addToast: (message: Omit<ToastMessage, 'id'>) => void
  event: any
}

const EventActivity: React.FC<Props> = ({ addToast, event }) => {
  const [list, setList] = useState([])
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await api.get(`events/${event.id}/activities`)
        if (response?.data?.data) setList(response.data.data)
      } catch (err) {
        addToast({
          title: 'Erro no carregamento',
          type: 'error',
          description: err
        })
      }
    }
    if (event) loadData()
  }, [addToast, event])
  return (
    <>
      <div>
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Carga Horária</th>
              <th>Início</th>
              <th>Fim</th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {list.map(act => (
              <tr key={act.id}>
                <td>{act.name}</td>
                <td>{act.activitieType}</td>
                <td>{act.workload} h</td>
                <td>{new Date(act.start_date).toLocaleDateString()}</td>
                <td>{new Date(act.end_date).toLocaleDateString()}</td>
                <td>
                  {act.participants === 0 && (
                    <Participants color="danger">
                      <FiAlertCircle size={25} />
                      <span>Nenhum participante</span>
                    </Participants>
                  )}
                  {act.participants > 0 && (
                    <Participants color="success">
                      <FiCheck size={25} />
                      <span>
                        {act.participants} participante
                        {act.participants > 1 && 's'}
                      </span>
                    </Participants>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default EventActivity
