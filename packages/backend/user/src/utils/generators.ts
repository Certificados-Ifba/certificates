import { randomBytes } from 'crypto'

export const securePassword = (): string => {
  let password = ''
  randomBytes(5).forEach(e => {
    password += e.toString(16)
  })
  return password
}
