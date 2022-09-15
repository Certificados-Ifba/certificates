export interface IUserUpdateParams {
  name?: string
  email?: string
  password?: string
  is_confirmed?: boolean
  last_login?: Date
  role?: string
  personal_data?: {
    cpf: string
    dob: Date
    institution: boolean
    phone: string
  }
}
