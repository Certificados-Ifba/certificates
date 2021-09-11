import { Controller, Inject, Get, Param, Res } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'
import { Response } from 'express'

import { Authorization } from '../../decorators/authorization.decorator'
import { Permission } from '../../decorators/permission.decorator'
import { ActivityEventIdDto } from '../../interfaces/event/dto/activity/event-activity.dto'
import { EventIdDto } from '../../interfaces/event/dto/event-id.dto'

@Controller('events')
@ApiBearerAuth('JWT')
@ApiTags('events')
export class EventActivitiesController {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventServiceClient: ClientProxy
  ) {}

  @Get(':event_id/activities/:id')
  @Authorization(true)
  @Permission('event_activity_get_by_id')
  @ApiOkResponse({
    description: 'Activity of event'
  })
  public async getActivityById(
    @Param() params: ActivityEventIdDto
  ): Promise<any> {
    const { id, idEvent } = params
    return {
      message: 'Atividade do evento',
      data: {
        id: 1,
        name: 'Competição Baiana de Veículos Autônomos em Escala',
        activitieType: { id: 1, name: 'Competição' },
        workload: 10,
        start_date: new Date(),
        end_date: new Date()
      }
    }
  }

  @Authorization(true)
  @Permission('event_activity_list')
  @Get(':event_id/activities')
  @ApiOkResponse({
    description: 'List of event activities'
  })
  public async getEventActivities(
    @Param() params: EventIdDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    res.header('x-total-count', String(3))
    res.header('x-total-page', String(1))
    return {
      message: 'Lista de Atividades do Evento',
      data: [
        {
          id: 1,
          name: 'Competição Baiana de Veículos Autônomos em Escala',
          activitieType: 'Competição',
          workload: 10,
          start_date: new Date(),
          end_date: new Date(),
          participants: 0
        },
        {
          id: 2,
          name: 'Competição Baiana de Veículos Autônomos em Escala',
          activitieType: 'Palestra',
          workload: 10,
          start_date: new Date(),
          end_date: new Date(),
          participants: 20
        },
        {
          id: 3,
          name: 'Competição Baiana de Veículos Autônomos em Escala',
          activitieType: 'Palestra',
          workload: 10,
          start_date: new Date(),
          end_date: new Date(),
          participants: 50
        }
      ],
      errors: null
    }
  }
}
