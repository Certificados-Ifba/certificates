import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef, useState } from 'react'
import {
  FiCheckSquare,
  FiFileText,
  FiImage,
  FiPlus,
  FiPlusCircle,
  FiSquare
} from 'react-icons/fi'
import * as Yup from 'yup'

import IEvent from '../../dtos/IEvent'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import { Section, Footer } from '../../styles/components/accordion'
import { Divider } from '../../styles/components/divider'
import { Row } from '../../styles/components/grid'
import getValidationErrors from '../../utils/getValidationErrors'
import Accordion from '../accordion'
import Button from '../button'
import Input from '../input'
import CertificateLayout from './certificateLayout'

const initialTextPadding = {
  padding: 15,
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft: 15,
  paddingRight: 15
}
const initialValidatePadding = {
  validateVerticalPadding: 0,
  validateHorizontalPadding: 0
}

const initialTextPosition = 'center'
const initialValidatePosition = {
  validateVerticalPosition: 'bottom',
  validateHorizontalPosition: 'right'
}

const initialValue =
  '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'

const initialTextConfig = {
  html: initialValue,
  position: initialTextPosition,
  ...initialTextPadding,
  ...initialValidatePadding,
  ...initialValidatePosition
}

interface Props {
  event: IEvent
}

const AddCertificate: React.FC<Props> = ({ event }) => {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const [hasVerse, setHasVerse] = useState(false)

  const handleSubmit = useCallback(
    data => {
      const schema = Yup.object().shape({})
      schema
        .validate(data, {
          abortEarly: false
        })
        .then(async data => {
          const response = await api.post(`event/${event.id}/activity`, data)

          if (response.data) {
            addToast({
              type: 'success',
              title: `Modelo adicionado`,
              description: `O modelo de certificado foi adicionado com sucesso.`
            })
          }
        })
        .catch(err => {
          if (err instanceof Yup.ValidationError) {
            const errors = getValidationErrors(err)
            formRef.current?.setErrors(errors)
            setLoading(false)
            return
          }
          setLoading(false)

          addToast({
            type: 'error',
            title: `Erro ao adicionar as participações`,
            description: err
          })
        })
    },
    [event, addToast]
  )

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Accordion icon={FiPlusCircle} title="Adicionar Modelo de Certificado">
        <Section paddingTop="sm" paddingBottom="md">
          <Row cols={2}>
            <div>
              <Input
                type="text"
                formRef={formRef}
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
          <Accordion icon={FiImage} title="Layout Frente">
            <CertificateLayout
              initialTextConfig={initialTextConfig}
              initialTextPadding={initialTextPadding}
            />
          </Accordion>
        </Section>

        <Section paddingBottom="sm">
          <Accordion icon={FiImage} title="Layout Verso">
            <Section paddingTop="sm" paddingBottom="md">
              <Button
                size="default"
                onClick={() => {
                  setHasVerse(!hasVerse)
                }}
                outline={!hasVerse}
                inline
                type="button"
              >
                {hasVerse ? (
                  <FiCheckSquare size={20} />
                ) : (
                  <FiSquare size={20} />
                )}
                <span>Possui verso?</span>
              </Button>
            </Section>

            {hasVerse && (
              <CertificateLayout
                initialTextConfig={initialTextConfig}
                initialTextPadding={initialTextPadding}
              />
            )}
          </Accordion>
        </Section>
        <Section paddingBottom="md">
          <Accordion icon={FiCheckSquare} title="Critérios" />
        </Section>

        <Footer>
          <div>
            <Button
              size="default"
              onClick={() => {
                console.log()
              }}
            >
              <FiPlus size={20} />
              <span>Adicionar Modelo</span>
            </Button>
          </div>
        </Footer>
      </Accordion>
    </Form>
  )
}

export default AddCertificate
