import { useEffect, useState } from 'react'

import { useToast } from '../../providers/toast'
import api from '../../services/axios'

interface IModelListProps {
  eventId: string
}

interface IModel {
  id: string
  name: string
  pages: Array<{
    type: string
    image: string
    text: string
  }>
  created_at: string
}

export const ModelList: React.FC<IModelListProps> = ({ eventId }) => {
  const [models, setModels] = useState<IModel[]>([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    loadModels()
  }, [eventId])

  const loadModels = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/events/${eventId}/models`)
      setModels(response.data.data || [])
    } catch (error) {
      addToast({
        title: 'Erro ao carregar modelos',
        description: error?.response?.data?.message || 'Erro desconhecido',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (modelId: string) => {
    if (!confirm('Deseja realmente excluir este modelo?')) return

    try {
      await api.delete(`/events/${eventId}/models/${modelId}`)
      addToast({
        title: 'Modelo excluído com sucesso',
        type: 'success'
      })
      loadModels()
    } catch (error) {
      addToast({
        title: 'Erro ao excluir modelo',
        description: error?.response?.data?.message || 'Erro desconhecido',
        type: 'error'
      })
    }
  }

  if (loading) {
    return <div style={{ padding: '1rem' }}>Carregando modelos...</div>
  }

  if (models.length === 0) {
    return (
      <div
        style={{
          padding: '1rem',
          border: '1px solid #e2e8f0',
          borderRadius: '0.375rem',
          backgroundColor: '#f7fafc',
          marginTop: '1rem'
        }}
      >
        <p style={{ color: '#718096' }}>Nenhum modelo cadastrado ainda.</p>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        Modelos Cadastrados
      </h3>
      {models.map(model => (
        <div
          key={model.id}
          style={{
            padding: '1rem',
            marginBottom: '0.75rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.375rem',
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <p style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{model.name}</p>
            <p style={{ fontSize: '0.875rem', color: '#718096' }}>
              {model.pages.length} página(s)
            </p>
            <p style={{ fontSize: '0.75rem', color: '#a0aec0' }}>
              Criado em: {new Date(model.created_at).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#f56565',
              color: 'white',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
            onClick={() => handleDelete(model.id)}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#e53e3e')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#f56565')}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  )
}
