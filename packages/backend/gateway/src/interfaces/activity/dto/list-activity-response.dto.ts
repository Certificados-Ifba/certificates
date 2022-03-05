import { ApiProperty } from '@nestjs/swagger'

import { IActivity } from '../activity.interface'

export class ListActivityResponseDto {
  @ApiProperty({ example: 'activity_search_success' })
  message: string

  @ApiProperty({
    example: [
      {
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
    ],
    nullable: true
  })
  data: IActivity[]
}
