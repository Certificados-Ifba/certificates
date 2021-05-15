import { ApiProperty } from '@nestjs/swagger'

export class CreateParticipantDto {
  @ApiProperty({
    example: 'Teste Estudante'
  })
  name: string

  @ApiProperty({
    uniqueItems: true,
    example: 'aluno@ifba.edu.br'
  })
  email: string

  role: 'PARTICIPANT'
  @ApiProperty({
    uniqueItems: true,
    example: {
      cpf: '36199705050',
      dob: '1999-01-01',
      is_student: true
    }
  })
  personal_data: {
    cpf: String
    dob: Date
    is_student: Boolean
  }
}
