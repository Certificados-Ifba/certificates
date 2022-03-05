import { ApiProperty } from '@nestjs/swagger'

export class AuthParticipantDto {
  @ApiProperty({ example: '00000000000' })
  cpf: string

  @ApiProperty({ example: new Date('2000-01-01') })
  dob: string

  @ApiProperty({ example: '00000000000' })
  token: string
}
