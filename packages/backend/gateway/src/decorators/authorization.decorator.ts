import { CustomDecorator, SetMetadata } from '@nestjs/common'

export const Authorization = (secured: boolean): CustomDecorator<string> =>
  SetMetadata('secured', secured)
