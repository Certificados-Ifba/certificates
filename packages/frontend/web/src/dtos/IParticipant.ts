export default interface IParticipant {
  id: string
  name: string
  email: string
  updated_at: Date
  personal_data: {
    cpf: string
    dob: Date
    phone: string
    institution: boolean
  }
}
