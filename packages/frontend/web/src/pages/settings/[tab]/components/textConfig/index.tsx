import { Button, RichTextEditor, VariableModal } from '@components'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef, useState } from 'react'
import { FiCheck } from 'react-icons/fi'

import { Container } from './styles'

export const TextConfig: React.FC = () => {
  const [richTextState, setRichTextState] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const [html, setHtml] = useState(
    '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
  )
  const handleSubmit = useCallback(() => {
    console.log('Send')
  }, [])

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <header>
        <h2>Texto padrão do Certificado</h2>
        <Button size="small" inline type="submit">
          <FiCheck size={20} />
          <span>Atualizar</span>
        </Button>
      </header>
      <Container>
        <RichTextEditor
          handleAddVariable={state => {
            setRichTextState(state)
            setOpenModal(true)
          }}
          onChange={({ html }) => {
            setHtml(html)
          }}
          initialHTMLValue={html}
        />
      </Container>
      <VariableModal
        onClose={() => {
          setOpenModal(false)
        }}
        formRef={formRef}
        openModal={openModal}
        state={richTextState}
      />
    </Form>
  )
}
