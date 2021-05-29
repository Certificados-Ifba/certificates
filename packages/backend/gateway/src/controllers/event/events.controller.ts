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
  HttpStatus,
  Res,
  Query
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth
} from '@nestjs/swagger'
import { Response } from 'express'
import { Authorization } from 'src/decorators/authorization.decorator'
import { Permission } from 'src/decorators/permission.decorator'
import { IAuthorizedRequest } from 'src/interfaces/common/authorized-request.interface'
import { CreateEventResponseDto } from 'src/interfaces/event/dto/create-event-response.dto'
import { CreateEventDto } from 'src/interfaces/event/dto/create-event.dto'
import { DeleteEventResponseDto } from 'src/interfaces/event/dto/delete-event-response.dto'
import { EventIdDto } from 'src/interfaces/event/dto/event-id.dto'
import { GetEventByIdResponseDto } from 'src/interfaces/event/dto/get-event-by-id-response.dto'
import { GetEventsResponseDto } from 'src/interfaces/event/dto/get-events-response.dto'
import { ListEventDto } from 'src/interfaces/event/dto/list-event.dto'
import { UpdateEventResponseDto } from 'src/interfaces/event/dto/update-event-response.dto'
import { UpdateEventDto } from 'src/interfaces/event/dto/update-event.dto'
import { IServiceEventCreateResponse } from 'src/interfaces/event/service-event-create-response.interface'
import { IServiceEventDeleteResponse } from 'src/interfaces/event/service-event-delete-response.interface'
import { IServiceEventUpdateByIdResponse } from 'src/interfaces/event/service-event-update-by-id-response.interface'

@Controller('events')
@ApiBearerAuth('JWT')
@ApiTags('events')
export class EventsController {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventServiceClient: ClientProxy
  ) {}

  @Get(':id')
  @Authorization(true)
  @Permission('event_get_by_id')
  @ApiOkResponse({
    type: GetEventByIdResponseDto,
    description: 'Find event by id'
  })
  public async getEventById(
    @Param() params: EventIdDto
  ): Promise<GetEventByIdResponseDto> {
    const { id } = params

    // const userResponse: IServiceEventGetByIdResponse = await this.eventServiceClient
    //   .send('event_get_by_id', id)
    //   .toPromise()

    return {
      // message: userResponse.message,
      // data: userResponse?.data?.user
      message: 'user_get_by_id_success',
      data: {
        name: 'Competição Baiana de Veículos Autônomos em Escala',
        initials: 'CBVAE',
        year: '2019',
        start_date: new Date(),
        end_date: new Date(),
        description: 'Competição Baiana de Veículos Autônomos em Escala',
        edition: '1N',
        id: '60b0506e8db1d10032144025',
        user_id: {
          id: '6b421b70-1e33-4fc0-a225-1b20ff2b68e7',
          name: 'Pablo Matos'
        }
      }
    }
  }

  @Get()
  @Authorization(true)
  @Permission('event_list')
  @ApiOkResponse({
    type: GetEventsResponseDto,
    description: 'List of events'
  })
  public async getEvents(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ListEventDto
  ): Promise<GetEventsResponseDto> {
    const { search, page, per_page, sort_by, order_by } = query
    // const usersResponse: IServiceEventListResponse = await this.eventServiceClient
    //   .send('event_list', {
    //     type: 'event',
    //     name: search,
    //     page: Number(page),
    //     perPage: Number(per_page),
    //     sortBy: sort_by,
    //     orderBy: order_by
    //   })
    //   .toPromise()

    // res.header('x-total-count', String(usersResponse?.data.totalCount))
    // res.header('x-total-page', String(usersResponse?.data.totalPages))

    res.header('x-total-count', String(3))
    res.header('x-total-page', String(1))
    return {
      message: 'Lista de Eventos',
      // data: usersResponse?.data?.events
      data: [
        {
          name: 'Competição Baiana de Veículos Autônomos em Escala',
          initials: 'CBVAE',
          year: '2019',
          start_date: new Date(),
          end_date: new Date(),
          description: 'Competição Baiana de Veículos Autônomos em Escala',
          edition: '',
          id: '60b038c58db1d10032144021',
          user_id: '6b421b70-1e33-4fc0-a225-1b20ff2b68e7'
        },
        {
          name: 'Projeto de Extensão do NAPNEE 	Curso LIBRAS',
          initials: 'LIBRAS',
          year: '2018',
          start_date: new Date(),
          end_date: new Date(),
          description: 'Projeto de Extensão do NAPNEE 	Curso LIBRAS',
          edition: '',
          id: '60afd392e2369e004a185d39',
          user_id: '6b421b70-1e33-4fc0-a225-1b20ff2b68e7'
        },
        {
          name: 'Projeto de Extensão do NAPNEE 	Curso TEA',
          initials: 'TEA',
          year: '2017',
          start_date: new Date(),
          end_date: new Date(),
          description: 'Projeto de Extensão do NAPNEE 	Curso TEA',
          edition: '',
          id: '60afd392e2369e004a185d39',
          user_id: '6b421b70-1e33-4fc0-a225-1b20ff2b68e7'
        }
      ]
    }
  }

  @Post()
  @Authorization(true)
  @Permission('event_create')
  @ApiCreatedResponse({
    type: CreateEventResponseDto
  })
  public async createEvent(
    @Body() eventRequest: CreateEventDto
  ): Promise<CreateEventResponseDto> {
    const createEventResponse: IServiceEventCreateResponse = await this.eventServiceClient
      .send('event_create', Object.assign(eventRequest))
      .toPromise()

    if (createEventResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createEventResponse.message,
          data: null,
          errors: createEventResponse.errors
        },
        createEventResponse.status
      )
    }

    return {
      message: createEventResponse.message,
      data: {
        event: createEventResponse.event
      },
      errors: null
    }
  }

  @Delete(':id')
  @Authorization(true)
  @Permission('event_delete_by_id')
  @ApiOkResponse({
    type: DeleteEventResponseDto
  })
  public async deleteEvent(
    @Req() request: IAuthorizedRequest,
    @Param() params: EventIdDto
  ): Promise<DeleteEventResponseDto> {
    const userInfo = request.user

    const deleteEventResponse: IServiceEventDeleteResponse = await this.eventServiceClient
      .send('event_delete_by_id', {
        id: params.id,
        userId: userInfo.id
      })
      .toPromise()

    if (deleteEventResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: deleteEventResponse.message,
          errors: deleteEventResponse.errors,
          data: null
        },
        deleteEventResponse.status
      )
    }

    return {
      message: deleteEventResponse.message,
      data: null,
      errors: null
    }
  }

  @Put(':id')
  @Authorization(true)
  @Permission('event_update_by_id')
  @ApiOkResponse({
    type: UpdateEventResponseDto
  })
  public async updateEvent(
    @Req() request: IAuthorizedRequest,
    @Param() params: EventIdDto,
    @Body() eventRequest: UpdateEventDto
  ): Promise<UpdateEventResponseDto> {
    const userInfo = request.user
    const updateEventResponse: IServiceEventUpdateByIdResponse = await this.eventServiceClient
      .send('event_update_by_id', {
        id: params.id,
        userId: userInfo.id,
        event: eventRequest
      })
      .toPromise()

    if (updateEventResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: updateEventResponse.message,
          errors: updateEventResponse.errors,
          data: null
        },
        updateEventResponse.status
      )
    }

    return {
      message: updateEventResponse.message,
      data: {
        event: updateEventResponse.event
      },
      errors: null
    }
  }
}
