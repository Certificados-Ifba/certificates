import {
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Req,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth
} from '@nestjs/swagger'

import { Authorization } from '../decorators/authorization.decorator'
import { Permission } from '../decorators/permission.decorator'
import { IAuthorizedRequest } from '../interfaces/common/authorized-request.interface'
import { CreateEventResponseDto } from '../interfaces/event/dto/create-event-response.dto'
import { CreateEventDto } from '../interfaces/event/dto/create-event.dto'
import { DeleteEventResponseDto } from '../interfaces/event/dto/delete-event-response.dto'
import { EventIdDto } from '../interfaces/event/dto/event-id.dto'
import { GetEventsResponseDto } from '../interfaces/event/dto/get-events-response.dto'
import { UpdateEventResponseDto } from '../interfaces/event/dto/update-event-response.dto'
import { UpdateEventDto } from '../interfaces/event/dto/update-event.dto'
import { IServiceEventCreateResponse } from '../interfaces/event/service-event-create-response.interface'
import { IServiceEventDeleteResponse } from '../interfaces/event/service-event-delete-response.interface'
import { IServiceEventSearchByUserIdResponse } from '../interfaces/event/service-event-search-by-user-id-response.interface'
import { IServiceEventUpdateByIdResponse } from '../interfaces/event/service-event-update-by-id-response.interface'

@Controller('test-events')
@ApiTags('test-events')
export class TestEventsController {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventServiceClient: ClientProxy
  ) {}

  @Get()
  @ApiOkResponse({
    type: GetEventsResponseDto,
    description: 'List of events for signed in user'
  })
  public async getEvents(): Promise<GetEventsResponseDto> {
    return {
      message: 'Lista de Eventos',
      data: {
        events: [
          {
            name: 'Competição Baiana de Veículos Autônomos em Escala',
            initials: 'CBVAE',
            year: '2019',
            start_date: new Date(),
            end_date: new Date(),
            description: 'Competição Baiana de Veículos Autônomos em Escala',
            edition: ''
          },
          {
            name: 'Projeto de Extensão do NAPNEE 	Curso LIBRAS',
            initials: 'LIBRAS',
            year: '2018',
            start_date: new Date(),
            end_date: new Date(),
            description: 'Projeto de Extensão do NAPNEE 	Curso LIBRAS',
            edition: ''
          },
          {
            name: 'Projeto de Extensão do NAPNEE 	Curso TEA',
            initials: 'TEA',
            year: '2017',
            start_date: new Date(),
            end_date: new Date(),
            description: 'Projeto de Extensão do NAPNEE 	Curso TEA',
            edition: ''
          },
        ]
      },
      errors: null
    }
  }
}
