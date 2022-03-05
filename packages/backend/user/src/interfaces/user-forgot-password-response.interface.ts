export interface IUserForgotPasswordResponse {
  status: number
  message: string
  errors: { [key: string]: any } | null
}
