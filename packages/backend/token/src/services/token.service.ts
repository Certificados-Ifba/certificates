import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Query } from 'mongoose'

import { IToken } from '../interfaces/token.interface'
import { IUser } from '../interfaces/user.interface'
import { ConfigService } from './config/config.service'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('Token') private readonly TokenModel: Model<IToken>
  ) {}

  public createToken(data: {
    user: IUser
    ip: string
    device: string
    where?: string
  }): Promise<IToken> {
    const token = this.jwtService.sign(
      {
        user: data.user
      },
      {
        expiresIn: new ConfigService().get('expiresIn')
      }
    )

    return new this.TokenModel({
      user: data.user.id,
      ip: data.ip,
      device: data.device,
      where: data.where,
      token
    }).save()
  }

  public destroyTokenForUserId(userId: string): Query<any> {
    return this.TokenModel.updateMany(
      {
        user: userId
      },
      {
        destroyed: true
      }
    )
  }

  public async decodeToken(token: string): Promise<{ user: IUser } | null> {
    const TokenModel = await this.TokenModel.findOne({
      token,
      destroyed: false
    })
    let result = null

    if (TokenModel) {
      try {
        const tokenData = this.jwtService.decode(TokenModel.token) as {
          exp: number
          user: any
        }
        if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000)) {
          result = null
        } else {
          result = {
            user: tokenData.user
          }
        }
      } catch (e) {
        result = null
      }
    }
    return result
  }
}
