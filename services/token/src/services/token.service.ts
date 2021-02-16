import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Query } from 'mongoose'

import { IToken } from '../interfaces/token.interface'

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('Token') private readonly TokenModel: Model<IToken>
  ) {}

  public createToken(userId: string): Promise<IToken> {
    const token = this.jwtService.sign(
      {
        userId
      },
      {
        expiresIn: 30 * 24 * 60 * 60
      }
    )

    return new this.TokenModel({
      user_id: userId,
      token
    }).save()
  }

  public deleteTokenForUserId(userId: string): Query<any> {
    return this.TokenModel.remove({
      user_id: userId
    })
  }

  public async decodeToken(token: string): Promise<{ userId: string } | null> {
    const TokenModel = await this.TokenModel.find({
      token
    })
    let result = null

    if (TokenModel && TokenModel[0]) {
      try {
        const tokenData = this.jwtService.decode(TokenModel[0].token) as {
          exp: number
          userId: any
        }
        if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000)) {
          result = null
        } else {
          result = {
            userId: tokenData.userId
          }
        }
      } catch (e) {
        result = null
      }
    }
    return result
  }
}
