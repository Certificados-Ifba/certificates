import { ApiProperty } from '@nestjs/swagger'

export class ForgotPasswordUserDto {
  @ApiProperty({ example: 'test1@ifba.edu.br' })
  email: string
}
