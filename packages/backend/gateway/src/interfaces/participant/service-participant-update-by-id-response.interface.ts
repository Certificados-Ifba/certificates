import { IParticipant } from './participant.interface'

export interface IServiceParticipantUpdateByIdResponse {
  status: number
  message: string
  user: IParticipant | null
  errors: { [key: string]: any }
}
