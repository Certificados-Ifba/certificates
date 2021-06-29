import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Inject,
  HttpStatus,
  HttpException,
  Param,
  Res,
  Query,
  Delete
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth
} from '@nestjs/swagger'
import { Response } from 'express'
import { Permission } from 'src/decorators/permission.decorator'
import { CreateParticipantResponseDto } from 'src/interfaces/participant/dto/create-participant-response.dto'
import { CreateParticipantDto } from 'src/interfaces/participant/dto/create-participant.dto'
import { GetParticipantByIdResponseDto } from 'src/interfaces/participant/dto/get-participant-by-id-response.dto'
import { GetParticipantsResponseDto } from 'src/interfaces/participant/dto/get-participant-response.dto'
import { ListParticipantDto } from 'src/interfaces/participant/dto/list-participant.dto'
import { UpdateParticipantResponseDto } from 'src/interfaces/participant/dto/update-participant-response.dto'
import { UpdateParticipantDto } from 'src/interfaces/participant/dto/update-participant.dto'
import { IServiceParticipantCreateResponse } from 'src/interfaces/participant/service-participant-create-response.interface'
import { IServiceParticipantGetByIdResponse } from 'src/interfaces/participant/service-participant-get-by-id-response.interface'
import { IServiceParticipantListResponse } from 'src/interfaces/participant/service-participant-list-response.interface'
import { IServiceParticipantUpdateByIdResponse } from 'src/interfaces/participant/service-participant-update-by-id-response.interface'
import { DeleteUserResponseDto } from 'src/interfaces/user/dto/delete-user-response.dto'
import { GetUserByIdResponseDto } from 'src/interfaces/user/dto/get-user-by-id-response.dto'
import { UpdateUserResponseDto } from 'src/interfaces/user/dto/update-user-response.dto'
import { UpdateUserDto } from 'src/interfaces/user/dto/update-user.dto'
import { UserIdDto } from 'src/interfaces/user/dto/user-id.dto'
import { IServiceUserDeleteResponse } from 'src/interfaces/user/service-user-delete-response.interface'
import { IServiceUserUpdateByIdResponse } from 'src/interfaces/user/service-user-update-by-id-response.interface'

import { Authorization } from '../decorators/authorization.decorator'
import { IServiceUserGetByIdResponse } from '../interfaces/user/service-user-get-by-id-response.interface'
import { ParticipantIdDto } from './../interfaces/participant/dto/participant-id.dto'

@Controller('participants')
@ApiBearerAuth('JWT')
@ApiTags('participants')
export class ParticipantsController {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  @Get()
  @Authorization(true)
  @Permission('participant_list')
  @ApiOkResponse({
    type: GetParticipantsResponseDto,
    description: 'List of participant'
  })
  public async getParticipants(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ListParticipantDto
  ): Promise<GetParticipantsResponseDto> {
    const { search, page, per_page, sort_by, order_by } = query
    const participantsResponse: IServiceParticipantListResponse = await this.userServiceClient
      .send('user_list', {
        participant: true,
        name: search,
        page: Number(page),
        perPage: Number(per_page),
        sortBy: sort_by,
        orderBy: order_by
      })
      .toPromise()

    res.header('x-total-count', String(participantsResponse?.data.totalCount))
    res.header('x-total-page', String(participantsResponse?.data.totalPages))

    return {
      message: participantsResponse.message,
      data: participantsResponse?.data?.users
    }
  }

  @Post()
  @Authorization(true)
  @Permission('participant_create')
  @ApiCreatedResponse({
    type: CreateParticipantResponseDto,
    description: 'Create new participant'
  })
  public async createParticipant(
    @Body() participantRequest: CreateParticipantDto
  ): Promise<CreateParticipantResponseDto> {
    const { name, email, cpf, dob, phone, institution } = participantRequest

    const createParticipantResponse: IServiceParticipantCreateResponse = await this.userServiceClient
      .send('user_create', {
        name: name,
        email: email,
        role: 'PARTICIPANT',
        personal_data: {
          cpf: cpf.replace(/[^\d]+/g, ''),
          dob: dob,
          phone: phone,
          institution: institution
        }
      })
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

  @Get(':id')
  @Authorization(true)
  @Permission('participant_get_by_id')
  @ApiOkResponse({
    type: GetParticipantByIdResponseDto,
    description: 'Find participant by id'
  })
  public async getParticipantById(
    @Param() params: ParticipantIdDto
  ): Promise<GetParticipantByIdResponseDto> {
    const { id } = params

    const userResponse: IServiceParticipantGetByIdResponse = await this.userServiceClient
      .send('user_get_by_id', id)
      .toPromise()

    return {
      message: userResponse.message,
      data: userResponse?.data?.user
    }
  }

  @Put(':id')
  @Authorization(true)
  @Permission('participant_update_by_id')
  @ApiOkResponse({
    type: UpdateParticipantResponseDto
  })
  public async updateParticipant(
    @Param() params: ParticipantIdDto,
    @Body() participantRequest: UpdateParticipantDto
  ): Promise<UpdateParticipantResponseDto> {
    const { name, email, dob, phone, institution } = participantRequest
    const updateParticipantResponse: IServiceParticipantUpdateByIdResponse = await this.userServiceClient
      .send('user_update_by_id', {
        user: {
          name: name,
          email: email,
          personal_data: {
            dob: dob,
            phone: phone,
            institution: institution
          }
        },
        id: params.id
      })
      .toPromise()

    if (updateParticipantResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: updateParticipantResponse.message,
          errors: updateParticipantResponse.errors,
          data: null
        },
        updateParticipantResponse.status
      )
    }

    return {
      message: updateParticipantResponse.message,
      data: updateParticipantResponse.user,
      errors: null
    }
  }

  @Delete(':id')
  @Authorization(true)
  @Permission('participant_delete_by_id')
  @ApiOkResponse({
    type: DeleteUserResponseDto
  })
  public async deleteUser(
    @Param() params: UserIdDto
  ): Promise<DeleteUserResponseDto> {
    const deleteUserResponse: IServiceUserDeleteResponse = await this.userServiceClient
      .send('user_delete_by_id', {
        id: params.id,
        participant: true
      })
      .toPromise()

    if (deleteUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: deleteUserResponse.message,
          errors: deleteUserResponse.errors,
          data: null
        },
        deleteUserResponse.status
      )
    }

    return {
      message: deleteUserResponse.message,
      data: null,
      errors: null
    }
  }
}
