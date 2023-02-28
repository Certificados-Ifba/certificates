import { ApiProperty } from '@nestjs/swagger'

import { IResume } from '../resume.interface'

export class GetResumeResponseDto {
  @ApiProperty({ example: 'get_resume_success' })
  message: string

  @ApiProperty({
    example: {
      user: {
        events: 37,
        participants: 1001,
        certificates: 3005
      }
    },
    nullable: true
  })
  data: IResume

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any }
}
