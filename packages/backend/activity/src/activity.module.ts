import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ActivityController } from './activity.controller'
import { ActivitySchema } from './schemas/activity.schema'
import { GenericSchema } from './schemas/generic.schema'
import { ActivityService } from './services/activity.service'
import { MongoConfigService } from './services/config/mongo-config.service'

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongoConfigService
    }),
    MongooseModule.forFeature([
      {
        name: 'Activity',
        schema: ActivitySchema
      },
      {
        name: 'Generic',
        schema: GenericSchema
      }
    ])
  ],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule {}
