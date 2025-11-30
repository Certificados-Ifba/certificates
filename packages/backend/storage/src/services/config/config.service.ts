import { resolve } from 'path'

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null

  constructor() {
    this.envConfig = {
      port: process.env.STORAGE_SERVICE_PORT,
      uploadDir: resolve(__dirname, '..', '..', '..', 'uploads')
    }
  }

  get(key: string): any {
    return this.envConfig[key]
  }
}
