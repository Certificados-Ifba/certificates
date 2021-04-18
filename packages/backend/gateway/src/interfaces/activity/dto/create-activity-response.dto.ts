import { ApiProperty } from '@nestjs/swagger'

import { IGeneric } from '../../generic/generic.interface'

export class CreateActivityResponseDto {
  @ApiProperty({ example: 'activity_create_success' })
  message: string

  @ApiProperty({
    example: {
      activity: {
        name: 'Artigo',
        created_at: new Date(),
        updated_at: new Date(),
        id: '5d987c3bfb881ec86b476bcc'
      }
    },
    nullable: true
  })
  data: {
    activity: IGeneric
  }

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
