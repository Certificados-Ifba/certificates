import { ApiProperty } from '@nestjs/swagger'

export enum UserRole {
  Admin = 'ADMIN',
  Coordinator = 'COORDINATOR'
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

  @ApiProperty({ enum: ['ADMIN', 'COORDINATOR'] })
  role: UserRole
}
