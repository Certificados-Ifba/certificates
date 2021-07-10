import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { EditorState, Modifier } from 'draft-js'
import { useRef, useCallback, useState } from 'react'
import { FiX, FiPlus, FiInfo, FiCode, FiTag } from 'react-icons/fi'
import { GroupedOptionsType } from 'react-select'
import * as Yup from 'yup'

import { useToast } from '../../providers/toast'
import getValidationErrors from '../../utils/getValidationErrors'
import Alert from '../alert'
import Button from '../button'
import Modal from '../modal'
import Select from '../select'

interface Props {
  openModal: boolean
  onClose: () => void
  state: any
}

interface Variable {
  name: string
  value: string
  description: string
  example: string
}

interface GroupVariable {
  name: string
  variables: Variable[]
}

const variableList: GroupVariable[] = [
  {
    name: 'Atividade',
    variables: [
      {
        name: 'Carga Horária da Atividade',
        value: '[atividade_carga_horaria]',
        description: 'Retorna a carga horária da atividade',
        example: '4 Horas'
      },
      {
        name: 'Período da Atividade',
        value: '[atividade_periodo]',
        description: 'Retorna um texto com o período da atividade',
        example: '20 de agosto a 22 de agosto de 2017'
      },
      {
        name: 'Título da Atividade',
        value: '[atividade_titulo]',
        description: 'Retorna o nome da atividade',
        example: 'Netlogo: ambiente de simulação multiagente'
      }
    ]
  },
  {
    name: 'Evento',
    variables: [
      {
        name: 'Ano do Evento',
        value: '[evento_ano]',
        description: 'Retorna o ano do evento no formato YYYY',
        example: '2017'
      },
      {
        name: 'Nome do Evento',
        value: '[evento_nome]',
        description: 'Retorna o nome do evento',
        example: 'Semana de Tecnologia da Informação Week-IT'
      },
      {
        name: 'Período do Evento',
        value: '[evento_periodo]',
        description: 'Retorna um texto com o período do evento',
        example: '25 de julho a 19 de dezembro de 2014'
      },
      {
        name: 'Sigla do Evento',
        value: '[evento_sigla]',
        description: 'Retorna a sigla do evento',
        example: 'WeekIT'
      }
    ]
  },
  {
    name: 'Função',
    variables: [
      {
        name: 'Nome da Função',
        value: '[funcao_nome]',
        description: 'Retorna o nome da Função',
        example: 'Bolsista'
      }
    ]
  },
  {
    name: 'Participante',
    variables: [
      {
        name: 'CPF do Participante',
        value: '[participante_cpf]',
        description: 'Retorna o CPF do participante',
        example: '056.579.968-00'
      },
      {
        name: 'Data de Nascimento do Participante',
        value: '[participante_data_nascimento]',
        description:
          'Retorna a data de nascimento do participante no formato dia/mês/ano',
        example: '12/08/1993'
      },
      {
        name: 'Nome do Participante',
        value: '[participante_nome]',
        description: 'Retorna o nome do participante',
        example: 'João da Silva'
      }
    ]
  },
  {
    name: 'Participação',
    variables: [
      {
        name: 'Carga Horária da Participação',
        value: '[participacao_carga_horaria]',
        description: 'Retorna a carga horária da participação',
        example: '4 horas'
      },
      {
        name: 'Período da Participação',
        value: '[participacao_carga_horaria]',
        description: 'Retorna a carga horária da participação',
        example: '4 horas'
      },
      {
        name: 'Quantidade de Bolsistas',
        value: '[participacao_qtd_bolsista]',
        description: 'Retorna a quantidade de bolsistas por extenso',
        example: 'quatro'
      }
    ]
  }
]

const VariableModal: React.FC<Props> = ({ openModal, onClose, state }) => {
  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handleClose = useCallback(() => {
    formRef.current.setErrors({})
    formRef.current.reset()
    setSelectedVariable(null)
    onClose()
  }, [onClose])
  const [selectedVariable, setSelectedVariable] = useState<Variable>(null)

  const handleSubmit = useCallback(
    async data => {
      const schema = Yup.object().shape({
        variable: Yup.string().required('Por favor, selecione uma variável')
      })
      try {
        await schema.validate(formRef.current.getData(), {
          abortEarly: false
        })

        const contentState = Modifier.replaceText(
          state.state.getCurrentContent(),
          state.state.getSelection(),
          selectedVariable.value,
          state.state.getCurrentInlineStyle()
        )
        state.onChange(
          EditorState.push(state.state, contentState, 'insert-characters')
        )
        handleClose()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          formRef.current?.setErrors(errors)
          return
        }

        addToast({
          type: 'error',
          title: 'Erro ao adicionar a variável',
          description: err
        })
      }
    },
    [addToast, handleClose, selectedVariable, state]
  )
  return (
    <Modal open={openModal} onClose={handleClose}>
      <header>
        <h2>Adicionar Variável</h2>
      </header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <main>
          <Select
            formRef={formRef}
            handleOnSelect={data => {
              if (data) {
                let vari: Variable
                for (const g of variableList) {
                  vari = g.variables.find(v => v.value === data.value)
                  if (vari) break
                }
                setSelectedVariable(vari)
              }
            }}
            label="Pesquise uma variável"
            name="variable"
            options={variableList.map(grou => {
              return {
                label: grou.name,
                options: grou.variables.map(vari => {
                  return { label: vari.name, value: vari.value }
                })
              }
            })}
            marginBottom="sm"
            required
          />
          {selectedVariable && (
            <>
              <Alert marginBottom="sm" icon={FiInfo}>
                {selectedVariable.description}. <br />
                <small>
                  Ex.: <b>{selectedVariable.example}</b>
                </small>
              </Alert>
              <Alert size="sm" marginBottom="sm" icon={FiCode}>
                {selectedVariable.value}
              </Alert>
            </>
          )}
        </main>
        <footer>
          <Button onClick={onClose} color="secondary" type="button" outline>
            <FiX size={20} />
            <span>Cancelar</span>
          </Button>
          <Button onClick={handleSubmit} color="success" type="button">
            <FiPlus size={20} /> <span>Adicionar</span>
          </Button>
        </footer>
      </Form>
    </Modal>
  )
}

export default VariableModal
