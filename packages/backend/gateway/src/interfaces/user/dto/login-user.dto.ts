import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
  @ApiProperty({ example: 'test1@ifba.edu.br' })
  email: string

  @ApiProperty({ example: 'test11' })
  password: string
}
