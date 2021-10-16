import { NestFactory } from '@nestjs/core'
import { Transport, TcpOptions } from '@nestjs/microservices'

import { ConfigService } from './services/config/config.service'
import { StorageModule } from './storage.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(StorageModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: new ConfigService().get('port')
    }
  } as TcpOptions)
  await app.listenAsync()
}
bootstrap()
