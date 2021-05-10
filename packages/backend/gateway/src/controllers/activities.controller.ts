import {
  Controller,
  Inject,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Delete,
  Param,
  Put,
  Query,
  Res
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse
} from '@nestjs/swagger'
import { Response } from 'express'
import { Authorization } from 'src/decorators/authorization.decorator'
import { Permission } from 'src/decorators/permission.decorator'
import { CreateActivityResponseDto } from 'src/interfaces/activity/dto/create-activity-response.dto'
import { CreateActivityDto } from 'src/interfaces/activity/dto/create-activity.dto'
import { GetActivityByIdResponseDto } from 'src/interfaces/activity/dto/get-activity-by-id-response.dto'
import { GetActivitysResponseDto } from 'src/interfaces/activity/dto/get-activity-response.dto'
import { UpdateGenericResponseDto } from 'src/interfaces/function/dto/update-function-response.dto'
import { DeleteGenericResponseDto } from 'src/interfaces/generic/dto/delete-generic-response.dto'
import { GenericIdDto } from 'src/interfaces/generic/dto/generic-id.dto'
import { ListGenericDto } from 'src/interfaces/generic/dto/list-generic.dto'
import { UpdateGenericDto } from 'src/interfaces/generic/dto/update-generic.dto'
import { IServiceGenericDeleteResponse } from 'src/interfaces/generic/service-generic-delete-response.interface'
import { IServiceGenericGetByIdResponse } from 'src/interfaces/generic/service-generic-get-by-id-response.interface'
import { IServiceGenericListResponse } from 'src/interfaces/generic/service-generic-list-response.interface'
import { IServiceGenericUpdateByIdResponse } from 'src/interfaces/generic/service-generic-update-by-id-response.interface'
import capitalize from 'src/utils/capitalize'

import { IServiceGenericCreateResponse } from '../interfaces/generic/service-generic-create-response.interface'

@Controller('activities')
@ApiBearerAuth('JWT')
@ApiTags('activities')
export class ActivitiesController {
  constructor(
    @Inject('GENERIC_SERVICE')
    private readonly genericServiceClient: ClientProxy
  ) {}

  @Get()
  @Authorization(true)
  @Permission('generic_list')
  @ApiOkResponse({
    type: GetActivitysResponseDto,
    description: 'List of activity'
  })
  public async getActivitys(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ListGenericDto
  ): Promise<GetActivitysResponseDto> {
    const { search, page, per_page, sort_by, order_by } = query
    const activitysResponse: IServiceGenericListResponse = await this.genericServiceClient
      .send('generic_list', {
        type: 'activity',
        name: search,
        page: Number(page),
        perPage: Number(per_page),
        sortBy: sort_by,
        orderBy: order_by
      })
      .toPromise()

    res.header('x-total-count', String(activitysResponse?.data.totalCount))
    res.header('x-total-page', String(activitysResponse?.data.totalPages))

    return {
      message: activitysResponse.message,
      data: activitysResponse?.data?.generics
    }
  }

  @Post()
  @Authorization(true)
  @Permission('generic_create')
  @ApiCreatedResponse({
    type: CreateActivityResponseDto,
    description: 'Create new activity'
  })
  public async createActivity(
    @Body() genericRequest: CreateActivityDto
  ): Promise<CreateActivityResponseDto> {
    const createActivityResponse: IServiceGenericCreateResponse = await this.genericServiceClient
      .send('generic_create', {
        type: 'activity',
        name: capitalize(genericRequest.name)
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
      data: createActivityResponse.generic,
      errors: null
    }
  }

  @Get(':id')
  @Authorization(true)
  @Permission('generic_get_by_id')
  @ApiOkResponse({
    type: GetActivityByIdResponseDto,
    description: 'Find activity by id'
  })
  public async getGenericById(
    @Param() params: GenericIdDto
  ): Promise<GetActivityByIdResponseDto> {
    const { id } = params

    const genericResponse: IServiceGenericGetByIdResponse = await this.genericServiceClient
      .send('generic_get_by_id', id)
      .toPromise()
    return {
      message: genericResponse.message,
      data: genericResponse.generic
    }
  }

  @Delete(':id')
  @Authorization(true)
  @Permission('generic_delete_by_id')
  @ApiOkResponse({
    type: DeleteGenericResponseDto
  })
  public async deleteGeneric(
    @Param() params: GenericIdDto
  ): Promise<DeleteGenericResponseDto> {
    const deleteGenericResponse: IServiceGenericDeleteResponse = await this.genericServiceClient
      .send('generic_delete_by_id', {
        id: params.id
      })
      .toPromise()

    if (deleteGenericResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: deleteGenericResponse.message,
          errors: deleteGenericResponse.errors,
          data: null
        },
        deleteGenericResponse.status
      )
    }

    return {
      message: deleteGenericResponse.message,
      data: null,
      errors: null
    }
  }

  @Put(':id')
  @Authorization(true)
  @Permission('generic_update_by_id')
  @ApiOkResponse({
    type: UpdateGenericResponseDto
  })
  public async updateGeneric(
    @Param() params: GenericIdDto,
    @Body() genericRequest: UpdateGenericDto
  ): Promise<UpdateGenericResponseDto> {
    const updateGenericResponse: IServiceGenericUpdateByIdResponse = await this.genericServiceClient
      .send('generic_update_by_id', {
        id: params.id,
        generic: {
          name: capitalize(genericRequest.name)
        }
      })
      .toPromise()

    if (updateGenericResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: updateGenericResponse.message,
          errors: updateGenericResponse.errors,
          data: null
        },
        updateGenericResponse.status
      )
    }

    return {
      message: updateGenericResponse.message,
      data: updateGenericResponse.generic,
      errors: null
    }
  }
}
