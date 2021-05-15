import { Transport } from '@nestjs/microservices'

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null

  constructor() {
    this.envConfig = {
      port: process.env.USER_SERVICE_PORT
    }
    this.envConfig.webUrl = process.env.WEB_URL
    this.envConfig.mailerService = {
      options: {
        port: process.env.MAILER_SERVICE_PORT,
        host: process.env.MAILER_SERVICE_HOST
      },
      transport: Transport.TCP
    }
  }

  get(key: string): any {
    return this.envConfig[key]
  }
}
