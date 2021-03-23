import { ApiProperty } from '@nestjs/swagger'

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export class CreateUserDto {
  @ApiProperty({
    example: 'Teste'
  })
  name: string

  @ApiProperty({
    uniqueItems: true,
    example: 'test1@ifba.edu.br'
  })
  email: string

  @ApiProperty({
    minLength: 6,
    example: 'test11'
  })
  password: string

  @ApiProperty({ enum: ['ADMIN', 'USER'] })
  role: UserRole
}
