import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUserListParams } from 'src/interfaces/user-list-params.interface'
import { DataResponse } from 'src/interfaces/user-list-response.interface'
import { IUserUpdateParams } from 'src/interfaces/user-update-params.interface'

import { IUserLink } from '../interfaces/user-link.interface'
import { IUser } from '../interfaces/user.interface'
import { ConfigService } from './config/config.service'

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<IUser>,
    @InjectModel('UserLink') private readonly UserLinkModel: Model<IUserLink>,
    private readonly configService: ConfigService
  ) {}

  public async searchUserByEmail(email: string): Promise<IUser> {
    return this.UserModel.findOne({
      email
    }).exec()
  }

  public async searchUserByCPF(cpf: String): Promise<IUser> {
    return this.UserModel.findOne({
      'personal_data.cpf': cpf
    }).exec()
  }

  public async searchUserById(id: string): Promise<IUser> {
    return this.UserModel.findById(id).exec()
  }

  public async listUsers({
    name,
    participant,
    page,
    perPage,
    sortBy = 'created_at',
    orderBy = 'ASC'
  }: IUserListParams): Promise<DataResponse> {
    const pattern = name ? '.*' + name + '.*' : '.*'
    const sort = JSON.parse(`{"${sortBy}":"${orderBy}"}`)

    const users = await this.UserModel.find({
      name: new RegExp(pattern, 'i'),
      role: participant ? 'PARTICIPANT' : { $ne: 'PARTICIPANT' }
    })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .sort(sort)
      .exec()

    const count = await this.UserModel.countDocuments({
      name: new RegExp(pattern, 'i'),
      role: participant ? 'PARTICIPANT' : { $ne: 'PARTICIPANT' }
    })

    return {
      users,
      totalPages: Math.ceil(count / perPage),
      totalCount: count
    }
  }

  public async updateUserById(
    id: string,
    userParams: IUserUpdateParams
  ): Promise<IUser> {
    const UserModel = await this.UserModel.findById(id)

    if (userParams.name) UserModel.name = userParams.name
    if (userParams.password) UserModel.password = userParams.password
    if (userParams.is_confirmed)
      UserModel.is_confirmed = userParams.is_confirmed
    if (userParams.last_login) UserModel.last_login = userParams.last_login
    if (userParams?.personal_data?.cpf)
      UserModel.personal_data.cpf = userParams.personal_data.cpf
    if (userParams?.personal_data?.dob)
      UserModel.personal_data.dob = userParams.personal_data.dob
    if (userParams?.personal_data?.institution)
      UserModel.personal_data.institution = userParams.personal_data.institution

    return UserModel.save()
  }

  public async createUser(user: IUser): Promise<IUser> {
    const UserModel = new this.UserModel(user)
    return await UserModel.save()
  }

  public async removeUserById(id: string): Promise<IUser> {
    return await this.UserModel.findOneAndDelete({ _id: id })
  }

  public async createUserLink(
    id: string,
    expired?: number
  ): Promise<IUserLink> {
    const UserLinkModel = new this.UserLinkModel({
      user: id,
      expired
    })
    return await UserLinkModel.save()
  }

  public async getUserLink(link: string): Promise<IUserLink> {
    return this.UserLinkModel.findOne({ link, is_used: false }).exec()
  }

  public async getUserLinkByUser(userId: string): Promise<IUserLink> {
    return this.UserLinkModel.findOne({
      user: userId,
      is_used: false,
      expired: null
    }).exec()
  }

  public async updateUserLinkById(
    id: string,
    linkParams: { is_used: boolean }
  ): Promise<IUserLink> {
    return this.UserLinkModel.updateOne({ _id: id }, linkParams)
  }

  public getConfirmationLink(link: string): string {
    return `${this.configService.get('webUrl')}/confirm/${link}`
  }

  public getWebUrl(): string {
    return this.configService.get('webUrl')
  }
}
