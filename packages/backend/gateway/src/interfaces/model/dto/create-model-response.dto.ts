import { ApiProperty } from '@nestjs/swagger'

import { IModel } from '../model.interface'

export class CreateModelResponseDto {
  @ApiProperty({ example: 'model_create_success' })
  message: string

  @ApiProperty({
    example: {
      model: {
        name: 'Exemplo',
        pages: [
          {
            type: 'frente',
            text: '',
            image: '',
            layout: {
              padding: '',
              horizontal_padding: 0,
              vertical_padding: 0,
              position: '',
              horizontal_position: 0,
              vertical_position: 0
            }
          }
        ],
        criterions: [],
        created_at: new Date(),
        updated_at: new Date(),
        id: '5d987c3bfb881ec86b476bcc'
      }
    },
    nullable: true
  })
  data: {
    model: IModel
  }

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
