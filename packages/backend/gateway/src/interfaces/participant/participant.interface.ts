export interface IParticipant {
  id: string
  name: string
  email: string
  personal_data: {
    cpf: string
    dob: string
    phone: string
    institution: boolean
  }
}
