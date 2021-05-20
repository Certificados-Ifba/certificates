import {
  Controller,
  Post,
  Put,
  Get,
  Body,
  Req,
  Inject,
  HttpStatus,
  HttpException,
  Param,
  Res,
  Query,
  Delete
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBearerAuth
} from '@nestjs/swagger'
import { Response } from 'express'
import { Permission } from 'src/decorators/permission.decorator'
import { DeleteUserResponseDto } from 'src/interfaces/user/dto/delete-user-response.dto'
import { GetUserByIdResponseDto } from 'src/interfaces/user/dto/get-user-by-id-response.dto'
import { GetUsersResponseDto } from 'src/interfaces/user/dto/get-user-response.dto'
import { ListUserDto } from 'src/interfaces/user/dto/list-user.dto'
import { UpdateUserResponseDto } from 'src/interfaces/user/dto/update-user-response.dto'
import { UpdateUserDto } from 'src/interfaces/user/dto/update-user.dto'
import { UserIdDto } from 'src/interfaces/user/dto/user-id.dto'
import { IServiceUserDeleteResponse } from 'src/interfaces/user/service-user-delete-response.interface'
import { IServiceUserListResponse } from 'src/interfaces/user/service-user-list-response.interface'
import { IServiceUserUpdateByIdResponse } from 'src/interfaces/user/service-user-update-by-id-response.interface'

import { Authorization } from '../decorators/authorization.decorator'
import { IAuthorizedRequest } from '../interfaces/common/authorized-request.interface'
import { IServiveTokenCreateResponse } from '../interfaces/token/service-token-create-response.interface'
import { IServiceTokenDestroyResponse } from '../interfaces/token/service-token-destroy-response.interface'
import { ConfirmUserResponseDto } from '../interfaces/user/dto/confirm-user-response.dto'
import { ConfirmUserDto } from '../interfaces/user/dto/confirm-user.dto'
import { CreateUserResponseDto } from '../interfaces/user/dto/create-user-response.dto'
import { CreateUserDto } from '../interfaces/user/dto/create-user.dto'
import { GetUserByTokenResponseDto } from '../interfaces/user/dto/get-user-by-token-response.dto'
import { LoginUserResponseDto } from '../interfaces/user/dto/login-user-response.dto'
import { LoginUserDto } from '../interfaces/user/dto/login-user.dto'
import { LogoutUserResponseDto } from '../interfaces/user/dto/logout-user-response.dto'
import { IServiceUserConfirmResponse } from '../interfaces/user/service-user-confirm-response.interface'
import { IServiceUserCreateResponse } from '../interfaces/user/service-user-create-response.interface'
import { IServiceUserGetByIdResponse } from '../interfaces/user/service-user-get-by-id-response.interface'
import { IServiceUserSearchResponse } from '../interfaces/user/service-user-search-response.interface'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    @Inject('TOKEN_SERVICE') private readonly tokenServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy
  ) {}

  @Delete(':id')
  @Authorization(true)
  @Permission('user_delete_by_id')
  @ApiOkResponse({
    type: DeleteUserResponseDto
  })
  public async deleteUser(
    @Param() params: UserIdDto
  ): Promise<DeleteUserResponseDto> {
    const deleteUserResponse: IServiceUserDeleteResponse = await this.userServiceClient
      .send('user_delete_by_id', {
        id: params.id
      })
      .toPromise()

    if (deleteUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: deleteUserResponse.message,
          errors: deleteUserResponse.errors,
          data: null
        },
        deleteUserResponse.status
      )
    }

    return {
      message: deleteUserResponse.message,
      data: null,
      errors: null
    }
  }

  @Put(':id')
  @Authorization(true)
  @Permission('user_update_by_id')
  @ApiOkResponse({
    type: UpdateUserResponseDto
  })
  public async updateUser(
    @Param() params: UserIdDto,
    @Body() userRequest: UpdateUserDto
  ): Promise<UpdateUserResponseDto> {
    const updateUserResponse: IServiceUserUpdateByIdResponse = await this.userServiceClient
      .send('user_update_by_id', {
        user: { name: userRequest.name, role: userRequest.role },
        id: params.id
      })
      .toPromise()

    if (updateUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: updateUserResponse.message,
          errors: updateUserResponse.errors,
          data: null
        },
        updateUserResponse.status
      )
    }

    return {
      message: updateUserResponse.message,
      data: updateUserResponse.user,
      errors: null
    }
  }

  @Get(':id')
  @Authorization(true)
  @Permission('user_get_by_id')
  @ApiOkResponse({
    type: GetUserByIdResponseDto,
    description: 'Find user by id'
  })
  public async getUserById(
    @Param() params: UserIdDto
  ): Promise<GetUserByIdResponseDto> {
    const { id } = params

    const userResponse: IServiceUserGetByIdResponse = await this.userServiceClient
      .send('user_get_by_id', id)
      .toPromise()

    return {
      message: userResponse.message,
      data: userResponse?.data?.user
    }
  }

  @Get()
  @Authorization(true)
  @Permission('user_list')
  @ApiOkResponse({
    type: GetUsersResponseDto,
    description: 'List of user'
  })
  public async getUsers(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ListUserDto
  ): Promise<GetUsersResponseDto> {
    const { search, page, per_page, sort_by, order_by } = query
    const usersResponse: IServiceUserListResponse = await this.userServiceClient
      .send('user_list', {
        type: 'user',
        name: search,
        page: Number(page),
        perPage: Number(per_page),
        sortBy: sort_by,
        orderBy: order_by
      })
      .toPromise()

    res.header('x-total-count', String(usersResponse?.data.totalCount))
    res.header('x-total-page', String(usersResponse?.data.totalPages))

    return {
      message: usersResponse.message,
      data: usersResponse?.data?.users
    }
  }

  @Get()
  @ApiBearerAuth('JWT')
  @Authorization(true)
  @ApiOkResponse({
    type: GetUserByTokenResponseDto
  })
  public async getUserByToken(
    @Req() request: IAuthorizedRequest
  ): Promise<GetUserByTokenResponseDto> {
    const userInfo = request.user

    const userResponse: IServiceUserGetByIdResponse = await this.userServiceClient
      .send('user_get_by_id', userInfo.id)
      .toPromise()

    return {
      message: userResponse.message,
      data: {
        user: userResponse.data.user
      },
      errors: null
    }
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateUserResponseDto
  })
  public async createUser(
    @Body() userRequest: CreateUserDto
  ): Promise<CreateUserResponseDto> {
    const createUserResponse: IServiceUserCreateResponse = await this.userServiceClient
      .send('user_create', userRequest)
      .toPromise()
    if (createUserResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createUserResponse.message,
          data: null,
          errors: createUserResponse.errors
        },
        createUserResponse.status
      )
    }

    return {
      message: createUserResponse.message,
      data: {
        user: createUserResponse.data.user
      },
      errors: null
    }
  }

  @Post('/login')
  @ApiCreatedResponse({
    type: LoginUserResponseDto
  })
  public async loginUser(
    @Body() loginRequest: LoginUserDto
  ): Promise<LoginUserResponseDto> {
    const getUserResponse: IServiceUserSearchResponse = await this.userServiceClient
      .send('user_search_by_credentials', loginRequest)
      .toPromise()

    if (getUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: getUserResponse.message,
          data: null,
          errors: null
        },
        HttpStatus.UNAUTHORIZED
      )
    }

    const createTokenResponse: IServiveTokenCreateResponse = await this.tokenServiceClient
      .send('token_create', {
        user: getUserResponse.data.user
      })
      .toPromise()

    return {
      message: createTokenResponse.message,
      data: {
        token: createTokenResponse.token
      },
      errors: null
    }
  }

  @Put('/logout')
  @ApiBearerAuth('JWT')
  @Authorization(true)
  @ApiCreatedResponse({
    type: LogoutUserResponseDto
  })
  public async logoutUser(
    @Req() request: IAuthorizedRequest
  ): Promise<LogoutUserResponseDto> {
    console.log(request, 'Teste')
    const userInfo = request.user

    const destroyTokenResponse: IServiceTokenDestroyResponse = await this.tokenServiceClient
      .send('token_destroy', {
        userId: userInfo.id
      })
      .toPromise()

    if (destroyTokenResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: destroyTokenResponse.message,
          data: null,
          errors: destroyTokenResponse.errors
        },
        destroyTokenResponse.status
      )
    }

    return {
      message: destroyTokenResponse.message,
      errors: null,
      data: null
    }
  }

  @Post('/confirm')
  @ApiCreatedResponse({
    type: ConfirmUserResponseDto
  })
  public async confirmUser(
    @Body() confirmRequest: ConfirmUserDto
  ): Promise<ConfirmUserResponseDto> {
    const confirmUserResponse: IServiceUserConfirmResponse = await this.userServiceClient
      .send('user_confirm', {
        password: confirmRequest.password,
        link: confirmRequest.link
      })
      .toPromise()

    if (confirmUserResponse.status !== HttpStatus.OK) {
      throw new HttpException(
        {
          message: confirmUserResponse.message,
          data: null,
          errors: confirmUserResponse.errors
        },
        confirmUserResponse.status
      )
    }

    const createTokenResponse: IServiveTokenCreateResponse = await this.tokenServiceClient
      .send('token_create', {
        user: confirmUserResponse.user
      })
      .toPromise()

    return {
      message: confirmUserResponse.message,
      errors: null,
      data: {
        token: createTokenResponse.token
      }
    }
  }
}
