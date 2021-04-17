import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { GenericController } from './generic.controller'
import { GenericSchema } from './schemas/generic.schema'
import { MongoConfigService } from './services/config/mongo-config.service'
import { GenericService } from './services/generic.service'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService
    }),
    MongooseModule.forFeature([
      {
        name: 'Generic',
        schema: GenericSchema
      }
    ])
  ],
  controllers: [GenericController],
  providers: [GenericService]
})
export class GenericModule {}
