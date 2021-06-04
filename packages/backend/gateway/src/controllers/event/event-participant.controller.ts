import { Controller, Inject, Get, Param, Res } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'
import { Response } from 'express'
import { Authorization } from 'src/decorators/authorization.decorator'
import { Permission } from 'src/decorators/permission.decorator'
import { EventIdDto } from 'src/interfaces/event/dto/event-id.dto'

@Controller('events')
@ApiBearerAuth('JWT')
@ApiTags('events')
export class EventParticipantsController {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventServiceClient: ClientProxy
  ) {}

  @Authorization(true)
  @Permission('event_participant_list')
  @Get(':eventId/participants')
  @ApiOkResponse({
    description: 'List of event participants'
  })
  public async getEventActivities(
    @Param() params: EventIdDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    res.header('x-total-count', String(3))
    res.header('x-total-page', String(1))
    return {
      message: 'Lista de Participantes do Evento',
      data: [
        {
          id: 1,
          name: 'Lucas Nascimento Bertoldi',
          email: 'lucasn.bertoldi@gmail.com',
          activity: 'Competição Baiana de Veículos Autônomos em Escala',
          cpf: '057.487.615-48',
          workload: 10,
          start_date: new Date(),
          end_date: new Date()
        }
      ],
      errors: null
    }
  }
}
