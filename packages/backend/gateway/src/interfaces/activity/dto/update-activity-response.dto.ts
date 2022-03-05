import { ApiProperty } from '@nestjs/swagger'

import { IActivity } from '../activity.interface'

export class UpdateActivityResponseDto {
  @ApiProperty({ example: 'activity_update_success' })
  message: string

  @ApiProperty({
    example: {
      activity: {
        name: 'Introdução ao Estudo da Língua Brasileira de Sinais (LIBRAS)',
        workload: 40,
        start_date: new Date('2019-10-01'),
        end_date: new Date('2019-10-11'),
        event: '5d987c3bfb881ec86b476bca',
        type: '5d987c3bfb881ec86b476bfa',
        created_at: new Date(),
        updated_at: new Date(),
        id: '5d987c3bfb881ec86b476bcc'
      }
    },
    nullable: true
  })
  data: {
    activity: IActivity
  }

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
