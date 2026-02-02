import { ApiProperty } from '@nestjs/swagger'

import { IModel } from '../model.interface'

export class ListModelResponseDto {
    @ApiProperty({ example: 'model_list_success' })
    message: string

    @ApiProperty({
        example: [
            {
                id: '5d987c3bfb881ec86b476bca',
                name: 'Modelo Padrão',
                event: '5d987c3bfb881ec86b476bfa',
                pages: [],
                criterions: [],
                created_at: new Date(),
                updated_at: new Date()
            }
        ],
        nullable: true
    })
    data: IModel[]
}
