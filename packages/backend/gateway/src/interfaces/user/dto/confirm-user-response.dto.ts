import { ApiProperty } from '@nestjs/swagger'

export class ConfirmUserResponseDto {
  @ApiProperty({ example: 'user_confirm_success' })
  message: string

  @ApiProperty({
    example: { token: 'someEncodedToken' },
    nullable: true
  })
  data: {
    token: string
  }

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
