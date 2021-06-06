import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Inject,
  HttpStatus,
  HttpException,
  Res
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth
} from '@nestjs/swagger'
import { Response } from 'express'

import { Authorization } from '../decorators/authorization.decorator'
import { CreateParticipantResponseDto } from '../interfaces/participant/dto/create-participant-response.dto'
import { CreateParticipantDto } from '../interfaces/participant/dto/create-participant.dto'
import { IServiceParticipantCreateResponse } from '../interfaces/participant/service-participant-create-response.interface'
import { Permission } from './../decorators/permission.decorator'

@Controller('participants')
@ApiBearerAuth('JWT')
@ApiTags('participants')
export class ParticipantsController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  @Post()
  @Authorization(true)
  @Permission('participant_create')
  @ApiCreatedResponse({
    type: CreateParticipantResponseDto,
    description: 'Create new participant'
  })
  public async createParticipant(
    @Body() userRequest: CreateParticipantDto
  ): Promise<CreateParticipantResponseDto> {
    userRequest.role = 'PARTICIPANT'
    const createParticipantResponse: IServiceParticipantCreateResponse = await this.userServiceClient
      .send('user_create', userRequest)
      .toPromise()
    if (createParticipantResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createParticipantResponse.message,
          data: null,
          errors: createParticipantResponse.errors
        },
        createParticipantResponse.status
      )
    }

    return {
      message: createParticipantResponse.message,
      data: {
        user: createParticipantResponse.data.user
      },
      errors: null
    }
  }

  @Get()
  @Authorization(true)
  @Permission('participant_list')
  @ApiOkResponse({
    description: 'List of participants'
  })
  public async getEventActivities(
    @Res({ passthrough: true }) res: Response
  ): Promise<any> {
    res.header('x-total-count', String(3))
    res.header('x-total-page', String(1))
    return {
      message: 'Lista de Atividades do Evento',
      data: [
        {
          id: '1',
          cpf: '000.000.000-00',
          name: 'Lucas Nascimento Bertoldi',
          birth_date: new Date('1990-09-09'),
          email: 'lucasn.bertoldi@gmail.com',
          institution: true,
          last_event: 'Evento Conqusita'
        },
        {
          id: '2',
          cpf: '111.111.111-11',
          name: 'Danilo Gentilli',
          birth_date: new Date('1991-01-01'),
          email: 'danilo@gmail.com',
          institution: false,
          last_event: 'Evento São Paulo'
        },
        {
          id: '3',
          cpf: '222.222.222-22',
          name: 'Murilo Couto',
          birth_date: new Date('1992-02-02'),
          email: 'murilo@gmail.com',
          institution: false,
          last_event: 'Evento Salvador'
        },
        {
          id: '4',
          cpf: '333.333.333-33',
          name: 'Walber',
          birth_date: new Date('1992-02-02'),
          email: 'walber@gmail.com',
          institution: false,
          last_event: 'Evento Salvador'
        },
        {
          id: '5',
          cpf: '444.444.444-44',
          name: 'Aloísio Chulapa',
          birth_date: new Date('1992-02-02'),
          email: 'chulapa@gmail.com',
          institution: false,
          last_event: 'Evento Salvador'
        }
      ],
      errors: null
    }
  }
}
