import { IDataSheet } from '@utils'

export const data: IDataSheet[] = [
  {
    column: {
      key: 'cpf',
      header: 'CPF',
      width: 20,
      style: { numFmt: '000"."###"."###-##' }
    },
    validation: {
      type: 'decimal',
      formulae: [99999, 99999999999],
      operator: 'between',
      error: 'Valor precisa ser no formato "000.000.000-00"',
      prompt: 'Insira o CPF do participante'
    }
  },
  {
    column: {
      header: 'Nome Completo',
      key: 'name',
      width: 40,
      protection: {
        locked: true
      }
    },
    validation: {
      type: 'textLength',
      formulae: [1],
      operator: 'greaterThanOrEqual',
      error: 'Valor não pode ser vazio',
      prompt: 'Insira o Nome Completo do participante'
    }
  },
  {
    column: {
      header: 'Data de Nascimento',
      key: 'dob',
      width: 25,
      style: { numFmt: 'dd/mm/yyyy' }
    },
    validation: {
      type: 'date',
      formulae: [new Date()],
      operator: 'lessThanOrEqual',
      error: 'Valor precisa ser uma data válida no formato "DD/MM/YYYY"',
      prompt: 'Insira a Data de Nascimento do participante',
      allowBlank: true
    }
  },
  {
    column: {
      header: 'E-mail',
      key: 'email',
      width: 30
    },
    validation: {
      type: 'textLength',
      formulae: [1],
      operator: 'greaterThanOrEqual',
      error: 'Valor não pode ser vazio',
      prompt: 'Insira o E-mail do participante'
    }
  },
  {
    column: {
      header: 'Telefone',
      key: 'phone',
      width: 20,
      style: { numFmt: '"("##")" #####-####' }
    },
    validation: {
      type: 'decimal',
      formulae: [10000000000, 99999999999],
      operator: 'between',
      error: 'Valor precisa ser no formato "(00) 00000-0000"',
      prompt: 'Insira o Telefone do participante',
      allowBlank: true
    }
  },
  {
    column: {
      header: 'É da instituição',
      key: 'institution',
      width: 20
    },
    validation: {
      type: 'list',
      formulae: ['"Sim,Não"'],
      error: 'Valor precisa ser "Sim" ou "Não"',
      prompt: 'Insira se o participante é da instituição'
    }
  }
]

export const examples = [
  [
    '000.000.000-00',
    'Lucas Nascimento Bertoldi',
    '11/09/2021',
    'lucas@lucas.com',
    '(77) 98809-0649',
    'Não'
  ],
  ['111.111.111-11', 'Pablo Matos', '11/09/2021', 'pablo@pablo.com', '', 'Sim'],
  [
    '222.222.222-22',
    'Matheus Coqueiro',
    '11/09/2021',
    'matheus@matheus.com',
    '',
    'Não'
  ],
  [
    '333.333.333-33',
    'Alexandro',
    '11/09/2021',
    'alexandro@alexandro.com',
    '',
    'Não'
  ]
]
