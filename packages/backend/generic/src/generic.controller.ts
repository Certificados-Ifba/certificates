import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { IGenericByIdResponse } from './interfaces/generic-by-id-response.interface'
import { IGenericCreateResponse } from './interfaces/generic-create-response.interface'
import { IGenericDeleteResponse } from './interfaces/generic-delete-response.interface'
import { IGenericListParams } from './interfaces/generic-list-params.interface'
import { IGenericListResponse } from './interfaces/generic-list-response.interface'
import { IGenericUpdateByIdResponse } from './interfaces/generic-update-by-id-response.interface'
import { IGenericUpdateParams } from './interfaces/generic-update-params.interface'
import { IGeneric } from './interfaces/generic.interface'
import { GenericService } from './services/generic.service'

@Controller()
export class GenericController {
  constructor(private readonly genericService: GenericService) {}

  @MessagePattern('generic_list')
  public async genericList(
    params: IGenericListParams
  ): Promise<IGenericListResponse> {
    let result: IGenericListResponse

    if (params?.type) {
      const generics = await this.genericService.listGenerics(params)

      result = {
        status: HttpStatus.OK,
        message: 'generic_list_success',
        data: generics
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'generic_list_bad_request',
        data: null
      }
    }

    return result
  }

  @MessagePattern('generic_get_by_id')
  public async getGenericById(id: string): Promise<IGenericByIdResponse> {
    let result: IGenericByIdResponse

    if (id) {
      const generic = await this.genericService.searchGenericById(id)
      if (generic) {
        result = {
          status: HttpStatus.OK,
          message: 'generic_get_by_id_success',
          generic
        }
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'generic_get_by_id_not_found',
          generic: null
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'generic_get_by_id_bad_request',
        generic: null
      }
    }

    return result
  }

  @MessagePattern('generic_create')
  public async genericCreate(
    genericBody: IGeneric
  ): Promise<IGenericCreateResponse> {
    let result: IGenericCreateResponse

    if (genericBody) {
      try {
        const exists = await this.genericService.searchGenericByName({
          type: genericBody.type,
          name: genericBody.name
        })
        if (!exists) {
          const generic = await this.genericService.createGeneric(genericBody)
          result = {
            status: HttpStatus.CREATED,
            message: 'generic_create_success',
            generic,
            errors: null
          }
        } else {
          result = {
            status: HttpStatus.CONFLICT,
            message: 'generic_create_conflict_name',
            generic: null,
            errors: null
          }
        }
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'generic_create_precondition_failed',
          generic: null,
          errors: e.errors
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'generic_create_bad_request',
        generic: null,
        errors: null
      }
    }

    return result
  }

  @MessagePattern('generic_delete_by_id')
  public async genericDeleteForUser(params: {
    id: string
  }): Promise<IGenericDeleteResponse> {
    let result: IGenericDeleteResponse

    if (params && params.id) {
      try {
        const generic = await this.genericService.searchGenericById(params.id)

        if (generic) {
          await this.genericService.removeGenericById(params.id)
          result = {
            status: HttpStatus.OK,
            message: 'generic_delete_by_id_success',
            errors: null
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'generic_delete_by_id_not_found',
            errors: null
          }
        }
      } catch (e) {
        result = {
          status: HttpStatus.FORBIDDEN,
          message: 'generic_delete_by_id_forbidden',
          errors: e.errors
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'generic_delete_by_id_bad_request',
        errors: null
      }
    }

    return result
  }

  @MessagePattern('generic_update_by_id')
  public async genericUpdateById(params: {
    generic: IGenericUpdateParams
    id: string
  }): Promise<IGenericUpdateByIdResponse> {
    let result: IGenericUpdateByIdResponse
    if (params.id) {
      try {
        const generic = await this.genericService.searchGenericById(params.id)
        if (generic) {
          const exists = await this.genericService.searchGenericByName(
            params.generic
          )
          if (!exists || exists.name === params.generic.name) {
            const updatedGeneric = Object.assign(generic, params.generic)
            this.genericService.updateGenericById(params.id, updatedGeneric)
            result = {
              status: HttpStatus.OK,
              message: 'generic_update_by_id_success',
              generic: updatedGeneric,
              errors: null
            }
          } else {
            result = {
              status: HttpStatus.CONFLICT,
              message: 'generic_update_by_id_conflict_name',
              generic: null,
              errors: null
            }
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'generic_update_by_id_not_found',
            generic: null,
            errors: null
          }
        }
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'generic_update_by_id_precondition_failed',
          generic: null,
          errors: e.errors
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'generic_update_by_id_bad_request',
        generic: null,
        errors: null
      }
    }

    return result
  }
}
