import { Accordion, Button, Divider, Grid, Input } from '@components'
import { IEvent, IModelCertificate } from '@dtos'
import { useToast } from '@providers'
import { api } from '@services'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { getValidationErrors } from '@utils'
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

import { Roles, CertificateLayout } from '..'

const { Section, Footer } = Accordion

interface Props {
  eventId: string
  edit?: boolean
  // certificate: IModelCertificate
  // handleOnClose?: () => void
  // handleOnOpen?: (data: { isOpen: boolean; edit: boolean }) => void
}

export const AddCertificate: React.FC<Props> = ({
  eventId,
  edit
  // certificate,
  // handleOnClose,
  // handleOnOpen
}) => {
  // const [rolesFormRef, setRolesFormRef] = useState(null)
  // const [loading, setLoading] = useState(false)
  const formRef = useRef<FormHandles>(null)
  // const { addToast } = useToast()
  // const [cert, setCert] = useState(JSON.parse(JSON.stringify(certificate)))
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(!!edit)
  const [isVerse, setIsVerse] = useState(false)
  const { addToast } = useToast()

  const handleClose = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleSubmit = useCallback(
    async data => {
      try {
        console.log(data)

        setLoading(true)
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome do modelo é obrigatório')
        })
        formRef.current?.setErrors({})

        await schema.validate(data, {
          abortEarly: false
        })
        await api.post(`events/${eventId}/models`, data)
        addToast({
          type: 'success',
          title: 'Modelo adicionado',
          description: 'O modelo de certificado foi adicionado com sucesso.'
        })
        handleClose()
        formRef.current?.reset()
        setLoading(false)
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
    [addToast, eventId, handleClose]
  )

  // useEffect(() => {
  //   if (handleOnOpen) handleOnOpen({ isOpen, edit })
  // }, [edit, handleOnOpen, isOpen])

  // const submit = useCallback(() => {
  //   const data: IModelCertificate = {
  //     name: formRef?.current?.getData().name,
  //     pages: [],
  //     criterions: []
  //   }
  //   console.log(data)

  //   console.log(layoutFrontFormRef?.current?.getData())
  //   console.log(layoutVerseFormRef?.current?.getData())
  //   console.log(rolesFormRef?.current?.getData())
  //   console.log(formRef?.current?.getData())
  // }, [formRef, layoutFrontFormRef, layoutVerseFormRef, rolesFormRef])

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
          <Grid cols={2}>
            <Input
              type="text"
              name="name"
              label="Nome do Modelo"
              placeholder="Ex.: Modelo Padrão"
              icon={FiFileText}
            />
          </Grid>
        </Section>
        <Divider />
        <Section paddingTop="md" paddingBottom="sm">
          <Accordion title="Layout Frente" icon={FiImage}>
            <CertificateLayout
              type="frente"
              text={
                '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
              }
              // text={'cert.front.text'}
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
                // text={'cert.front.text'}
              />
            )}
          </Accordion>
        </Section>
        <Section paddingBottom="md">
          {/* <Roles
          id="add"
          onFormChange={form => {
            setRolesFormRef(form)
          }}
        /> */}
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
              <span>{edit ? 'Fechar' : 'Cancelar'}</span>
            </Button>
          </div>
          {!edit && (
            <div>
              <Button
                color={edit ? 'secondary' : 'primary'}
                size="default"
                type="submit"
                loading={loading}
              >
                <FiPlus size={20} />
                <span>Adicionar Modelo</span>
              </Button>
            </div>
          )}
        </Footer>
      </Form>
    </Accordion>
  )
}
