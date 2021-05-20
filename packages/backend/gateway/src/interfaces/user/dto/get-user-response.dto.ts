import { IUser } from '../user.interface'
import { ApiProperty } from '@nestjs/swagger'

export class GetUsersResponseDto {
  @ApiProperty({ example: 'user_search_success' })
  message: string

  @ApiProperty({
    example: [
      {
        name: 'Teste',
        email: 'test1@ifba.edu.br',
        role: 'ADMIN',
        is_confirmed: true,
        created_at: '2021-05-16T01:08:28.794Z',
        updated_at: '2021-05-16T01:10:57.912Z',
        last_login: '2021-05-16T01:10:57.906Z',
        id: '09b6c3e7-c04a-49bc-b66e-ad28b4097445'
      }
    ],
    nullable: true
  })
  data: IUser[]
}
