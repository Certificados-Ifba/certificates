import { IParticipant } from './participant.interface'

export interface IServiceParticipantGetByIdResponse {
  status: number
  message: string
  data: {
    user: IParticipant | null
  }
}
