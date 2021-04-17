import {
  Controller,
  Inject,
  Post,
  Body,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger'
import { Authorization } from 'src/decorators/authorization.decorator'
import { Permission } from 'src/decorators/permission.decorator'

import { CreateActivityResponseDto } from '../interfaces/activity/dto/create-activity-response.dto'
import { CreateActivityDto } from '../interfaces/activity/dto/create-activity.dto'
import { IServiceGenericCreateResponse } from '../interfaces/generic/service-generic-create-response.interface'

@Controller('activities')
@ApiBearerAuth('JWT')
@ApiTags('activities')
export class ActivitiesController {
  constructor(
    @Inject('GENERIC_SERVICE')
    private readonly genericServiceClient: ClientProxy
  ) {}

  @Post()
  @Authorization(true)
  @Permission('generic_create')
  @ApiCreatedResponse({
    type: CreateActivityResponseDto
  })
  public async createActivity(
    @Body() genericRequest: CreateActivityDto
  ): Promise<CreateActivityResponseDto> {
    const createActivityResponse: IServiceGenericCreateResponse = await this.genericServiceClient
      .send('generic_create', {
        type: 'activity',
        name: genericRequest.name
      })
      .toPromise()

    if (createActivityResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createActivityResponse.message,
          data: null,
          errors: createActivityResponse.errors
        },
        createActivityResponse.status
      )
    }

    return {
      message: createActivityResponse.message,
      data: {
        activity: createActivityResponse.generic
      },
      errors: null
    }
  }
}
