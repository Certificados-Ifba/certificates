export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null

  constructor() {
    this.envConfig = {
      port: process.env.TOKEN_SERVICE_PORT,
      expiresIn: process.env.TOKEN_EXPIRES_IN || '1d'
    }
  }

  get(key: string): any {
    return this.envConfig[key]
  }
}
