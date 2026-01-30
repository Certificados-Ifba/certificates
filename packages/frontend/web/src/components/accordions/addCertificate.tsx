import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useEffect, useRef, useState } from 'react'
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

import ICertificate, { IModelCertificate } from '../../dtos/ICertificate'
import { IEvent } from '../../dtos/IEvent'
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
import Roles from './roles'

interface Props {
  event: IEvent
  edit?: boolean
  certificate: ICertificate
  handleOnClose?: () => void
  handleOnOpen?: (data: { isOpen: boolean; edit: boolean }) => void
}

const AddCertificate: React.FC<Props> = ({
  event,
  edit,
  certificate,
  handleOnClose,
  handleOnOpen
}) => {
  const [layoutFrontFormRef, setLayoutFrontFormRef] = useState(null)
  const [layoutVerseFormRef, setLayoutVerseFormRef] = useState(null)
  const [rolesFormRef, setRolesFormRef] = useState(null)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const [cert, setCert] = useState(JSON.parse(JSON.stringify(certificate)))
  const [isOpen, setIsOpen] = useState(edit)

  const handleSubmit = useCallback(
    data => {
      const schema = Yup.object().shape({})
      schema
        .validate(data, {
          abortEarly: false
        })
        .then(async data => {
          const response = await api.post(`event/${event?.id}/activity`, data)

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

  useEffect(() => {
    if (handleOnOpen) handleOnOpen({ isOpen, edit })
  }, [edit, handleOnOpen, isOpen])

  const submit = useCallback(() => {
    const data: IModelCertificate = {
      name: formRef?.current?.getData().name,
      pages: [],
      criterions: []
    }
    console.log(data)

    console.log(layoutFrontFormRef?.current?.getData())
    console.log(layoutVerseFormRef?.current?.getData())
    console.log(rolesFormRef?.current?.getData())
    console.log(formRef?.current?.getData())
  }, [formRef, layoutFrontFormRef, layoutVerseFormRef, rolesFormRef])

  return (
    <Accordion
      isOpen={isOpen}
      onToggle={(state) => setIsOpen(state)}
      icon={edit ? FiEdit : FiPlusCircle}
      title={
        edit
          ? 'Editar Modelo de Certificado'
          : 'Adicionar Modelo de Certificado'
      }
    >
      <Section paddingTop="sm" paddingBottom="md">
        <Row cols={2}>
          <div>
            <Form
              initialData={{ name: cert?.name }}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <Input
                type="text"
                name="name"
                label="Nome do Modelo"
                placeholder="Ex.: Modelo Padrão"
                icon={FiFileText}
              />
            </Form>
          </div>
        </Row>
      </Section>
      <Divider />
      <Section paddingTop="md" paddingBottom="sm">
        <Accordion icon={FiImage} title="Layout Frente">
          <CertificateLayout
            onFormChange={form => {
              setLayoutFrontFormRef(form)
            }}
            text={cert.front.text}
          />
        </Accordion>
      </Section>

      <Section paddingBottom="sm">
        <Accordion icon={FiImage} title="Layout Verso">
          <Section paddingTop="sm" paddingBottom="md">
            <Button
              size="small"
              onClick={() => {
                setCert({
                  ...cert,
                  verse: cert.verse ? null : { img: '', text: cert.front.text }
                })
              }}
              outline={!cert.verse}
              inline
              type="button"
            >
              {cert.verse ? (
                <FiCheckSquare size={20} />
              ) : (
                <FiSquare size={20} />
              )}
              <span>Possui verso?</span>
            </Button>
          </Section>

          {cert.verse && (
            <CertificateLayout
              onFormChange={form => {
                setLayoutVerseFormRef(form)
              }}
              verse={true}
              text={cert.verse.text}
            />
          )}
        </Accordion>
      </Section>
      <Section paddingBottom="md">
        <Roles
          id="add"
          onFormChange={form => {
            setRolesFormRef(form)
          }}
        />
      </Section>
      <Footer>
        <div>
          <Button
            outline
            color="secondary"
            size="default"
            type="button"
            onClick={() => {
              setIsOpen(false)
              if (handleOnClose) handleOnClose()
            }}
          >
            <FiX size={20} />
            <span>{edit ? 'Fechar' : 'Cancelar'}</span>
          </Button>
        </div>
        {!edit && (
          <div className="first">
            <Button
              color={edit ? 'secondary' : 'primary'}
              size="default"
              type="button"
              onClick={submit}
            >
              <FiPlus size={20} />
              <span>Adicionar Modelo</span>
            </Button>
          </div>
        )}
      </Footer>
    </Accordion>
  )
}

export default AddCertificate
