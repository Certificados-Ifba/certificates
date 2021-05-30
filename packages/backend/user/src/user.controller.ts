import { Controller, HttpStatus, Inject } from '@nestjs/common'
import { MessagePattern, ClientProxy } from '@nestjs/microservices'

import { IUserConfirmResponse } from './interfaces/user-confirm-response.interface'
import { IUserCreateResponse } from './interfaces/user-create-response.interface'
import { IUserDeleteResponse } from './interfaces/user-delete-response.interface'
import { IUserListParams } from './interfaces/user-list-params.interface'
import { IUserListResponse } from './interfaces/user-list-response.interface'
import { IUserSearchResponse } from './interfaces/user-search-response.interface'
import { IUserUpdateByIdResponse } from './interfaces/user-update-by-id-response.interface'
import { IUserUpdateParams } from './interfaces/user-update-params.interface'
import { IUser } from './interfaces/user.interface'
import { UserService } from './services/user.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('MAILER_SERVICE') private readonly mailerServiceClient: ClientProxy
  ) {}

  @MessagePattern('user_search_by_credentials')
  public async searchUserByCredentials(searchParams: {
    email: string
    password: string
  }): Promise<IUserSearchResponse> {
    let result: IUserSearchResponse

    if (searchParams.email && searchParams.password) {
      const user = await this.userService.searchUser({
        email: searchParams.email
      })

      if (user) {
        if (await user.compareEncryptedPassword(searchParams.password)) {
          const userUpdeted = await this.userService.updateUserById(user.id, {
            last_login: new Date()
          })
          result = {
            status: HttpStatus.OK,
            message: 'user_search_by_credentials_success',
            data: { user: userUpdeted }
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'user_search_by_credentials_not_match',
            data: null
          }
        }
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_search_by_credentials_not_found',
          data: null
        }
      }
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'user_search_by_credentials_not_found',
        data: null
      }
    }

    return result
  }

  @MessagePattern('user_list')
  public async userList(params: IUserListParams): Promise<IUserListResponse> {
    const users = await this.userService.listUsers(params)

    return {
      status: HttpStatus.OK,
      message: 'user_list_success',
      data: users
    }
  }

  @MessagePattern('user_get_by_id')
  public async getUserById(id: string): Promise<IUserSearchResponse> {
    let result: IUserSearchResponse

    if (id) {
      const user = await this.userService.searchUserById(id)
      if (user) {
        result = {
          status: HttpStatus.OK,
          message: 'user_get_by_id_success',
          data: { user }
        }
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_get_by_id_not_found',
          data: null
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_get_by_id_bad_request',
        data: null
      }
    }

    return result
  }

  @MessagePattern('user_confirm')
  public async confirmUser(confirmParams: {
    password: string
    link: string
  }): Promise<IUserConfirmResponse> {
    let result: IUserConfirmResponse

    if (confirmParams) {
      const userLink = await this.userService.getUserLink(confirmParams.link)

      if (userLink) {
        const userId = userLink.user_id
        const user = await this.userService.updateUserById(userId, {
          password: confirmParams.password,
          is_confirmed: true
        })
        await this.userService.updateUserLinkById(userLink.id, {
          is_used: true
        })
        result = {
          status: HttpStatus.OK,
          message: 'user_confirm_success',
          user,
          errors: null
        }
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_confirm_not_found',
          user: null,
          errors: null
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_confirm_bad_request',
        user: null,
        errors: null
      }
    }

    return result
  }

  @MessagePattern('user_create')
  public async createUser(userParams: IUser): Promise<IUserCreateResponse> {
    let result: IUserCreateResponse

    if (
      userParams &&
      (userParams.role !== 'PARTICIPANT' ||
        (userParams.role === 'PARTICIPANT' &&
          userParams.personal_data.cpf &&
          userParams.personal_data.dob))
    ) {
      const usersWithEmail = await this.userService.searchUser({
        email: userParams.email
      })

      if (usersWithEmail) {
        result = {
          status: HttpStatus.CONFLICT,
          message: 'user_create_conflict',
          data: null,
          errors: {
            email: {
              message: 'Email already exists',
              path: 'email'
            }
          }
        }
      } else {
        try {
          userParams.is_confirmed = false
          userParams.password = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, '')

          const createdUser = await this.userService.createUser(userParams)
          const userLink = await this.userService.createUserLink(createdUser.id)
          delete createdUser.password
          result = {
            status: HttpStatus.CREATED,
            message: 'user_create_success',
            data: { user: createdUser },
            errors: null
          }
          this.mailerServiceClient
            .send('mail_send', {
              to: createdUser.email,
              subject: 'Email de Confirmação',
              template: '/templates/confirm_email',
              context: {
                name: createdUser.name,
                email: createdUser.email,
                link: this.userService.getConfirmationLink(userLink.link)
              }
            })
            .toPromise()
        } catch (e) {
          result = {
            status: HttpStatus.PRECONDITION_FAILED,
            message: 'user_create_precondition_failed',
            data: null,
            errors: e.errors
          }
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_create_bad_request',
        data: null,
        errors: null
      }
    }

    return result
  }

  @MessagePattern('user_update_by_id')
  public async userUpdateById(params: {
    user: IUserUpdateParams
    id: string
  }): Promise<IUserUpdateByIdResponse> {
    let result: IUserUpdateByIdResponse
    if (params.id) {
      try {
        const user = await this.userService.searchUserById(params.id)
        if (user) {
          const updatedUser = Object.assign(user, params.user)
          await updatedUser.save()
          result = {
            status: HttpStatus.OK,
            message: 'user_update_by_id_success',
            user: updatedUser,
            errors: null
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'user_update_by_id_not_found',
            user: null,
            errors: null
          }
        }
      } catch (e) {
        result = {
          status: HttpStatus.PRECONDITION_FAILED,
          message: 'user_update_by_id_precondition_failed',
          user: null,
          errors: e.errors
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_update_by_id_bad_request',
        user: null,
        errors: null
      }
    }

    return result
  }

  @MessagePattern('user_delete_by_id')
  public async userDeleteForUser(params: {
    id: string
  }): Promise<IUserDeleteResponse> {
    let result: IUserDeleteResponse

    if (params && params.id) {
      try {
        const user = await this.userService.searchUserById(params.id)

        if (user) {
          await this.userService.removeUserById(params.id)
          result = {
            status: HttpStatus.OK,
            message: 'user_delete_by_id_success',
            errors: null
          }
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'user_delete_by_id_not_found',
            errors: null
          }
        }
      } catch (e) {
        result = {
          status: HttpStatus.FORBIDDEN,
          message: 'user_delete_by_id_forbidden',
          errors: null
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_delete_by_id_bad_request',
        errors: null
      }
    }

    return result
  }
}
