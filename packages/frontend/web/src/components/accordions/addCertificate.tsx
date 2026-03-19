import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef, useState } from 'react'
import {
  FiCheckSquare,
  FiEdit,
  FiFileText,
  FiImage,
  FiPlus,
  FiPlusCircle,
  FiSquare,
  FiX
} from 'react-icons/fi'
import * as Yup from 'yup'

import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import { Footer, Section } from '../../styles/components/accordion'
import { Divider } from '../../styles/components/divider'
import { Row } from '../../styles/components/grid'
import { getValidationErrors } from '../../utils/getValidationErrors'
import { Accordion } from '../accordion'
import { Button } from '../button'
import { Input } from '../input'
import CertificateLayout from './certificateLayout'

interface Props {
  eventId: string
  edit?: boolean
  onSuccess?: () => void
}

const AddCertificate: React.FC<Props> = ({
  eventId,
  edit,
  onSuccess
}) => {
  const formRef = useRef<FormHandles>(null)
  const layoutFrontFormRef = useRef<FormHandles>(null)
  const layoutVerseFormRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(!!edit)
  const [isVerse, setIsVerse] = useState(false)
  const [previewFront, setPreviewFront] = useState('')
  const [previewVerse, setPreviewVerse] = useState('')
  const { addToast } = useToast()

  const handleClose = useCallback(() => {
    setIsOpen(false)
    formRef.current?.reset()
    setPreviewFront('')
    setPreviewVerse('')
    setIsVerse(false)
    if (onSuccess) {
      onSuccess()
    }
  }, [onSuccess])

  const handleSubmit = useCallback(
    async data => {
      try {
        console.log('📝 [DEBUG] Form data:', data)

        setLoading(true)
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do modelo é obrigatório')
        })
        formRef.current?.setErrors({})

        await schema.validate(data, {
          abortEarly: false
        })

        // Coletar dados dos layouts
        const frontLayoutData = layoutFrontFormRef.current?.getData() || {}
        const verseLayoutData = isVerse ? layoutVerseFormRef.current?.getData() || {} : null

        console.log('🎨 [DEBUG] Front layout data:', frontLayoutData)
        console.log('🔄 [DEBUG] Verse layout data:', verseLayoutData)
        console.log('🖼️ [DEBUG] Preview front:', previewFront)
        console.log('🖼️ [DEBUG] Preview verse:', previewVerse)

        // Montar objeto pages conforme esperado pelo backend
        const pages = [
          {
            type: 'frente',
            text: frontLayoutData.html || '<p>Texto padrão</p>',
            image: previewFront || '',
            layout: {
              padding: {
                top: String(frontLayoutData.paddingTop || 15),
                right: frontLayoutData.paddingRight || 15,
                bottom: frontLayoutData.paddingBottom || 15,
                left: String(frontLayoutData.paddingLeft || 15)
              },
              vertical: {
                name: frontLayoutData.validateVerticalPosition || 'bottom',
                value: Number(frontLayoutData.validateVerticalPadding || 0)
              },
              horizontal: {
                name: frontLayoutData.validateHorizontalPosition || 'right',
                value: Number(frontLayoutData.validateHorizontalPadding || 0)
              }
            }
          }
        ]

        // Adicionar verso se existir
        if (isVerse && verseLayoutData) {
          pages.push({
            type: 'verso',
            text: verseLayoutData.html || '<p>Texto padrão</p>',
            image: previewVerse || '',
            layout: {
              padding: {
                top: String(verseLayoutData.paddingTop || 15),
                right: verseLayoutData.paddingRight || 15,
                bottom: verseLayoutData.paddingBottom || 15,
                left: String(verseLayoutData.paddingLeft || 15)
              },
              vertical: {
                name: verseLayoutData.validateVerticalPosition || 'bottom',
                value: Number(verseLayoutData.validateVerticalPadding || 0)
              },
              horizontal: {
                name: verseLayoutData.validateHorizontalPosition || 'right',
                value: Number(verseLayoutData.validateHorizontalPadding || 0)
              }
            }
          })
        }

        const payload = {
          name: data.name,
          pages,
          criterions: [] // Por enquanto vazio, pode ser implementado depois
        }

        console.log('🚀 [DEBUG] Payload to send:', JSON.stringify(payload, null, 2))

        await api.post(`events/${eventId}/models`, payload)
        addToast({
          type: 'success',
          title: 'Modelo adicionado',
          description: 'O modelo de certificado foi adicionado com sucesso.'
        })
        setLoading(false)
        handleClose()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          setLoading(false)
          return
        }
        setLoading(false)
        addToast({
          type: 'error',
          title: 'Erro ao adicionar o modelo',
          description: err
        })
      }
    },
    [addToast, eventId, handleClose, isVerse, previewFront, previewVerse]
  )

  return (
    <Accordion
      isOpen={isOpen}
      onToggle={state => setIsOpen(state)}
      icon={edit ? FiEdit : FiPlusCircle}
      title={
        edit
          ? 'Editar Modelo de Certificado'
          : 'Adicionar Modelo de Certificado'
      }
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Section paddingTop="sm" paddingBottom="md">
          <Row cols={2}>
            <div>
              <Input
                type="text"
                name="name"
                label="Nome do Modelo"
                placeholder="Ex.: Modelo Padrão"
                icon={FiFileText}
              />
            </div>
          </Row>
        </Section>
        <Divider />
        <Section paddingTop="md" paddingBottom="sm">
          <Accordion title="Layout Frente" icon={FiImage}>
            <CertificateLayout
              type="frente"
              text={
                '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
              }
              formRef={layoutFrontFormRef}
              preview={previewFront}
              setPreview={setPreviewFront}
            />
          </Accordion>
        </Section>

        <Section paddingBottom="sm">
          <Accordion icon={FiImage} title="Layout Verso">
            <Section paddingTop="sm" paddingBottom="md">
              <Button
                size="small"
                onClick={() => setIsVerse(state => !state)}
                outline={!isVerse}
                inline
                type="button"
              >
                {isVerse ? <FiCheckSquare size={20} /> : <FiSquare size={20} />}
                <span>Possui verso?</span>
              </Button>
            </Section>

            {isVerse && (
              <CertificateLayout
                type="verso"
                text={''}
                formRef={layoutVerseFormRef}
                preview={previewVerse}
                setPreview={setPreviewVerse}
              />
            )}
          </Accordion>
        </Section>
        <Section paddingBottom="md">
          {/* Roles commented out for now */}
        </Section>
        <Footer>
          <div>
            <Button
              outline
              color="secondary"
              size="default"
              type="reset"
              disabled={loading}
              onClick={handleClose}
            >
              <FiX size={20} />
              <span>Cancelar</span>
            </Button>
          </div>
          <div>
            <Button
              color="primary"
              size="default"
              type="submit"
              loading={loading}
            >
              <FiPlus size={20} />
              <span>{edit ? 'Atualizar Modelo' : 'Adicionar Modelo'}</span>
            </Button>
          </div>
        </Footer>
      </Form>
    </Accordion>
  )
}

export default AddCertificate
