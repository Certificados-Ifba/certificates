import { Alert, Button, Grid, Input, Modal, Table, TableRow } from '@components'
import { FormHandles } from '@unform/core'
import { useDebounce } from '@utils'
import { EditorState, Modifier } from 'draft-js'
import { useCallback, useState, MutableRefObject } from 'react'
import { FiCheck, FiInfo, FiSearch } from 'react-icons/fi'

interface Props {
  openModal: boolean
  onClose: () => void
  state: any
  formRef: MutableRefObject<FormHandles>
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
        example: '2021'
      },
      {
        name: 'Edição do Evento',
        value: '[evento_edicao]',
        description: 'Retorna a edição do evento',
        example: '7'
      },
      {
        name: 'Local do Evento',
        value: '[evento_local]',
        description: 'Retorna o local do evento',
        example: 'Vitória da Conquista/BA'
      },
      {
        name: 'Nome do Evento',
        value: '[evento_nome]',
        description: 'Retorna o nome do evento',
        example: 'Semana de Tecnologia da Informação'
      },
      {
        name: 'Período do Evento',
        value: '[evento_periodo]',
        description: 'Retorna um texto com o período do evento',
        example: '22 de novembro a 10 de dezembro de 2021'
      },
      {
        name: 'Sigla do Evento',
        value: '[evento_sigla]',
        description: 'Retorna a sigla do evento',
        example: 'Week-IT'
      }
    ]
  },
  {
    name: 'Função',
    variables: [
      {
        name: 'Nome da Função',
        value: '[funcao_nome]',
        description: 'Retorna o nome da função em minúsculo',
        example: 'ouvinte'
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
        name: 'Ordem de Autoria em Participação',
        value: '[participacao_ordem_autoria]',
        description:
          'Retorna a ordem de autoria dos autores, por exemplo, de um artigo',
        example:
          'Matheus Coqueiro, Lucas Bertoldi, Alexandro Silva e Pablo Matos'
      },
      {
        name: 'Período da Participação',
        value: '[participacao_periodo]',
        description: 'Retorna um texto com o período da participação',
        example: '22 a 26 de novembro de 2021'
      },
      {
        name: 'Texto Adicional da Participação',
        value: '[participacao_texto_adicional]',
        description: 'Retorna o texto adicional',
        example:
          'Campo curinga para adicionar qualquer informação não prevista nas outras tags'
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
        name: 'Nome do Participante',
        value: '[participante_nome]',
        description: 'Retorna o nome do participante em maiúsculo',
        example: 'LUCAS BERTOLDI'
      }
    ]
  },
  {
    name: 'Tipo de Atividade',
    variables: [
      {
        name: 'Nome do Tipo de Atividade',
        value: '[tipoAtividade_nome]',
        description: 'Retorna o nome do tipo de atividade em minúsculo',
        example: 'minicurso'
      }
    ]
  }
]

export const VariableModal: React.FC<Props> = ({
  openModal,
  onClose,
  state,
  formRef
}) => {
  const getList: (groupList: GroupVariable[]) => Variable[] = (
    groupList: GroupVariable[]
  ) => {
    const list: Variable[] = []
    groupList.forEach(g => {
      list.push(...g.variables)
    })
    return list
  }

  const handleClose = useCallback(() => {
    setList(getList(variableList))
    onClose()
  }, [onClose])

  const addVariable = useCallback(
    (data: Variable) => {
      const contentState = Modifier.replaceText(
        state.state.getCurrentContent(),
        state.state.getSelection(),
        data.value,
        state.state.getCurrentInlineStyle()
      )
      state.onChange(
        EditorState.push(state.state, contentState, 'insert-characters')
      )
      handleClose()
    },
    [handleClose, state]
  )

  const [list, setList] = useState(getList(variableList))

  const { run } = useDebounce<void>(() => {
    let filter: string = formRef.current.getFieldValue('variableName')
    filter = filter || ''
    filter = filter.toUpperCase()

    const list = []

    for (const g of variableList) {
      if (g.name.toUpperCase().includes(filter)) {
        list.push(g)
      } else {
        const newGroup: GroupVariable = { name: g.name, variables: [] }
        for (const v of g.variables) {
          if (
            v.name.toUpperCase().includes(filter) ||
            v.value.includes(filter)
          ) {
            newGroup.variables.push(v)
          }
        }
        if (newGroup.variables.length > 0) list.push(newGroup)
      }
    }
    setList(getList(list))
  })

  return (
    <Modal size="lg" open={openModal} onClose={handleClose}>
      <header>
        <h2>Selecione uma Tag</h2>
      </header>
      <main>
        <Grid cols={3}>
          <div>
            <Input
              marginBottom="sm"
              name="variableName"
              label="Buscar"
              placeholder="Procure por alguma Tag"
              icon={FiSearch}
              onKeyDown={data => {
                run()
              }}
            />
          </div>
        </Grid>
        <div>
          <Table overflowY={false}>
            <tbody>
              {list.map(v => (
                <tr
                  onClick={() => {
                    addVariable(v)
                  }}
                  key={v.value}
                >
                  <td>
                    <small>{v.value}</small>
                  </td>
                  <td>
                    <Alert size="sm" icon={FiInfo}>
                      <small>
                        {v.description}.<br />
                        Ex.: <b>{v.example}</b>
                      </small>
                    </Alert>
                  </td>
                  <td>
                    <TableRow>
                      <Button
                        inline
                        ghost
                        square
                        color="success"
                        size="small"
                        type="button"
                        onClick={() => {
                          console.log()
                        }}
                      >
                        <FiCheck size={20} /> <span>Inserir</span>
                      </Button>
                    </TableRow>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </main>
    </Modal>
  )
}
