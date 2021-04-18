import { Controller, Inject, Get } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ApiTags, ApiOkResponse } from '@nestjs/swagger'

import { GetEventsResponseDto } from '../interfaces/event/dto/get-events-response.dto'

@Controller('test')
@ApiTags('test')
export class TestEventsController {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventServiceClient: ClientProxy
  ) {}

  @Get('events')
  @ApiOkResponse({
    type: GetEventsResponseDto,
    description: 'List of events'
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
          }
        ]
      },
      errors: null
    }
  }

  @Get('participants')
  @ApiOkResponse({
    type: GetEventsResponseDto,
    description: 'List of participants'
  })
  public async getParticipants(): Promise<any> {
    return {
      message: 'Lista de Participantes',
      data: {
        participants: [
          {
            cpf: '000.000.000-00',
            name: 'Lucas Nascimento Bertoldi',
            birth_date: new Date('1990-09-09'),
            email: 'lucasn.bertoldi@gmail.com',
            institution: true,
            last_event: 'Evento Conqusita'
          },
          {
            cpf: '111.111.111-11',
            name: 'Danilo Gentilli',
            birth_date: new Date('1991-01-01'),
            email: 'danilo@gmail.com',
            institution: false,
            last_event: 'Evento São Paulo'
          },
          {
            cpf: '222.222.222-22',
            name: 'Murilo Couto',
            birth_date: new Date('1992-02-02'),
            email: 'murilo@gmail.com',
            institution: false,
            last_event: 'Evento Salvador'
          }
        ]
      },
      errors: null
    }
  }

  @Get('users')
  @ApiOkResponse({
    type: GetEventsResponseDto,
    description: 'List of participants'
  })
  public async getUsers(): Promise<any> {
    return {
      message: 'Lista de Usuários',
      data: {
        users: [
          {
            name: 'Lucas Nascimento Bertoldi',
            email: 'lucasn.bertoldi@gmail.com',
            type: 'Administrador'
          },
          {
            name: 'Danilo Gentilli',
            email: 'danilo@gmail.com',
            type: 'Administrador'
          },
          {
            name: 'Murilo Couto',
            email: 'murilo@gmail.com',
            type: 'Coordenador'
          }
        ]
      },
      errors: null
    }
  }

  @Get('functions')
  @ApiOkResponse({
    type: GetEventsResponseDto,
    description: 'List of functions'
  })
  public async getFunctions(): Promise<any> {
    return {
      message: 'Lista de Funções',
      data: {
        functions: [
          {
            name: 'Palestrante'
          },
          {
            name: 'Monitor'
          },
          {
            name: 'Organizador'
          }
        ]
      },
      errors: null
    }
  }
}
