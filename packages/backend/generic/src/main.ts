import { NestFactory } from '@nestjs/core'
import { Transport, TcpOptions } from '@nestjs/microservices'

import { GenericModule } from './generic.module'
import { ConfigService } from './services/config/config.service'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(GenericModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: new ConfigService().get('port')
    }
  } as TcpOptions)
  await app.listenAsync()
}
bootstrap()
