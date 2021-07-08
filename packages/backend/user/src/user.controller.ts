import { Controller, HttpStatus, Inject } from '@nestjs/common'
import { MessagePattern, ClientProxy } from '@nestjs/microservices'

import { IUserConfirmResponse } from './interfaces/user-confirm-response.interface'
import { IUserCreateResponse } from './interfaces/user-create-response.interface'
import { IUserDeleteResponse } from './interfaces/user-delete-response.interface'
import { IUserForgotPasswordResponse } from './interfaces/user-forgot-password-response.interface'
import { IUserGetByLinkResponse } from './interfaces/user-get-by-link-response.interface'
import { IUserLink } from './interfaces/user-link.interface'
import { IUserListParams } from './interfaces/user-list-params.interface'
import { IUserListResponse } from './interfaces/user-list-response.interface'
import { IUserResendResponse } from './interfaces/user-resend-response.interface'
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
      const user = await this.userService.searchUserByEmail(searchParams.email)

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

  @MessagePattern('user_get_by_link')
  public async getUserByLink(link: string): Promise<IUserGetByLinkResponse> {
    let result: IUserGetByLinkResponse

    if (link) {
      const userLink = await this.userService.getUserLink(link)
      if (userLink) {
        if (userLink.expired && userLink.expired < Date.now()) {
          result = {
            status: HttpStatus.GONE,
            message: 'user_get_by_link_expired',
            data: null
          }
        } else {
          result = {
            status: HttpStatus.OK,
            message: 'user_get_by_link_success',
            data: userLink.expired ? 'reset' : 'register'
          }
        }
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_get_by_link_not_found',
          data: null
        }
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_get_by_link_bad_request',
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
        const user = await this.userService.updateUserById(userLink.user, {
          last_login: new Date(),
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

  @MessagePattern('user_forgot_password')
  public async forgotPasswordUser(forgotPasswordParams: {
    email: string
  }): Promise<IUserForgotPasswordResponse> {
    let result: IUserForgotPasswordResponse
    const user = await this.userService.searchUserByEmail(
      forgotPasswordParams.email
    )
    if (user) {
      const userLink = await this.userService.createUserLink(
        user.id,
        Date.now() + 2 * 60 * 60 * 1000
      )
      result = {
        status: HttpStatus.OK,
        message: 'user_forgot_password_success',
        errors: null
      }
      this.mailerServiceClient
        .send('mail_send', {
          to: user.email,
          subject: 'Recuperação de senha',
          template: '/templates/forgot_password',
          context: {
            name: user.name,
            email: user.email,
            link: this.userService.getConfirmationLink(userLink.link),
            site: this.userService.getWebUrl()
          }
        })
        .toPromise()
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'user_forgot_password_not_found',
        errors: null
      }
    }

    return result
  }

  @MessagePattern('user_resend')
  public async resendMail(id: string): Promise<IUserResendResponse> {
    let result: IUserResendResponse
    let userLink: IUserLink
    const user = await this.userService.searchUserById(id)

    if (user) {
      if (user.is_confirmed) {
        userLink = await this.userService.createUserLink(
          user.id,
          Date.now() + 2 * 60 * 60 * 1000
        )
        this.mailerServiceClient
          .send('mail_send', {
            to: user.email,
            subject: 'Recuperação de senha',
            template: '/templates/forgot_password',
            context: {
              name: user.name,
              email: user.email,
              link: this.userService.getConfirmationLink(userLink.link),
              site: this.userService.getWebUrl()
            }
          })
          .toPromise()
      } else {
        userLink = await this.userService.getUserLinkByUser(user.id)
        if (!userLink) {
          userLink = await this.userService.createUserLink(user.id)
        }
        this.mailerServiceClient
          .send('mail_send', {
            to: user.email,
            subject: 'E-mail de Confirmação',
            template: '/templates/confirm_email',
            context: {
              name: user.name,
              email: user.email,
              link: this.userService.getConfirmationLink(userLink.link),
              site: this.userService.getWebUrl()
            }
          })
          .toPromise()
      }
      result = {
        status: HttpStatus.OK,
        message: 'user_resend_success'
      }
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'user_resend_not_found'
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
      const usersWithEmail = await this.userService.searchUserByEmail(
        userParams.email
      )

      if (usersWithEmail) {
        result = {
          status: HttpStatus.CONFLICT,
          message: 'user_create_conflict',
          data: null,
          errors: {
            email: {
              message: 'E-mail already registered',
              path: 'email'
            }
          }
        }
      } else {
        try {
          if (userParams.role !== 'PARTICIPANT') {
            userParams.is_confirmed = false
            userParams.password = Math.random().toString(16).replace('0.', '')
          } else {
            const usersWithCPF = await this.userService.searchUserByCPF(
              userParams.personal_data.cpf
            )
            if (usersWithCPF) {
              return {
                status: HttpStatus.CONFLICT,
                message: 'user_create_conflict',
                data: null,
                errors: {
                  cpf: {
                    message: 'CPF already registered',
                    path: 'cpf'
                  }
                }
              }
            }
          }

          const createdUser = await this.userService.createUser(userParams)
          delete createdUser.password
          result = {
            status: HttpStatus.CREATED,
            message: 'user_create_success',
            data: { user: createdUser },
            errors: null
          }
          if (userParams.role !== 'PARTICIPANT') {
            const userLink = await this.userService.createUserLink(
              createdUser.id
            )
            this.mailerServiceClient
              .send('mail_send', {
                to: createdUser.email,
                subject: 'E-mail de Confirmação',
                template: '/templates/confirm_email',
                context: {
                  name: createdUser.name,
                  email: createdUser.email,
                  link: this.userService.getConfirmationLink(userLink.link),
                  site: this.userService.getWebUrl()
                }
              })
              .toPromise()
          }
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
          if (user.personal_data.cpf)
            params.user.personal_data.cpf = user.personal_data.cpf

          const updatedUser = Object.assign(user, params.user)

          if (params.user.email && params.user.email !== user.email) {
            const usersWithEmail = await this.userService.searchUserByEmail(
              params.user.email
            )
            if (params.user.email && usersWithEmail) {
              return {
                status: HttpStatus.CONFLICT,
                message: 'user_update_by_id_conflict',
                user: null,
                errors: {
                  email: {
                    message: 'E-mail already registered',
                    path: 'email'
                  }
                }
              }
            }
            updatedUser.is_confirmed = false
            updatedUser.password = Math.random().toString(16).replace('0.', '')
          }
          await updatedUser.save()
          if (params.user.email) {
            const userLink = await this.userService.createUserLink(user.id)
            this.mailerServiceClient
              .send('mail_send', {
                to: user.email,
                subject: 'E-mail de Confirmação',
                template: '/templates/confirm_email',
                context: {
                  name: user.name,
                  email: user.email,
                  link: this.userService.getConfirmationLink(userLink.link),
                  site: this.userService.getWebUrl()
                }
              })
              .toPromise()
          }
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
        console.log(e)

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
    participant?: boolean
  }): Promise<IUserDeleteResponse> {
    let result: IUserDeleteResponse

    if (params && params.id) {
      try {
        const user = await this.userService.searchUserById(params.id)

        if (params.participant && user.role !== 'PARTICIPANT')
          throw new Error('Not allowed')

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
