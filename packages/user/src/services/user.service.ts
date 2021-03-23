import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

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

  public async searchUser(params: { email: string }): Promise<IUser[]> {
    return this.UserModel.find(params).exec()
  }

  public async searchUserById(id: string): Promise<IUser> {
    return this.UserModel.findById(id).exec()
  }

  public async updateUserById(
    id: string,
    userParams: { is_confirmed: boolean }
  ): Promise<IUser> {
    return this.UserModel.updateOne({ _id: id }, userParams).exec()
  }

  public async createUser(user: IUser): Promise<IUser> {
    const UserModel = new this.UserModel(user)
    return await UserModel.save()
  }

  public async createUserLink(id: string): Promise<IUserLink> {
    const UserLinkModel = new this.UserLinkModel({
      user_id: id
    })
    return await UserLinkModel.save()
  }

  public async getUserLink(link: string): Promise<IUserLink[]> {
    return this.UserLinkModel.find({ link, is_used: false }).exec()
  }

  public async updateUserLinkById(
    id: string,
    linkParams: { is_used: boolean }
  ): Promise<IUserLink> {
    return this.UserLinkModel.updateOne({ _id: id }, linkParams)
  }

  public getConfirmationLink(link: string): string {
    return `${this.configService.get('baseUri')}:${this.configService.get(
      'gatewayPort'
    )}/users/confirm/${link}`
  }
}
