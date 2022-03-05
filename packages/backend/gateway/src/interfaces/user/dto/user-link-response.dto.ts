import { ApiProperty } from '@nestjs/swagger'

export class UserLinkResponseDto {
  @ApiProperty({ example: 'user_get_by_link_success' })
  message: string

  @ApiProperty()
  data: 'register' | 'reset' | null
}
