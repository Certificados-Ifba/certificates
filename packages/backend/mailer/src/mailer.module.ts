import { MailerModule } from '@nestjs-modules/mailer'
import { Module } from '@nestjs/common'

import { MailerController } from './mailer.controller'
import { ConfigService } from './services/config/config.service'
import { MailerConfigService } from './services/config/mailer-config.service'

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailerConfigService
    })
  ],
  providers: [ConfigService],
  controllers: [MailerController]
})
export class AppMailerModule {}
