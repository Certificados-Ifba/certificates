export interface IUserGetByLinkResponse {
  status: number
  message: string
  data: 'register' | 'reset' | null
}
