import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from './create-user.dto'

export class UpdateUserDto {
  @ApiProperty({
    example: 'Teste'
  })
  name: string

  @ApiProperty({ enum: ['ADMIN', 'COORDINATOR'] })
  role: UserRole
}
