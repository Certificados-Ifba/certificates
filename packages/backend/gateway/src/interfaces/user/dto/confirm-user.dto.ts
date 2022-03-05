import { ApiProperty } from '@nestjs/swagger'

export class ConfirmUserDto {
  @ApiProperty({
    minLength: 6,
    example: 'test11'
  })
  password: string

  @ApiProperty()
  link: string
}
