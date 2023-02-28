export const formatCpf = (cpf: string): string => {
  if (!cpf) return ''
  if (cpf.length < 11) cpf = cpf.padStart(11, '0')
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const formatPhone = (phone: string): string => {
  if (!phone) return ''
  return phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/\((\d{2})\) (\d{4})(\d{1})/, '($1) $2-$3')
    .replace(/^\((\d{2})\) (\d{4})-(\d{1})(\d{4})/, '($1) $2$3-$4')
    .replace(/^\((\d{2})\) (\d{5})-(\d{4})(\d{1,})/, '($1) $2-$3')
}

export const formatDate = (
  value: string | Date,
  isForm = false,
  isDate = true,
  reverse = false
): string => {
  if (!value) return ''
  const char = isForm ? '-' : '/'
  const data = isDate ? new Date(value).toISOString() : String(value)
  const diaF = data.substr(isDate ? 8 : 0, 2)
  const mesF = data.substr(isDate ? 5 : 3, 2)
  const anoF = data.substr(isDate ? 0 : 6, 4)
  return isDate && !reverse
    ? `${diaF}${char}${mesF}${char}${anoF}`
    : `${anoF}${char}${mesF}${char}${diaF}`
}

export const isDate = (value: string): boolean => {
  if (!value) return false
  const regEx = /^\d{4}-\d{2}-\d{2}$/
  if (!value.match(regEx)) return false // Invalid format
  const d = new Date(value)
  const dNum = d.getTime()
  if (!dNum && dNum !== 0) return false // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === value
}

export const removeMask = (value: string): string =>
  value.replace(/[^\d]+/g, '')
