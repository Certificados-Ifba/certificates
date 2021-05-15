export interface IParticipant {
  id: string
  name: string
  email: string
  personal_data: {
    cpf: String
    dob: Date
    is_student: Boolean
  }
}
