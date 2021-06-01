export interface IServiceUserLinkResponse {
  status: number
  message: string
  data: 'register' | 'reset' | null
}
