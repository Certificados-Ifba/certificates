import {
  Controller,
  Inject,
  Post,
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
import { IServiceEventGetByIdResponse } from '../interfaces/event/service-event-get-by-id-response.interface'
import { CreateModelResponseDto } from '../interfaces/model/dto/create-model-response.dto'
import { CreateModelDto } from '../interfaces/model/dto/create-model.dto'
import { DeleteModelResponseDto } from '../interfaces/model/dto/delete-model-response.dto'
import { ModelIdDto } from '../interfaces/model/dto/model-id.dto'
import { IServiceModelCreateResponse } from '../interfaces/model/service-model-create-response.interface'
import { IServiceModelDeleteResponse } from '../interfaces/model/service-model-delete-response.interface'

@Controller('events/:event_id/models')
@ApiBearerAuth('JWT')
@ApiTags('models')
export class ModelsController {
  constructor(
    @Inject('CERTIFICATE_SERVICE')
    private readonly certificateServiceClient: ClientProxy,
    @Inject('EVENT_SERVICE')
    private readonly eventServiceClient: ClientProxy
  ) {}

  @Post()
  @Authorization(true)
  @Permission('model_create')
  @ApiCreatedResponse({
    type: CreateModelResponseDto
  })
  public async createModel(
    @Req() request: IAuthorizedRequest,
    @Param() params: ModelIdDto,
    @Body() certificateRequest: CreateModelDto
  ): Promise<CreateModelResponseDto> {
    const { name, pages, criterions } = certificateRequest

    const eventResponse: IServiceEventGetByIdResponse = await this.eventServiceClient
      .send('event_get_by_id', {
        id: params.event_id,
        user: request.user
      })
      .toPromise()

    if (eventResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: eventResponse.message,
          data: null,
          errors: null
        },
        eventResponse.status
      )
    }

    const createModelResponse: IServiceModelCreateResponse = await this.certificateServiceClient
      .send('model_create', {
        event: eventResponse.data.event.id,
        name,
        pages,
        criterions
      })
      .toPromise()

    if (createModelResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createModelResponse.message,
          data: null,
          errors: createModelResponse.errors
        },
        createModelResponse.status
      )
    }

    return {
      message: createModelResponse.message,
      data: {
        model: createModelResponse.model
      },
      errors: null
    }
  }

  @Delete(':id')
  @Authorization(true)
  @Permission('model_delete_by_id')
  @ApiOkResponse({
    type: DeleteModelResponseDto
  })
  public async deleteModel(
    @Param() params: ModelIdDto
  ): Promise<DeleteModelResponseDto> {
    const deleteModelResponse: IServiceModelDeleteResponse = await this.certificateServiceClient
      .send('model_delete_by_id', {
        id: params.id
      })
      .toPromise()

    if (deleteModelResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: deleteModelResponse.message,
          errors: deleteModelResponse.errors,
          data: null
        },
        deleteModelResponse.status
      )
    }

    return {
      message: deleteModelResponse.message,
      data: null,
      errors: null
    }
  }
}
