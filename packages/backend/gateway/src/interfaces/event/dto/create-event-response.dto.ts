import { ApiProperty } from '@nestjs/swagger'

import { IEvent } from '../event.interface'

export class CreateEventResponseDto {
  @ApiProperty({ example: 'event_create_success' })
  message: string

  @ApiProperty({
    example: {
      event: {
        name: 'V Week-IT',
        initials: 'Week-IT',
        local: 'Vitória da Conquista',
        year: '2019',
        edition: '5º',
        start_date: new Date('2019-10-01'),
        end_date: new Date('2019-10-11'),
        user: '5d987c3bfb881ec86b476bca',
        created_at: new Date(),
        updated_at: new Date(),
        id: '5d987c3bfb881ec86b476bcc'
      }
    },
    nullable: true
  })
  data: {
    event: IEvent
  }

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
