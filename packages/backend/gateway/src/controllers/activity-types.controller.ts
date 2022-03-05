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

import { Authorization } from '../decorators/authorization.decorator'
import { Permission } from '../decorators/permission.decorator'
import { CreateActivityTypeResponseDto } from '../interfaces/activity-type/dto/create-activity-type-response.dto'
import { CreateActivityTypeDto } from '../interfaces/activity-type/dto/create-activity-type.dto'
import { GetActivityTypeByIdResponseDto } from '../interfaces/activity-type/dto/get-activity-type-by-id-response.dto'
import { ListActivityTypeResponseDto } from '../interfaces/activity-type/dto/list-activity-type-response.dto'
import { UpdateActivityTypeResponseDto } from '../interfaces/activity-type/dto/update-activity-type-response.dto'
import { DeleteGenericResponseDto } from '../interfaces/generic/dto/delete-generic-response.dto'
import { GenericIdDto } from '../interfaces/generic/dto/generic-id.dto'
import { ListGenericDto } from '../interfaces/generic/dto/list-generic.dto'
import { UpdateGenericDto } from '../interfaces/generic/dto/update-generic.dto'
import { IServiceGenericCreateResponse } from '../interfaces/generic/service-generic-create-response.interface'
import { IServiceGenericDeleteResponse } from '../interfaces/generic/service-generic-delete-response.interface'
import { IServiceGenericGetByIdResponse } from '../interfaces/generic/service-generic-get-by-id-response.interface'
import { IServiceGenericListResponse } from '../interfaces/generic/service-generic-list-response.interface'
import { IServiceGenericUpdateByIdResponse } from '../interfaces/generic/service-generic-update-by-id-response.interface'

@Controller('activity_types')
@ApiBearerAuth('JWT')
@ApiTags('activity_types')
export class ActivityTypesController {
  constructor(
    @Inject('GENERIC_SERVICE')
    private readonly genericServiceClient: ClientProxy
  ) {}

  @Get()
  @Authorization(true)
  @Permission('generic_list')
  @ApiOkResponse({
    type: ListActivityTypeResponseDto,
    description: 'List of activity'
  })
  public async listActivityTypes(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ListGenericDto
  ): Promise<ListActivityTypeResponseDto> {
    const { search, page, per_page, sort_by, order_by } = query
    const activitiesResponse: IServiceGenericListResponse = await this.genericServiceClient
      .send('generic_list', {
        type: 'activity',
        name: search,
        page: Number(page),
        perPage: Number(per_page),
        sortBy: sort_by,
        orderBy: order_by
      })
      .toPromise()

    res.header('x-total-count', String(activitiesResponse?.data.totalCount))
    res.header('x-total-page', String(activitiesResponse?.data.totalPages))

    return {
      message: activitiesResponse.message,
      data: activitiesResponse?.data?.generics
    }
  }

  @Post()
  @Authorization(true)
  @Permission('generic_create')
  @ApiCreatedResponse({
    type: CreateActivityTypeResponseDto,
    description: 'Create new activity'
  })
  public async createActivityType(
    @Body() genericRequest: CreateActivityTypeDto
  ): Promise<CreateActivityTypeResponseDto> {
    const createActivityTypeResponse: IServiceGenericCreateResponse = await this.genericServiceClient
      .send('generic_create', {
        type: 'activity',
        name: genericRequest.name
      })
      .toPromise()

    if (createActivityTypeResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createActivityTypeResponse.message,
          data: null,
          errors: createActivityTypeResponse.errors
        },
        createActivityTypeResponse.status
      )
    }

    return {
      message: createActivityTypeResponse.message,
      data: createActivityTypeResponse.generic,
      errors: null
    }
  }

  @Get(':id')
  @Authorization(true)
  @Permission('generic_get_by_id')
  @ApiOkResponse({
    type: GetActivityTypeByIdResponseDto,
    description: 'Find activity by id'
  })
  public async getGenericById(
    @Param() params: GenericIdDto
  ): Promise<GetActivityTypeByIdResponseDto> {
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
    type: UpdateActivityTypeResponseDto
  })
  public async updateGeneric(
    @Param() params: GenericIdDto,
    @Body() genericRequest: UpdateGenericDto
  ): Promise<UpdateActivityTypeResponseDto> {
    const updateGenericResponse: IServiceGenericUpdateByIdResponse = await this.genericServiceClient
      .send('generic_update_by_id', {
        id: params.id,
        generic: {
          name: genericRequest.name
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
