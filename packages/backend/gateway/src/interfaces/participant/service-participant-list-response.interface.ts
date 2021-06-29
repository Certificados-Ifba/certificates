import { IParticipant } from './participant.interface'

export interface IServiceParticipantListResponse {
  status: number
  message: string
  data: {
    users: IParticipant[]
    totalPages: number
    totalCount: number
  }
}
