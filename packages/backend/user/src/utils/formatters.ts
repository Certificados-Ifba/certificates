export const formatCpf = (cpf: string): string =>
  cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')

export const formatDate = (value: string): string => {
  if (!value) return ''
  const data = new Date(value)
  const diaF = data.toISOString().substr(8, 2)
  const mesF = data.toISOString().substr(5, 2)
  const anoF = data.toISOString().substr(0, 4)
  return `${diaF}/${mesF}/${anoF}`
}
