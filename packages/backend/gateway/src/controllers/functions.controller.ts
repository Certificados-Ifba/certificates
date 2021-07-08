import {
  Controller,
  Inject,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Res,
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
import { Response } from 'express'

import { Authorization } from '../decorators/authorization.decorator'
import { Permission } from '../decorators/permission.decorator'
import { CreateFunctionResponseDto } from '../interfaces/function/dto/create-function-response.dto'
import { CreateFunctionDto } from '../interfaces/function/dto/create-function.dto'
import { GetFunctionsResponseDto } from '../interfaces/function/dto/get-functions-response.dto'
import { ListGenericDto } from '../interfaces/generic/dto/list-generic.dto'
import capitalize from '../utils/capitalize'
import { GetFunctionByIdResponseDto } from './../interfaces/function/dto/get-function-by-id-response.dto'
import { UpdateGenericResponseDto } from './../interfaces/function/dto/update-function-response.dto'
import { DeleteGenericResponseDto } from './../interfaces/generic/dto/delete-generic-response.dto'
import { GenericIdDto } from './../interfaces/generic/dto/generic-id.dto'
import { UpdateGenericDto } from './../interfaces/generic/dto/update-generic.dto'
import { IServiceGenericCreateResponse } from './../interfaces/generic/service-generic-create-response.interface'
import { IServiceGenericDeleteResponse } from './../interfaces/generic/service-generic-delete-response.interface'
import { IServiceGenericGetByIdResponse } from './../interfaces/generic/service-generic-get-by-id-response.interface'
import { IServiceGenericListResponse } from './../interfaces/generic/service-generic-list-response.interface'
import { IServiceGenericUpdateByIdResponse } from './../interfaces/generic/service-generic-update-by-id-response.interface'

@Controller('functions')
@ApiBearerAuth('JWT')
@ApiTags('functions')
export class FunctionsController {
  constructor(
    @Inject('GENERIC_SERVICE')
    private readonly genericServiceClient: ClientProxy
  ) {}

  @Get()
  @Authorization(true)
  @Permission('generic_list')
  @ApiOkResponse({
    type: GetFunctionsResponseDto,
    description: 'List of functions'
  })
  public async getFunctions(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ListGenericDto
  ): Promise<GetFunctionsResponseDto> {
    const { search, page, per_page, sort_by, order_by } = query
    const functionsResponse: IServiceGenericListResponse = await this.genericServiceClient
      .send('generic_list', {
        type: 'function',
        name: search,
        page: Number(page),
        perPage: Number(per_page),
        sortBy: sort_by,
        orderBy: order_by
      })
      .toPromise()

    res.header('x-total-count', String(functionsResponse?.data.totalCount))
    res.header('x-total-page', String(functionsResponse?.data.totalPages))

    return {
      message: functionsResponse.message,
      data: functionsResponse?.data?.generics
    }
  }

  @Post()
  @Authorization(true)
  @Permission('generic_create')
  @ApiCreatedResponse({
    type: CreateFunctionResponseDto,
    description: 'Create new function'
  })
  public async createFunction(
    @Body() genericRequest: CreateFunctionDto
  ): Promise<CreateFunctionResponseDto> {
    const createFunctionResponse: IServiceGenericCreateResponse = await this.genericServiceClient
      .send('generic_create', {
        type: 'function',
        name: capitalize(genericRequest.name.trim())
      })
      .toPromise()

    if (createFunctionResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createFunctionResponse.message,
          data: null,
          errors: createFunctionResponse.errors
        },
        createFunctionResponse.status
      )
    }

    return {
      message: createFunctionResponse.message,
      data: createFunctionResponse.generic,
      errors: null
    }
  }

  @Get(':id')
  @Authorization(true)
  @Permission('generic_get_by_id')
  @ApiOkResponse({
    type: GetFunctionByIdResponseDto,
    description: 'Find function by id'
  })
  public async getGenericById(
    @Param() params: GenericIdDto
  ): Promise<GetFunctionByIdResponseDto> {
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
          name: capitalize(genericRequest.name.trim())
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
