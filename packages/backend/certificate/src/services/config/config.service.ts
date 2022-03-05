export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null

  constructor() {
    this.envConfig = {
      port: process.env.CERTIFICATE_SERVICE_PORT
    }
  }

  get(key: string): any {
    return this.envConfig[key]
  }
}
