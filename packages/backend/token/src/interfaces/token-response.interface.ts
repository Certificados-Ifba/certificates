export interface ITokenResponse {
  status: number
  token: string | null
  message: string
  errors: { [key: string]: any } | null
}
