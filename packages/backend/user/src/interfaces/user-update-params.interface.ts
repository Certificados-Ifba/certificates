export interface IUserUpdateParams {
  name: string
  email: string
  personal_data?: {
    cpf: String
    dob: Date
    is_student: Boolean
  }
}
