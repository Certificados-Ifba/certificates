import { NestFactory } from '@nestjs/core'
import { Transport, TcpOptions } from '@nestjs/microservices'

import { ConfigService } from './services/config/config.service'
import { TokenModule } from './token.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TokenModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: new ConfigService().get('port')
    }
  } as TcpOptions)
  await app.listenAsync()
}
bootstrap()
