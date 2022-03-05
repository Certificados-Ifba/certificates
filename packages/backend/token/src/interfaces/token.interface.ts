import { Document } from 'mongoose'

export interface IToken extends Document {
  user: string
  token: string
}
