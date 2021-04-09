import { IncomingMessage } from 'http'
import { NextPageContext } from 'next'

export interface CookieMessage extends IncomingMessage {
  cookies: { [name: string]: string }
}

export interface CookiesPageContext extends NextPageContext {
  req: CookieMessage | undefined
}
