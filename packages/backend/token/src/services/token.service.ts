import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Query } from 'mongoose'
import { IUser } from 'src/interfaces/user.interface'

import { IToken } from '../interfaces/token.interface'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('Token') private readonly TokenModel: Model<IToken>
  ) {}

  public createToken(user: IUser): Promise<IToken> {
    const token = this.jwtService.sign(
      {
        user
      },
      {
        expiresIn: 30 * 24 * 60 * 60
      }
    )

    return new this.TokenModel({
      user_id: user.id,
      token
    }).save()
  }

  public deleteTokenForUserId(userId: string): Query<any> {
    return this.TokenModel.remove({
      user_id: userId
    })
  }

  public async decodeToken(token: string): Promise<{ user: IUser } | null> {
    const TokenModel = await this.TokenModel.find({
      token
    })
    let result = null

    if (TokenModel && TokenModel[0]) {
      try {
        const tokenData = this.jwtService.decode(TokenModel[0].token) as {
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
