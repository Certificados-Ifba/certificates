import { Document } from 'mongoose'

export interface IUser extends Document {
  id?: string
  name: string
  email: string
  password: string
  role: string
  is_confirmed: boolean
  compareEncryptedPassword: (password: string) => boolean
  getEncryptedPassword: (password: string) => string
}
