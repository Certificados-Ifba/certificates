import { Module } from '@nestjs/common'
import { ClientProxyFactory } from '@nestjs/microservices'
import { MongooseModule } from '@nestjs/mongoose'

import { UserLinkSchema } from './schemas/user-link.schema'
import { UserSchema } from './schemas/user.schema'
import { ConfigService } from './services/config/config.service'
import { MongoConfigService } from './services/config/mongo-config.service'
import { UserService } from './services/user.service'
import { UserController } from './user.controller'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService
    }),
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UserSchema,
        collection: 'users'
      },
      {
        name: 'UserLink',
        schema: UserLinkSchema,
        collection: 'user_links'
      }
    ])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ConfigService,
    {
      provide: 'MAILER_SERVICE',
      useFactory: (configService: ConfigService) => {
        const mailerServiceOptions = configService.get('mailerService')
        return ClientProxyFactory.create(mailerServiceOptions)
      },
      inject: [ConfigService]
    }
  ]
})
export class UserModule {}
