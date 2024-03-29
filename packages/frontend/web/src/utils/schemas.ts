import { inDateRange, isValidCpf, minDate, formatData } from '@utils'
import * as Yup from 'yup'

export const getParticipantSchema: () => any = () => {
  const schema = Yup.object().shape({
    name: Yup.string().required('O usuário precisa ter um nome'),
    email: Yup.string().email('Por favor, digite um e-mail válido'),
    cpf: Yup.string()
      .matches(
        /(\d{3}).(\d{3}).(\d{3})-(\d{2})/,
        'Por favor, digite um CPF válido.'
      )
      .test('cpf-is-valid', 'CPF precisa ser válido', isValidCpf)
      .required('Digite o CPF do participante'),
    dob: Yup.string().required('Selecione a data de nascimento'),
    phone: Yup.string().matches(
      /(^$|\((\d{2})\) (\d{4}|\d{5})-(\d{4}))/,
      'Por favor, digite um telefone válido.'
    ),
    institution: Yup.string().required(
      'Selecione se o participante é da instituição.'
    )
  })
  return schema
}

export const getActivitySchema: (
  activity_start_date: string,
  event_start_date: string,
  event_end_date: string
) => any = (
  activity_start_date: string,
  event_start_date: string,
  event_end_date: string
) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('A atividade precisa ter um nome'),
    type: Yup.string().required(`Selecione um tipo da atividade`),
    workload: Yup.number()
      .typeError('Por favor, digite a carga horária')
      .positive('A carga horária precisa ser positiva')
      .required('Por favor, digite a carga horária'),
    start_date: Yup.string()
      .test(
        'in-date-range',
        `A atividade precisa ser entre os dias ${formatData(
          event_start_date
        )} e ${formatData(event_end_date)}`,
        (value: string) => inDateRange(value, event_start_date, event_end_date)
      )
      .required('Selecione a data de início'),
    end_date: Yup.string()
      .test(
        'in-date-range',
        `A atividade precisa ser entre os dias ${formatData(
          event_start_date
        )} e ${formatData(event_end_date)}`,
        (value: string) => inDateRange(value, event_start_date, event_end_date)
      )
      .test(
        'min-date',
        'A data final precisa ser maior que a data inicial',
        (value: string) => minDate(value, activity_start_date)
      )
      .required('Selecione a data do fim')
  })
  return schema
}
