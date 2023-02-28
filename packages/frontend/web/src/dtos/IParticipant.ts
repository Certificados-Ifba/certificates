export interface IPersonalData {
  cpf: string
  dob: Date
  phone: string
  institution: boolean
}

export interface IParticipant {
  id: string
  name: string
  email: string
  updated_at: Date
  personal_data: IPersonalData
}

export interface IParticipantRequest {
  name: string
  email: string
  cpf: string
  dob: Date
  phone: string
  institution: boolean
}
