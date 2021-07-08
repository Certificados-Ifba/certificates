export const formatCpf = (cpf: string): string =>
  cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')

export const formatPhone = (phone: string): string =>
  phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/\((\d{2})\) (\d{4})(\d{1})/, '($1) $2-$3')
    .replace(/^\((\d{2})\) (\d{4})-(\d{1})(\d{4})/, '($1) $2$3-$4')
    .replace(/^\((\d{2})\) (\d{5})-(\d{4})(\d{1,})/, '($1) $2-$3')

export const formatData = (value: string): string => {
  if (!value) return ''
  const data = new Date(value)
  const diaF = data.toISOString().substr(8, 2)
  const mesF = data.toISOString().substr(5, 2)
  const anoF = data.toISOString().substr(0, 4)
  return `${diaF}/${mesF}/${anoF}`
}
