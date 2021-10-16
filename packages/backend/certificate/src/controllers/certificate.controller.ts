import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { ICertificateValidateResponse } from 'src/interfaces/certificate-validate-response.interface'

import { ICertificateByIdResponse } from '../interfaces/certificate-by-id-response.interface'
import { ICertificateCreateResponse } from '../interfaces/certificate-create-response.interface'
import { ICertificateDeleteResponse } from '../interfaces/certificate-delete-response.interface'
import { ICertificateListParams } from '../interfaces/certificate-list-params.interface'
import { ICertificateListResponse } from '../interfaces/certificate-list-response.interface'
import { ICertificate } from '../interfaces/certificate.interface'
import { CertificateService } from '../services/certificate.service'

@Controller()
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @MessagePattern('certificate_list')
  public async certificateList(
    params: ICertificateListParams
  ): Promise<ICertificateListResponse> {
    if (params.event || params.user) {
      const certificates = await this.certificateService.listCertificates(
        params
      )

      return {
        status: HttpStatus.OK,
        message: 'certificate_list_success',
        data: certificates
      }
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'certificate_list_bad_request',
        data: null
      }
    }
  }

  @MessagePattern('certificate_validate')
  public async validateCertificate(params: {
    key: string
  }): Promise<ICertificateValidateResponse> {
    let result: ICertificateValidateResponse

    if (params?.key) {
      const certificate = await this.certificateService.findCertificateByKey(
        params.key
      )
      result = {
        status: HttpStatus.OK,
        message: 'certificate_validate_success',
        data: !!certificate
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'certificate_validate_bad_request',
        data: false
      }
    }

    return result
  }

  @MessagePattern('certificate_get_by_id')
  public async getCertificateById(params: {
    id: string
  }): Promise<ICertificateByIdResponse> {
    let result: ICertificateByIdResponse

    if (params?.id) {
      const certificate = await this.certificateService.findCertificateById(
        params.id
      )
      if (certificate) {
        result = {
          status: HttpStatus.OK,
          message: 'certificate_get_by_id_success',
          data: { certificate }
        }
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'certificate_get_by_id_not_found',
          data: null
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'certificate_get_by_id_bad_request',
        data: null
      }
    }

    return result
  }

  @MessagePattern('certificate_create')
  public async certificateCreate(
    certificateBody: ICertificate
  ): Promise<ICertificateCreateResponse> {
    let result: ICertificateCreateResponse

    if (certificateBody) {
      try {
        const certificate = await this.certificateService.createCertificate(
          certificateBody
        )
        result = {
          status: HttpStatus.CREATED,
          message: 'certificate_create_success',
          certificate,
          errors: null
        }
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'certificate_create_precondition_failed',
          certificate: null,
          errors: e.errors
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'certificate_create_bad_request',
        certificate: null,
        errors: null
      }
    }

    return result
  }

  @MessagePattern('certificate_delete_by_id')
  public async certificateDeleteForUser(params: {
    id: string
    permission: boolean
  }): Promise<ICertificateDeleteResponse> {
    let result: ICertificateDeleteResponse

    if (params && params.id) {
      try {
        const certificate = await this.certificateService.findCertificateById(
          params.id
        )

        if (certificate) {
          await this.certificateService.removeCertificateById(params.id)
          result = {
            status: HttpStatus.OK,
            message: 'certificate_delete_by_id_success',
            errors: null
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'certificate_delete_by_id_not_found',
            errors: null
          }
        }
      } catch (e) {
        result = {
          status: HttpStatus.FORBIDDEN,
          message: 'certificate_delete_by_id_forbidden',
          errors: null
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'certificate_delete_by_id_bad_request',
        errors: null
      }
    }

    return result
  }
}
