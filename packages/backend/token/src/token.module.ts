import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

import { TokenSchema } from './schemas/token.schema'
import { JwtConfigService } from './services/config/jwt-config.service'
import { MongoConfigService } from './services/config/mongo-config.service'
import { TokenService } from './services/token.service'
import { TokenController } from './token.controller'

@Module({
  imports: [
    JwtModule.registerAsync({
      useClass: JwtConfigService
    }),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService
    }),
    MongooseModule.forFeature([
      {
        name: 'Token',
        schema: TokenSchema
      }
    ])
  ],
  controllers: [TokenController],
  providers: [TokenService]
})
export class TokenModule {}
