import { Document } from 'mongoose'

export interface IParticipant extends Document {
  id?: string
  name: string
  email: string
  password: string
  role: string
  is_confirmed: boolean
  last_login?: Date
  personal_data?: {
    cpf: String
    dob: Date
    phone: string
    institution: Boolean
  }
}
