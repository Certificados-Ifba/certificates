import AddCertificate from '@components/accordions/addCertificate'
import CertificatePreview from '@components/accordions/certificatePreview'
import { Button } from '@components/button'
import { Grid } from '@components/grid'
import { ICertificate, IEvent } from '@dtos'
import { useToast } from '@providers'
import { api } from '@services'
import { useCallback, useEffect, useState } from 'react'
import { FiCopy, FiPlus } from 'react-icons/fi'

import { Container } from './styles'

interface Props {
  event: IEvent
}

interface IApiModel {
  id: string
  name: string
  pages: Array<{
    type: string
    image: string
    text: string
    layout: any
  }>
  created_at: string
}

const STORAGE_URL = process.env.baseURL || 'http://localhost:4001'

const LAYOUT_PADRAO = {
  padding: { top: '15', right: 15, bottom: 15, left: '15' },
  vertical: { name: 'bottom', value: 0 },
  horizontal: { name: 'right', value: 0 }
}

const MODELOS_PADRAO: ICertificate[] = [
  {
    id: 'template-1',
    name: 'Modelo Padrão',
    front: {
      img: '/teste1.png',
      text: '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
    },
    roles: []
  },
  {
    id: 'template-2',
    name: 'Modelo para Professores',
    front: {
      img: '/teste.jpeg',
      text: '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
    },
    verse: {
      img: '/teste.jpeg',
      text: '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
    },
    roles: [
      { number: 1, activity: { name: 'Mesa Redonda', id: '1' }, function: { name: 'Palestrante', id: '1' } },
      { number: 2, activity: { name: 'Mesa Redonda', id: '1' }, function: { name: 'Professor', id: '1' } }
    ]
  }
]

function apiModelToCertificate(model: IApiModel): ICertificate {
  const frontPage = model.pages.find(p => p.type === 'frente')
  const versePage = model.pages.find(p => p.type === 'verso')

  return {
    id: model.id,
    name: model.name,
    front: frontPage
      ? { img: frontPage.image ? `${STORAGE_URL}/upload/${frontPage.image}` : '', text: frontPage.text }
      : { img: '', text: '' },
    verse: versePage
      ? { img: versePage.image ? `${STORAGE_URL}/upload/${versePage.image}` : '', text: versePage.text }
      : undefined,
    roles: []
  }
}

export const EventCertificate: React.FC<Props> = ({ event }) => {
  const [models, setModels] = useState<IApiModel[]>([])
  const [loadingModels, setLoadingModels] = useState(true)
  const [loadingTemplate, setLoadingTemplate] = useState<string | null>(null)
  const [showAddCertificateForm, setShowAddCertificateForm] = useState(false)
  const { addToast } = useToast()

  const loadModels = useCallback(async () => {
    if (!event?.id) return
    try {
      setLoadingModels(true)
      const response = await api.get(`events/${event.id}/models`)
      setModels(response.data.data || [])
    } catch (err) {
      addToast({ type: 'error', title: 'Erro ao carregar modelos', description: err })
    } finally {
      setLoadingModels(false)
    }
  }, [event?.id, addToast])

  useEffect(() => {
    loadModels()
  }, [loadModels])

  const handleDelete = useCallback(async (modelId: string) => {
    if (!confirm('Deseja realmente excluir este modelo?')) return
    try {
      await api.delete(`events/${event?.id}/models/${modelId}`)
      addToast({ type: 'success', title: 'Modelo excluído com sucesso' })
      loadModels()
    } catch (err) {
      addToast({ type: 'error', title: 'Erro ao excluir modelo', description: err })
    }
  }, [event?.id, addToast, loadModels])

  const handleUseTemplate = useCallback(async (certificate: ICertificate) => {
    try {
      setLoadingTemplate(certificate.id)
      const pages: any[] = [
        { type: 'frente', text: certificate.front?.text || '', image: '', layout: LAYOUT_PADRAO }
      ]
      if (certificate.verse?.text) {
        pages.push({ type: 'verso', text: certificate.verse.text, image: '', layout: LAYOUT_PADRAO })
      }
      await api.post(`events/${event?.id}/models`, { name: certificate.name, pages, criterions: [] })
      addToast({
        type: 'success',
        title: 'Modelo adicionado',
        description: `"${certificate.name}" adicionado ao evento. Edite para inserir as imagens.`
      })
      loadModels()
    } catch (err) {
      addToast({ type: 'error', title: 'Erro ao usar o modelo', description: err })
    } finally {
      setLoadingTemplate(null)
    }
  }, [event?.id, addToast, loadModels])

  const isEditable = event?.status !== 'PUBLISHED'

  const handleAddCertificateSuccess = useCallback(() => {
    setShowAddCertificateForm(false)
    loadModels()
  }, [loadModels])

  return (
    <Container>
      {/* Formulário de adição de novo modelo */}
      {isEditable && showAddCertificateForm && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#555', marginBottom: '1rem' }}>
            Adicionar novo modelo
          </h3>
          <AddCertificate eventId={event?.id} onSuccess={handleAddCertificateSuccess} />
        </div>
      )}

      {/* Modelos cadastrados no evento — não aparecem quando o formulário está aberto */}
      {!showAddCertificateForm && (
        <>
          {loadingModels ? (
            <div style={{ padding: '1rem', color: '#718096' }}>Carregando modelos...</div>
          ) : models.length > 0 ? (
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#555', margin: 0 }}>
                  Modelos do Evento
                </h3>
                {isEditable && (
                  <Button
                    color="primary"
                    onClick={() => setShowAddCertificateForm(true)}
                    type="button"
                    size="small"
                  >
                    <FiPlus size={16} />
                    <span>Adicionar novo modelo</span>
                  </Button>
                )}
              </div>
              <Grid firstWidth="1460px" cols={2}>
                {models.map(model => (
                  <div key={model.id}>
                    <CertificatePreview
                      certificate={apiModelToCertificate(model)}
                      handleEdit={() => {/* TODO: edição */ }}
                      handleDelete={() => handleDelete(model.id)}
                    />
                  </div>
                ))}
              </Grid>
            </div>
          ) : isEditable ? (
            /* Templates padrão — só aparecem quando não há modelos e o evento ainda não foi publicado */
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div />

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginBottom: '1rem'
                    }}
                  >
                    <Button
                      color="primary"
                      onClick={() => setShowAddCertificateForm(true)}
                      type="button"
                      size="small"
                      style={{ width: 'auto' }}
                    >
                      <FiPlus size={14} />
                      <span>Adicionar novo modelo</span>
                    </Button>
                  </div>

              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#555', marginBottom: '0.5rem' }}>
                Modelos Padrão
              </h3>
              <small style={{ color: '#888' }}>
                Use um dos modelos padrão como ponto de partida ou crie um novo.
              </small>
              <Grid firstWidth="1460px" cols={2} marginBottom="md">
                {MODELOS_PADRAO.map(certificate => (
                  <div key={certificate.id}>
                    <CertificatePreview
                      certificate={certificate}
                      handleEdit={() => {}}
                      handleDelete={() => {}}
                    />
                    <div style={{ marginTop: '0.5rem' }}>
                      <Button
                        color="primary"
                        size="small"
                        inline
                        loading={loadingTemplate === certificate.id}
                        disabled={!!loadingTemplate}
                        onClick={() => handleUseTemplate(certificate)}
                        type="button"
                      >
                        <FiCopy size={16} />
                        <span>Usar este modelo</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </Grid>
            </div>
          ) : (
            <div style={{ padding: '1rem', marginTop: '1rem', color: '#718096', border: '1px solid #e2e8f0', borderRadius: '0.375rem' }}>
              Nenhum modelo de certificado cadastrado para este evento.
            </div>
          )}
        </>
      )}
    </Container>
  )
}
