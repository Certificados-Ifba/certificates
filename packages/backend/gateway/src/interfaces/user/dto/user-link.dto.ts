import { ApiProperty } from '@nestjs/swagger'

export class UserLinkDto {
  @ApiProperty({ example: 'someLink' })
  link: string
}
