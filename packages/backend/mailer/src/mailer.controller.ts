import { MailerService } from '@nestjs-modules/mailer'
import { Controller, HttpStatus } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

import { IEmailData } from './interfaces/email-data.interface'
import { IMailSendResponse } from './interfaces/mail-send-response.interface'
import { ConfigService } from './services/config/config.service'

@Controller()
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  @MessagePattern('mail_send')
  async mailSend(data: IEmailData): Promise<IMailSendResponse> {
    data.template = process.cwd() + data.template
    console.log('Credentials obtained, sending message...')

    if (!this.configService.get('emailsDisabled')) {
      try {
        const info = await this.mailerService.sendMail(data)
        console.log(info)

        console.log('Message sent: %s', info.messageId)
        console.log(
          'Preview URL: https://ethereal.email/message/%s',
          info.response
            .replace('250 Accepted [STATUS=new MSGID=', '')
            .replace(']', '')
        )
      } catch (err) {
        console.error('Error occurred. ' + err.message)
      }
      // this.mailerService
      //   .sendMail(data)
      //   .then(info => {
      //     console.log('Message sent: %s', info.messageId)
      //     console.log(
      //       'Preview URL: https://ethereal.email/message/%s',
      //       info.response
      //         .replace('250 Accepted [STATUS=new MSGID=', '')
      //         .replace(']', '')
      //     )
      //   })
      //   .catch(err => {
      //     console.error('Error occurred. ' + err.message)
      //   })
    }
    return {
      status: HttpStatus.ACCEPTED,
      message: 'mail_send_success'
    }
  }
}
