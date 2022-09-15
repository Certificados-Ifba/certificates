import { ApiProperty } from '@nestjs/swagger'

export class ForgotPasswordUserResponseDto {
  @ApiProperty({ example: 'user_forgot_password_success' })
  message: string

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
