export interface IEmailData {
  to: string
  subject: string
  text: string
  html?: string
  template?: string
  context?: any
}
