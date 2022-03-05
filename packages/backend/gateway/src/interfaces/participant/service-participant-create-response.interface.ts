import { IParticipant } from './participant.interface'

export interface IServiceParticipantCreateResponse {
  status: number
  message: string
  data: {
    user: IParticipant | null
  }
  errors: { [key: string]: any }
}
