import { ApiProperty } from '@nestjs/swagger'

export class ResendMailResponseDto {
  @ApiProperty({ example: 'user_resend_success' })
  message: string
}
