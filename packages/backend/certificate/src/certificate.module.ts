import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CertificateController } from './certificate.controller'
import { ActivitySchema } from './schemas/activity.schema'
import { CertificateSchema } from './schemas/certificate.schema'
import { GenericSchema } from './schemas/generic.schema'
import { UserSchema } from './schemas/user.schema'
import { CertificateService } from './services/certificate.service'
import { MongoConfigService } from './services/config/mongo-config.service'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService
    }),
    MongooseModule.forFeature([
      {
        name: 'Certificate',
        schema: CertificateSchema
      },
      {
        name: 'Generic',
        schema: GenericSchema
      },
      {
        name: 'Activity',
        schema: ActivitySchema
      },
      {
        name: 'User',
        schema: UserSchema
      }
    ])
  ],
  controllers: [CertificateController],
  providers: [CertificateService]
})
export class CertificateModule {}
