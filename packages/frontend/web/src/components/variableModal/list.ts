import { IVariable } from '@dtos'

export const list: IVariable[] = [
  {
    name: 'Título da Atividade',
    value: '[atividade_titulo]',
    description: 'Retorna o nome da atividade',
    example: 'Netlogo: ambiente de simulação multiagente'
  },
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
  },
  {
    name: 'Nome da Função',
    value: '[funcao_nome]',
    description: 'Retorna o nome da função em minúsculo',
    example: 'ouvinte'
  },
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
    example: 'Matheus Coqueiro, Lucas Bertoldi, Alexandro Silva e Pablo Matos'
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
  },
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
  },
  {
    name: 'Nome do Tipo de Atividade',
    value: '[tipoAtividade_nome]',
    description: 'Retorna o nome do tipo de atividade em minúsculo',
    example: 'minicurso'
  }
]
