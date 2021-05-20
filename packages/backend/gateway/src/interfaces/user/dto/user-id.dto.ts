import { ApiProperty } from '@nestjs/swagger'

export class UserIdDto {
    @ApiProperty()
    id: string
}
