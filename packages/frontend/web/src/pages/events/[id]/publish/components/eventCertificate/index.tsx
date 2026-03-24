import {
  Button,
  FooterModal,
  Grid,
  HeaderModal,
  MainModal,
  Modal,
  ScrollWrapper,
  Table
} from '@components'
import { IModelCertificate } from '@dtos'
import { Certificate } from '@pages/events/[id]/[tab]/components'
import { initialTextConfig } from '@pages/events/[id]/[tab]/components/certificateLayout'
import { useCallback, useEffect, useState } from 'react'
import { FiAward, FiCheck, FiCheckSquare, FiSquare, FiX } from 'react-icons/fi'
import { api } from '@services'
import Image from 'next/image'

import { CardContainer, Container, Header } from './styles'

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

interface IProcessedCertificate {
  id: string
  name: string
  front?: {
    img: string
    text: string
  }
  verse?: {
    img: string
    text: string
  }
  pages: IApiModel['pages']
}

interface Props {
  event?: any
}

const STORAGE_URL = process.env.baseURL || 'http://localhost:4001'

const apiModelToCertificate = (model: IApiModel): IProcessedCertificate => {
  const frontPage = model.pages.find(p => p.type === 'frente')
  const versePage = model.pages.find(p => p.type === 'verso')

  return {
    id: model.id,
    name: model.name,
    pages: model.pages,
    front: frontPage
      ? { img: frontPage.image ? `${STORAGE_URL}/upload/${frontPage.image}` : '', text: frontPage.text }
      : { img: '', text: '' },
    verse: versePage
      ? { img: versePage.image ? `${STORAGE_URL}/upload/${versePage.image}` : '', text: versePage.text }
      : undefined
  }
}

export const EventCertificate: React.FC<Props> = ({ event }) => {
  const [openModal, setOpenModal] = useState(false)
  const [certificateList, setCertificateList] = useState<IProcessedCertificate[]>([])
  const [loadingModels, setLoadingModels] = useState(true)

  useEffect(() => {
    const loadModels = async () => {
      if (!event?.id) return
      try {
        setLoadingModels(true)
        const response = await api.get(`events/${event.id}/models`)
        const models: IApiModel[] = response?.data?.data || []
        const processedModels = models.map(apiModelToCertificate)
        setCertificateList(processedModels)
      } catch (err) {
        console.error('Erro ao carregar modelos:', err)
      } finally {
        setLoadingModels(false)
      }
    }
    if (event) loadModels()
  }, [event])

  const handleCloseModal = useCallback(() => {
    setOpenModal(false)
  }, [])

  const [certificateSelected, setCertificateSelected] = useState<IProcessedCertificate | null>(null)
  return (
    <Container>
      <Grid cols={3}>
        {certificateList.map((certificate) => (
          <CardContainer key={certificate.id}>
            <Header>
              <div className="icon">
                <FiAward size={20} />
              </div>
              <h2>{certificate.name}</h2>
            </Header>
            <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', overflow: 'hidden' }}>
              {certificate.front?.img ? (
                <Image
                  src={certificate.front.img}
                  alt={certificate.name}
                  width={300}
                  height={200}
                  unoptimized
                  style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '200px' }}
                />
              ) : (
                <p style={{ color: '#999' }}>Sem imagem</p>
              )}
            </main>
            <footer style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
              <Button
                color="secondary"
                size="small"
                type="button"
                onClick={() => {
                  setCertificateSelected(certificate)
                  setOpenModal(true)
                }}
                inline
              >
                <FiCheck size={20} />
                <span>Visualizar</span>
              </Button>
            </footer>
          </CardContainer>
        ))}
      </Grid>

      <Modal size="xl" open={openModal} onClose={handleCloseModal}>
        <HeaderModal>
          <h2>
            <FiCheckSquare size={20} />
            Modelo: {certificateSelected?.name}
          </h2>
        </HeaderModal>
        <ScrollWrapper>
          <MainModal>
            {certificateSelected?.front?.img && (
              <Certificate
                preview="true"
                image={certificateSelected.front.img}
                validateHorizontalPosition={
                  initialTextConfig.validateHorizontalPosition as
                    | 'center'
                    | 'right'
                    | 'left'
                }
                validateVerticalPosition={
                  initialTextConfig.validateVerticalPosition as 'bottom' | 'top'
                }
                validateHorizontalPadding={
                  initialTextConfig.validateHorizontalPadding
                }
                validateVerticalPadding={
                  initialTextConfig.validateVerticalPadding
                }
                padding={initialTextConfig.padding}
                position={initialTextConfig.position as 'center' | 'custom'}
                html={certificateSelected.front.text}
                paddingBottom={initialTextConfig.paddingBottom}
                paddingTop={initialTextConfig.paddingTop}
                paddingLeft={initialTextConfig.paddingLeft}
                paddingRight={initialTextConfig.paddingRight}
              />
            )}
          </MainModal>
        </ScrollWrapper>

        <FooterModal inline>
          <Button
            inline
            onClick={handleCloseModal}
            color="secondary"
            type="button"
            outline
          >
            <FiX size={20} />
            <span>Fechar</span>
          </Button>
        </FooterModal>
      </Modal>
    </Container>
  )
}
