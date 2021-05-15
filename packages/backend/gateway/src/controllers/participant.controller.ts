import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Inject,
  HttpStatus,
  HttpException
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth
} from '@nestjs/swagger'

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
}
