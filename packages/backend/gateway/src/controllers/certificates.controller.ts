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
import { IServiceCertificateListResponse } from 'src/interfaces/certificate/service-certificate-list-response.interface'

import { Authorization } from '../decorators/authorization.decorator'
import { Permission } from '../decorators/permission.decorator'
import { CertificateIdDto } from '../interfaces/certificate/dto/certificate-id.dto'
import { CreateCertificateResponseDto } from '../interfaces/certificate/dto/create-certificate-response.dto'
import { CreateCertificateDto } from '../interfaces/certificate/dto/create-certificate.dto'
import { EventIdDto } from '../interfaces/certificate/dto/event-id.dto'
import { ListCertificateResponseDto } from '../interfaces/certificate/dto/list-certificate-response.dto'
import { ListCertificateDto } from '../interfaces/certificate/dto/list-certificate.dto'
// import { EventIdDto } from '../interfaces/certificate/dto/event-id.dto'
// import { ListCertificateResponseDto } from '../interfaces/certificate/dto/list-certificate-response.dto'
// import { ListCertificateDto } from '../interfaces/certificate/dto/list-certificate.dto'
import { IServiceCertificateCreateResponse } from '../interfaces/certificate/service-certificate-create-response.interface'
// import { IServiceCertificateListResponse } from '../interfaces/certificate/service-certificate-list-response.interface'
import { IAuthorizedRequest } from '../interfaces/common/authorized-request.interface'
import { IServiceEventGetByIdResponse } from '../interfaces/event/service-event-get-by-id-response.interface'
// import capitalize from '../utils/capitalize'

@Controller('events/:event_id/certificates')
@ApiBearerAuth('JWT')
@ApiTags('certificates')
export class CertificatesController {
  constructor(
    @Inject('CERTIFICATE_SERVICE')
    private readonly certificateServiceClient: ClientProxy,
    @Inject('EVENT_SERVICE')
    private readonly eventServiceClient: ClientProxy
  ) {}

  @Get()
  @Authorization(true)
  @Permission('certificate_list')
  @ApiOkResponse({
    type: ListCertificateResponseDto,
    description: 'List of certificates'
  })
  public async getCertificates(
    @Req() request: IAuthorizedRequest,
    @Param() params: EventIdDto,
    @Res({ passthrough: true }) res: Response,
    @Query() query: ListCertificateDto
  ): Promise<ListCertificateResponseDto> {
    const { search, page, per_page, sort_by, order_by } = query

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

    const certificatesResponse: IServiceCertificateListResponse = await this.certificateServiceClient
      .send('certificate_list', {
        name: search,
        event: eventResponse.data.event.id,
        page: Number(page),
        perPage: Number(per_page),
        sortBy: sort_by,
        orderBy: order_by
      })
      .toPromise()

    res.header('x-total-count', String(certificatesResponse?.data.totalCount))
    res.header('x-total-page', String(certificatesResponse?.data.totalPages))

    return {
      message: certificatesResponse.message,
      data: certificatesResponse?.data?.certificates
    }
  }

  @Post()
  @Authorization(true)
  @Permission('certificate_create')
  @ApiCreatedResponse({
    type: CreateCertificateResponseDto
  })
  public async createCertificate(
    @Req() request: IAuthorizedRequest,
    @Param() params: CertificateIdDto,
    @Body() certificateRequest: CreateCertificateDto
  ): Promise<CreateCertificateResponseDto> {
    const {
      activity,
      function: _function,
      workload,
      start_date,
      end_date,
      authorship_order,
      additional_field,
      participant
    } = certificateRequest

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

    const createCertificateResponse: IServiceCertificateCreateResponse = await this.certificateServiceClient
      .send('certificate_create', {
        activity,
        function: _function,
        participant,
        event: eventResponse.data.event.id,
        workload,
        start_date,
        end_date,
        authorship_order,
        additional_field
      })
      .toPromise()

    if (createCertificateResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createCertificateResponse.message,
          data: null,
          errors: createCertificateResponse.errors
        },
        createCertificateResponse.status
      )
    }

    return {
      message: createCertificateResponse.message,
      data: {
        certificate: createCertificateResponse.certificate
      },
      errors: null
    }
  }

  // @Delete(':id')
  // @Authorization(true)
  // @Permission('certificate_delete_by_id')
  // @ApiOkResponse({
  //   type: DeleteCertificateResponseDto
  // })
  // public async deleteCertificate(
  //   @Req() request: IAuthorizedRequest,
  //   @Param() params: CertificateIdDto
  // ): Promise<DeleteCertificateResponseDto> {
  //   const userInfo = request.user

  //   const deleteCertificateResponse: IServiceCertificateDeleteResponse = await this.certificateServiceClient
  //     .send('certificate_delete_by_id', {
  //       id: params.id,
  //       permission: userInfo.role !== 'ADMIN' &&
  //     })
  //     .toPromise()

  //   if (deleteCertificateResponse.status !== HttpStatus.OK) {
  //     throw new HttpException(
  //       {
  //         message: deleteCertificateResponse.message,
  //         errors: deleteCertificateResponse.errors,
  //         data: null
  //       },
  //       deleteCertificateResponse.status
  //     )
  //   }

  //   return {
  //     message: deleteCertificateResponse.message,
  //     data: null,
  //     errors: null
  //   }
  // }
}
