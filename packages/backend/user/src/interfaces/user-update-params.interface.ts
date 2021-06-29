export interface IUserUpdateParams {
  name?: string
  email?: string
  password?: string
  is_confirmed?: boolean
  last_login?: Date
  personal_data?: {
    cpf: String
    dob: Date
    institution: Boolean
  }
}
