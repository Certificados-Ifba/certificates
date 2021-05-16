import { IUser } from "../user.interface";
import { ApiProperty } from '@nestjs/swagger'

export class GetUsersResponseDto {
  @ApiProperty({ example: 'user_search_success' })
  message: string

  @ApiProperty({
    example: [
    ],
    nullable: true
  })
  data: IUser[]
}
